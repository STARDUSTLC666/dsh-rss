import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer, request as httpRequest } from 'node:http'
import { once } from 'node:events'
import { createRssSettingsBackend, RSS_SETTINGS_ROUTE } from '../lib/web.js'
import { resolveConfig } from '../lib/config.js'
import { serializeFeeds, parseFeedsYaml } from '../lib/feeds.js'
import { buildOpml } from '../lib/opml.js'
import { buildRssTools } from './helpers.mjs'
import { recommendedSources } from '../lib/catalog.js'

const XML = '<rss version="2.0"><channel><title>Example feed</title><item><title>Article</title></item></channel></rss>'
const initial = { url: 'https://example.com/feed', name: 'My label', category: 'Reading' }
async function fixture(t, options = {}) {
  const scope = { yaml: serializeFeeds([initial]), fail: false,
    get() { return { feedsYaml: this.yaml } },
    async update(patch) { if (this.fail) throw new Error('disk unavailable'); this.yaml = patch.feedsYaml },
  }
  const calls = []
  const transport = options.fetchImpl || (async url => {
    calls.push(url)
    return new Response(url.includes('/broken') ? '<html>Not a feed</html>' : XML)
  })
  const backend = createRssSettingsBackend(resolveConfig({}), scope, {
    ...options, fetchImpl: transport, lookupImpl: async () => [{ address: '93.184.216.34', family: 4 }],
  })
  const server = createServer((req, res) => void backend.handle(req, res))
  server.listen(0, '127.0.0.1'); await once(server, 'listening')
  t.after(() => { server.closeAllConnections(); server.close() })
  const origin = 'http://127.0.0.1:' + server.address().port
  const request = async (body, headers = {}, method = body ? 'POST' : 'GET') => {
    const response = await fetch(origin + RSS_SETTINGS_ROUTE, {
      method, headers: { ...(body ? { Origin: origin, 'Content-Type': 'application/json' } : {}), ...headers },
      body: body ? JSON.stringify(body) : undefined,
    })
    return { status: response.status, ...await response.json() }
  }
  return { scope, backend, server, origin, request, calls }
}

test('settings endpoint returns the shared list, without raw configuration', async t => {
  const f = await fixture(t)
  const result = await f.request()
  assert.equal(result.status, 200)
  assert.equal(result.snapshot.feeds[0].name, initial.name)
  assert.equal(result.snapshot.feeds[0].id.length, 64)
  assert.equal(result.snapshot.writable, true)
  assert.equal(result.snapshot.feedsYaml, undefined)
})

test('catalog is passive and recognizes an existing publisher URL without rewriting its name or category', async t => {
  const f = await fixture(t)
  const source = recommendedSources[0]
  f.scope.yaml = serializeFeeds([{ url: source.url.replace('www.ithome.com', 'WWW.ITHOME.COM'), name: 'My own title', category: '自己的分类' }])
  const before = f.scope.yaml
  const result = await f.request()
  assert.equal(result.snapshot.catalog.sources.find(item => item.id === source.id).subscribed, true)
  assert.ok(result.snapshot.catalog.sources.some(item => item.subscribed === false))
  assert.equal(result.snapshot.feeds[0].category, '自己的分类')
  assert.equal(f.scope.yaml, before)
  assert.deepEqual(f.calls, [], 'browsing a catalog must not visit every publisher')
})

test('publisher preview is read-only, URL-pinned and returns at most five safe article links', async t => {
  const xml = '<rss version="2.0"><channel><title>Preview</title>' + Array.from({ length: 9 }, (_, i) =>
    `<item><title><![CDATA[Article ${i} <img src=x>]]></title><link>${i === 0 ? 'javascript:alert(1)' : i === 1 ? 'https://user:secret@example.test/path' : '/article-' + i}</link><description>Body not included in preview</description></item>`).join('') + '</channel></rss>'
  const calls = []
  const f = await fixture(t, { writable: () => false, fetchImpl: async url => { calls.push(url); return new Response(xml) } })
  const before = f.scope.yaml
  const result = await f.request({ action: 'previewSource', sourceId: 'ithome', url: 'https://evil.example/feed' })
  assert.equal(result.status, 200)
  assert.deepEqual(calls, ['https://www.ithome.com/rss/'])
  assert.equal(result.sourcePreview.entryCount, 9)
  assert.equal(result.sourcePreview.entries.length, 5)
  assert.equal(result.sourcePreview.entries[0].link, '')
  assert.equal(result.sourcePreview.entries[1].link, '')
  assert.equal(result.sourcePreview.entries[2].link, 'https://www.ithome.com/article-2')
  assert.equal(result.sourcePreview.entries[2].summary, undefined)
  assert.equal(result.sourcePreview.entries[2].content, undefined)
  assert.equal(f.scope.yaml, before)
  assert.equal((await f.request({ action: 'previewSource', sourceId: 'unknown' })).status, 400)
  assert.equal(calls.length, 1)
})

