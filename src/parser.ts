/**
 * RSS / Atom 解析归一化：用 fast-xml-parser 把 RSS 0.9x/1.0/2.0、RDF、Atom 统一解析成
 * { feed, entries }。不解析 DTD/外部实体；内容只做文本抽取，不执行任何脚本。
 *
 * @module dsh-rss/parser
 */
import { XMLParser } from 'fast-xml-parser'

/** 条目附件（播客等）。 */
export interface RssEnclosure {
  url: string
  type: string
  length: string
}

/** 归一化后的条目。所有字符串字段都有值，categories 恒为数组，enclosure 缺省时省略。 */
export interface RssEntry {
  title: string
  link: string
  guid: string
  pubDate: string
  pubDateRaw: string
  author: string
  summary: string
  categories: string[]
  enclosure?: RssEnclosure
}

/** 订阅源元信息。 */
export interface RssFeedMeta {
  url: string
  title: string
  link: string
  description: string
  language: string
  lastBuildDate: string
  generator: string
  feedType: 'rss' | 'atom' | 'rdf'
  entryCount: number
}

/** 解析结果。 */
export interface ParsedFeed {
  feed: RssFeedMeta
  entries: RssEntry[]
}

const SUMMARY_MAX_CHARS = 500

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
  processEntities: true,
  htmlEntities: true,
  parseTagValue: false,
  trimValues: true,
  isArray: (name: string) => name === 'item' || name === 'entry' || name === 'category' || name === 'link' || name === 'author' || name === 'contributor',
})

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
}

/** 取节点文本：字符串直接取；对象取 #text；数组取第一个。 */
function firstText(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) return firstText(value[0])
  if (typeof value === 'object' && value !== null) {
    const text = (value as Record<string, unknown>)['#text']
    if (typeof text === 'string') return text.trim()
  }
  return ''
}

/** 去 HTML 标签并折叠空白（只用于摘要抽取，不做完整 HTML 渲染）。 */
function stripHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

/** 截断并加省略号。 */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max) + '…'
}

/** 各种日期格式（RFC822 / ISO 8601）统一转 ISO 8601 UTC；无法解析时返回空串。 */
function toIsoDate(raw: unknown): string {
  const text = firstText(raw)
  if (text === '') return ''
  const parsed = new Date(text)
  if (Number.isNaN(parsed.getTime())) return ''
  return parsed.toISOString()
}

/** 相对链接基于订阅源地址解析成绝对链接；失败时原样返回。 */
function resolveUrl(link: string, baseUrl: string): string {
  if (link === '') return ''
  try {
    return new URL(link, baseUrl).href
  } catch {
    return link
  }
}

/** 取 link：优先 rel=alternate 或未标 rel 的 href，最后兜底取纯文本。 */
function pickLink(linkValue: unknown): string {
  const values = Array.isArray(linkValue) ? linkValue : (linkValue === undefined || linkValue === null ? [] : [linkValue])
  let fallback = ''
  for (const value of values) {
    const rec = asRecord(value)
    const href = typeof rec['@_href'] === 'string' ? rec['@_href'].trim() : ''
    const rel = typeof rec['@_rel'] === 'string' ? rec['@_rel'].trim().toLowerCase() : ''
    if (href === '') continue
    if (rel === '' || rel === 'alternate') return href
    if (fallback === '') fallback = href
  }
  if (fallback !== '') return fallback
  return firstText(linkValue)
}

/** 取作者：字符串直接取；对象取 name/email；数组拼接。 */
function pickAuthor(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map((item) => pickAuthor(item)).filter((text) => text !== '').join(', ')
  }
  if (typeof value === 'string') return value.trim()
  const rec = asRecord(value)
  return firstText(rec.name) || firstText(rec.email) || firstText(rec)
}

/** 取分类：字符串或对象（Atom 的 term 属性）统一成字符串数组。 */
function pickCategories(value: unknown): string[] {
  if (value === undefined || value === null) return []
  const values = Array.isArray(value) ? value : [value]
  const result: string[] = []
  for (const item of values) {
    if (typeof item === 'string') {
      const text = item.trim()
      if (text !== '') result.push(text)
      continue
    }
    const rec = asRecord(item)
    const term = firstText(rec['@_term']) || firstText(rec)
    if (term !== '') result.push(term)
  }
  return result
}

