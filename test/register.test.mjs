import { test } from 'node:test'
import assert from 'node:assert/strict'
import { apply, inject } from '../lib/index.js'

/** 构造一个收集工具注册与 dispose 监听的假 ctx。 */
function makeFakeCtx(initialFeedsYaml = '') {
  const registered = []
  const listeners = {}
  let feedsYaml = initialFeedsYaml
  let registeredSettings = null
  const ctx = {
    settings: {
      register(ns, schema, options) {
        registeredSettings = { ns, schema, options }
        return {
          get: () => ({ feedsYaml }),
          update: async (patch) => { feedsYaml = patch.feedsYaml ?? feedsYaml },
        }
      },
    },
    tools: {
      register(definition) {
        registered.push(definition)
        return () => {
          const index = registered.indexOf(definition)
          if (index >= 0) registered.splice(index, 1)
        }
      },
    },
    on(event, listener) {
      (listeners[event] ??= []).push(listener)
      return () => {}
    },
  }
  return { ctx, registered, listeners, getSettings: () => registeredSettings }
}

test('inject 声明 settings 与 tools', () => {
  assert.deepEqual(inject, ['settings', 'tools'])
})

test('apply 注册 7 个工具且名字正确', () => {
  const { ctx, registered } = makeFakeCtx()
  apply(ctx, {})
  assert.equal(registered.length, 7)
  assert.deepEqual(registered.map((t) => t.name).sort(), ['rss_add', 'rss_check', 'rss_fetch', 'rss_list', 'rss_opml_export', 'rss_opml_import', 'rss_remove'])
})

test('apply 注册 settings 命名空间并注入 base feedsYaml', () => {
  const { ctx, getSettings } = makeFakeCtx()
  apply(ctx, { feedsYaml: '- url: https://a.example.com/feed.xml' })
  const reg = getSettings()
  assert.equal(reg.ns, 'dsh-rss')
  assert.equal(reg.options.base.feedsYaml, '- url: https://a.example.com/feed.xml')
  assert.equal(reg.options.applies, 'live')
})

test('apply 在配置缺失/非法时不抛，仅告警', () => {
  const first = makeFakeCtx()
  assert.doesNotThrow(() => apply(first.ctx, {}))
  assert.equal(first.registered.length, 7)
  const second = makeFakeCtx()
  assert.doesNotThrow(() => apply(second.ctx, { timeoutMs: -1 }))
  assert.equal(second.registered.length, 7)
})

test('dispose 触发时卸载全部工具', () => {
  const { ctx, registered, listeners } = makeFakeCtx()
  apply(ctx, {})
  assert.equal(registered.length, 7)
  for (const listener of listeners.dispose ?? []) listener()
  assert.equal(registered.length, 0)
})
