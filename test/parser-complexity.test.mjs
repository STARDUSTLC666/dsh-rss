import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { parseFeed } from '../lib/index.js'

test('incomplete nested markup cannot block parsing RSS and Atom content', () => {
  // A separate process bounds regressions even while the parser blocks its event loop.
  // 320 KB of valid XML used to take roughly ten seconds in stripHtml alone.
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', `
    import { parseFeed } from ${JSON.stringify(new URL('../lib/index.js', import.meta.url).href)};
    const text = '&lt;'.repeat(80000);
    const rss = parseFeed('<rss><channel><title>Test</title><description>' + text + '</description><item><title>Entry</title><description>' + text + '</description><content:encoded>' + text + '</content:encoded></item></channel></rss>', 'https://example.invalid/rss');
    const atom = parseFeed('<feed><title>Test</title><subtitle>' + text + '</subtitle><entry><title>Entry</title><summary>' + text + '</summary><content>' + text + '</content></entry></feed>', 'https://example.invalid/atom');
    for (const result of [rss, atom]) {
      if (result.feed.description !== '<'.repeat(500) + '…' || result.entries[0].summary !== '<'.repeat(500) + '…' || result.entries[0].content !== '<'.repeat(20000) + '…') throw Error('content changed');
    }
  `], { timeout: 4000, encoding: 'utf8', windowsHide: true })
  assert.equal(result.error, undefined, result.error?.message)
  assert.equal(result.status, 0, result.stderr)
})

test('normal markup and encoded comparison symbols retain readable text', () => {
  const parsed = parseFeed('<rss><channel><title>Test</title><item><title>Entry</title><description><![CDATA[<p>Price <b>rose</b>&nbsp;today.</p><p>x &lt; 5 &amp; y &gt; 3</p>]]></description></item></channel></rss>', 'https://example.invalid/rss')
  assert.equal(parsed.entries[0].summary, 'Price rose today. x < 5 & y > 3')
})
