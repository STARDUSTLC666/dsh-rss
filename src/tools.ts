/**
 * 五个面向模型的 RSS 工具：list / add / remove / fetch / check。
 * 直接调用 ctx.tools.register 注册【编译好的 JSON Schema】参数与 canonical 输出。
 *
 * @module dsh-rss/tools
 */

import { type ResolvedRssConfig } from './config.js'
import { addFeed, findFeedsByName, parseFeedsYaml, removeFeed, serializeFeeds, type Feed } from './feeds.js'
import { parseFeed } from './parser.js'
import { createProxyFetch } from './proxy-fetch.js'

/** 模型可见的内容块。 */
export interface ContentBlock {
  type: 'text'
  text: string
}

/** 注册给 ctx.tools.register 的原始工具定义（parameters 为编译好的 JSON Schema）。 */
export interface RssToolDefinition {
  name: string
  description: string
  parameters: { type: 'object'; properties: Record<string, unknown>; required?: string[] }
  output: {
    schema: Record<string, unknown>
    render(args: unknown, value: unknown): ContentBlock[]
  }
  execute(args: unknown, exec: unknown): Promise<unknown>
  timeoutMs?: number
}

/** 工具所需的 settings scope 最小面。 */
export interface RssSettingsScope {
  get(): unknown
  update(patch: Record<string, unknown>): Promise<void>
}

/** 可注入的 fetch 实现（测试用假 fetch 替换真网络）。 */
export type FetchLike = (url: string, init?: { headers?: Record<string, string>; redirect?: string; signal?: AbortSignal }) => Promise<Response>

const TIMEOUT_MS = 30000
const PROXY_HINT = '。若该订阅源需要特殊代理（梯子）才能访问，请在 cordis.patch.yml 里给 dsh-rss 配置 proxyUrl（如 http://127.0.0.1:7890）后重启。'

/**
 * 编译作者 DSL 为原始 JSON Schema（正是 defineTool 存为 definition.parameters 的值）。
 * 原生线路会原样下发该值，原始 DSL 会被模型 API 拒绝（schema must be a JSON Schema）。
 */
function compileParameters(spec: Record<string, any>): { type: 'object'; properties: Record<string, unknown>; required?: string[] } {
  const properties: Record<string, unknown> = {}
  const required: string[] = []
  for (const [key, prop] of Object.entries(spec)) {
    if (prop?.required === true) required.push(key)
    const node: Record<string, unknown> = {}
    if (typeof prop?.type === 'string') node.type = prop.type
    if (typeof prop?.description === 'string') node.description = prop.description
    if (prop?.type === 'array' && prop.items !== null && typeof prop.items === 'object') {
      const items: Record<string, unknown> = { type: 'string' }
      if (prop.items.type === 'object') items.additionalProperties = true
      node.items = items
    }
    properties[key] = node
  }
  return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) }
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
}

function optionalString(args: Record<string, unknown>, key: string): string | undefined {
  const value = args[key]
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
}

function requiredString(args: Record<string, unknown>, key: string, label: string): string {
  const value = optionalString(args, key)
  if (value === undefined) {
    throw new Error(label + '（参数 ' + key + '）为必填，请提供非空字符串。')
  }
  return value
}

function clampedInteger(args: Record<string, unknown>, key: string, fallback: number, min: number, max: number): number {
  const value = args[key]
  if (typeof value !== 'number' || !Number.isInteger(value)) return fallback
  return Math.min(max, Math.max(min, value))
}

function assertHttpUrl(url: string): void {
  if (!/^https?:\/\//i.test(url)) {
    throw new Error('订阅源地址必须是 http(s):// 开头的完整地址，例如 https://example.com/feed.xml。')
  }
}

/** 构造默认 fetch：配置了 proxyUrl 时走插件级代理。 */
function makeFetch(cfg: ResolvedRssConfig): FetchLike {
  if (cfg.proxyUrl === '') return globalThis.fetch as unknown as FetchLike
  return createProxyFetch(cfg.proxyUrl) as unknown as FetchLike
}

/**
 * 抓取订阅源 XML：校验地址、限时、限制体积、剥 BOM。
 */
