import net from 'node:net'
import tls from 'node:tls'
import http from 'node:http'
import https from 'node:https'
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import { createFeedTransport } from '../../lib/proxy-fetch.js'

const mode = process.argv[2]
const successful = ['direct-https', 'proxy-https'].includes(mode)
const secureFixture = successful || mode === 'proxy-bad-cert'
const connectToFixture = net.connect
const upstreams = new Set()
const clientSockets = new Set()
for (const module of [net, tls]) {
  const connect = module.connect
  module.connect = function (...args) {
    const socket = connect.apply(this, args)
    clientSockets.add(socket)
    return socket
  }
}
const proxySockets = new Set()
const proxy = http.createServer()
proxy.on('connection', socket => {
  proxySockets.add(socket)
  socket.on('error', () => {})
  socket.on('close', () => proxySockets.delete(socket))
})
proxy.on('connect', (_req, socket) => {
  if (secureFixture) {
    const upstream = connectToFixture(port, '127.0.0.1', () => {
      socket.write('HTTP/1.1 200 Connection Established\r\n\r\n')
      socket.pipe(upstream).pipe(socket)
    })
    upstreams.add(upstream)
    upstream.on('error', () => socket.destroy())
    socket.on('close', () => upstream.destroy())
    return
  }
  socket.write('HTTP/1.1 200 Connection Established\r\n\r\n')
  if (mode === 'proxy-tls') setTimeout(() => socket.destroy(), 15)
})
let proxyUrl = '', port = 443
let origin
if (secureFixture) {
  origin = https.createServer({ key: readFileSync(new URL('./rss-test-key.pem', import.meta.url)), cert: readFileSync(new URL('./rss-test-cert.pem', import.meta.url)) }, (_req, res) => res.end('secure RSS fixture'))
  origin.on('tlsClientError', () => {})
  await new Promise(resolve => origin.listen(0, '127.0.0.1', resolve))
  port = origin.address().port
}
if (mode.startsWith('proxy-')) {
  await new Promise(resolve => proxy.listen(0, '127.0.0.1', resolve))
  proxyUrl = 'http://127.0.0.1:' + proxy.address().port
} else if (!secureFixture) {
  const reserve = net.createServer()
  await new Promise(resolve => reserve.listen(0, '127.0.0.1', resolve))
  port = reserve.address().port
  await new Promise(resolve => reserve.close(resolve))
}
const target = new URL('https://' + (mode === 'proxy-bad-cert' ? 'wrong.example' : 'feed.example') + ':' + port + '/rss')
const transport = createFeedTransport(target, proxyUrl, [{ address: '127.0.0.1', family: 4 }])
let rejected = false, failure
try {
  const response = await transport.fetch(target.href, { signal: AbortSignal.timeout(mode === 'proxy-abort' ? 150 : 1500) })
  assert.equal(await response.text(), 'secure RSS fixture')
} catch (error) { rejected = true; failure = error }
assert.equal(rejected, !successful, 'the connection outcome must match the expected TLS policy: ' + failure)
if (mode === 'proxy-bad-cert') assert.match(String(failure?.cause?.code), /ERR_TLS_CERT_ALTNAME_INVALID/)
await transport.dispose()
for (const socket of proxySockets) socket.destroy()
for (const socket of upstreams) socket.destroy()
if (proxy.listening) await new Promise(resolve => proxy.close(resolve))
if (origin) { origin.closeAllConnections(); await new Promise(resolve => origin.close(resolve)) }
await new Promise(resolve => setTimeout(resolve, 20))
// Model an error queued by the socket after request rejection/teardown. Run in
// a separate process: an unhandled EventEmitter error must really fail the test.
assert.ok(clientSockets.size > 0)
for (const socket of clientSockets) socket.emit('error', new Error('late RSS connection failure'))
console.log('SURVIVED ' + mode)
