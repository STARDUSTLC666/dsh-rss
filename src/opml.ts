/**
 * OPML 导入 / 导出：把 dsh-rss 的订阅列表与常见 RSS 阅读器的 OPML 2.0 互转。
 *
 * 导入只读取 outline 树中的 xmlUrl / title / text / category 属性，忽略脚本与
 * 未知扩展；URL 必须 http(s)，非法项跳过并报告原因，不中断整个导入。
 *
 * @module dsh-rss/opml
 */

import { XMLParser } from 'fast-xml-parser'
import { addFeed, type Feed } from './feeds.js'

/** OPML 解析出的一个订阅。 */
export interface OpmlOutline {
  name: string
  url: string
  category: string
}

/** 导入时被跳过的项。 */
export interface OpmlSkipped {
  title: string
  url: string
  reason: string
}

/** OPML 导入结果。 */
export interface OpmlImportResult {
  feeds: Feed[]
  added: Feed[]
  addedCount: number
  existedCount: number
  skippedCount: number
  skipped: OpmlSkipped[]
}

/** OPML 文档解析结果。 */
export interface OpmlDocument {
  title: string
  outlines: OpmlOutline[]
}

const opmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  processEntities: true,
  trimValues: true,
  parseTagValue: false,
  isArray: (name: string) => name === 'outline',
})

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? value as Record<string, unknown> : {}
}

function attr(rec: Record<string, unknown>, key: string): string {
  const value = rec[key]
  return typeof value === 'string' ? value.trim() : ''
}

function firstText(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) return firstText(value[0])
  if (typeof value === 'object' && value !== null) {
    const text = (value as Record<string, unknown>)['#text']
    if (typeof text === 'string') return text.trim()
  }
  return ''
}

/**
 * 解析 OPML 2.0 文本。没有 xmlUrl 的 outline 当作分类节点，其 text 会传给后代。
 */
export function parseOpml(text: string): OpmlDocument {
  const trimmed = (text ?? '').trim()
  if (trimmed === '') throw new Error('OPML 内容为空，请提供 OPML XML 文本。')
  let doc: unknown
  try {
    doc = opmlParser.parse(trimmed)
  } catch (error) {
    throw new Error('OPML 解析失败：' + (error instanceof Error ? error.message : String(error)))
  }
  const root = asRecord(doc)
  const opml = asRecord(root.opml)
  if (Object.keys(opml).length === 0) throw new Error('内容不是 OPML 文档（缺少 <opml> 根元素）。')
  const head = asRecord(opml.head)
  const body = asRecord(opml.body)
  const outlines: OpmlOutline[] = []

  const walk = (node: unknown, inheritedCategory: string): void => {
    const rec = asRecord(node)
    const xmlUrl = attr(rec, '@_xmlUrl') || attr(rec, '@_xmlurl')
    const text = attr(rec, '@_text') || attr(rec, '@_title') || firstText(rec)
    const category = attr(rec, '@_category') || inheritedCategory
    if (xmlUrl !== '') {
      outlines.push({
        name: attr(rec, '@_title') || text || xmlUrl,
        url: xmlUrl,
        category,
      })
      return
    }
    const rawChildren = rec.outline
    const children = Array.isArray(rawChildren) ? rawChildren : (rawChildren === undefined || rawChildren === null ? [] : [rawChildren])
    const nextCategory = text !== '' ? text : inheritedCategory
    for (const child of children) walk(child, nextCategory)
  }

  const rawBodyOutlines = body.outline
  const bodyOutlines = Array.isArray(rawBodyOutlines) ? rawBodyOutlines : (rawBodyOutlines === undefined || rawBodyOutlines === null ? [] : [rawBodyOutlines])
  for (const child of bodyOutlines) walk(child, '')
  return { title: firstText(head.title), outlines }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** 把订阅列表序列化为 OPML 2.0 文本。 */
export function buildOpml(feeds: Feed[]): string {
  const now = new Date().toISOString()
  const rows = feeds.map((feed) => {
    const text = feed.name !== '' ? feed.name : feed.url
    const attrs = [
      'text="' + escapeXml(text) + '"',
      'title="' + escapeXml(feed.name) + '"',
      'type="rss"',
      'xmlUrl="' + escapeXml(feed.url) + '"',
    ]
    if (feed.category !== '') attrs.push('category="' + escapeXml(feed.category) + '"')
    return '    <outline ' + attrs.join(' ') + ' />'
  })
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<opml version="2.0">',
    '  <head>',
    '    <title>dsh-rss subscriptions</title>',
    '    <dateCreated>' + now + '</dateCreated>',
    '  </head>',
    '  <body>',
    ...rows,
    '  </body>',
    '</opml>',
    '',
  ].join('\n')
}

const HTTP_URL = /^https?:\/\//i

/** 把 OPML 导入合并进现有订阅（按 url 去重），非法项跳过。 */
export function importOpmlFeeds(current: Feed[], document: OpmlDocument): OpmlImportResult {
  const feeds = [...current]
  const added: Feed[] = []
  const skipped: OpmlSkipped[] = []
  let existedCount = 0
  for (const outline of document.outlines) {
    if (!HTTP_URL.test(outline.url)) {
      skipped.push({ title: outline.name, url: outline.url, reason: 'URL 不是 http(s) 地址' })
      continue
    }
    const before = feeds.length
    const outcome = addFeed(feeds, outline.url, outline.name, outline.category)
    feeds.splice(0, feeds.length, ...outcome.feeds)
    if (outcome.existed) {
      existedCount += 1
    } else if (feeds.length > before) {
      added.push(outcome.added)
    }
  }
  return {
    feeds,
    added,
    addedCount: added.length,
    existedCount,
    skippedCount: skipped.length,
    skipped,
  }
}
