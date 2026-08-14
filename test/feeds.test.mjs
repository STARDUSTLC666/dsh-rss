import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseFeedsYaml, serializeFeeds, addFeed, removeFeed, findFeedsByName } from '../lib/index.js'

test('空文本解析为空列表', () => {
  assert.deepEqual(parseFeedsYaml(''), [])
  assert.deepEqual(parseFeedsYaml('  # 只有注释'), [])
})

test('解析对象与字符串两种写法', () => {
  const feeds = parseFeedsYaml('- url: https://a.example.com/feed.xml\n  name: A 站\n  category: 技术\n- https://b.example.com/rss')
  assert.equal(feeds.length, 2)
  assert.deepEqual(feeds[0], { url: 'https://a.example.com/feed.xml', name: 'A 站', category: '技术' })
  assert.deepEqual(feeds[1], { url: 'https://b.example.com/rss', name: '', category: '' })
})

test('非法 YAML 抛中文错误', () => {
  assert.throws(() => parseFeedsYaml('- url: [未闭合'), /不是合法的 YAML/)
})

test('缺 url 项抛中文错误', () => {
  assert.throws(() => parseFeedsYaml('- name: 没地址'), /缺少 url/)
})

test('非列表抛中文错误', () => {
  assert.throws(() => parseFeedsYaml('url: https://a.example.com/'), /必须是一个列表/)
})

test('序列化回 YAML 后可再解析（往返一致）', () => {
  const feeds = [
    { url: 'https://a.example.com/feed.xml', name: 'A 站', category: '技术' },
    { url: 'https://b.example.com/rss', name: '', category: '' },
  ]
  const text = serializeFeeds(feeds)
  assert.deepEqual(parseFeedsYaml(text), feeds)
})

test('addFeed 去重：同 url（不区分大小写）更新信息', () => {
  const initial = [{ url: 'https://a.example.com/feed.xml', name: '旧名', category: '' }]
  const result = addFeed(initial, 'https://A.example.com/feed.xml', '', '新分类')
  assert.equal(result.existed, true)
  assert.equal(result.feeds.length, 1)
  assert.equal(result.added.name, '旧名')
  assert.equal(result.added.category, '新分类')
})

test('addFeed 新订阅追加', () => {
  const result = addFeed([], 'https://a.example.com/feed.xml', 'A 站', '技术')
  assert.equal(result.existed, false)
  assert.deepEqual(result.added, { url: 'https://a.example.com/feed.xml', name: 'A 站', category: '技术' })
})

test('removeFeed 按 url 删除', () => {
  const feeds = [{ url: 'https://a.example.com/', name: 'A', category: '' }, { url: 'https://b.example.com/', name: 'B', category: '' }]
  const { feeds: next, removed } = removeFeed(feeds, 'https://A.example.com/')
  assert.equal(removed.length, 1)
  assert.equal(next.length, 1)
  assert.equal(next[0].name, 'B')
})

test('removeFeed 按 name 删除全部同名', () => {
  const feeds = [{ url: 'https://a.example.com/', name: '同名', category: '' }, { url: 'https://b.example.com/', name: '同名', category: '' }]
  const { feeds: next, removed } = removeFeed(feeds, undefined, '同名')
  assert.equal(removed.length, 2)
  assert.equal(next.length, 0)
})

test('removeFeed 缺参数或无匹配抛中文错误', () => {
  assert.throws(() => removeFeed([], undefined, undefined), /至少一个/)
  assert.throws(() => removeFeed([{ url: 'https://a.example.com/', name: 'A', category: '' }], undefined, 'B'), /没有找到匹配/)
})

test('findFeedsByName 不区分大小写', () => {
  const feeds = [{ url: 'https://a.example.com/', name: 'ABC', category: '' }]
  assert.equal(findFeedsByName(feeds, 'abc').length, 1)
})