test('failed recommended previews preserve subscriptions and cannot mark an unavailable source as subscribed', async t => {
  const f = await fixture(t, { fetchImpl: async () => new Response('unavailable', { status: 503 }) })
  const before = f.scope.yaml
  const result = await f.request({ action: 'previewSource', sourceId: 'ithome' })
  assert.equal(result.status, 400)
  const source = result.snapshot.catalog.sources.find(item => item.id === 'ithome')
  assert.equal(source.check.ok, false)
  assert.equal(source.subscribed, false)
  const added = await f.request({ action: 'add', revision: result.snapshot.revision, url: source.url, name: source.name, category: '科技资讯' })
  assert.equal(added.status, 400)
  assert.equal(f.scope.yaml, before)
})

test('saved-feed preview is read-only, ID-pinned and bounded to five safe article links', async t => {
  const calls = []
  const xml = '<rss version="2.0"><channel><title>Saved feed</title>' + Array.from({ length: 8 }, (_, i) =>
    `<item><title>Saved article ${i}</title><link>${i === 0 ? 'javascript:alert(1)' : '/article-' + i}</link><description>Not returned</description></item>`).join('') + '</channel></rss>'
  const f = await fixture(t, { writable: () => false, fetchImpl: async url => { calls.push(url); return new Response(xml) } })
  const snapshot = (await f.request()).snapshot
  const before = f.scope.yaml
  const result = await f.request({ action: 'previewFeed', id: snapshot.feeds[0].id, url: 'http://127.0.0.1/private' })
  assert.equal(result.status, 200)
  assert.deepEqual(calls, [initial.url])
  assert.equal(result.feedPreview.feedId, snapshot.feeds[0].id)
  assert.equal(result.feedPreview.entryCount, 8)
  assert.equal(result.feedPreview.entries.length, 5)
  assert.equal(result.feedPreview.entries[0].link, '')
  assert.equal(result.feedPreview.entries[1].link, 'https://example.com/article-1')
  assert.equal(result.feedPreview.entries[1].content, undefined)
  assert.equal(f.scope.yaml, before)
  assert.equal((await f.request({ action: 'previewFeed', id: 'removed', url: initial.url })).status, 409)
  assert.equal(calls.length, 1)
})

test('settings writes reject foreign ports, null origins, non-JSON and nonlocal hosts', async t => {
  const f = await fixture(t)
  for (const origin of ['null', 'https://127.0.0.1', 'http://127.0.0.1:1', 'https://evil.example']) {
    assert.equal((await f.request({ action: 'export' }, { Origin: origin })).status, 403)
  }
  assert.equal((await f.request({ action: 'export' }, { Origin: '' })).status, 403)
  // Node fetch replaces Host; use a real HTTP request to exercise this boundary.
  const foreignHostStatus = await new Promise(resolve => {
    const req = httpRequest(f.origin + RSS_SETTINGS_ROUTE, { headers: { Host: 'evil.example' } }, res => { res.resume(); resolve(res.statusCode) })
    req.end()
  })
  assert.equal(foreignHostStatus, 403)
  assert.equal((await f.request({ action: 'export' }, { 'Content-Type': 'text/plain' })).status, 415)
  assert.equal((await f.request(null, {}, 'PUT')).status, 405)
  assert.equal(parseFeedsYaml(f.scope.yaml).length, 1)
})

test('add verifies the feed; metadata editing works when the remote feed is offline', async t => {
  const f = await fixture(t)
  let state = (await f.request()).snapshot
  const added = await f.request({ action: 'add', revision: state.revision, url: 'https://example.com/new', category: 'Tech' })
  assert.equal(added.status, 200)
  state = added.snapshot
  assert.equal(state.feeds[1].name, 'Example feed')
  assert.equal(state.feeds[1].check.entryCount, 1)
  const edited = await f.request({ action: 'edit', revision: state.revision, id: state.feeds[0].id,
    url: initial.url, name: 'Renamed', category: '' })
  assert.equal(edited.status, 200)
  assert.equal(edited.snapshot.feeds[0].name, 'Renamed')
  assert.equal(edited.snapshot.feeds[0].category, '')
  assert.equal(f.calls.length, 1)
  const duplicate = await f.request({ action: 'add', revision: edited.snapshot.revision, url: initial.url })
  assert.equal(duplicate.code, 'duplicate')
  assert.equal(duplicate.snapshot.feeds.length, 2)
})

test('failed add/check leaves subscriptions intact and reports the latest failure', async t => {
  const f = await fixture(t)
  const state = (await f.request()).snapshot
  const before = f.scope.yaml
  const failed = await f.request({ action: 'add', revision: state.revision, url: 'https://example.com/broken' })
  assert.equal(failed.status, 400)
  assert.equal(f.scope.yaml, before)
  await f.request({ action: 'edit', revision: state.revision, id: state.feeds[0].id, url: initial.url, name: 'Still here' })
  assert.equal(parseFeedsYaml(f.scope.yaml)[0].name, 'Still here')
})