/** 取附件（RSS 的 enclosure 元素）。 */
function pickRssEnclosure(item: Record<string, unknown>): RssEnclosure | undefined {
  const enc = asRecord(item.enclosure)
  const url = typeof enc['@_url'] === 'string' ? enc['@_url'].trim() : ''
  if (url === '') return undefined
  return {
    url,
    type: typeof enc['@_type'] === 'string' ? enc['@_type'].trim() : '',
    length: typeof enc['@_length'] === 'string' ? enc['@_length'].trim() : '',
  }
}

/** RSS2 / RSS1 条目归一化。 */
function normalizeRssItem(item: Record<string, unknown>, baseUrl: string): RssEntry {
  const title = firstText(item.title)
  const guid = firstText(item.guid)
  let link = firstText(item.link)
  if (link === '' && /^https?:\/\//i.test(guid)) link = guid
  link = resolveUrl(link, baseUrl)
  const pubDateRaw = firstText(item.pubDate) || firstText(item.date) || firstText(item.updated)
  const summaryRaw = firstText(item.description) || firstText(item.encoded) || firstText(item.summary)
  const enclosure = pickRssEnclosure(item)
  const entry: RssEntry = {
    title,
    link,
    guid,
    pubDate: toIsoDate(pubDateRaw),
    pubDateRaw,
    author: pickAuthor(item.author) || pickAuthor(item.creator),
    summary: truncate(stripHtml(summaryRaw), SUMMARY_MAX_CHARS),
    categories: pickCategories(item.category),
  }
  if (enclosure !== undefined) entry.enclosure = enclosure
  return entry
}

/** Atom 条目归一化。 */
function normalizeAtomEntry(entry: Record<string, unknown>, baseUrl: string): RssEntry {
  const title = firstText(entry.title)
  const guid = firstText(entry.id)
  const linkRaw = pickLink(entry.link)
  let link = linkRaw !== '' ? linkRaw : (/^https?:\/\//i.test(guid) ? guid : '')
  link = resolveUrl(link, baseUrl)
  const pubDateRaw = firstText(entry.published) || firstText(entry.updated) || firstText(entry.issued)
  const summaryRaw = firstText(entry.summary) || firstText(entry.content)
  let enclosure: RssEnclosure | undefined
  const links = Array.isArray(entry.link) ? entry.link : (entry.link === undefined || entry.link === null ? [] : [entry.link])
  for (const raw of links) {
    const rec = asRecord(raw)
    const rel = typeof rec['@_rel'] === 'string' ? rec['@_rel'].trim().toLowerCase() : ''
    const href = typeof rec['@_href'] === 'string' ? rec['@_href'].trim() : ''
    if (rel === 'enclosure' && href !== '') {
      enclosure = {
        url: href,
        type: typeof rec['@_type'] === 'string' ? rec['@_type'].trim() : '',
        length: typeof rec['@_length'] === 'string' ? rec['@_length'].trim() : '',
      }
      break
    }
  }
  const normalized: RssEntry = {
    title,
    link,
    guid,
    pubDate: toIsoDate(pubDateRaw),
    pubDateRaw,
    author: pickAuthor(entry.author) || pickAuthor(entry.contributor),
    summary: truncate(stripHtml(summaryRaw), SUMMARY_MAX_CHARS),
    categories: pickCategories(entry.category),
  }
  if (enclosure !== undefined) normalized.enclosure = enclosure
  return normalized
}

/** 过滤掉既无标题又无链接的无效条目。 */
function keepUsable(entry: RssEntry): boolean {
  return entry.title !== '' || entry.link !== ''
}

/** RSS2 / RSS1 频道元信息。 */
function buildRssFeedMeta(url: string, channel: Record<string, unknown>, feedType: 'rss' | 'rdf'): RssFeedMeta {
  return {
    url,
    title: firstText(channel.title),
    link: resolveUrl(firstText(channel.link), url),
    description: truncate(stripHtml(firstText(channel.description)), SUMMARY_MAX_CHARS),
    language: firstText(channel.language),
    lastBuildDate: toIsoDate(firstText(channel.lastBuildDate) || firstText(channel.pubDate) || firstText(channel.date)),
    generator: firstText(channel.generator),
    feedType,
    entryCount: 0,
  }
}

/** Atom feed 元信息。 */
function buildAtomFeedMeta(url: string, feedRec: Record<string, unknown>): RssFeedMeta {
  const langAttr = feedRec['@_lang']
  const generatorValue = asRecord(feedRec.generator)
  return {
    url,
    title: firstText(feedRec.title),
    link: resolveUrl(pickLink(feedRec.link), url),
    description: truncate(stripHtml(firstText(feedRec.subtitle)), SUMMARY_MAX_CHARS),
    language: firstText(feedRec.lang) || (typeof langAttr === 'string' ? langAttr.trim() : ''),
    lastBuildDate: toIsoDate(firstText(feedRec.updated) || firstText(feedRec.published)),
    generator: firstText(generatorValue.value) || firstText(feedRec.generator),
    feedType: 'atom',
    entryCount: 0,
  }
}

/** 检测截断：文档声明了根元素却缺少对应闭合标签（fast-xml-parser 对未闭合 XML 很宽容，需自行兜底）。 */
function detectTruncated(xmlText: string): string | null {
  const head = xmlText.slice(0, 512).toLowerCase()
  if (/<feed[\s>]/.test(head) && !/<\/feed\s*>/i.test(xmlText)) return 'feed'
  if (/<rdf:rdf[\s>]/.test(head) && !/<\/rdf:rdf\s*>/i.test(xmlText)) return 'rdf:RDF'
  if (/<rss[\s>]/.test(head) && !/<\/rss\s*>/i.test(xmlText)) return 'rss'
  return null
}

/**
 * 解析 XML 文本为归一化结构。
 * @param xmlText - 订阅源 XML 原文。
 * @param url - 订阅源地址（用于解析相对链接）。
 * @throws 内容为空 / XML 非法 / 缺少 feed 根元素时抛中文错误。
 */
export function parseFeed(xmlText: string, url: string): ParsedFeed {
  if (typeof xmlText !== 'string' || xmlText.trim() === '') {
    throw new Error('抓取到的内容为空，无法解析为订阅源。')
  }
  const missingRoot = detectTruncated(xmlText)
  if (missingRoot !== null) {
    throw new Error('XML 不完整（可能被截断）：缺少 </' + missingRoot + '> 闭合标签。')
  }
  let doc: unknown
  try {
    doc = xmlParser.parse(xmlText)
  } catch (error) {
    throw new Error('XML 解析失败：' + (error instanceof Error ? error.message : String(error)))
  }
  const root = asRecord(doc)
  const baseUrl = url || ''
  if (root.feed !== undefined) {
    const feedRec = asRecord(root.feed)
    const rawEntries = Array.isArray(feedRec.entry) ? feedRec.entry : (feedRec.entry === undefined || feedRec.entry === null ? [] : [feedRec.entry])
    const entries = rawEntries.map((item) => normalizeAtomEntry(asRecord(item), baseUrl)).filter(keepUsable)
    const meta = buildAtomFeedMeta(baseUrl, feedRec)
    return { feed: { ...meta, entryCount: entries.length }, entries }
  }
  if (root.RDF !== undefined) {
    const rdf = asRecord(root.RDF)
    const channel = asRecord(rdf.channel)
    const rawEntries = Array.isArray(rdf.item) ? rdf.item : (rdf.item === undefined || rdf.item === null ? [] : [rdf.item])
    const entries = rawEntries.map((item) => normalizeRssItem(asRecord(item), baseUrl)).filter(keepUsable)
    const meta = buildRssFeedMeta(baseUrl, channel, 'rdf')
    return { feed: { ...meta, entryCount: entries.length }, entries }
  }
  if (root.rss !== undefined) {
    const rss = asRecord(root.rss)
    const channel = asRecord(rss.channel)
    const rawEntries = Array.isArray(channel.item) ? channel.item : (channel.item === undefined || channel.item === null ? [] : [channel.item])
    const entries = rawEntries.map((item) => normalizeRssItem(asRecord(item), baseUrl)).filter(keepUsable)
    const meta = buildRssFeedMeta(baseUrl, channel, 'rss')
    return { feed: { ...meta, entryCount: entries.length }, entries }
  }
  throw new Error('内容不是 RSS/Atom 订阅源（缺少 <rss>、<rdf:RDF> 或 <feed> 根元素）。')
}
