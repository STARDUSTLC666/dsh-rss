/**
 * 插件级 HTTP 代理：给 RSS 抓取请求一个走指定代理的 fetch，不影响同进程其他插件。
 */
import { Agent, Client, ProxyAgent, fetch as undiciFetch } from 'undici'
import { isIP } from 'node:net'
import type { FetchLike, DnsLookupLike } from './network.js'

/** One request/redirect hop owns its dispatcher until its body has been read. */
export function createFeedTransport(url: URL, proxyUrl: string, addresses?: Awaited<ReturnType<DnsLookupLike>>): {
  fetch: FetchLike; dispose: () => Promise<void>
} {
  const hostname = url.hostname.replace(/^\[|\]$/g, '')
  const servername = isIP(hostname) === 0 ? hostname : undefined
  const dispatcher = proxyUrl === ''
    ? new Agent({ connect: addresses === undefined ? {} : {
      lookup: (name, options, callback) => {
        if (name !== hostname) { callback(new Error('Unexpected RSS connection hostname'), '', 4); return }
        const candidates = addresses.filter(entry => !options.family || entry.family === options.family)
        if (candidates.length === 0) { callback(new Error('No validated RSS address for this family'), '', 4); return }
        if (options.all) callback(null, [...candidates])
        else callback(null, candidates[0].address, candidates[0].family)
      },
    } })
    : new ProxyAgent({ uri: proxyUrl, proxyTunnel: true, requestTls: { servername },
      factory: (origin, options) => {
        const delegate = (options as Client.Options).connect
        if (addresses === undefined || typeof delegate !== 'function') return new Client(origin, options)
        return new Client(origin, { ...options, connect: (socketOptions, callback) => {
          const address = addresses[0].address
          const port = socketOptions.port || (url.protocol === 'https:' ? '443' : '80')
          const host = (isIP(address) === 6 ? '[' + address + ']' : address) + ':' + port
          delegate({ ...socketOptions, hostname: address, host, port, servername }, callback)
        } })
      },
    })
  return {
    fetch: async (input, init) => await undiciFetch(input, { ...init, redirect: 'manual', dispatcher }) as unknown as Response,
    dispose: async () => { await dispatcher.destroy() },
  }
}

/**
 * 构造一个把所有请求路由到 proxyUrl 的 fetch。
 * @param proxyUrl - 如 http://127.0.0.1:7890
 */
export function createProxyFetch(proxyUrl: string): typeof globalThis.fetch {
  const agent = new ProxyAgent(proxyUrl)
  // undici 自带类型与全局 fetch 类型不完全一致，桥接处用 any 避免类型摩擦；
  // 对外契约仍是 typeof globalThis.fetch。
  return ((input: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) =>
    undiciFetch(input as any, { ...(init as any), dispatcher: agent })) as unknown as typeof globalThis.fetch
}
