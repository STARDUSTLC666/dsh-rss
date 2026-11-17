import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

function createMockEnv({ withHostPrimitives = false, storageThrows = false, initialStyle = null } = {}) {
  const storage = new Map()
  if (initialStyle) storage.set('dsh-stardust:ui-style', initialStyle)
  const windowListeners = new Map()
  const dispatchedEvents = []
  const syncedNodes = new Set()

  class MockCustomEvent {
    constructor(type, init = {}) {
      this.type = type
      this.detail = init.detail
    }
  }

  function makeDomElement(tag, attrs = {}, parent = null) {
    const attributes = new Map(Object.entries(attrs))
    const node = {
      tagName: tag.toUpperCase(),
      parentElement: parent,
      setAttribute(k, v) {
        attributes.set(k, String(v))
        if (k === 'data-dsh-portal-synced') syncedNodes.add(node)
      },
      getAttribute(k) {
        return attributes.has(k) ? attributes.get(k) : null
      },
      hasAttribute(k) {
        return attributes.has(k)
      },
      closest(selector) {
        let cur = node
        while (cur) {
          const role = cur.getAttribute?.('role')
          if (selector.includes('[role="dialog"]') && role === 'dialog') return cur
          if (selector.includes('[role="menu"]') && role === 'menu') return cur
          cur = cur.parentElement
        }
        return null
      },
    }
    return node
  }

  const headStyles = []
  const mockDocument = {
    baseURI: 'http://127.0.0.1:4321/',
    head: {
      appendChild(el) {
        headStyles.push(el)
        return el
      },
    },
    createElement(tag) {
      return makeDomElement(tag)
    },
    querySelector(selector) {
      if (selector.startsWith('style[data-plugin-css=')) {
        return headStyles.find(el => selector.includes(el.getAttribute('data-plugin-css'))) || null
      }
      return null
    },
    querySelectorAll(selector) {
      if (selector === '[data-dsh-portal-synced]') return [...syncedNodes]
      return []
    },
  }

  const mockWindow = {
    CustomEvent: MockCustomEvent,
    document: mockDocument,
    localStorage: {
      getItem(k) {
        if (storageThrows) throw new Error('SecurityError: storage disabled')
        return storage.has(k) ? storage.get(k) : null
      },
      setItem(k, v) {
        if (storageThrows) throw new Error('SecurityError: storage disabled')
        storage.set(k, String(v))
      },
    },
    addEventListener(type, fn) {
      if (!windowListeners.has(type)) windowListeners.set(type, new Set())
      windowListeners.get(type).add(fn)
    },
    removeEventListener(type, fn) {
      windowListeners.get(type)?.delete(fn)
    },
    dispatchEvent(event) {
      dispatchedEvents.push(event)
      for (const fn of windowListeners.get(event.type) || []) fn(event)
      return true
    },
    __ModuleLoader__: {
      load(entry) {
        mockWindow.__loaded = entry
      },
    },
  }

  let stateValues = []
  let stateCursor = 0
  const effects = []
  const cleanups = []
  const React = {
    Fragment: Symbol.for('react.fragment'),
    createElement(type, props, ...children) {
      const flat = children.flat(Infinity).filter(v => v !== null && v !== undefined && v !== false && v !== true)
      return { type, props: { ...(props || {}), children: flat.length <= 1 ? flat[0] : flat }, children: flat }
    },
    cloneElement(el, extraProps, ...children) {
      const nextChildren = children.length ? children.flat(Infinity).filter(v => v !== null && v !== undefined && v !== false && v !== true) : el.children
      return {
        type: el.type,
        props: { ...el.props, ...(extraProps || {}), children: nextChildren },
        children: nextChildren,
      }
    },
    useState(initial) {
      const idx = stateCursor++
      if (!(idx in stateValues)) {
        stateValues[idx] = typeof initial === 'function' ? initial() : initial
      }
      const set = next => {
        stateValues[idx] = typeof next === 'function' ? next(stateValues[idx]) : next
      }
      return [stateValues[idx], set]
    },
    useEffect(fn) {
      effects.push(fn)
    },
    useLayoutEffect(fn) {
      effects.push(fn)
    },
    useRef(initial) {
      return { current: initial }
    },
    useId() {
      return 'rss-uid'
    },
    useMemo(fn) {
      return fn()
    },
  }

  let primitivesRequireCount = 0
  const hostPrimitives = {
    Button: function HostButton(props) { return { type: 'HostButton', props, children: [props.icon, props.children].filter(Boolean) } },
    Input: function HostInput(props) { return { type: 'HostInput', props, children: [props.icon].filter(Boolean) } },
    Checkbox: function HostCheckbox(props) { return { type: 'HostCheckbox', props, children: [] } },
    Switch: function HostSwitch(props) { return { type: 'HostSwitch', props, children: [] } },
    Menu: function HostMenu({ children, ...props }) {
      const extra = Array.isArray(children) ? children : [children]
      return { type: 'HostMenu', props, children: [props.anchor, ...extra].filter(Boolean) }
    },
    Modal: function HostModal({ className, title, children }) {
      return React.createElement('div', { role: 'dialog', 'aria-modal': 'true', 'aria-label': title, className }, children)
    },
  }

  const rawBundle = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
  const instrumented = rawBundle.replace(
    "return { apply, inject: ['slots', 'locale'] };",
    "return { apply, inject: ['slots', 'locale'], probe: { W, Panel, RssFeedBrowser, RssCatalog, RssArticlePreview } };",
  )

  runInNewContext(instrumented, {
    window: mockWindow,
    document: mockDocument,
    CustomEvent: MockCustomEvent,
    URL,
    fetch: async () => ({
      ok: true,
      json: async () => ({ snapshot: { writable: true, revision: 1, feeds: [], catalog: { categories: [], sources: [] } } }),
    }),
  })

  const client = mockWindow.__loaded.factory(name => {
    if (name === 'react') return React
    if (name === '@deepseek-ai/dsh-client-ui-primitives') {
      primitivesRequireCount++
      if (withHostPrimitives) return hostPrimitives
      throw new Error('Host primitives unavailable in standalone test')
    }
    throw new Error('Unexpected module: ' + name)
  })

  const locale = { getSnapshot: () => ({ active: 'zh-CN' }), subscribe: () => () => {} }
  client.apply({
    locale,
    get: key => (key === 'locale' ? locale : undefined),
    effect(fn, label) { if (label?.endsWith(': locale')) return fn() },
    slots: { inject(_n, fn) { fn() }, register() { return () => {} } },
  })

  function renderTree(renderFn) {
    stateCursor = 0
    effects.length = 0
    const vnode = renderFn()
    while (effects.length) {
      const fn = effects.shift()
      const off = fn()
      if (typeof off === 'function') cleanups.push(off)
    }
    return vnode
  }

  function expand(node) {
    if (Array.isArray(node)) return node.map(expand)
    if (!node || typeof node !== 'object') return node
    if (typeof node.type === 'function') {
      return expand(node.type(node.props || {}))
    }
    return {
      ...node,
      props: node.props
        ? Object.fromEntries(
            Object.entries(node.props).map(([k, v]) => [
              k,
              k === 'anchor' || k === 'list' || k === 'detail' || k === 'action' || k === 'footer' || k === 'toolbar'
                ? expand(v)
                : v,
            ]),
          )
        : {},
      children: (node.children || []).map(expand),
    }
  }

  function findAll(node, pred, out = []) {
    if (Array.isArray(node)) { node.forEach(item => findAll(item, pred, out)); return out }
    if (!node || typeof node !== 'object') return out
    if (pred(node)) out.push(node)
    if (node.props) {
      for (const k of ['anchor', 'list', 'detail', 'action', 'footer', 'toolbar', 'icon']) {
        if (node.props[k] && typeof node.props[k] === 'object') findAll(node.props[k], pred, out)
      }
    }
    for (const child of node.children || []) findAll(child, pred, out)
    return out
  }

  return {
    React,
    client,
    storage,
    dispatchedEvents,
    makeDomElement,
    renderTree,
    expand,
    findAll,
    getPrimitivesRequireCount: () => primitivesRequireCount,
    resetState() { stateValues = []; stateCursor = 0 },
    cleanup() { while (cleanups.length) cleanups.pop()() },
  }
}

