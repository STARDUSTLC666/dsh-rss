import test from 'node:test'
import assert from 'node:assert/strict'
import { apply } from '../lib/index.js'
function host(policy, config = {}) {
  const events = new Map()
  apply({ get: name => name === 'approval' && policy ? { config: { policy } } : undefined,
    settings: { register: () => ({ get: () => ({ feedsYaml: '' }), update: async () => {} }) },
    tools: { register: () => () => {} }, on: (name, fn) => { events.set(name, fn); return () => {} },
  }, config)
  return events.get('tools/pre-execute')
}
test('RSS 文件导出对 never/未知策略给出准确提示，保留下游拒绝', async () => {
  const exec = { name: 'rss_opml_export', arguments: { path: 'subscriptions.opml' } }
  for (const policy of ['never', undefined]) {
    const gate = host(policy), result = await gate(exec, async () => ({ kind: 'allow' }))
    assert.equal(result.kind, 'deny')
    assert.match(result.reason, policy === 'never' ? /never.*opmlWriteApproval=false/s : /无法读取/)
    const denied = { kind: 'deny', reason: 'Host denied' }; assert.equal(await gate(exec, async () => denied), denied)
  }
})
test('RSS 仅返回 OPML 内容不请求写确认；ask 与显式关闭保持原语义', async () => {
  const next = { kind: 'allow' }
  assert.equal(await host('never')({ name: 'rss_opml_export', arguments: {} }, async () => next), next)
  assert.equal((await host('ask')({ name: 'rss_opml_export', arguments: { path: 'a.opml' } }, async () => next)).kind, 'ask')
  assert.equal(host('never', { opmlWriteApproval: false }), undefined)
})
