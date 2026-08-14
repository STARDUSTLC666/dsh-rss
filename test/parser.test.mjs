import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { parseFeed } from '../lib/index.js'

const read = (name) => readFileSync(new URL('./fixtures/' + name, import.meta.url), 'utf8')

test('解析 RSS2：频道元信息', () => {
  const parsed = parseFeed(read('rss2.xml'), 'https://blog.example.com/feed.xml')
  const feed = parsed.feed
  assert.equal(feed.title, '测试博客')
  assert.equal(feed.link, 'https://blog.example.com/')
  assert.equal(feed.language, 'zh-cn')
  assert.equal(feed.generator, 'TestGen 1.0')
  assert.equal(feed.feedType, 'rss')
  assert.equal(feed.entryCount, 2)
  assert.ok(feed.lastBuildDate.startsWith('2026-08-14T09:05:22'))
})

test('解析 RSS2：实体解码/作者/分类/摘要/CDATA', () => {
  const [first] = parseFeed(read('rss2.xml'), 'https://blog.example.com/feed.xml').entries
  assert.equal(first.title, '第一篇：标题 & 符号')
  assert.equal(first.link, 'https://blog.example.com/post/1')
  assert.equal(first.guid, 'https://blog.example.com/post/1')
  assert.equal(first.author, '小明')
  assert.deepEqual(first.categories, ['技术', 'RSS'])
  assert.equal(first.summary, '这是摘要内容 第二段')
  assert.equal(first.enclosure, undefined)
})

test('解析 RSS2：相对链接解析 + 附件 + 带偏移日期', () => {
  const [, second] = parseFeed(read('rss2.xml'), 'https://blog.example.com/feed.xml').entries
  assert.equal(second.link, 'https://blog.example.com/post/2')
  assert.deepEqual(second.enclosure, { url: 'https://cdn.example.com/audio/2.mp3', type: 'audio/mpeg', length: '1234567' })
  assert.equal(second.pubDateRaw, 'Thu, 13 Aug 2026 15:30:00 +0800')
  assert.ok(second.pubDate !== '')
})

test('解析 Atom：元信息与条目', () => {
  const parsed = parseFeed(read('atom.xml'), 'https://atom.example.com/feed.xml')
  const feed = parsed.feed
  assert.equal(feed.feedType, 'atom')
  assert.equal(feed.title, '原子示例源')
  assert.equal(feed.link, 'https://atom.example.com/')
  assert.equal(feed.language, 'zh-CN')
  const [first, second] = parsed.entries
  assert.equal(first.title, 'Atom 条目一')
  assert.equal(first.link, 'https://atom.example.com/entries/1')
  assert.equal(first.author, '小红')
  assert.deepEqual(first.categories, ['生活', '示例'])
  assert.equal(first.summary, 'Atom 摘要')
  assert.equal(second.guid, 'https://atom.example.com/entries/2')
  assert.deepEqual(second.enclosure, { url: 'https://cdn.example.com/video/2.mp4', type: 'video/mp4', length: '999' })
  assert.equal(second.summary, '正文内容')
})

test('解析 RSS 1.0（RDF）', () => {
  const parsed = parseFeed(read('rdf.xml'), 'https://rdf.example.com/feed.xml')
  assert.equal(parsed.feed.feedType, 'rdf')
  assert.equal(parsed.feed.title, 'RDF 示例源')
  const [entry] = parsed.entries
  assert.equal(entry.title, 'RDF 条目')
  assert.equal(entry.author, '小刚')
  assert.ok(entry.pubDate.startsWith('2026-08-14T10:00:00'))
})

test('非订阅源内容抛出中文错误', () => {
  assert.throws(() => parseFeed(read('notafeed.html'), 'https://example.com/'), /不是 RSS\/Atom 订阅源/)
})

test('空内容抛错', () => {
  assert.throws(() => parseFeed('', 'https://example.com/'), /内容为空/)
})

test('截断的 XML 抛错', () => {
  assert.throws(() => parseFeed('<rss><channel>', 'https://example.com/'), /XML 不完整/)
})