async function fetchFeedXml(url: string, cfg: ResolvedRssConfig, fetchImpl?: FetchLike): Promise<{ xml: string; finalUrl: string }> {
  assertHttpUrl(url)
  const fetcher = fetchImpl ?? makeFetch(cfg)
  let response: Response
  try {
    response = await fetcher(url, {
      headers: {
        'user-agent': cfg.userAgent,
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(cfg.timeoutMs),
    })
  } catch (error) {
    throw new Error('抓取失败：' + (error instanceof Error ? error.message : String(error)) + PROXY_HINT)
  }
  if (!response.ok) {
    throw new Error('抓取失败：服务器返回 HTTP ' + response.status + '。')
  }
  let bytes: Uint8Array
  try {
    bytes = new Uint8Array(await response.arrayBuffer())
  } catch (error) {
    throw new Error('读取订阅源内容失败：' + (error instanceof Error ? error.message : String(error)))
  }
  if (bytes.length > cfg.maxBodyBytes) {
    throw new Error('订阅源内容超过 ' + cfg.maxBodyBytes + ' 字节上限，已停止读取。')
  }
  let xml = new TextDecoder('utf-8', { fatal: false }).decode(bytes)
  xml = xml.replace(/^\uFEFF/, '')
  return { xml, finalUrl: response.url || url }
}

// ---------- 输出 JSON Schema ----------

const feedItemSchema = {
  type: 'object',
  properties: {
    url: { type: 'string' },
    name: { type: 'string' },
    category: { type: 'string' },
  },
  additionalProperties: true,
}

const entrySchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    link: { type: 'string' },
    guid: { type: 'string' },
    pubDate: { type: 'string' },
    pubDateRaw: { type: 'string' },
    author: { type: 'string' },
    summary: { type: 'string' },
    categories: { type: 'array', items: { type: 'string' } },
    enclosure: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        type: { type: 'string' },
        length: { type: 'string' },
      },
      additionalProperties: true,
    },
  },
  additionalProperties: true,
}

const feedMetaSchema = {
  type: 'object',
  properties: {
    url: { type: 'string' },
    title: { type: 'string' },
    link: { type: 'string' },
    description: { type: 'string' },
    language: { type: 'string' },
    lastBuildDate: { type: 'string' },
    generator: { type: 'string' },
    feedType: { type: 'string' },
    entryCount: { type: 'integer' },
  },
  additionalProperties: true,
}

const listSchema = {
  type: 'object',
  properties: {
    count: { type: 'integer' },
    feeds: { type: 'array', items: feedItemSchema },
  },
  additionalProperties: true,
}

const addSchema = {
  type: 'object',
  properties: {
    added: feedItemSchema,
    existed: { type: 'boolean' },
    count: { type: 'integer' },
    feedTitle: { type: 'string' },
    feedType: { type: 'string' },
  },
  additionalProperties: true,
}

const removeSchema = {
  type: 'object',
  properties: {
    removed: { type: 'array', items: feedItemSchema },
    count: { type: 'integer' },
  },
  additionalProperties: true,
}

const fetchSchema = {
  type: 'object',
  properties: {
    url: { type: 'string' },
    feed: feedMetaSchema,
    entries: { type: 'array', items: entrySchema },
    truncated: { type: 'boolean' },
  },
  additionalProperties: true,
}

const checkSchema = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    url: { type: 'string' },
    title: { type: 'string' },
    feedType: { type: 'string' },
    entryCount: { type: 'integer' },
    description: { type: 'string' },
  },
  additionalProperties: true,
}

// ---------- render 帮助函数 ----------

function feedLabel(feed: unknown): string {
  const rec = asRecord(feed)
  const url = typeof rec.url === 'string' ? rec.url : ''
  const name = typeof rec.name === 'string' && rec.name !== '' ? rec.name : ''
  const category = typeof rec.category === 'string' && rec.category !== '' ? '，分类：' + rec.category : ''
  return (name !== '' ? name + '（' + url + '）' : url) + category
}

function renderList(_args: unknown, value: unknown): ContentBlock[] {
  const rec = asRecord(value)
  const feeds = Array.isArray(rec.feeds) ? rec.feeds : []
  const lines = ['共订阅 ' + feeds.length + ' 个订阅源：']
  for (const feed of feeds) lines.push('- ' + feedLabel(feed))
  return [{ type: 'text', text: lines.join('\n') }]
}

function renderAdd(_args: unknown, value: unknown): ContentBlock[] {
  const rec = asRecord(value)
  const existed = rec.existed === true
  const text = existed
    ? '该订阅已存在，已更新其信息：' + feedLabel(rec.added) + '。当前共 ' + String(rec.count) + ' 个订阅源。'
    : '已添加订阅：' + feedLabel(rec.added) + '。当前共 ' + String(rec.count) + ' 个订阅源。'
  return [{ type: 'text', text }]
}