test('RSS Workbench UI v2 lazily integrates @deepseek-ai/dsh-client-ui-primitives and stamps micro-animation icons', () => {
  const env = createMockEnv({ withHostPrimitives: true })
  assert.equal(env.getPrimitivesRequireCount(), 0, 'must never eagerly require host primitives during load or apply')

  const { W, RssFeedBrowser } = env.client.probe
  const sampleFeed = {
    id: 'feed-1',
    name: 'IT之家',
    url: 'https://www.ithome.com/rss/',
    category: '科技',
    check: { ok: true, entryCount: 10, checkedAt: '2026-11-17T12:00:00Z' },
  }

  const pageTree = env.expand(env.renderTree(() =>
    env.React.createElement(
      W.Page,
      { workbench: true, title: 'RSS 订阅', icon: 'rss' },
      env.React.createElement(RssFeedBrowser, {
        feeds: [sampleFeed],
        filtered: [sampleFeed],
        categories: ['科技'],
        query: '',
        setQuery() {},
        category: '*',
        setCategory() {},
        writable: true,
        busy: '',
        run() {},
        open() {},
      }),
    ),
  ))

  assert.ok(env.getPrimitivesRequireCount() > 0, 'host primitives resolved lazily during render')
  assert.equal(pageTree.type, 'section')
  assert.equal(pageTree.props['data-dsh-style'], 'harness')
  assert.equal(pageTree.props['data-main'], 'true')

  const hostMenus = env.findAll(pageTree, n => n.type === 'HostMenu')
  assert.ok(hostMenus.length >= 2, 'StyleSwitcher and category ChoiceMenu use host Menu')

  const hostInputs = env.findAll(pageTree, n => n.type === 'HostInput')
  assert.ok(hostInputs.length >= 1, 'Search bar uses host Input')

  const icons = env.findAll(pageTree, n => n.type === 'svg' && n.props['data-dsh-icon'])
  const iconNames = new Set(icons.map(n => n.props['data-dsh-icon']))
  assert.ok(iconNames.has('rss'))
  assert.ok(iconNames.has('refresh'))
  assert.ok(iconNames.has('edit'))
  assert.ok(iconNames.has('trash'))
  assert.ok(iconNames.has('down'))
  env.cleanup()
})