test('OPML preview is read-only; confirmation preserves duplicates unless explicitly enabled', async t => {
  const f = await fixture(t)
  const opml = buildOpml([
    { ...initial, name: 'Imported label', category: 'New category' },
    { url: 'https://example.com/second', name: 'Second', category: '' },
    { url: 'https://', name: 'Bad', category: '' },
  ])
  const before = f.scope.yaml
  const preview = (await f.request({ action: 'preview', opml })).preview
  assert.equal(preview.addedCount, 1)
  assert.equal(preview.existedCount, 1)
  assert.equal(preview.skippedCount, 1)
  assert.equal(preview.duplicates[0].after.name, initial.name)
  assert.equal(f.scope.yaml, before)
  const imported = await f.request({ action: 'import', opml, revision: preview.revision, token: preview.token })
  assert.equal(imported.status, 200)
  assert.equal(imported.snapshot.feeds[0].name, initial.name)
  assert.equal(imported.snapshot.feeds[0].category, initial.category)
  const update = (await f.request({ action: 'preview', opml, updateExisting: true })).preview
  assert.equal(update.duplicates[0].before.name, initial.name)
  assert.equal(update.duplicates[0].after.name, 'Imported label')
  await f.request({ action: 'import', opml, updateExisting: true, revision: update.revision, token: update.token })
  assert.equal(parseFeedsYaml(f.scope.yaml)[0].name, 'Imported label')
  assert.equal(f.calls.length, 0)
})

test('changed lists or import input require a fresh preview and cannot overwrite tool changes', async t => {
  const f = await fixture(t)
  const opml = buildOpml([{ url: 'https://example.com/new', name: 'New', category: '' }])
  const preview = (await f.request({ action: 'preview', opml })).preview
  const changedInput = await f.request({ action: 'import', opml: opml.replace('New', 'Other'), revision: preview.revision, token: preview.token })
  assert.equal(changedInput.status, 409)
  const remove = buildRssTools(resolveConfig({}), f.scope).find(tool => tool.name === 'rss_remove')
  await remove.execute({ url: initial.url })
  const stale = await f.request({ action: 'import', opml, revision: preview.revision, token: preview.token })
  assert.equal(stale.status, 409)
  assert.equal(stale.snapshot.feeds.length, 0)
})

test('failed saves preserve existing data and do not poison the next queued write', async t => {
  const f = await fixture(t)
  const state = (await f.request()).snapshot
  const body = { action: 'edit', revision: state.revision, id: state.feeds[0].id, url: initial.url, name: 'Retry me' }
  f.scope.fail = true
  assert.equal((await f.request(body)).status, 503)
  assert.equal(parseFeedsYaml(f.scope.yaml)[0].name, initial.name)
  f.scope.fail = false
  assert.equal((await f.request(body)).status, 200)
  assert.equal(parseFeedsYaml(f.scope.yaml)[0].name, 'Retry me')
})

test('read-only mode permits preview, check and export but prevents every write', async t => {
  const f = await fixture(t, { writable: () => false })
  assert.equal((await f.request()).snapshot.writable, false)
  assert.equal((await f.request({ action: 'export' })).status, 200)
  assert.equal((await f.request({ action: 'check', url: initial.url })).status, 200)
  for (const action of ['add', 'edit', 'remove', 'import']) assert.equal((await f.request({ action })).code, 'readonly')
})

test('disconnect cancels feed verification and prevents a later save', async t => {
  let ready, cancelled
  const started = new Promise(resolve => { ready = resolve })
  const stopped = new Promise(resolve => { cancelled = resolve })
  const f = await fixture(t, { fetchImpl: async (url, { signal }) => {
    ready()
    return new Promise((resolve, reject) => signal.addEventListener('abort', () => { cancelled(); reject(signal.reason) }, { once: true }))
  } })
  const state = (await f.request()).snapshot
  const abort = new AbortController()
  const request = fetch(f.origin + RSS_SETTINGS_ROUTE, { method: 'POST', signal: abort.signal,
    headers: { Origin: f.origin, 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'add', revision: state.revision, url: 'https://example.com/slow' }),
  })
  await started
  abort.abort()
  await assert.rejects(request, { name: 'AbortError' })
  await stopped
  assert.equal(parseFeedsYaml(f.scope.yaml).length, 1)
})

test('OPML size limits return a useful error without modifying the list', async t => {
  const f = await fixture(t)
  assert.equal((await f.request({ action: 'preview', opml: 'x'.repeat(1024 * 1024 + 1) })).status, 413)
  assert.equal((await f.request({ action: 'preview', opml: 'x'.repeat(3 * 1024 * 1024) })).status, 413)
  assert.equal(parseFeedsYaml(f.scope.yaml).length, 1)
})
