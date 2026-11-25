import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

function createMockEnv({ withHostPrimitives = false, storageThrows = false, initialStyle = null, onClipboardWrite = null } = {}) {
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
    documentElement: makeDomElement('html'),
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
      if (selector.includes('[data-dsh-portal-synced]')) return [...syncedNodes]
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
  let refValues = []
  let refCursor = 0
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
      const idx = refCursor++
      if (!(idx in refValues)) refValues[idx] = { current: initial }
      return refValues[idx]
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
    AbortController,
    setTimeout,
    clearTimeout,
    navigator: { clipboard: { async writeText(val) { onClipboardWrite?.(val) } } },
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

  function rerenderTree(renderFn) {
    stateCursor = 0
    refCursor = 0
    effects.length = 0
    return expand(renderFn())
  }

  function renderTree(renderFn) {
    const vnode = rerenderTree(renderFn)
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
    mockWindow,
    mockDocument,
    dispatchedEvents,
    makeDomElement,
    renderTree,
    rerenderTree,
    expand,
    findAll,
    getPrimitivesRequireCount: () => primitivesRequireCount,
    resetState() { stateValues = []; stateCursor = 0; refValues = []; refCursor = 0 },
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
  assert.equal(pageTree.props['data-dsh-font'], 'auto')
  assert.equal(pageTree.props['data-main'], 'true')

  const fontTrigger = env.findAll(pageTree, n => n.type === 'HostButton' && String(n.props?.className || '').includes('dsh-font-trigger'))[0]
  assert.ok(fontTrigger, 'renders compact FontSwitcher trigger beside StyleSwitcher')

  const hostMenus = env.findAll(pageTree, n => n.type === 'HostMenu')
  assert.ok(hostMenus.length >= 2, 'StyleSwitcher and FontSwitcher use host Menu in default Zine mode')

  const hostInputs = env.findAll(pageTree, n => n.type === 'HostInput')
  assert.ok(hostInputs.length >= 1, 'Search bar uses host Input')

  const icons = env.findAll(pageTree, n => n.type === 'svg' && n.props['data-dsh-icon'])
  const iconNames = new Set(icons.map(n => n.props['data-dsh-icon']))
  assert.ok(iconNames.has('rss'))
  assert.ok(iconNames.has('refresh'))
  assert.ok(iconNames.has('edit'))
  assert.ok(iconNames.has('trash'))
  assert.ok(iconNames.has('down'))

  // Switch to classic List mode and verify category ChoiceMenu also uses host Menu
  const listToggle = env.findAll(pageTree, n => n.type === 'button' && n.props?.['data-rss-view-toggle'] === 'list')[0]
  assert.ok(listToggle, 'renders compact List view toggle')
  listToggle.props.onClick()
  const listPageTree = env.expand(env.rerenderTree(() =>
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
  const listHostMenus = env.findAll(listPageTree, n => n.type === 'HostMenu')
  assert.ok(listHostMenus.length >= 3, 'StyleSwitcher, FontSwitcher, and category ChoiceMenu use host Menu in List mode')
  env.cleanup()
})

test('13-style theme switcher & 8-font switcher sync localStorage, custom events, and portaled Modal dialogs', () => {
  const env = createMockEnv({ withHostPrimitives: false })
  const { W, RssArticlePreview } = env.client.probe

  assert.deepEqual(
    Array.from(W.DSH_STYLES, s => s.id),
    ['harness', 'cream', 'claude', 'pixel8bit', 'mint', 'glass', 'eink', 'blueprint', 'risograph', 'win98', 'songhui', 'frutiger', 'gazette'],
  )
  assert.equal(W.DSH_DEFAULT_FONT, 'auto')
  assert.deepEqual(
    Array.from(W.DSH_FONTS, f => f.id),
    ['arcade', 'auto', 'songkai', 'fangsong', 'poster', 'retro98', 'serif', 'modern'],
  )

  // Article preview external link carries data-dsh-icon="external" and [data-dsh-serif]
  const previewTree = env.expand(env.React.createElement(RssArticlePreview, {
    value: {
      checkedAt: '2026-11-17T12:00:00Z',
      entries: [{ title: 'DeepSeek Harness 0.2.2', link: 'https://example.com/post', pubDate: '2026-11-17T10:00:00Z' }],
    },
  }))
  const externalIcons = env.findAll(previewTree, n => n.type === 'svg' && n.props['data-dsh-icon'] === 'external')
  assert.equal(externalIcons.length, 1)
  assert.ok(env.findAll(previewTree, n => Object.hasOwn(n.props || {}, 'data-dsh-serif')).length >= 1)

  // Simulate portaled dialog outer element and verify createOverlaySyncRef + live style & font sync
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
  assert.equal(outerDialogDom.getAttribute('data-dsh-font'), 'auto')
  assert.equal(outerDialogDom.getAttribute('data-window-drag-exclude'), '')

  for (const styleId of ['cream', 'claude', 'pixel8bit', 'mint', 'glass', 'eink', 'blueprint', 'risograph', 'win98', 'songhui', 'frutiger', 'gazette', 'harness']) {
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
    assert.equal(page.props['data-dsh-font'], 'auto')
  }

  for (const fontId of ['auto', 'songkai', 'fangsong', 'poster', 'retro98', 'serif', 'modern', 'arcade']) {
    env.resetState()
    const appliedFont = W.writeDshFont(fontId)
    assert.equal(appliedFont, fontId)
    assert.equal(env.storage.get('dsh-stardust:ui-font'), fontId)
    assert.equal(env.mockDocument.documentElement.getAttribute('data-dsh-font'), fontId)
    assert.equal(outerDialogDom.getAttribute('data-dsh-font'), fontId)
    assert.equal(env.dispatchedEvents.at(-1)?.detail?.font, fontId)

    const page = env.expand(env.renderTree(() =>
      env.React.createElement(W.Page, { workbench: true, title: 'RSS 订阅', icon: 'rss' }, 'content'),
    ))
    assert.equal(page.props['data-dsh-font'], fontId)
  }

  env.cleanup()
})

test('Bundled CSS & client output preserve [data-plugin-update-footer], soft slate dark mode, 13 themes, 8 fonts, and v3 primitives', () => {
  const rawBundle = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
  const env = createMockEnv({ withHostPrimitives: false })
  const css = env.client.probe.W.styles

  const cssRules = css.replace(/\/\*[\s\S]*?\*\//g, '')

  assert.match(cssRules, /body\[data-ds-dark-theme\][\s\S]*?#1f232b/i)
  assert.match(cssRules, /body\[data-ds-dark-theme\][\s\S]*?#272c36/i)
  assert.doesNotMatch(cssRules, /#090a0f|#0b0d13|#000000/i)

  for (const preset of ['harness', 'cream', 'claude', 'pixel8bit', 'mint', 'glass', 'eink', 'blueprint', 'risograph', 'win98', 'songhui', 'frutiger', 'gazette']) {
    assert.ok(cssRules.includes(`[data-dsh-style="${preset}"]`), `missing CSS scope for ${preset}`)
  }
  assert.match(cssRules, /#f6f3ec/i, 'gazette newsprint base')
  assert.match(cssRules, /4px double #161514/i, 'gazette masthead double rule')
  assert.match(cssRules, /#9b1c1c/i, 'gazette crimson seal accent')
  assert.match(cssRules, /--dsh-font-display:/)
  assert.match(cssRules, /--dsh-font-body:/)
  assert.match(cssRules, /--dsh-font-mono:/)
  for (const fontId of ['songkai', 'fangsong', 'poster', 'retro98', 'serif', 'arcade', 'modern']) {
    assert.ok(cssRules.includes(`[data-dsh-font="${fontId}"]`), `missing CSS font override for ${fontId}`)
  }
  assert.match(cssRules, /\.dsh-style-switcher/)
  assert.match(cssRules, /\.dsh-font-trigger/)
  assert.match(cssRules, /\.dsh-font-glyph/)
  assert.match(cssRules, /translate:\s*1px 1px/i)
  assert.match(cssRules, /steps\(2,\s*end\)/i)
  assert.match(cssRules, /\.dsh-header/)
  assert.match(cssRules, /\.dsh-tab-indicator/)
  assert.match(cssRules, /\.dsh-split-resizer/)
  assert.match(cssRules, /\.dsh-skeleton/)
  assert.match(cssRules, /\.dsh-row-actions/)
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
  assert.match(cssRules, /\[data-plugin-update-footer\][\s\S]*?min-height:\s*32px/)
  env.cleanup()
})

test('HostMenuWithStyle portal sync & Cordis 4 ctx.effect unload cleanup work cleanly', async () => {
  const env = createMockEnv({ withHostPrimitives: true })
  const { W } = env.client.probe
  W.writeDshStyle('mint')
  W.writeDshFont('songkai')
  const P = W.primitives()
  const openMenu = env.expand(env.React.createElement(P.Menu, {
    open: true,
    dshStyle: 'mint',
    dshFont: 'songkai',
    items: [{ id: 'a', label: 'A' }],
    anchor: env.React.createElement('button', null, 'Open'),
  }))
  const syncSpan = env.findAll(openMenu, n => n.type === 'span' && n.props?.['data-dsh-style'] === 'mint')[0]
  assert.ok(syncSpan, 'HostMenuWithStyle injects hidden portal sync span when open')
  const outerMenuDom = env.makeDomElement('div', { role: 'menu' })
  const innerSpanDom = env.makeDomElement('span', {}, outerMenuDom)
  syncSpan.props.ref(innerSpanDom)
  assert.equal(outerMenuDom.getAttribute('data-dsh-style'), 'mint')
  assert.equal(outerMenuDom.getAttribute('data-dsh-font'), 'songkai')
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

test('My feeds 1-click AI briefing prompts & interactive CoachmarkTour (? 引导, directional arrow, step progression, localStorage done)', async () => {
  const copied = []
  const notices = []
  const env = createMockEnv({ withHostPrimitives: false, onClipboardWrite: val => copied.push(val) })
  const { W, Panel, RssFeedBrowser } = env.client.probe

  // Verify popover + spotlight + directional arrow + 8-bit & reduced-motion CSS rules
  assert.match(W.styles, /\[popover\]:is\(:popover-open,\s*\.\\:popover-open\)\s*\{\s*display:\s*block;\s*\}/)
  assert.match(W.styles, /\.dsh-wb-tour-card\[data-side="bottom"\]\s*>\s*\.dsh-wb-tour-arrow/)
  assert.match(W.styles, /box-shadow:\s*4px 4px 0px #1e2826/)
  assert.match(W.styles, /@media\s*\(prefers-reduced-motion:\s*no-preference\)[\s\S]*?\.dsh-wb-tour-spotlight/)

  // 1) My feeds & feed detail 1-click AI briefing prompts remain intact
  const sampleFeed = {
    id: 'feed-1',
    name: '少数派',
    url: 'https://sspai.com/feed',
    category: '科技',
    check: { ok: true, entryCount: 12, checkedAt: '2026-11-17T12:00:00Z' },
  }
  const renderFeeds = () =>
    env.rerenderTree(() =>
      env.React.createElement(RssFeedBrowser, {
        feeds: [sampleFeed],
        filtered: [sampleFeed],
        categories: ['科技'],
        query: '',
        setQuery() {},
        category: '科技',
        setCategory() {},
        writable: true,
        busy: '',
        run() {},
        open() {},
        setNotice: msg => notices.push(msg),
      }),
    )

  let feedTree = renderFeeds()
  const dailyBtn = env.findAll(feedTree, n => n.type === 'button' && n.props?.['data-copy-prompt'] === '抓取我订阅源的最新文章，按分类生成今日重点简报')[0]
  const feedSpecificBtn = env.findAll(feedTree, n => n.type === 'button' && n.props?.['data-copy-prompt'] === '抓取「少数派」最新更新并提炼 3 条核心结论')[0]
  assert.ok(dailyBtn, 'expected 1-click daily AI briefing prompt button in My feeds')
  assert.ok(feedSpecificBtn, 'expected feed-specific 3-takeaway AI prompt button in feed detail')

  feedSpecificBtn.props.onClick()
  await new Promise(r => setTimeout(r, 10))
  feedTree = renderFeeds()
  assert.deepEqual(copied, ['抓取「少数派」最新更新并提炼 3 条核心结论'])
  assert.equal(notices.length, 1)

  // 2) Panel has zero static <details> workflow guide clutter, exposes ? 引导 trigger, and auto-opens on first visit (280ms) without stealing focus
  env.resetState()
  let panelTree = env.renderTree(() => env.React.createElement(Panel, { workbench: true }))
  assert.equal(env.findAll(panelTree, n => n.type === 'details' && Object.hasOwn(n.props || {}, 'data-rss-workflow-guide')).length, 0, 'static workflow box removed')

  const triggerBtn = env.findAll(panelTree, n => n.type === 'button' && Object.hasOwn(n.props || {}, 'data-tour-trigger'))[0]
  assert.ok(triggerBtn, 'expected topbar ? 引导 trigger button')
  assert.equal(triggerBtn.props['aria-expanded'], false)
  assert.equal(triggerBtn.props['aria-haspopup'], undefined, 'must NOT set aria-haspopup on tour trigger')

  // Wait for 280ms first-visit auto-open timer
  await new Promise(r => setTimeout(r, 310))
  panelTree = env.rerenderTree(() => env.React.createElement(Panel, { workbench: true }))
  let tourDialog = env.findAll(panelTree, n => n.props?.role === 'dialog' && n.props?.['aria-modal'] === 'false')[0]
  assert.ok(tourDialog, 'CoachmarkTour auto-opens after 280ms on first visit')
  const arrow = env.findAll(tourDialog, n => Object.hasOwn(n.props || {}, 'data-tour-arrow'))[0]
  assert.ok(arrow, 'CoachmarkTour renders directional [data-tour-arrow]')

  // Advance through all 5 bespoke steps and verify Step 3 inline AI briefing prompt copy + localStorage 'done' persistence
  assert.equal(tourDialog.props['data-tour-card'], 'zine-strip')
  let nextBtn = env.findAll(tourDialog, n => Object.hasOwn(n.props || {}, 'data-tour-next'))[0]
  nextBtn.props.onClick() // -> step 1 (点击画报卡片 · 原地展开阅读)
  panelTree = env.rerenderTree(() => env.React.createElement(Panel, { workbench: true }))
  tourDialog = env.findAll(panelTree, n => n.props?.role === 'dialog' && n.props?.['aria-modal'] === 'false')[0]
  assert.equal(tourDialog.props['data-tour-card'], 'zine-hero')

  nextBtn = env.findAll(tourDialog, n => Object.hasOwn(n.props || {}, 'data-tour-next'))[0]
  nextBtn.props.onClick() // -> step 2 (一键复制 AI 每日简报与单源提炼指令)
  panelTree = env.rerenderTree(() => env.React.createElement(Panel, { workbench: true }))
  tourDialog = env.findAll(panelTree, n => n.props?.role === 'dialog' && n.props?.['aria-modal'] === 'false')[0]
  assert.equal(tourDialog.props['data-tour-card'], 'ai-briefing')

  const tourPromptBtn = env.findAll(tourDialog, n => n.type === 'button' && n.props?.['data-copy-prompt'] === '汇总我订阅源里今天的重点更新，按主题提炼要点并附上原文链接')[0]
  assert.ok(tourPromptBtn, 'Step 3 exposes inline 1-click AI briefing copy button')
  tourPromptBtn.props.onClick()
  await new Promise(r => setTimeout(r, 10))
  assert.equal(copied.at(-1), '汇总我订阅源里今天的重点更新，按主题提炼要点并附上原文链接')

  nextBtn = env.findAll(tourDialog, n => Object.hasOwn(n.props || {}, 'data-tour-next'))[0]
  nextBtn.props.onClick() // -> step 3 (推荐来源目录、自定义添加与 OPML 迁移)
  panelTree = env.rerenderTree(() => env.React.createElement(Panel, { workbench: true }))
  tourDialog = env.findAll(panelTree, n => n.props?.role === 'dialog' && n.props?.['aria-modal'] === 'false')[0]
  assert.equal(tourDialog.props['data-tour-card'], 'catalog-opml')

  nextBtn = env.findAll(tourDialog, n => Object.hasOwn(n.props || {}, 'data-tour-next'))[0]
  nextBtn.props.onClick() // -> step 4 (13 套工作台风格与 8 套字体搭配)
  panelTree = env.rerenderTree(() => env.React.createElement(Panel, { workbench: true }))
  tourDialog = env.findAll(panelTree, n => n.props?.role === 'dialog' && n.props?.['aria-modal'] === 'false')[0]
  assert.equal(tourDialog.props['data-tour-card'], 'theme-font')

  const doneBtn = env.findAll(tourDialog, n => Object.hasOwn(n.props || {}, 'data-tour-next'))[0]
  doneBtn.props.onClick() // finish tour
  assert.equal(env.storage.get('dsh-rss.tour.v1'), 'done')
  panelTree = env.rerenderTree(() => env.React.createElement(Panel, { workbench: true }))
  assert.equal(env.findAll(panelTree, n => n.props?.role === 'dialog' && n.props?.['aria-modal'] === 'false').length, 0)

  // Manual re-open via ? 引导 works even after 'done' is stored, promotes popover="manual", and focuses [data-tour-next]
  let popoverAttr = null
  let popoverShown = false
  let nextFocused = false
  const reopenTrigger = env.findAll(panelTree, n => n.type === 'button' && Object.hasOwn(n.props || {}, 'data-tour-trigger'))[0]
  reopenTrigger.props.onClick()
  panelTree = env.renderTree(() => env.React.createElement(Panel, { workbench: true }))
  const layerNode = env.findAll(panelTree, n => n.props?.className === 'dsh-wb-tour-layer')[0]
  assert.ok(layerNode)
  assert.equal(layerNode.props['data-dsh-style'], 'harness')
  // Verify computeTourLayout positions card & arrow cleanly around a bounded target
  const layout = W.computeTourLayout({ getBoundingClientRect: () => ({ left: 200, top: 60, width: 120, height: 34 }) }, 'bottom', { offsetWidth: 320, offsetHeight: 190 })
  assert.equal(layout.side, 'bottom')
  assert.ok(layout.spotlight && layout.arrowX >= 18)

  // Direct CoachmarkTour ref verification for popover="manual" (not IDL .popover) & manual focus
  env.resetState()
  const directTour = env.expand(env.React.createElement(W.CoachmarkTour, {
    steps: [{ id: 's1', selector: '#x', side: 'bottom', title: 'T', desc: 'D' }],
    step: 0,
    manual: true,
    style: 'pixel8bit',
    lang: 'en',
  }))
  assert.equal(directTour.props['data-dsh-style'], 'pixel8bit')
  directTour.props.ref.current = {
    setAttribute(k, v) { if (k === 'popover') popoverAttr = v },
    showPopover() { popoverShown = true },
    hidePopover() {},
  }
  const directNext = env.findAll(directTour, n => Object.hasOwn(n.props || {}, 'data-tour-next'))[0]
  directNext.props.ref.current = { focus() { nextFocused = true } }
  env.resetState()
  // Re-run with populated refs in renderTree
  const PopoverHarness = () => {
    const tree = W.CoachmarkTour({
      steps: [{ id: 's1', selector: '#x', side: 'bottom', title: 'T', desc: 'D' }],
      step: 0,
      manual: true,
      style: 'pixel8bit',
      lang: 'en',
    })
    tree.props.ref.current = {
      setAttribute(k, v) { if (k === 'popover') popoverAttr = v },
      showPopover() { popoverShown = true },
      hidePopover() {},
    }
    const nb = env.findAll(env.expand(tree), n => Object.hasOwn(n.props || {}, 'data-tour-next'))[0]
    if (nb?.props?.ref) nb.props.ref.current = { focus() { nextFocused = true } }
    return tree
  }
  env.renderTree(() => env.React.createElement(PopoverHarness))
  assert.equal(popoverAttr, 'manual')
  assert.equal(popoverShown, true)
  assert.equal(nextFocused, true)

  // 3) Transfer tab pairs <label htmlFor> with <input/textarea id>
  env.resetState()
  env.renderTree(() => env.React.createElement(Panel, { workbench: true }))
  await new Promise(r => setTimeout(r, 10))
  panelTree = env.rerenderTree(() => env.React.createElement(Panel, { workbench: true }))
  const transferTab = env.findAll(panelTree, n => n.type === 'button' && n.props?.role === 'tab' && n.props?.id?.endsWith('-tab-transfer'))[0]
  transferTab.props.onClick()
  panelTree = env.rerenderTree(() => env.React.createElement(Panel, { workbench: true }))
  const labelsWithFor = env.findAll(panelTree, n => n.type === 'label' && typeof n.props?.htmlFor === 'string' && n.props.htmlFor.length > 0)
  assert.ok(labelsWithFor.length >= 3)
  for (const lbl of labelsWithFor) {
    assert.ok(env.findAll(panelTree, n => n.props?.id === lbl.props.htmlFor)[0])
  }

  env.cleanup()
})

test('UI v3 unified 48px header, sliding tabs, resizable split pane, shimmer skeletons, serif materiality, and row quick actions', () => {
  const env = createMockEnv({ withHostPrimitives: false })
  const { W, Panel, RssFeedBrowser, RssArticlePreview } = env.client.probe

  // 1. Unified 48px single-row header with inline tabs and shimmer skeleton during initial load
  env.resetState()
  const initialTree = env.renderTree(() => env.React.createElement(Panel, { workbench: true }))
  const header = env.findAll(initialTree, n => n.type === 'header' && Object.hasOwn(n.props || {}, 'data-dsh-header'))[0]
  assert.ok(header, 'renders unified .dsh-header')
  assert.equal(env.findAll(initialTree, n => String(n.props?.className || '').includes('dsh-wb-subtitle')).length, 0, 'subtitle row removed')
  assert.ok(env.findAll(header, n => String(n.props?.className || '').includes('dsh-tab-indicator')).length === 1, 'renders sliding tab indicator')
  assert.ok(env.findAll(initialTree, n => Object.hasOwn(n.props || {}, 'data-dsh-tab-panel')).length === 1, 'renders .dsh-tab-panel')
  assert.ok(env.findAll(initialTree, n => Object.hasOwn(n.props || {}, 'data-dsh-skeleton')).length >= 3, 'renders DshSkeleton during initial loading')

  // 2. Article preview skeleton during preview fetch
  const loadingPreview = env.expand(env.React.createElement(RssArticlePreview, { value: null, loading: true }))
  assert.ok(env.findAll(loadingPreview, n => Object.hasOwn(n.props || {}, 'data-dsh-skeleton')).length >= 3, 'renders DshSkeleton while fetching recent articles')

  // 3. Resizable split pane + row hover quick actions + pixel cursor + [data-dsh-serif]
  const sampleFeed = {
    id: 'feed-1',
    name: '少数派',
    url: 'https://sspai.com/feed',
    category: '科技',
    check: { ok: true, entryCount: 12, checkedAt: '2026-11-17T12:00:00Z' },
  }
  const calls = []
  const opened = []
  const renderBrowser = (busy = '') => env.rerenderTree(() =>
    env.React.createElement(RssFeedBrowser, {
      feeds: [sampleFeed],
      filtered: [sampleFeed],
      categories: ['科技'],
      query: '',
      setQuery() {},
      category: '*',
      setCategory() {},
      writable: true,
      busy,
      run: (act, args) => calls.push([act, args?.id]),
      open: (type, feed) => opened.push([type, feed?.id]),
      setNotice() {},
    }),
  )
  env.resetState()
  let browserTree = env.renderTree(() =>
    env.React.createElement(RssFeedBrowser, {
      feeds: [sampleFeed],
      filtered: [sampleFeed],
      categories: ['科技'],
      query: '',
      setQuery() {},
      category: '*',
      setCategory() {},
      writable: true,
      busy: 'load',
      run: (act, args) => calls.push([act, args?.id]),
      open: (type, feed) => opened.push([type, feed?.id]),
      setNotice() {},
    }),
  )
  assert.ok(env.findAll(browserTree, n => Object.hasOwn(n.props || {}, 'data-dsh-skeleton')).length >= 1, 'renders refresh shimmer skeleton when busy=load')

  // Switch to classic 列表 mode (persists to localStorage) and remount cleanly in mock React
  const listBtn = env.findAll(browserTree, n => n.type === 'button' && n.props?.['data-rss-view-toggle'] === 'list')[0]
  assert.ok(listBtn, 'renders 列表 view toggle button')
  listBtn.props.onClick()
  assert.equal(env.storage.get('dsh-rss:feeds-view-mode'), 'list')
  env.resetState()
  browserTree = renderBrowser()

  const resizer = env.findAll(browserTree, n => n.props?.role === 'separator' && Object.hasOwn(n.props || {}, 'data-dsh-resizer'))[0]
  assert.ok(resizer, 'renders DshSplitResizer separator in List mode')
  assert.equal(resizer.props['aria-valuenow'], 380)
  resizer.props.onKeyDown({ key: 'ArrowLeft', preventDefault() {} })
  browserTree = renderBrowser()
  const updatedResizer = env.findAll(browserTree, n => n.props?.role === 'separator' && Object.hasOwn(n.props || {}, 'data-dsh-resizer'))[0]
  assert.equal(updatedResizer.props['aria-valuenow'], 364)
  assert.equal(env.storage.get('dsh-rss:feeds-split-width'), '364')
  updatedResizer.props.onDoubleClick()
  browserTree = renderBrowser()
  assert.equal(env.storage.get('dsh-rss:feeds-split-width'), '380')

  const quickPreview = env.findAll(browserTree, n => n.type === 'button' && n.props?.['data-rss-quick-action'] === 'preview')[0]
  const quickEdit = env.findAll(browserTree, n => n.type === 'button' && n.props?.['data-rss-quick-action'] === 'edit')[0]
  const quickRemove = env.findAll(browserTree, n => n.type === 'button' && n.props?.['data-rss-quick-action'] === 'remove')[0]
  assert.ok(quickPreview && quickEdit && quickRemove, 'renders row hover quick actions for preview, edit, and remove')
  quickPreview.props.onClick()
  quickEdit.props.onClick()
  quickRemove.props.onClick()
  assert.deepEqual(calls, [['previewFeed', 'feed-1']])
  assert.deepEqual(opened, [['feed', 'feed-1'], ['remove', 'feed-1']])

  assert.ok(env.findAll(browserTree, n => n.props?.className === 'dsh-pixel-cursor').length >= 1, 'renders pixel8bit active cursor')
  assert.ok(env.findAll(browserTree, n => Object.hasOwn(n.props || {}, 'data-dsh-serif')).length >= 2, 'stamps [data-dsh-serif] on feed row & detail title')

  env.cleanup()
})

test('CoachmarkTour measure() safely escapes React.useId() colon selectors without throwing SyntaxError', () => {
  const env = createMockEnv({ withHostPrimitives: false })
  const { W } = env.client.probe
  const queried = []
  let capturedLayout = null
  const fakeTarget = { getBoundingClientRect: () => ({ left: 160, top: 14, width: 96, height: 32 }) }
  const rootRef = {
    current: {
      querySelector(sel) {
        queried.push(sel)
        if (sel.startsWith('#:')) throw new SyntaxError(`Failed to execute 'querySelector': '${sel}' is not a valid selector`)
        if (sel === '[id=":r22:-tabs-tab-catalog"]') return fakeTarget
        return null
      },
    },
  }
  env.renderTree(() =>
    env.React.createElement(W.CoachmarkTour, {
      rootRef,
      steps: [{ id: 'catalog', selector: '#:r22:-tabs-tab-catalog', side: 'bottom', title: 'T', desc: 'D' }],
      step: 0,
      manual: true,
      style: 'gazette',
      font: 'arcade',
      setLayout: layout => { capturedLayout = layout },
    }),
  )
  assert.deepEqual(queried, ['#:r22:-tabs-tab-catalog', '[id=":r22:-tabs-tab-catalog"]'])
  assert.ok(capturedLayout?.spotlight, 'resolves spotlight bounds via escaped [id="..."] selector')
  env.cleanup()
})

test('Editorial Zine Spread default view: asymmetric 12-col layout, category pills, View Transitions morph, reduced-motion fallback & focus routing', async () => {
  const env = createMockEnv({ withHostPrimitives: false })
  const { RssFeedBrowser } = env.client.probe
  const bundle = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')

  // Verify bundled Editorial Zine Spread & View Transition CSS rules
  assert.match(bundle, /grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\)/)
  assert.match(bundle, /grid-column:\s*span 7/)
  assert.match(bundle, /grid-column:\s*span 5/)
  assert.match(bundle, /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/)
  assert.match(bundle, /width:\s*fit-content/)
  assert.match(bundle, /::view-transition-old\(dsh-rss-story-hero\)/)
  assert.match(bundle, /@container dsh-workbench \(max-width:\s*1220px\)/)
  assert.match(bundle, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?::view-transition-group\(\*\)/)

  const sampleFeeds = [
    { id: 'f1', name: '少数派', url: 'https://sspai.com/feed', category: '科技', check: { ok: true, entryCount: 14, checkedAt: '2026-11-22T02:00:00Z' } },
    { id: 'f2', name: '阮一峰的网络日志', url: 'https://www.ruanyifeng.com/blog/atom.xml', category: '工程', check: { ok: true, entryCount: 8, checkedAt: '2026-11-22T01:30:00Z' } },
    { id: 'f3', name: '机核 GCORES', url: 'https://www.gcores.com/rss', category: '文化' },
    { id: 'f4', name: '极客公园', url: 'https://www.geekpark.net/rss', category: '科技' },
    { id: 'f5', name: 'HelloGitHub', url: 'https://hellogithub.com/rss', category: '工程' },
  ]
  let currentCategory = '*'
  let vtCalls = 0
  let finishResolvers = []
  let reducedMotion = false

  env.mockWindow.matchMedia = query => ({ matches: query.includes('prefers-reduced-motion') ? reducedMotion : false })
  env.mockDocument.startViewTransition = cb => {
    vtCalls++
    const updateDone = Promise.resolve(cb())
    const finished = new Promise(resolve => finishResolvers.push(resolve))
    return { updateCallbackDone: updateDone, finished }
  }

  const renderZine = () =>
    env.renderTree(() =>
      env.React.createElement(RssFeedBrowser, {
        feeds: sampleFeeds,
        filtered: currentCategory === '*' ? sampleFeeds : sampleFeeds.filter(f => f.category === currentCategory),
        categories: ['科技', '工程', '文化'],
        query: '',
        setQuery() {},
        category: currentCategory,
        setCategory: next => { currentCategory = next },
        writable: true,
        busy: '',
        run() {},
        open() {},
        setNotice() {},
      }),
    )

  let tree = renderZine()
  // Default landing view is 画报 (Zine), NOT classic left-list split pane
  const zineDesk = env.findAll(tree, n => n.props?.['data-rss-view'] === 'zine')[0]
  assert.ok(zineDesk, 'defaults to Editorial Zine Spread view')
  assert.equal(env.findAll(tree, n => n.props?.role === 'separator' && Object.hasOwn(n.props || {}, 'data-dsh-resizer')).length, 0, 'no split resizer in default Zine mode')

  const zineToggle = env.findAll(tree, n => n.type === 'button' && n.props?.['data-rss-view-toggle'] === 'zine')[0]
  assert.equal(zineToggle.props['aria-pressed'], true)

  // Asymmetric 12-column editorial spread: 1 Hero + 2 stacked Feature Dispatches + 2 Bento Grid cards
  assert.equal(env.findAll(tree, n => n.props?.['data-rss-zine-card'] === 'hero').length, 1)
  assert.equal(env.findAll(tree, n => n.props?.['data-rss-zine-card'] === 'feature').length, 2)
  assert.equal(env.findAll(tree, n => n.props?.['data-rss-zine-card'] === 'bento').length, 2)

  // Attach mock DOM elements to verify viewTransitionName assignment & cleanup + focus routing
  const cardEls = new Map()
  const triggerEls = new Map()
  for (const card of env.findAll(tree, n => n.props?.['data-rss-feed-id'])) {
    const el = { style: { viewTransitionName: '' } }
    cardEls.set(card.props['data-rss-feed-id'], el)
    card.props.ref?.(el)
  }
  for (const trig of env.findAll(tree, n => n.props?.['data-rss-zine-open'])) {
    const el = { focused: false, focus() { this.focused = true } }
    triggerEls.set(trig.props['data-rss-zine-open'], el)
    trig.props.ref?.(el)
  }

  // Click Feature card f2 to expand via startViewTransition
  const openF2 = env.findAll(tree, n => n.props?.['data-rss-zine-open'] === 'f2')[0]
  openF2.props.onClick()
  assert.equal(vtCalls, 1, 'uses document.startViewTransition when expanding a story card')
  assert.equal(cardEls.get('f1').style.viewTransitionName, '', 'non-active card does not get viewTransitionName')

  // Render expanded Reader Sheet, attach heading + sheet refs, verify focus routing & cleanup
  const readerHeadingEl = { focused: false, focus() { this.focused = true } }
  const readerSheetEl = { style: { viewTransitionName: '' } }
  tree = env.rerenderTree(() =>
    env.React.createElement(RssFeedBrowser, {
      feeds: sampleFeeds,
      filtered: sampleFeeds,
      categories: ['科技', '工程', '文化'],
      query: '',
      setQuery() {},
      category: '*',
      setCategory() {},
      writable: true,
      busy: '',
      run() {},
      open() {},
      setNotice() {},
    }),
  )
  const readerSheet = env.findAll(tree, n => n.props?.['data-rss-zine-reader'] === 'f2')[0]
  assert.ok(readerSheet, 'renders centered Editorial Reader Sheet for clicked feed f2')
  assert.equal(readerSheet.props.style?.viewTransitionName, 'dsh-rss-story-hero', 'active Reader Sheet receives hero view-transition-name during morph')
  readerSheet.props.ref.current = readerSheetEl
  const readerHeading = env.findAll(readerSheet, n => n.type === 'h2')[0]
  readerHeading.props.ref.current = readerHeadingEl
  // Flush effect by calling renderZine
  tree = renderZine()
  assert.equal(readerHeadingEl.focused, true, 'programmatically focuses revealed Reader Sheet heading')

  // Resolve view transition finished and confirm cleanup
  finishResolvers.shift()?.()
  await new Promise(r => setTimeout(r, 10))
  tree = renderZine()
  const settledSheet = env.findAll(tree, n => n.props?.['data-rss-zine-reader'] === 'f2')[0]
  assert.equal(settledSheet.props.style?.viewTransitionName, undefined, 'cleans up viewTransitionName in finished.finally()')

  // Click ← 收拢回画报桌 to smoothly reverse morph back and restore focus
  const backBtn = env.findAll(settledSheet, n => n.type === 'button' && Object.hasOwn(n.props || {}, 'data-rss-zine-back'))[0]
  assert.ok(backBtn, 'renders ← 收拢回画报桌 back button')
  backBtn.props.onClick()
  assert.equal(vtCalls, 2, 'uses document.startViewTransition on reverse collapse')
  tree = renderZine()
  assert.equal(env.findAll(tree, n => n.props?.['data-rss-zine-reader']).length, 0, 'collapses back to Editorial Zine Spread')
  const returningCard = env.findAll(tree, n => n.props?.['data-rss-feed-id'] === 'f2')[0]
  assert.equal(returningCard.props.style?.viewTransitionName, 'dsh-rss-story-hero', 'maps hero view-transition-name back to matching card on close')
  assert.equal(triggerEls.get('f2').focused, true, 'restores focus to matching card trigger on collapse')

  finishResolvers.shift()?.()
  await new Promise(r => setTimeout(r, 10))

  // Verify prefers-reduced-motion: reduce bypasses startViewTransition gracefully
  reducedMotion = true
  const openF1 = env.findAll(tree, n => n.props?.['data-rss-zine-open'] === 'f1')[0]
  openF1.props.onClick()
  assert.equal(vtCalls, 2, 'skips startViewTransition when prefers-reduced-motion: reduce is active')
  tree = renderZine()
  assert.ok(env.findAll(tree, n => n.props?.['data-rss-zine-reader'] === 'f1')[0], 'still opens Reader Sheet without View Transitions under reduced motion')

  // Collapse and test category pill filter
  env.findAll(tree, n => n.type === 'button' && Object.hasOwn(n.props || {}, 'data-rss-zine-back'))[0].props.onClick()
  tree = renderZine()
  const techPill = env.findAll(tree, n => n.type === 'button' && n.props?.className === 'rss-zine-cat-pill' && n.children?.[0] === '科技')[0]
  assert.ok(techPill, 'renders dynamic category filter pill')
  techPill.props.onClick()
  assert.equal(currentCategory, '科技')

  env.cleanup()
})