test('5-style theme switcher syncs localStorage, dsh-stardust-style events, and portaled Modal dialogs', () => {
  const env = createMockEnv({ withHostPrimitives: false })
  const { W, RssArticlePreview } = env.client.probe

  assert.deepEqual(
    Array.from(W.DSH_STYLES, s => s.id),
    ['harness', 'cream', 'claude', 'pixel8bit', 'mint'],
  )

  // Article preview external link carries data-dsh-icon="external" for diagonal nudge animation
  const previewTree = env.expand(env.React.createElement(RssArticlePreview, {
    value: {
      checkedAt: '2026-11-17T12:00:00Z',
      entries: [{ title: 'DeepSeek Harness 0.2.2', link: 'https://example.com/post', pubDate: '2026-11-17T10:00:00Z' }],
    },
  }))
  const externalIcons = env.findAll(previewTree, n => n.type === 'svg' && n.props['data-dsh-icon'] === 'external')
  assert.equal(externalIcons.length, 1)

  // Simulate portaled dialog outer element and verify createOverlaySyncRef + live style sync
  const outerDialogDom = env.makeDomElement('div', { role: 'dialog' })
  const innerDialogDom = env.makeDomElement('div', {}, outerDialogDom)

  const dialogTree = env.expand(env.renderTree(() =>
    env.React.createElement(W.Dialog, {
      title: '移除这个订阅？',
      tone: 'warn',
      closeLabel: '关闭',
      onClose() {},
    }, env.React.createElement('p', null, '确认移除')),
  ))

  const frameNode = env.findAll(dialogTree, n => n.props?.className === 'dsh-wb-dialog-frame')[0]
  assert.ok(frameNode)
  frameNode.props.ref(innerDialogDom)
  assert.equal(outerDialogDom.getAttribute('data-dsh-style'), 'harness')
  assert.equal(outerDialogDom.getAttribute('data-window-drag-exclude'), '')

  for (const styleId of ['cream', 'claude', 'pixel8bit', 'mint', 'harness']) {
    env.resetState()
    const applied = W.writeDshStyle(styleId)
    assert.equal(applied, styleId)
    assert.equal(env.storage.get('dsh-stardust:ui-style'), styleId)
    assert.equal(outerDialogDom.getAttribute('data-dsh-style'), styleId)
    assert.equal(env.dispatchedEvents.at(-1)?.detail?.style, styleId)

    const page = env.expand(env.renderTree(() =>
      env.React.createElement(W.Page, { workbench: true, title: 'RSS 订阅', icon: 'rss' }, 'content'),
    ))
    assert.equal(page.props['data-dsh-style'], styleId)
  }

  env.cleanup()
})

