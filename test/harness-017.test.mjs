import test from 'node:test'
import assert from 'node:assert/strict'
import { apply, parseFeedsYaml } from '../lib/index.js'

test('0.1.7 subscription tools persist through the current entry and read updated Config values', async () => {
  let values = { feedsYaml: '- url: https://example.com/feed.xml\n  name: Example\n', cursorsJson: '' }
  const tools = new Map()
  const writes = []
  const ctx = {
    fiber: { entry: { options: { id: 'news-feeds' } } },
    settings: { async update(ns, patch) { writes.push({ns,patch}); values = { ...values, ...patch } } },
    tools: { register(t) { tools.set(t.name,t); return () => {} } },
    on() { return () => {} },
  }
  apply(ctx, { feedsYaml: { get: () => values.feedsYaml }, cursorsJson: { get: () => values.cursorsJson } })
  const list = await tools.get('rss_list').execute({}, {})
  assert.match(JSON.stringify(list), /example.com/)
  await tools.get('rss_remove').execute({ url: 'https://example.com/feed.xml' }, {})
  assert.equal(writes[0].ns, 'news-feeds')
  assert.deepEqual(parseFeedsYaml(values.feedsYaml), [])
})
