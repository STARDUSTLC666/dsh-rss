import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveConfig, parseOpml } from '../lib/index.js'
import { buildRssTools } from './helpers.mjs'

function scope() {
  const state = { feedsYaml: '', cursorsJson: '' }
  return { get: () => ({ ...state }), async update(patch) { await new Promise(resolve => setImmediate(resolve)); Object.assign(state, patch) } }
}
const xml = '<rss version="2.0"><channel><title>Audit</title><link>https://example.test/</link><description>Audit</description>' + Array.from({ length: 7 }, (_, i) => '<item><title>条目' + i + '</title><guid>guid-' + i + '</guid><link>https://example.test/' + i + '</link></item>').join('') + '</channel></rss>'

test('增量抓取只消费本次显示的条目，多页读完后才返回空', async () => {
  const fetcher = buildRssTools(resolveConfig({}), scope(), async () => new Response(xml)).find(tool => tool.name === 'rss_fetch')
  const ids = []
  for (let page = 0; page < 4; page++) {
    const result = await fetcher.execute({ url: 'https://example.test/feed', incremental: true, limit: 2 })
    ids.push(...result.entries.map(entry => entry.guid))
  }
  assert.equal(ids.length, 7)
  assert.equal(new Set(ids).size, 7)
  assert.equal((await fetcher.execute({ url: 'https://example.test/feed', incremental: true, limit: 2 })).entries.length, 0)
})

test('并发增量读取串行提交游标，返回页不会重叠，也不丢不同源的游标', async () => {
  const state = scope(), fetcher = buildRssTools(resolveConfig({}), state, async () => new Response(xml)).find(tool => tool.name === 'rss_fetch')
  const [first, second] = await Promise.all([0, 1].map(() => fetcher.execute({ url: 'https://example.test/feed', incremental: true, limit: 2 })))
  assert.equal(new Set([...first.entries, ...second.entries].map(entry => entry.guid)).size, 4)
  await Promise.all(['one', 'two'].map(name => fetcher.execute({ url: 'https://example.test/' + name, incremental: true, limit: 2 })))
  assert.equal(Object.keys(JSON.parse(state.get().cursorsJson)).length, 3)
})

test('OPML 在工具和界面共用的入口限制大小及过深分类', () => {
  assert.throws(() => parseOpml('<opml><body>' + ' '.repeat(1024 * 1024) + '</body></opml>'), /1 MiB/)
  assert.throws(() => parseOpml('<opml><body>' + '<outline text="folder">'.repeat(70) + '<outline xmlUrl="https://example.test/feed" />' + '</outline>'.repeat(70) + '</body></opml>'), /64 层/)
})
