/**
 * 订阅列表存取：feedsYaml（settings 里的 YAML 文本）与 Feed 对象数组互转。
 *
 * @module dsh-rss/feeds
 */
import YAML from 'yaml'

/** 单个订阅。 */
export interface Feed {
  url: string
  name: string
  category: string
}

const FEEDS_HEADER = [
  '# dsh-rss 订阅源列表',
  '# 每行一个订阅：url 必填，name（显示名）与 category（分类）可选。',
  '# 也可以直接写字符串：- https://example.com/feed.xml',
  '',
]

/**
 * 解析 feedsYaml 为订阅数组。空文本返回空数组；非法 YAML / 缺 url 抛中文错误。
 */
export function parseFeedsYaml(text: string): Feed[] {
  const trimmed = (text ?? '').trim()
  if (trimmed === '') return []
  let raw: unknown
  try {
    raw = YAML.parse(trimmed)
  } catch (error) {
    throw new Error('订阅配置（feedsYaml）不是合法的 YAML：' + (error instanceof Error ? error.message : String(error)) + '。请在设置页修正 dsh-rss 的订阅列表。')
  }
  if (raw === null || raw === undefined) return []
  if (!Array.isArray(raw)) {
    throw new Error('订阅配置（feedsYaml）必须是一个列表（每行 - url: ...）。请在设置页修正 dsh-rss 的订阅列表。')
  }
  const feeds: Feed[] = []
  for (let index = 0; index < raw.length; index++) {
    const item = raw[index]
    let url = ''
    let name = ''
    let category = ''
    if (typeof item === 'string') {
      url = item.trim()
    } else if (typeof item === 'object' && item !== null) {
      const rec = item as Record<string, unknown>
      url = typeof rec.url === 'string' ? rec.url.trim() : ''
      name = typeof rec.name === 'string' ? rec.name.trim() : ''
      category = typeof rec.category === 'string' ? rec.category.trim() : ''
    }
    if (url === '') {
      throw new Error('订阅配置（feedsYaml）第 ' + (index + 1) + ' 项缺少 url 字段。请在设置页修正 dsh-rss 的订阅列表。')
    }
    feeds.push({ url, name, category })
  }
  return feeds
}

/** 订阅数组序列化回 YAML 文本（带使用说明头）。 */
export function serializeFeeds(feeds: Feed[]): string {
  const rows: Array<Record<string, string>> = []
  for (const feed of feeds) {
    const rec: Record<string, string> = { url: feed.url }
    if (feed.name !== '') rec.name = feed.name
    if (feed.category !== '') rec.category = feed.category
    rows.push(rec)
  }
  const body = YAML.stringify(rows).trimEnd()
  return FEEDS_HEADER.join('\n') + body + '\n'
}

function sameUrl(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase()
}

/**
 * 添加订阅：按 url（不区分大小写）去重；已存在时合并更新 name/category。
 */
export function addFeed(feeds: Feed[], url: string, name: string, category: string): { feeds: Feed[]; added: Feed; existed: boolean } {
  const cleanUrl = url.trim()
  const cleanName = name.trim()
  const cleanCategory = category.trim()
  const existing = feeds.find((feed) => sameUrl(feed.url, cleanUrl))
  if (existing) {
    const merged: Feed = {
      url: existing.url,
      name: cleanName !== '' ? cleanName : existing.name,
      category: cleanCategory !== '' ? cleanCategory : existing.category,
    }
    const next = feeds.map((feed) => feed === existing ? merged : feed)
    return { feeds: next, added: merged, existed: true }
  }
  const added: Feed = { url: cleanUrl, name: cleanName, category: cleanCategory }
  return { feeds: [...feeds, added], added, existed: false }
}

/**
 * 删除订阅：url 精确匹配（不区分大小写），或 name 匹配所有同名项（不区分大小写）。
 * 两者都缺或没有匹配项时抛中文错误。
 */
export function removeFeed(feeds: Feed[], url?: string, name?: string): { feeds: Feed[]; removed: Feed[] } {
  const cleanUrl = (url ?? '').trim()
  const cleanName = (name ?? '').trim()
  if (cleanUrl === '' && cleanName === '') {
    throw new Error('删除订阅需要提供 url 或 name 参数（至少一个）。')
  }
  const removed: Feed[] = []
  const next = feeds.filter((feed) => {
    const match = (cleanUrl !== '' && sameUrl(feed.url, cleanUrl)) || (cleanName !== '' && feed.name.toLowerCase() === cleanName.toLowerCase())
    if (match) removed.push(feed)
    return !match
  })
  if (removed.length === 0) {
    const hint = cleanUrl !== '' ? '（url=' + cleanUrl + '）' : '（name=' + cleanName + '）'
    throw new Error('没有找到匹配的订阅' + hint + '。可用 rss_list 查看已订阅源。')
  }
  return { feeds: next, removed }
}

/** 按名字找订阅（不区分大小写）。 */
export function findFeedsByName(feeds: Feed[], name: string): Feed[] {
  const needle = name.trim().toLowerCase()
  return feeds.filter((feed) => feed.name.trim().toLowerCase() === needle)
}
