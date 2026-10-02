/** Shared subscription storage for tools and the settings panel. */
import { createHash } from 'node:crypto'
import { parseFeedsYaml, serializeFeeds, type Feed } from './feeds.js'
import type { RssSettingsScope } from './tools.js'
import type { ResolvedRssConfig } from './config.js'
import type { RssToolExecution } from './execution.js'
import { fetchFeedXml, type FetchLike, type DnsLookupLike } from './network.js'
import { parseFeed } from './parser.js'

export class SubscriptionError extends Error {
  constructor(message: string, readonly status = 400, readonly code = 'invalid') { super(message) }
}

const writes = new WeakMap<RssSettingsScope, Promise<unknown>>()
export const feedId = (url: string): string => createHash('sha256').update(url).digest('hex')

export function subscriptionSnapshot(scope: RssSettingsScope): { feeds: Feed[]; revision: string } {
  const value = scope.get() as { feedsYaml?: unknown } | null
  const yaml = value && typeof value.feedsYaml === 'string' ? value.feedsYaml : ''
  return { feeds: parseFeedsYaml(yaml), revision: feedId(yaml) }
}

/** Read inside the queue: concurrent tool/UI writes cannot overwrite one another. */
export async function mutateSubscriptions<T>(
  scope: RssSettingsScope,
  mutate: (feeds: Feed[]) => { feeds: Feed[]; value: T },
  expectedRevision?: string,
): Promise<T> {
  const task = (writes.get(scope) ?? Promise.resolve()).catch(() => {}).then(async () => {
    const snapshot = subscriptionSnapshot(scope)
    if (expectedRevision !== undefined && snapshot.revision !== expectedRevision) {
      throw new SubscriptionError('订阅列表已经变化。请刷新列表后重新预览或保存；你的输入已保留。', 409, 'conflict')
    }
    const result = mutate(snapshot.feeds)
    try { await scope.update({ feedsYaml: serializeFeeds(result.feeds) }) }
    catch (error) {
      throw new SubscriptionError('写入订阅配置失败（可能已被其他会话修改，请重试）：' + (error instanceof Error ? error.message : String(error)), 503, 'save_failed')
    }
    return result.value
  })
  writes.set(scope, task)
  try { return await task }
  finally { if (writes.get(scope) === task) writes.delete(scope) }
}

export interface FeedCheck {
  checkedAt: string
  ok: boolean
  title?: string
  entryCount?: number
  error?: string
}
const checks = new WeakMap<RssSettingsScope, Map<string, FeedCheck>>()
export function recentFeedChecks(scope: RssSettingsScope): Map<string, FeedCheck> {
  let map = checks.get(scope)
  if (!map) { map = new Map(); checks.set(scope, map) }
  return map
}

/** Same network boundary, parsing and status for tool calls and manual checks. */
export async function readRssFeed(
  scope: RssSettingsScope, url: string, config: ResolvedRssConfig, exec?: RssToolExecution,
  fetchImpl?: FetchLike, lookupImpl?: DnsLookupLike,
) {
  const map = recentFeedChecks(scope)
  const save = (check: FeedCheck) => {
    map.delete(url)
    map.set(url, check)
    if (map.size > 256) map.delete(map.keys().next().value!)
  }
  try {
    const { xml, finalUrl } = await fetchFeedXml(url, config, exec, fetchImpl, lookupImpl)
    const parsed = parseFeed(xml, finalUrl)
    save({ checkedAt: new Date().toISOString(), ok: true, title: parsed.feed.title, entryCount: parsed.entries.length })
    return { parsed, finalUrl }
  } catch (error) {
    if (!exec?.signal.aborted) save({ checkedAt: new Date().toISOString(), ok: false, error: error instanceof Error ? error.message : String(error) })
    throw error
  }
}
