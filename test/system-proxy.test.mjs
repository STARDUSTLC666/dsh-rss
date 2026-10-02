import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseWindowsProxy, selectWindowsProxy } from '../lib/system-proxy.js'
import { resolveConfig } from '../lib/config.js'

const registry = 'HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\r\n' +
  '    ProxyEnable    REG_DWORD    0x1\r\n' +
  '    ProxyServer    REG_SZ    http=127.0.0.1:7890;https=127.0.0.1:7891\r\n' +
  '    ProxyOverride    REG_SZ    <local>;*.example.com\r\n'

test('uses only an enabled manual Windows proxy and selects the target protocol', () => {
  const proxy = parseWindowsProxy(registry)
  assert.equal(selectWindowsProxy(proxy, new URL('https://feed.test/rss')), 'http://127.0.0.1:7891/')
  assert.equal(selectWindowsProxy(proxy, new URL('http://feed.test/rss')), 'http://127.0.0.1:7890/')
  assert.equal(parseWindowsProxy(registry.replace('0x1', '0x0')), undefined)
  assert.equal(parseWindowsProxy('AutoConfigURL REG_SZ http://pac.test/proxy.pac'), undefined)
})

test('manual proxy bypass entries apply without evaluating a PAC script', () => {
  const proxy = parseWindowsProxy(registry)
  assert.equal(selectWindowsProxy(proxy, new URL('https://feed.example.com/rss')), '')
  assert.equal(selectWindowsProxy(proxy, new URL('http://intranet/rss')), '')
  assert.equal(selectWindowsProxy({ server: 'socks5://127.0.0.1:7890', bypass: '' }, new URL('https://feed.test/rss')), '')
})

test('network compatibility options default on and can be explicitly disabled', () => {
  const defaults = resolveConfig({})
  assert.equal(defaults.useSystemProxy, true)
  assert.equal(defaults.fakeIpDnsFallback, true)
  assert.equal(defaults.allowPrivateNetwork, false)
  const custom = resolveConfig({ useSystemProxy: false, fakeIpDnsFallback: false })
  assert.equal(custom.useSystemProxy, false)
  assert.equal(custom.fakeIpDnsFallback, false)
  assert.throws(() => resolveConfig({ useSystemProxy: 'false' }), /useSystemProxy/)
  assert.throws(() => resolveConfig({ fakeIpDnsFallback: 1 }), /fakeIpDnsFallback/)
})