test('Bundled CSS & client output preserve [data-plugin-update-footer], soft slate dark mode, 8-bit press, and reduced motion', () => {
  const rawBundle = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
  const env = createMockEnv({ withHostPrimitives: false })
  const css = env.client.probe.W.styles

  const cssRules = css.replace(/\/\*[\s\S]*?\*\//g, '')

  assert.match(cssRules, /body\[data-ds-dark-theme\][\s\S]*?#1f232b/i)
  assert.match(cssRules, /body\[data-ds-dark-theme\][\s\S]*?#272c36/i)
  assert.doesNotMatch(cssRules, /#090a0f|#0b0d13|#000000/i)

  for (const preset of ['harness', 'cream', 'claude', 'pixel8bit', 'mint']) {
    assert.ok(cssRules.includes(`[data-dsh-style="${preset}"]`), `missing CSS scope for ${preset}`)
  }
  assert.match(cssRules, /translate:\s*1px 1px/i)
  assert.match(cssRules, /steps\(2,\s*end\)/i)
  assert.match(cssRules, /--dsh-frame-top-clearance/)
  assert.match(cssRules, /--dsh-frame-leading-clearance/)
  assert.match(cssRules, /\[data-window-drag-exclude\]\s*\{\s*-webkit-app-region:\s*no-drag/)
  assert.doesNotMatch(cssRules, /\[data-window-drag-exclude\]\s*\*/)

  for (const icon of ['refresh', 'plus', 'close', 'external', 'link', 'trash', 'down', 'check', 'download']) {
    assert.ok(cssRules.includes(`data-dsh-icon="${icon}"`), `missing icon animation rule for ${icon}`)
  }
  assert.match(cssRules, /@starting-style/)
  assert.match(cssRules, /transition-behavior:\s*allow-discrete/)
  assert.match(cssRules, /overscroll-behavior:\s*contain/)
  assert.match(cssRules, /@media\s*\(prefers-reduced-motion:\s*reduce\)/)

  // Verify build-updates.mjs injected __stardustUpdatesInlinePage & [data-plugin-update-footer]
  assert.ok(rawBundle.includes('data-plugin-update-footer'))
  assert.ok(rawBundle.includes('__stardustUpdatesInlinePage'))
  env.cleanup()
})

test('HostMenuWithStyle portal sync & Cordis 4 ctx.effect unload cleanup work cleanly', async () => {
  const env = createMockEnv({ withHostPrimitives: true })
  const { W } = env.client.probe
  W.writeDshStyle('mint')
  const P = W.primitives()
  const openMenu = env.expand(env.React.createElement(P.Menu, {
    open: true,
    dshStyle: 'mint',
    items: [{ id: 'a', label: 'A' }],
    anchor: env.React.createElement('button', null, 'Open'),
  }))
  const syncSpan = env.findAll(openMenu, n => n.type === 'span' && n.props?.['data-dsh-style'] === 'mint')[0]
  assert.ok(syncSpan, 'HostMenuWithStyle injects hidden portal sync span when open')
  const outerMenuDom = env.makeDomElement('div', { role: 'menu' })
  const innerSpanDom = env.makeDomElement('span', {}, outerMenuDom)
  syncSpan.props.ref(innerSpanDom)
  assert.equal(outerMenuDom.getAttribute('data-dsh-style'), 'mint')
  assert.equal(outerMenuDom.getAttribute('data-window-drag-exclude'), '')
  env.cleanup()

  // Verify Cordis 4 ctx.effect unload disposal on server entry
  const { apply } = await import('../lib/index.js')
  const registered = new Set()
  const effectCleanups = []
  apply({
    settings: { register: () => ({ get: () => ({ feedsYaml: '', cursorsJson: '' }), update: async () => {} }) },
    tools: { register(def) { registered.add(def.name); return () => registered.delete(def.name) } },
    effect(fn) { const off = fn(); if (typeof off === 'function') effectCleanups.push(off) },
    on() { return () => {} },
  }, {})
  assert.ok(registered.size > 0)
  for (const off of effectCleanups) await off()
  assert.equal(registered.size, 0, 'ctx.effect disposer unregisters all RSS tools on Cordis 4 unload')
})
