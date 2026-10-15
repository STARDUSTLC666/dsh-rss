/**
 * 插件级 HTTP 代理：给 RSS 抓取请求一个走指定代理的 fetch，不影响同进程其他插件。
 */
import { Agent, Client, ProxyAgent, buildConnector, fetch as undiciFetch } from 'undici'
import { isIP, type Socket } from 'node:net'
import type { FetchLike, DnsLookupLike } from './network.js'

/** One request/redirect hop owns its dispatcher until its body has been read. */
export function createFeedTransport(url: URL, proxyUrl: string, addresses?: Awaited<ReturnType<DnsLookupLike>>): {
  fetch: FetchLike; dispose: () => Promise<void>
} {
  const hostname = url.hostname.replace(/^\[|\]$/g, '')
  const servername = isIP(hostname) === 0 ? hostname : undefined
  const sockets = new Set<Socket>()
  const onLateError = (): void => { /* The connector/request already receives its own error. */ }
  function watch(socket: Socket): Socket {
    // CONNECT detaches the HTTP client's listeners before handing over its socket.
    // Reattach after handover as well as immediately after socket construction.
    if (!socket.listeners('error').includes(onLateError)) socket.on('error', onLateError)
    if (!sockets.has(socket)) {
      sockets.add(socket)
      socket.once('close', () => sockets.delete(socket))
    }
    return socket
  }
  function guarded(connect: buildConnector.connector): buildConnector.connector {
    return (options, callback) => {
      const socket = connect(options, (error, connected) => {
        if (error !== null) callback(error, null)
        else callback(null, watch(connected))
      }) as unknown as Socket | undefined
      if (socket !== undefined) watch(socket)
    }
  }
  const dispatcher = proxyUrl === ''
    ? new Agent({ connect: guarded(buildConnector(addresses === undefined ? {} : {
      lookup: (name, options, callback) => {
        if (name !== hostname) { callback(new Error('Unexpected RSS connection hostname'), '', 4); return }
        const candidates = addresses.filter(entry => !options.family || entry.family === options.family)
        if (candidates.length === 0) { callback(new Error('No validated RSS address for this family'), '', 4); return }
        if (options.all) callback(null, [...candidates])
        else callback(null, candidates[0].address, candidates[0].family)
      },
    })) })
    : new ProxyAgent({ uri: proxyUrl, proxyTunnel: true, requestTls: { servername },
      clientFactory: (origin, rawOptions) => {
        const options = rawOptions as Client.Options
        const connect = typeof options.connect === 'function' ? options.connect : buildConnector(options.connect ?? {})
        return new Client(origin, { ...options, connect: guarded(connect) })
      },
      factory: (origin, options) => {
        const delegate = (options as Client.Options).connect
        if (typeof delegate !== 'function') throw new Error('RSS proxy did not supply a tunnel connector')
        const endpoint = guarded(buildConnector({ servername }))
        return new Client(origin, { ...options, connect: (socketOptions, callback) => {
          const address = addresses?.[0]?.address ?? hostname
          const port = socketOptions.port || (url.protocol === 'https:' ? '443' : '80')
          const host = (isIP(address) === 6 ? '[' + address + ']' : address) + ':' + port
          // Ask ProxyAgent for a raw CONNECT tunnel, then own the TLS socket too.
          // A callback around the final TLS socket alone misses handshake errors.
          delegate({ ...socketOptions, protocol: 'http:', hostname: address, host, port, servername }, (error, tunnel) => {
            if (error !== null) { callback(error, null); return }
            watch(tunnel)
            if (url.protocol !== 'https:') { callback(null, tunnel); return }
            endpoint({ ...socketOptions, hostname: address, host, port, servername, httpSocket: tunnel }, callback)
          })
        } })
      },
    })
  return {
    fetch: async (input, init) => await undiciFetch(input, { ...init, redirect: 'manual', dispatcher }) as unknown as Response,
    dispose: async () => {
      for (const socket of sockets) socket.destroy()
      await dispatcher.destroy()
      sockets.clear()
    },
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
