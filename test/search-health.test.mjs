import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildRssTools, resolveConfig } from '../lib/index.js'

const read = (name) => readFileSync(new URL('./fixtures/' + name, import.meta.url), 'utf8')

/** 完整版内存 settings scope：同时支持 feedsYaml 与 cursorsJson。 */
function makeFullScope(feedsYaml = '') {
  const state = { feedsYaml, cursorsJson: '' }
  return {
    get: () => ({ ...state }),
    update: async (patch) => { Object.assign(state, patch) },
    state,
  }
}

function fakeFetch(text, options = {}) {
  return async () => {
    if (options.failWith) throw options.failWith
    return new Response(text, { status: options.status ?? 200, headers: { 'content-type': 'application/rss+xml' } })
  }
}

const cfg = resolveConfig({ timeoutMs: 5000 })
const FEED_YAML = "- url: https://blog.example.com/feed.xml\n  name: 测试博客\n"

test('rss_search 命中标题/正文关键词且不区分大小写', async () => {
  const scope = makeFullScope(FEED_YAML)
  const search = buildRssTools(cfg, scope, fakeFetch(read('rss2.xml'))).find((t) => t.name === 'rss_search')
  const value = await search.execute({ query: 'RSS' })
  assert.equal(value.count, 1)
  assert.equal(value.hits[0].feedName, '测试博客')
  assert.equal(value.failedFeeds.length, 0)
})

test('rss_search 支持 since 过滤与 limit 钳制', async () => {
  const scope = makeFullScope(FEED_YAML)
  const search = buildRssTools(cfg, scope, fakeFetch(read('rss2.xml'))).find((t) => t.name === 'rss_search')
  const after = await search.execute({ query: '摘要', since: '2026-08-14' })
  assert.equal(after.count, 1)
  const before = await search.execute({ query: '摘要', since: '2026-08-15' })
  assert.equal(before.count, 0)
})

test('rss_search 单源抓取失败不阻断，报告进 failedFeeds', async () => {
  const scope = makeFullScope(FEED_YAML)
  const search = buildRssTools(cfg, scope, fakeFetch('', { failWith: new Error('boom') })).find((t) => t.name === 'rss_search')
  const value = await search.execute({ query: '任意' })
  assert.equal(value.count, 0)
  assert.equal(value.failedFeeds.length, 1)
  assert.match(String(value.failedFeeds[0].error), /boom/)
})

test('rss_search 无订阅时给出中文指引', async () => {
  const search = buildRssTools(cfg, makeFullScope()).find((t) => t.name === 'rss_search')
  await assert.rejects(() => search.execute({ query: 'x' }), /rss_add/)
})

test('rss_fetch incremental 首抓全量、二抓只返回新条目', async () => {
  const scope = makeFullScope(FEED_YAML)
  const tools = buildRssTools(cfg, scope, fakeFetch(read('rss2.xml')))
  const fetch = tools.find((t) => t.name === 'rss_fetch')
  const first = await fetch.execute({ name: '测试博客', incremental: true })
  assert.equal(first.newCount, 2)
  assert.equal(first.incremental, true)
  assert.notEqual(scope.state.cursorsJson, '')
  const second = await fetch.execute({ name: '测试博客', incremental: true })
  assert.equal(second.newCount, 0)
  assert.equal(second.entries.length, 0)
})

test('rss_fetch 非增量模式不写游标且行为不变', async () => {
  const scope = makeFullScope(FEED_YAML)
  const fetch = buildRssTools(cfg, scope, fakeFetch(read('rss2.xml'))).find((t) => t.name === 'rss_fetch')
  const value = await fetch.execute({ name: '测试博客' })
  assert.equal(value.entries.length, 2)
  assert.equal(scope.state.cursorsJson, '')
})

test('rss_health 离线自检：解析器通过、订阅数正确、无网络请求', async () => {
  let netCalls = 0
  const scope = makeFullScope(FEED_YAML)
  const health = buildRssTools(cfg, scope, async () => { netCalls++; return new Response('') }).find((t) => t.name === 'rss_health')
  const value = await health.execute({})
  assert.equal(value.ok, true)
  assert.equal(value.parserSelfTest, true)
  assert.equal(value.feedCount, 1)
  assert.equal(value.proxyConfigured, false)
  assert.equal(netCalls, 0)
  const blocks = health.output.render({}, value)
  assert.match(blocks[0].text, /自检：正常/)
})

test('rss_health 游标计数来自 settings', async () => {
  const scope = makeFullScope(FEED_YAML)
  scope.state.cursorsJson = JSON.stringify({ 'https://a.example/feed': { guids: ['x'], updatedAt: '' } })
  const health = buildRssTools(cfg, scope).find((t) => t.name === 'rss_health')
  const value = await health.execute({})
  assert.equal(value.cursorCount, 1)
})
