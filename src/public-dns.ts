/** HTTPS DNS is used only when the OS returns a VPN's 198.18/15 Fake-IP. */
import { isIP } from 'node:net'
import type { FetchLike, DnsLookupLike } from './network.js'
import { createFeedTransport } from './proxy-fetch.js'
import { readResponseText } from './response.js'
import { selectWindowsProxy, type SystemProxy } from './system-proxy.js'

const PROVIDERS = ['https://cloudflare-dns.com/dns-query', 'https://dns.google/resolve']

export async function lookupPublicDns(hostname: string, signal: AbortSignal, proxyUrl: string, systemProxy?: SystemProxy, fetchImpl?: FetchLike): Promise<Awaited<ReturnType<DnsLookupLike>>> {
  let lastError: unknown
  for (const provider of PROVIDERS) {
    try {
      for (const family of [4, 6]) {
        signal.throwIfAborted()
        const url = new URL(provider)
        url.searchParams.set('name', hostname)
        url.searchParams.set('type', family === 4 ? 'A' : 'AAAA')
        const transport = fetchImpl === undefined ? createFeedTransport(url, proxyUrl || selectWindowsProxy(systemProxy, url)) : undefined
        let response: Response | undefined
        try {
          response = await (fetchImpl ?? transport!.fetch)(url.href, { redirect: 'manual', signal, headers: { accept: 'application/dns-json' } })
          if (!response.ok) throw new Error('HTTPS DNS 返回 HTTP ' + response.status)
          const value = JSON.parse(await readResponseText(response, 64 * 1024, signal)) as {
            Status?: number; TC?: boolean; Answer?: Array<{ type?: number; data?: string }>
          }
          if (value.Status !== 0 || value.TC === true) throw new Error('HTTPS DNS 未返回完整有效的解析结果')
          const records = value.Answer ?? []
          if (!Array.isArray(records)) throw new Error('HTTPS DNS 解析结果格式无效')
          const answers = records.filter(record => record.type === (family === 4 ? 1 : 28)).map(record => {
            if (typeof record.data !== 'string' || isIP(record.data) !== family) throw new Error('HTTPS DNS 返回无效 IP 地址')
            return { address: record.data, family }
          })
          if (answers.length > 0) return answers
        } finally {
          await response?.body?.cancel().catch(() => {})
          await transport?.dispose()
        }
      }
      throw new Error('HTTPS DNS 未返回地址')
    } catch (error) {
      signal.throwIfAborted()
      lastError = error
    }
  }
  throw new Error('无法安全解析订阅源域名 ' + hostname + ' 的真实 IP：' + (lastError instanceof Error ? lastError.message : String(lastError)) + '。VPN 可以保持开启，请检查代理连接。')
}
