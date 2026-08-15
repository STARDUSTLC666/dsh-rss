import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { readFileSync } from 'node:fs'
import { buildOpml, importOpmlFeeds, parseOpml } from '../lib/opml.js'
import { parseFeed } from '../lib/parser.js'
import { buildRssTools, resolveConfig } from '../lib/index.js'

const read = (name) => readFileSync(new URL('./fixtures/' + name, import.meta.url), 'utf8')
const cfg = resolveConfig({ timeoutMs: 5000 })

test('RSS content:encoded 进入 entry.content，缺失时省略', () => {
  const parsed = parseFeed(read('rss2.xml'), 'https://blog.example.com/feed.xml')
  assert.equal(parsed.entries[0].content, '这是正文内容')
  assert.equal(parsed.entries[1].content, undefined)
})

test('Atom content 进入 entry.content', () => {
  const parsed = parseFeed(read('atom.xml'), 'https://atom.example.com/feed.xml')
  assert.equal(parsed.entries[1].content, '正文内容')
})

test('OPML 导出/解析往返一致（含分类）', () => {
  const feeds = [
    { url: 'https://a.example.com/feed.xml', name: 'A 源', category: '技术' },
    { url: 'https://b.example.com/atom.xml', name: '', category: '' },
  ]
  const opml = buildOpml(feeds)
  assert.match(opml, /<opml version="2\.0">/)
  const doc = parseOpml(opml)
  assert.equal(doc.outlines.length, 2)
  assert.deepEqual(doc.outlines[0], { name: 'A 源', url: 'https://a.example.com/feed.xml', category: '技术' })
  assert.equal(doc.outlines[1].name, 'https://b.example.com/atom.xml')
})

test('OPML 嵌套分类节点会传给后代', () => {
  const opml = `<?xml version="1.0"?>
<opml version="2.0"><head><title>t</title></head><body>
<outline text="科技">
  <outline text="HN" title="Hacker News" type="rss" xmlUrl="https://hnrss.org/frontpage" />
</outline>
</body></opml>`
  const doc = parseOpml(opml)
  assert.equal(doc.outlines.length, 1)
  assert.deepEqual(doc.outlines[0], { name: 'Hacker News', url: 'https://hnrss.org/frontpage', category: '科技' })
})

test('importOpmlFeeds 按 url 去重并跳过非法项', () => {
  const current = [{ url: 'https://a.example.com/feed.xml', name: '旧名字', category: '' }]
  const doc = parseOpml(`<?xml version="1.0"?><opml version="2.0"><body>
<outline title="A" type="rss" xmlUrl="https://a.example.com/feed.xml" />
<outline title="B" type="rss" xmlUrl="https://b.example.com/feed.xml" />
<outline title="bad" type="rss" xmlUrl="ftp://bad.example.com/feed.xml" />
</body></opml>`)
  const result = importOpmlFeeds(current, doc)
  assert.equal(result.addedCount, 1)
  assert.equal(result.existedCount, 1)
  assert.equal(result.skippedCount, 1)
  assert.equal(result.feeds.length, 2)
  assert.equal(result.skipped[0].reason, 'URL 不是 http(s) 地址')
})

test('rss_opml_export / rss_opml_import 工具链路', async () => {
  const scope = {
    feedsYaml: '- url: https://a.example.com/feed.xml\n  name: A\n  category: 技术\n',
    get() { return { feedsYaml: this.feedsYaml } },
    async update(patch) { this.feedsYaml = patch.feedsYaml ?? this.feedsYaml },
  }
  const tools = buildRssTools(cfg, scope)
  const exported = await tools.find((t) => t.name === 'rss_opml_export').execute({})
  assert.equal(exported.feedCount, 1)
  assert.match(exported.opml, /xmlUrl="https:\/\/a\.example\.com\/feed\.xml"/)

  const imported = await tools.find((t) => t.name === 'rss_opml_import').execute({
    opml: exported.opml.replace('https://a.example.com/feed.xml', 'https://b.example.com/feed.xml'),
  })
  assert.equal(imported.addedCount, 1)
  assert.equal(imported.totalCount, 2)
})

test('rss_opml_export 写文件路径', async () => {
  const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'dsh-rss-opml-'))
  const target = path.join(dir, 'feeds.opml')
  const scope = { feedsYaml: '', get() { return { feedsYaml: this.feedsYaml } }, async update() {} }
  const tools = buildRssTools(cfg, scope)
  const exported = await tools.find((t) => t.name === 'rss_opml_export').execute({ path: target })
  assert.equal(exported.path, target)
  assert.match(await fs.promises.readFile(target, 'utf8'), /<opml version="2\.0">/)
  await fs.promises.rm(dir, { recursive: true, force: true })
})

test('rss_opml_import 空/非法 OPML 抛中文错误', async () => {
  const scope = { feedsYaml: '', get() { return { feedsYaml: this.feedsYaml } }, async update() {} }
  const tools = buildRssTools(cfg, scope)
  await assert.rejects(() => tools.find((t) => t.name === 'rss_opml_import').execute({ opml: '' }), /OPML 文本.*必填/)
  await assert.rejects(() => tools.find((t) => t.name === 'rss_opml_import').execute({ opml: '<html></html>' }), /不是 OPML/)
})
