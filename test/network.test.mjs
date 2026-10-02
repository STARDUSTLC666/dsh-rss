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

test('disabled fake-IP fallback rejects without changing the VPN or allowing private networks', async () => {
  for (const address of ['198.18.0.67', '198.19.255.254']) {
    let fetched = false
    await assert.rejects(fetchFeedXml(url, resolveConfig({ fakeIpDnsFallback: false }), undefined, async () => { fetched = true; return new Response('') }, async () => [{ address, family: 4 }]), error => {
      assert.match(error.message, /Fake-IP/)
      assert.match(error.message, /真实 IP/)
      assert.match(error.message, /VPN 可以保持开启/)
      assert.doesNotMatch(error.message, /allowPrivateNetwork: true/)
      return true
    })
    assert.equal(fetched, false)
  }
})

const fakeLookup = async () => [{ address: '198.18.0.67', family: 4 }]
const dnsAnswer = (address, type = 1) => new Response(JSON.stringify({ Status: 0, Answer: [{ type, data: address }] }))

test('fake-IP uses bounded HTTPS DNS before fetching the public feed', async () => {
  const calls = []
  const fetcher = async (target, init) => {
    calls.push(target)
    assert.equal(init.redirect, 'manual')
    if (new URL(target).hostname === 'cloudflare-dns.com') {
      assert.equal(new URL(target).searchParams.get('name'), 'feed.example')
      return dnsAnswer('93.184.216.34')
    }
    return new Response('<rss>public content</rss>')
  }
  assert.equal((await fetchFeedXml(url, cfg, undefined, fetcher, fakeLookup)).xml, '<rss>public content</rss>')
  assert.equal(calls.length, 2)
})

test('mixed private and fake-IP native answers never contact HTTPS DNS or the feed', async () => {
  await assert.rejects(fetchFeedXml(url, cfg, undefined, async () => assert.fail('must not fetch'),
    async () => [{ address: '198.18.0.67', family: 4 }, { address: '127.0.0.1', family: 4 }]), /非公网地址/)
})

test('private HTTPS DNS answers are rejected before feed fetch, without resolver retries', async () => {
  for (const address of ['127.0.0.1', '10.1.2.3', '198.18.0.10']) {
    let calls = 0
    await assert.rejects(fetchFeedXml(url, cfg, undefined, async target => {
      calls++
      assert.equal(new URL(target).hostname, 'cloudflare-dns.com')
      return dnsAnswer(address)
    }, fakeLookup), /非公网地址/)
    assert.equal(calls, 1)
  }
})

test('HTTPS DNS does not follow redirects and fails over only to the other fixed resolver', async () => {
  const hosts = []
  const result = await fetchFeedXml(url, cfg, undefined, async (target, init) => {
    assert.equal(init.redirect, 'manual')
    const host = new URL(target).hostname
    hosts.push(host)
    if (host === 'cloudflare-dns.com') return new Response('', { status: 302, headers: { location: 'http://127.0.0.1/private' } })
    if (host === 'dns.google') return dnsAnswer('93.184.216.34')
    return new Response('feed')
  }, fakeLookup)
  assert.equal(result.xml, 'feed')
  assert.deepEqual(hosts, ['cloudflare-dns.com', 'dns.google', 'feed.example'])
})

test('fake-IP fallback supports IPv6-only public feeds', async () => {
  let dnsCalls = 0
  const result = await fetchFeedXml(url, cfg, undefined, async target => {
    if (new URL(target).hostname === 'cloudflare-dns.com') {
      dnsCalls++
      return new URL(target).searchParams.get('type') === 'A'
        ? new Response(JSON.stringify({ Status: 0, Answer: [] })) : dnsAnswer('2606:4700:4700::1111', 28)
    }
    return new Response('feed')
  }, fakeLookup)
  assert.equal(result.xml, 'feed')
  assert.equal(dnsCalls, 2)
})

test('HTTPS DNS cancellation retains its original reason and never starts a feed request', async () => {
  const controller = new AbortController()
  const reason = new Error('cancel real DNS')
  let calls = 0
  await assert.rejects(fetchFeedXml(url, cfg, { signal: controller.signal }, async (_target, init) => {
    calls++
    return new Response(new ReadableStream({
      pull() { queueMicrotask(() => controller.abort(reason)) },
    }, { highWaterMark: 0 }))
  }, fakeLookup), error => error === reason)
  assert.equal(calls, 1)
})

test('HTTPS DNS responses have a separate small body cap and no partial answer is used', async () => {
  let calls = 0
  await assert.rejects(fetchFeedXml(url, cfg, undefined, async target => {
    calls++
    assert.notEqual(new URL(target).hostname, 'feed.example')
    return new Response(new Uint8Array(64 * 1024 + 1))
  }, fakeLookup), /无法安全解析.*65536/)
  assert.equal(calls, 2)
})

test('a fake-IP feed redirect to a private target is rejected before another DNS or fetch', async () => {
  let calls = 0
  await assert.rejects(fetchFeedXml(url, cfg, undefined, async target => {
    calls++
    if (new URL(target).hostname === 'cloudflare-dns.com') return dnsAnswer('93.184.216.34')
    return new Response('', { status: 302, headers: { location: 'http://127.0.0.1/private' } })
  }, fakeLookup), /默认禁止访问/)
  assert.equal(calls, 2)
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
