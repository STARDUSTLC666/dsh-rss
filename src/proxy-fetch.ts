/**
 * 插件级 HTTP 代理：给 RSS 抓取请求一个走指定代理的 fetch，不影响同进程其他插件。
 */
import { ProxyAgent, fetch as undiciFetch } from 'undici'

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
