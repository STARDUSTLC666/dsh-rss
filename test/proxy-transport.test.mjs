import { test } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import net from 'node:net'
import { fetchFeedXml } from '../lib/network.js'
import { resolveConfig } from '../lib/config.js'
import { buildRssTools } from '../lib/tools.js'
import { startSocksFixture } from './fixtures/socks-server.mjs'

test('tool reads use the saved per-feed proxy and inherit the global proxy on other feeds', async t => {
  const hosts = []
  const origin = http.createServer((req, res) => {
    hosts.push(req.headers.host)
    res.end('<rss version="2.0"><channel><title>Fixture</title></channel></rss>')
  })
  const globalRequests = [], overrideRequests = []
  const global = await startSocksFixture(origin, globalRequests)
  t.after(() => global.close())
  const override = await startSocksFixture(origin, overrideRequests)
  t.after(() => override.close())
  const scope = { get: () => ({ feedsYaml:
    '- url: http://hn.example/rss\n  name: Hacker News\n  proxyUrl: ' + override.url +
    '\n- http://other.example/rss\n- url: http://invalid.example/rss\n  proxyUrl: 127.0.0.1:10800' }) }
  const config = resolveConfig({ proxyUrl: global.url, timeoutMs: 3000 })
  const tools = buildRssTools(config, scope, undefined, async () => [{ address: '93.184.216.34', family: 4 }])
  const fetch = tools.find(tool => tool.name === 'rss_fetch')
  const check = tools.find(tool => tool.name === 'rss_check')
  await fetch.execute({ name: 'Hacker News' })
  await check.execute({ url: 'http://other.example/rss' })
  await assert.rejects(check.execute({ url: 'http://invalid.example/rss' }), /proxyUrl.*socks5:\/\//)
  assert.deepEqual(overrideRequests, [{ address: '5db8d822', port: 80 }])
  assert.deepEqual(globalRequests, [{ address: '5db8d822', port: 80 }])
  assert.deepEqual(hosts, ['hn.example', 'other.example'])
})

test('production proxy transport pins CONNECT to the validated IP while preserving Host', async t => {
  const tunnels = []
  const hosts = []
  const feed = http.createServer((request, response) => {
    hosts.push(request.headers.host)
    response.end('<rss>pinned feed</rss>')
  })
  await new Promise(resolve => feed.listen(0, '127.0.0.1', resolve))
  const proxy = http.createServer()
  const sockets = new Set()
  proxy.on('connection', socket => { sockets.add(socket); socket.on('close', () => sockets.delete(socket)) })
  proxy.on('connect', (request, client, head) => {
    tunnels.push(request.url)
    const upstream = net.connect(feed.address().port, '127.0.0.1', () => {
      client.write('HTTP/1.1 200 Connection Established\r\n\r\n')
      if (head.length) upstream.write(head)
      client.pipe(upstream).pipe(client)
    })
    client.on('error', () => upstream.destroy())
    client.on('close', () => upstream.destroy())
    upstream.on('error', () => client.destroy())
  })
  await new Promise(resolve => proxy.listen(0, '127.0.0.1', resolve))
  t.after(async () => {
    for (const socket of sockets) socket.destroy()
    feed.closeAllConnections()
    await Promise.all([new Promise(resolve => proxy.close(resolve)), new Promise(resolve => feed.close(resolve))])
  })
  let lookups = 0
  const cfg = resolveConfig({ proxyUrl: `http://127.0.0.1:${proxy.address().port}`, timeoutMs: 3000 })
  const result = await fetchFeedXml('http://feed.example/rss', cfg, undefined, undefined, async hostname => {
    assert.equal(hostname, 'feed.example')
    lookups++
    return [{ address: '93.184.216.34', family: 4 }]
  })
  assert.equal(result.xml, '<rss>pinned feed</rss>')
  assert.deepEqual(tunnels, ['93.184.216.34:80'])
  assert.deepEqual(hosts, ['feed.example'])
  assert.equal(lookups, 1, 'socket connection must not resolve the hostname again')
})
