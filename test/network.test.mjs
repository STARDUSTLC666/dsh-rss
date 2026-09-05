import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fetchFeedXml } from '../lib/network.js'
import { buildRssTools, isBlockedNetworkAddress, resolveConfig } from '../lib/index.js'
import { publicLookup } from './helpers.mjs'

const cfg = resolveConfig({ timeoutMs: 1000 })
const url = 'https://feed.example/rss'
const scope = { get: () => ({ feedsYaml: '- https://feed.example/rss\n- https://other.example/rss' }), update: async () => {} }

test('private IPv4, IPv6 and mapped IPv4 addresses are blocked', () => {
  for (const address of ['127.0.0.1', '10.2.3.4', '192.168.1.2', '169.254.169.254', '::1', 'fc00::1', 'fe80::1', '::ffff:127.0.0.1']) {
    assert.equal(isBlockedNetworkAddress(address), true, address)
  }
  for (const address of ['93.184.216.34', '2606:4700:4700::1111']) assert.equal(isBlockedNetworkAddress(address), false)
})

test('DNS resolving to a private address never reaches fetch', async () => {
  let fetches = 0
  await assert.rejects(fetchFeedXml(url, cfg, undefined, async () => { fetches++; return new Response('') }, async () => [{ address: '127.0.0.1', family: 4 }]), /非公网地址/)
  assert.equal(fetches, 0)
})

test('redirect destinations are checked before the next request', async () => {
  let fetches = 0
  const fetcher = async (_url, init) => {
    fetches++
    assert.equal(init.redirect, 'manual')
    return new Response('', { status: 302, headers: { location: 'http://127.0.0.1/internal' } })
  }
  await assert.rejects(fetchFeedXml(url, cfg, undefined, fetcher, publicLookup), /默认禁止访问/)
  assert.equal(fetches, 1)
})

test('a pre-aborted caller never starts DNS or fetch and retains its reason', async () => {
  const reason = new Error('caller stopped')
  const never = async () => { assert.fail('network must not start') }
  await assert.rejects(fetchFeedXml(url, cfg, { signal: AbortSignal.abort(reason) }, never, never), (error) => error === reason)
})

test('cancellation while DNS is pending retains the original reason', async () => {
  const controller = new AbortController()
  const reason = new Error('cancel DNS')
  const lookup = () => new Promise(() => { queueMicrotask(() => controller.abort(reason)) })
  await assert.rejects(fetchFeedXml(url, cfg, { signal: controller.signal }, async () => { assert.fail('no fetch') }, lookup), (error) => error === reason)
})

test('cancellation of a stalled response cancels the body and retains its reason', async () => {
  const controller = new AbortController()
  const reason = new Error('cancel body')
  let cancelled = false
  const body = new ReadableStream({
    pull() { queueMicrotask(() => controller.abort(reason)) },
    cancel() { cancelled = true },
  }, { highWaterMark: 0 })
  await assert.rejects(fetchFeedXml(url, cfg, { signal: controller.signal }, async () => new Response(body), publicLookup), (error) => error === reason)
  assert.equal(cancelled, true)
})

test('streamed bodies are bounded even without Content-Length', async () => {
  let cancelled = false
  const body = new ReadableStream({
    start(controller) { controller.enqueue(new Uint8Array(cfg.maxBodyBytes + 1)) },
    cancel() { cancelled = true },
  })
  await assert.rejects(fetchFeedXml(url, cfg, undefined, async () => new Response(body), publicLookup), /字节上限/)
  assert.equal(cancelled, true)
})

test('search cancellation stops traversal instead of returning failedFeeds', async () => {
  const controller = new AbortController()
  const reason = new Error('cancel search')
  let fetches = 0
  const fetcher = async () => {
    fetches++
    controller.abort(reason)
    throw new Error('transport closed')
  }
  const search = buildRssTools(cfg, scope, fetcher, publicLookup).find((tool) => tool.name === 'rss_search')
  await assert.rejects(search.execute({ query: 'news' }, { signal: controller.signal }), (error) => error === reason)
  assert.equal(fetches, 1)
})
