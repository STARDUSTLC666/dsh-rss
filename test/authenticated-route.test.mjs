import test from 'node:test'
import assert from 'node:assert/strict'
import { createRssSettingsBackend, installRssSettingsWeb, RSS_API_ROUTE } from '../lib/web.js'
import { resolveConfig } from '../lib/config.js'
import { parseFeedsYaml } from '../lib/feeds.js'

function fixture() {
  const scope = { yaml: '', writes: 0, get() { return { feedsYaml: this.yaml } }, async update(patch) { this.yaml = patch.feedsYaml; this.writes++ } }
  const backend = createRssSettingsBackend(resolveConfig({}), scope, {
    lookupImpl: async () => [{ address: '93.184.216.34', family: 4 }],
    fetchImpl: async () => new Response('<rss version="2.0"><channel><title>Fixture</title></channel></rss>'),
  })
  const request = (body, headers = {}, method = body ? 'POST' : 'GET') => new Request('http://dsh.internal' + RSS_API_ROUTE, { method, headers: { 'X-DSH-RSS': '1', ...(body ? { 'Content-Type': 'application/json' } : {}), ...headers }, ...(body ? { body: JSON.stringify(body) } : {}) })
  return { scope, backend, request }
}

test('desktop forwarded requests without Origin use the authenticated carrier and save the selected feed', async () => {
  const { scope, backend, request } = fixture(), snapshot = (await (await backend.fetch(request())).json()).snapshot
  const response = await backend.fetch(request({ action: 'add', revision: snapshot.revision, url: 'https://www.ithome.com/rss/', name: 'IT之家', category: '科技资讯' }))
  assert.equal(response.status, 200, await response.clone().text())
  assert.equal(scope.writes, 1)
  assert.deepEqual(parseFeedsYaml(scope.yaml), [{ url: 'https://www.ithome.com/rss/', name: 'IT之家', category: '科技资讯' }])
  assert.match(response.headers.get('cache-control'), /no-store/)
})

test('authenticated route still rejects unmarked, cross-origin, opaque-origin and non-JSON writes before saving', async () => {
  const { scope, backend, request } = fixture(), body = { action: 'add', revision: 'unused', url: 'https://example.com/feed' }
  for (const [headers, status] of [[{ 'X-DSH-RSS': '' }, 403], [{ Origin: 'https://evil.example' }, 403], [{ Origin: 'null' }, 403], [{ 'Sec-Fetch-Site': 'cross-site' }, 403], [{ 'Sec-Fetch-Site': 'same-site' }, 403], [{ 'Content-Type': 'text/plain' }, 415]]) {
    assert.equal((await backend.fetch(request(body, headers))).status, status)
  }
  assert.equal(scope.writes, 0)
  assert.equal((await backend.fetch(request(undefined, { 'X-DSH-RSS': '' }))).status, 403)
  assert.equal((await backend.fetch(request(undefined, {}, 'DELETE'))).status, 405)
})

test('carrier preserves JSON/body limits and cancellation without saving', async () => {
  const { scope, backend } = fixture()
  for (const [body, status] of [['{', 400], ['[]', 400], [JSON.stringify({ opml: 'x'.repeat(3 * 1024 * 1024) }), 413]]) {
    const request = new Request('http://dsh.internal' + RSS_API_ROUTE, { method: 'POST', headers: { 'X-DSH-RSS': '1', 'Content-Type': 'application/json' }, body })
    assert.equal((await backend.fetch(request)).status, status)
  }
  const controller = new AbortController(); controller.abort(new Error('fixture cancelled'))
  await assert.rejects(backend.fetch(new Request('http://dsh.internal' + RSS_API_ROUTE, { headers: { 'X-DSH-RSS': '1' }, signal: controller.signal })), /fixture cancelled/)
  assert.equal(scope.writes, 0)
})

test('authenticated browser and desktop origins are checked against the public Host, not the carrier URL', async () => {
  const { backend, request } = fixture()
  for (const headers of [{ Origin: 'dsh-app://app' }, { Origin: 'http://127.0.0.1:49000', Host: '127.0.0.1:49000', 'Sec-Fetch-Site': 'same-origin' }]) assert.equal((await backend.fetch(request(undefined, headers))).status, 200)
  assert.equal((await backend.fetch(request(undefined, { Origin: 'http://127.0.0.1:49001', Host: '127.0.0.1:49000' }))).status, 403)
})

test('host registration mounts authenticated API separately from the unchanged localhost-only legacy route', () => {
  const { backend } = fixture(), registrations = [], legacy = []
  installRssSettingsWeb({ inject(services, apply) { if (services[0] === 'connection') apply({ connection: { fetch: { register(route) { registrations.push(route) } } } }); else apply({ effect(register) { register() }, webServer: { register(route) { legacy.push(route) } } }) } }, backend)
  assert.equal(registrations[0].path, RSS_API_ROUTE)
  assert.deepEqual(registrations[0].methods, ['GET', 'POST'])
  assert.equal(registrations[0].requestBody, 'buffered')
  assert.equal(legacy[0].path, '/_dsh/dsh-rss/subscriptions')
})
