/**
 * 推荐来源筛选到空时的出口验收。
 *
 * 这里复用 client-locale.test.mjs 的同一套手法：把 lib/client.js 的 return 语句
 * 临时换成带 probe 的版本，用假 React 直接调用面板组件，不引入 DOM 依赖。
 * 会红的情形：空结果只剩一句「没有匹配项」，用户必须自己回头逐项清空筛选。
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

function loadProbe() {
  let client, definition
  const locale = { getSnapshot: () => ({ active: 'zh' }), subscribe() { return () => {} } }
  const react = {
    createElement(type, props, ...children) { return { type, props: props || {}, children } },
    useState(value) { return [typeof value === 'function' ? value() : value, () => {}] },
    useEffect() {},
    useRef(value) { return { current: value } },
    useId() { return 'probe-id' },
  }
  const source = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
    .replace("return { apply, inject: ['slots', 'locale'] };", "return { apply, inject: ['slots', 'locale'], probe: { RssCatalog, W } };")
  runInNewContext(source, {
    window: { __ModuleLoader__: { load({ factory }) { client = factory(name => {
      if (name === 'react') return react
      throw new Error('Unexpected eager UI dependency: ' + name)
    }) } } },
  })
  client.apply({
    locale, get: () => locale,
    effect(fn, label) { if (label.endsWith(': locale')) return fn() },
    slots: { inject(_name, fn) { fn() }, register(meta) { definition = meta } },
  })
  return client.probe
}

function renderCatalog(overrides) {
  const probe = loadProbe()
  const calls = []
  const props = {
    catalog: { categories: [], sources: [] }, sources: [], query: 'zzz', category: '*', contentLanguage: '*',
    busy: '', writable: true, state: { revision: 1 }, previews: {},
    setQuery: value => calls.push(['query', value]),
    setCategory: value => calls.push(['category', value]),
    setContentLanguage: value => calls.push(['language', value]),
    setPreviews() {}, setNotice() {}, run() {},
    ...overrides,
  }
  const tree = probe.RssCatalog(props)
  const list = tree.props.list
  const empty = (list.children || []).find(child => child && child.type === probe.W.Empty)
  return { probe, tree, empty, calls }
}

test('推荐来源筛到空时有「清空筛选」出口，一键复原筛选', () => {
  const { empty, calls } = renderCatalog({})
  assert.ok(empty, '筛选为空时必须渲染 W.Empty 空状态')
  assert.ok(empty.props.action, '空状态必须给出清空筛选的操作，而不是让用户自己逐项回退')
  empty.props.action.props.onClick()
  assert.deepEqual(calls, [['query', ''], ['category', '*'], ['language', '*']])
})

test('没有任何筛选条件时不显示多余的清空按钮', () => {
  const { empty } = renderCatalog({ query: '', category: '*', contentLanguage: '*' })
  assert.ok(empty, '来源目录为空仍是空状态')
  assert.equal(empty.props.action, null, '没有可清空的筛选时不应出现无效按钮')
})
