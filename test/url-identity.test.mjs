import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { addFeed, removeFeed, importOpmlFeeds, resolveConfig, serializeFeeds } from '../lib/index.js'
import { buildRssTools } from './helpers.mjs'

const upper = { url: 'https://example.com/Feed?key=Aa', name: 'A', category: '' }
const lowerPath = { url: 'https://example.com/feed?key=Aa', name: 'B', category: '' }
const lowerQuery = { url: 'https://example.com/Feed?key=aa', name: 'C', category: '' }

test('新增订阅保留 URL 路径和查询值大小写，不覆盖另一个源', () => {
  const initial = [upper]
  const pathAdded = addFeed(initial, lowerPath.url, lowerPath.name, '')
  assert.equal(pathAdded.existed, false)
  const queryAdded = addFeed(pathAdded.feeds, lowerQuery.url, lowerQuery.name, '')
  assert.equal(queryAdded.existed, false)
  assert.equal(queryAdded.feeds.length, 3)
  assert.equal(queryAdded.feeds[0].name, 'A')
  const duplicate = addFeed(queryAdded.feeds, 'HTTPS://EXAMPLE.COM:443/Feed?key=Aa', 'A updated', '')
  assert.equal(duplicate.existed, true, '协议和主机大小写、默认端口不产生重复项')
  assert.equal(duplicate.feeds.length, 3)
});

test('按 URL 删除只移除指定订阅，保留大小写不同的路径和参数', () => {
  const result = removeFeed([upper, lowerPath, lowerQuery], 'https://EXAMPLE.COM/Feed?key=Aa')
  assert.deepEqual(result.removed, [upper])
  assert.deepEqual(result.feeds, [lowerPath, lowerQuery])
});

test('OPML 导入不把大小写不同的源合并为同一个', () => {
  const result = importOpmlFeeds([upper], { outlines: [lowerPath, lowerQuery] })
  assert.equal(result.addedCount, 2)
  assert.equal(result.existedCount, 0)
  assert.equal(result.feeds.length, 3)
});

test('rss_search 的 URL 筛选只抓取指定源，仍兼容主机大小写', async () => {
  const requested = []
  const state = { feedsYaml: serializeFeeds([upper, lowerPath, lowerQuery]), cursorsJson: '' }
  const scope = { get: () => state, update: async patch => Object.assign(state, patch) }
  const xml = readFileSync(new URL('./fixtures/rss2.xml', import.meta.url), 'utf8')
  const tools = buildRssTools(resolveConfig({ timeoutMs: 5000 }), scope, async url => {
    requested.push(String(url)); return new Response(xml, { headers: { 'content-type': 'application/rss+xml' } })
  })
  await tools.find(tool => tool.name === 'rss_search').execute({ query: 'RSS', url: 'https://EXAMPLE.COM/Feed?key=Aa' })
  assert.deepEqual(requested, [upper.url])
});
