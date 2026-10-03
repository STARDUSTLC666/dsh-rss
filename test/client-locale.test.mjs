import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

test('host labels update before plugin subscribers and error guidance follows UI language', () => {
  let client, definition, active = 'zh'
  const subscribers = new Set()
  const locale = { getSnapshot: () => ({ active }), subscribe(fn) { subscribers.add(fn); return () => subscribers.delete(fn) } }
  const source = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
    .replace("return { apply, inject: ['slots', 'locale'] };", "return { apply, inject: ['slots', 'locale'], probe: { feedError } };")
  runInNewContext(source, {
    window: { __ModuleLoader__: { load({factory}) { client = factory(() => ({})) } } },
  })
  client.apply({
    locale, get: () => locale,
    effect(fn, label) { if (label.endsWith(': locale')) return fn() },
    slots: { inject(_name, fn) { fn() }, register(meta) { definition = meta } },
  })
  assert.equal(definition.label(), "RSS 订阅")
  active = 'en-US'
  // Host settings renders before the plugin's locale callback.
  assert.equal(definition.label(), "RSS subscriptions")
  for (const notify of subscribers) notify()
  const guidance = client.probe.feedError('OPML 内容格式错误', 'invalid')
  assert.ok(guidance); assert.doesNotMatch(guidance, /[\u3400-\u9fff]/)
  assert.match(guidance, /OPML/i)
  active = 'zh'; assert.equal(definition.label(), "RSS 订阅")
  for (const notify of subscribers) notify()
  assert.match(client.probe.feedError('OPML 内容格式错误'), /[\u3400-\u9fff]|HTTP 401/)
})