function renderRemove(_args: unknown, value: unknown): ContentBlock[] {
  const rec = asRecord(value)
  const removed = Array.isArray(rec.removed) ? rec.removed : []
  const lines = ['已移除 ' + removed.length + ' 个订阅：']
  for (const feed of removed) lines.push('- ' + feedLabel(feed))
  lines.push('剩余 ' + String(rec.count) + ' 个订阅源。')
  return [{ type: 'text', text: lines.join('\n') }]
}

function renderFetch(_args: unknown, value: unknown): ContentBlock[] {
  const rec = asRecord(value)
  const feed = asRecord(rec.feed)
  const entries = Array.isArray(rec.entries) ? rec.entries : []
  const title = typeof feed.title === 'string' && feed.title !== '' ? feed.title : (typeof rec.url === 'string' ? rec.url : '')
  const feedType = typeof feed.feedType === 'string' ? feed.feedType : ''
  const lines = ['订阅源 ' + title + '（' + feedType + '）：共 ' + String(feed.entryCount) + ' 条，本次返回 ' + entries.length + ' 条。']
  for (const entry of entries) {
    const item = asRecord(entry)
    const entryTitle = typeof item.title === 'string' && item.title !== '' ? item.title : '(无标题)'
    const pubDate = typeof item.pubDate === 'string' && item.pubDate !== '' ? '（' + item.pubDate + '）' : ''
    const link = typeof item.link === 'string' && item.link !== '' ? ' ' + item.link : ''
    lines.push('- ' + entryTitle + pubDate + link)
  }
  return [{ type: 'text', text: lines.join('\n') }]
}

function renderCheck(_args: unknown, value: unknown): ContentBlock[] {
  const rec = asRecord(value)
  const title = typeof rec.title === 'string' && rec.title !== '' ? rec.title : (typeof rec.url === 'string' ? rec.url : '')
  const text = '订阅源可用：' + title + '（' + String(rec.feedType) + '），共 ' + String(rec.entryCount) + ' 条。'
  return [{ type: 'text', text }]
}

// ---------- 工具构建 ----------

/**
 * 构建五个工具定义。每个 execute 惰性读取配置与订阅，错误时抛出中文指引。
 * @param config - 已解析配置。
 * @param settingsScope - dsh-rss settings scope（get/update）。
 * @param fetchImpl - 可选注入的 fetch（测试用），缺省按 proxyUrl 构造。
 */
