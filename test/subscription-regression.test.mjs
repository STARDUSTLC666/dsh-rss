import test from 'node:test'
import assert from 'node:assert/strict'
import { importOpmlFeeds, parseOpml } from '../lib/opml.js'
import { parseFeedsYaml } from '../lib/feeds.js'
import { resolveConfig } from '../lib/config.js'
import { buildRssTools } from './helpers.mjs'

test('OPML rejects truncated XML instead of silently importing part of a file', () => {
  assert.throws(() => parseOpml('<opml><body><outline xmlUrl="https://example.com/feed" />'), /OPML.*解析|OPML.*格式/)
})

test('OPML skips incomplete URLs and URLs containing credentials', () => {
  const result = importOpmlFeeds([], { title: '', outlines: [
    { url: 'https://', name: 'broken', category: '' },
    { url: 'https://user:password@example.com/feed', name: 'private', category: '' },
    { url: 'https://example.com/feed', name: 'valid', category: '' },
  ] })
  assert.equal(result.addedCount, 1)
  assert.equal(result.skippedCount, 2)
})

test('concurrent rss_add calls retain both subscriptions', async () => {
  const scope = {
    yaml: '',
    get() { return { feedsYaml: this.yaml } },
    async update(patch) {
      await new Promise(resolve => setTimeout(resolve, 10))
      this.yaml = patch.feedsYaml
    },
  }
  const fetch = async () => new Response('<rss version="2.0"><channel><title>Feed</title></channel></rss>')
  const add = buildRssTools(resolveConfig({}), scope, fetch).find(tool => tool.name === 'rss_add')
  await Promise.all([
    add.execute({ url: 'https://example.com/first' }),
    add.execute({ url: 'https://example.com/second' }),
  ])
  assert.equal(parseFeedsYaml(scope.yaml).length, 2)
})