export function buildRssTools(config: ResolvedRssConfig, settingsScope: RssSettingsScope, fetchImpl?: FetchLike): RssToolDefinition[] {
  const cfg = config

  const getFeeds = (): Feed[] => {
    const value = settingsScope.get() as { feedsYaml?: unknown } | null
    const yamlText = value !== null && typeof value === 'object' && typeof value.feedsYaml === 'string' ? value.feedsYaml : ''
    return parseFeedsYaml(yamlText)
  }

  const persistFeeds = async (feeds: Feed[]): Promise<void> => {
    try {
      await settingsScope.update({ feedsYaml: serializeFeeds(feeds) })
    } catch (error) {
      throw new Error('写入订阅配置失败（可能已被其他会话修改，请重试）：' + (error instanceof Error ? error.message : String(error)))
    }
  }

  const rssList: RssToolDefinition = {
    name: 'rss_list',
    description: '列出已订阅的 RSS/Atom 源（存在 settings 的 dsh-rss.feedsYaml 里，可用 rss_add / rss_remove 管理）。返回每个订阅的 url、name、category 与总数。',
    parameters: compileParameters({}),
    output: {
      schema: listSchema,
      render: renderList,
    },
    async execute(rawArgs: unknown) {
      const feeds = getFeeds()
      return { count: feeds.length, feeds }
    },
    timeoutMs: TIMEOUT_MS,
  }

  const rssAdd: RssToolDefinition = {
    name: 'rss_add',
    description: '添加一个 RSS/Atom 订阅源（会先抓取校验该地址是否可用）。url 必填；name 缺省时用订阅源自身的标题；category 可选。同一 url 重复添加时只更新 name/category。添加结果持久化到 settings，重启后仍在。',
    parameters: compileParameters({
      url: { type: 'string', required: true, description: '订阅源地址（http(s):// 开头，必填）。' },
      name: { type: 'string', description: '显示名（可选，缺省用订阅源标题）。' },
      category: { type: 'string', description: '分类标签（可选）。' },
    }),
    output: {
      schema: addSchema,
      render: renderAdd,
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const url = requiredString(args, 'url', '订阅源地址')
      assertHttpUrl(url)
      const name = optionalString(args, 'name') ?? ''
      const category = optionalString(args, 'category') ?? ''
      const { xml, finalUrl } = await fetchFeedXml(url, cfg, fetchImpl)
      const parsed = parseFeed(xml, finalUrl)
      const effectiveName = name !== '' ? name : parsed.feed.title
      const { feeds, added, existed } = addFeed(getFeeds(), url, effectiveName, category)
      await persistFeeds(feeds)
      return { added, existed, count: feeds.length, feedTitle: parsed.feed.title, feedType: parsed.feed.feedType }
    },
    timeoutMs: TIMEOUT_MS,
  }

  const rssRemove: RssToolDefinition = {
    name: 'rss_remove',
    description: '删除已订阅的 RSS/Atom 源。url 与 name 至少给一个：url 精确匹配（不区分大小写），name 匹配所有同名订阅。删除结果持久化到 settings。',
    parameters: compileParameters({
      url: { type: 'string', description: '要删除的订阅源地址（可选，与 name 至少给一个）。' },
      name: { type: 'string', description: '要删除的订阅显示名（可选，与 url 至少给一个；同名全部删除）。' },
    }),
    output: {
      schema: removeSchema,
      render: renderRemove,
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const { feeds, removed } = removeFeed(getFeeds(), optionalString(args, 'url'), optionalString(args, 'name'))
      await persistFeeds(feeds)
      return { removed, count: feeds.length }
    },
    timeoutMs: TIMEOUT_MS,
  }

  const rssFetch: RssToolDefinition = {
    name: 'rss_fetch',
    description: '抓取并解析一个 RSS/Atom 订阅源，返回源信息与最新条目（标题、链接、guid、发布时间、作者、摘要、分类、附件）。url 与 name 至少给一个：name 查已订阅源（同名多个时需改用 url），url 直接抓取任意地址。limit 控制返回条数（1-100，默认 20），超过部分以 truncated=true 提示。',
    parameters: compileParameters({
      url: { type: 'string', description: '订阅源地址（可选，与 name 至少给一个）。' },
      name: { type: 'string', description: '已订阅源的名字（可选，可用 rss_list 查看）。' },
      limit: { type: 'integer', description: '返回条数，1-100，默认 20。' },
    }),
    output: {
      schema: fetchSchema,
      render: renderFetch,
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      let url = optionalString(args, 'url')
      const name = optionalString(args, 'name')
      if (url === undefined) {
        if (name === undefined) {
          throw new Error('rss_fetch 需要 url 参数（订阅源地址），或 name 参数（已订阅源的名字）。')
        }
        const matches = findFeedsByName(getFeeds(), name)
        if (matches.length === 0) {
          throw new Error('没有找到名为 ' + name + ' 的订阅。可用 rss_list 查看已订阅源，或直接给 url 参数。')
        }
        if (matches.length > 1) {
          throw new Error('有 ' + matches.length + ' 个同名订阅，请改用 url 参数指定。')
        }
        url = matches[0].url
      }
      assertHttpUrl(url)
      const limit = clampedInteger(args, 'limit', 20, 1, 100)
      const { xml, finalUrl } = await fetchFeedXml(url, cfg, fetchImpl)
      const parsed = parseFeed(xml, finalUrl)
      const entries = parsed.entries.slice(0, limit)
      return { url: finalUrl, feed: parsed.feed, entries, truncated: parsed.entries.length > limit }
    },
    timeoutMs: TIMEOUT_MS,
  }

  const rssCheck: RssToolDefinition = {
    name: 'rss_check',
    description: '校验一个地址是否为可解析的 RSS/Atom 订阅源（不修改订阅列表）。返回 ok、源标题、类型与条目数，供添加订阅前检查。',
    parameters: compileParameters({
      url: { type: 'string', required: true, description: '要校验的订阅源地址（必填）。' },
    }),
    output: {
      schema: checkSchema,
      render: renderCheck,
    },
    async execute(rawArgs: unknown) {
      const args = asRecord(rawArgs)
      const url = requiredString(args, 'url', '订阅源地址')
      assertHttpUrl(url)
      const { xml, finalUrl } = await fetchFeedXml(url, cfg, fetchImpl)
      const parsed = parseFeed(xml, finalUrl)
      return {
        ok: true,
        url: finalUrl,
        title: parsed.feed.title,
        feedType: parsed.feed.feedType,
        entryCount: parsed.entries.length,
        description: parsed.feed.description,
      }
    },
    timeoutMs: TIMEOUT_MS,
  }

  return [rssList, rssAdd, rssRemove, rssFetch, rssCheck]
}
