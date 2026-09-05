import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolveConfig } from '../lib/index.js'
import { buildRssTools } from './helpers.mjs'

const read = (name) => readFileSync(new URL('./fixtures/' + name, import.meta.url), 'utf8')

/** 内存版 settings scope，记录 update 补丁。 */
function makeScope(initial = '') {
  let feedsYaml = initial
  const patches = []
  return {
    get: () => ({ feedsYaml }),
    update: async (patch) => { patches.push(patch); feedsYaml = patch.feedsYaml ?? feedsYaml },
    patches,
    value: () => feedsYaml,
  }
}

/** 假 fetch：返回固定文本，可模拟网络错误与非 200。 */
function fakeFetch(text, options = {}) {
  return async () => {
    if (options.failWith) throw options.failWith
    return new Response(text, {
      status: options.status ?? 200,
      headers: { 'content-type': options.contentType ?? 'application/rss+xml' },
    })
  }
}

const cfg = resolveConfig({ timeoutMs: 5000 })

test('构建 7 个工具且名字正确', () => {
  const tools = buildRssTools(cfg, makeScope())
  assert.deepEqual(tools.map((t) => t.name).sort(), ['rss_add', 'rss_check', 'rss_fetch', 'rss_health', 'rss_list', 'rss_opml_export', 'rss_opml_import', 'rss_remove', 'rss_search'])
})

test('每个工具的 parameters 是编译好的 object JSON Schema，输出含 render', () => {
  for (const tool of buildRssTools(cfg, makeScope())) {
    assert.equal(tool.parameters.type, 'object')
    assert.equal(typeof tool.parameters.properties, 'object')
    assert.equal(tool.output.schema.type, 'object')
    assert.equal(tool.output.schema.additionalProperties, true)
    assert.equal(typeof tool.output.render, 'function')
    assert.equal(typeof tool.execute, 'function')
  }
})

test('rss_add 的 url 为必填', () => {
  const add = buildRssTools(cfg, makeScope()).find((t) => t.name === 'rss_add')
  assert.ok(add.parameters.required.includes('url'))
})

test('rss_list 空订阅返回 count 0 且 render 有文本', async () => {
  const list = buildRssTools(cfg, makeScope()).find((t) => t.name === 'rss_list')
  const value = await list.execute({})
  assert.deepEqual(value, { count: 0, feeds: [] })
  const blocks = list.output.render({}, value)
  assert.equal(blocks.length, 1)
  assert.match(blocks[0].text, /共订阅 0 个订阅源/)
})

test('rss_add 抓取校验并持久化（无 name 时用源标题）', async () => {
  const scope = makeScope()
  const fetch = fakeFetch(read('rss2.xml'))
  const add = buildRssTools(cfg, scope, fetch).find((t) => t.name === 'rss_add')
  const value = await add.execute({ url: 'https://blog.example.com/feed.xml', category: '技术' })
  assert.equal(value.existed, false)
  assert.equal(value.added.name, '测试博客')
  assert.equal(value.added.category, '技术')
  assert.equal(value.count, 1)
  assert.equal(value.feedType, 'rss')
  assert.match(scope.value(), /测试博客/)
})

test('rss_add 同 url 重复添加只更新', async () => {
  const scope = makeScope()
  const fetch = fakeFetch(read('rss2.xml'))
  const tools = buildRssTools(cfg, scope, fetch)
  const add = tools.find((t) => t.name === 'rss_add')
  await add.execute({ url: 'https://blog.example.com/feed.xml' })
  const value = await add.execute({ url: 'https://blog.example.com/feed.xml', name: '自定义名' })
  assert.equal(value.existed, true)
  assert.equal(value.count, 1)
  assert.equal(value.added.name, '自定义名')
})

test('rss_add 抓取失败抛中文错误（含代理提示）', async () => {
  const scope = makeScope()
  const fetch = fakeFetch('', { failWith: new Error('connect ECONNREFUSED') })
  const add = buildRssTools(cfg, scope, fetch).find((t) => t.name === 'rss_add')
  await assert.rejects(() => add.execute({ url: 'https://blocked.example.com/feed.xml' }), /抓取失败.*proxyUrl/)
})

test('rss_add 地址非法抛中文错误', async () => {
  const add = buildRssTools(cfg, makeScope(), fakeFetch('')).find((t) => t.name === 'rss_add')
  await assert.rejects(() => add.execute({ url: 'ftp://x/feed.xml' }), /http\(s\)/)
})

test('rss_remove 按 name 删除并持久化', async () => {
  const scope = makeScope()
  const fetch = fakeFetch(read('rss2.xml'))
  const tools = buildRssTools(cfg, scope, fetch)
  await tools.find((t) => t.name === 'rss_add').execute({ url: 'https://blog.example.com/feed.xml', name: '要删的' })
  const remove = tools.find((t) => t.name === 'rss_remove')
  const value = await remove.execute({ name: '要删的' })
  assert.equal(value.removed.length, 1)
  assert.equal(value.count, 0)
  assert.equal(scope.value().includes('https://blog.example.com'), false)
})

test('rss_remove 无匹配抛中文错误且不写配置', async () => {
  const scope = makeScope()
  const remove = buildRssTools(cfg, scope).find((t) => t.name === 'rss_remove')
  await assert.rejects(() => remove.execute({ name: '不存在' }), /没有找到匹配/)
  assert.equal(scope.patches.length, 0)
})

test('rss_fetch 按 url 抓取并按 limit 截断', async () => {
  const fetch = fakeFetch(read('rss2.xml'))
  const tools = buildRssTools(cfg, makeScope(), fetch)
  const result = await tools.find((t) => t.name === 'rss_fetch').execute({ url: 'https://blog.example.com/feed.xml', limit: 1 })
  assert.equal(result.entries.length, 1)
  assert.equal(result.truncated, true)
  assert.equal(result.feed.title, '测试博客')
  assert.equal(result.entries[0].title, '第一篇：标题 & 符号')
})

test('rss_fetch 按已订阅 name 解析地址', async () => {
  const scope = makeScope()
  const fetch = fakeFetch(read('rss2.xml'))
  const tools = buildRssTools(cfg, scope, fetch)
  await tools.find((t) => t.name === 'rss_add').execute({ url: 'https://blog.example.com/feed.xml', name: '博客' })
  const value = await tools.find((t) => t.name === 'rss_fetch').execute({ name: '博客' })
  assert.equal(value.feed.entryCount, 2)
})

test('rss_fetch 缺 url 与 name 抛中文错误', async () => {
  const tools = buildRssTools(cfg, makeScope(), fakeFetch(''))
  await assert.rejects(() => tools.find((t) => t.name === 'rss_fetch').execute({}), /url 参数/)
})

test('rss_check 校验返回元信息', async () => {
  const fetch = fakeFetch(read('atom.xml'))
  const check = buildRssTools(cfg, makeScope(), fetch).find((t) => t.name === 'rss_check')
  const value = await check.execute({ url: 'https://atom.example.com/feed.xml' })
  assert.equal(value.ok, true)
  assert.equal(value.feedType, 'atom')
  assert.equal(value.entryCount, 2)
  assert.equal(value.title, '原子示例源')
})

test('rss_check 非订阅源抛中文错误', async () => {
  const fetch = fakeFetch(read('notafeed.html'), { contentType: 'text/html' })
  const check = buildRssTools(cfg, makeScope(), fetch).find((t) => t.name === 'rss_check')
  await assert.rejects(() => check.execute({ url: 'https://example.com/' }), /不是 RSS\/Atom 订阅源/)
})

test('HTTP 非 200 抛中文错误', async () => {
  const fetch = fakeFetch('oops', { status: 404 })
  const check = buildRssTools(cfg, makeScope(), fetch).find((t) => t.name === 'rss_check')
  await assert.rejects(() => check.execute({ url: 'https://example.com/feed.xml' }), /HTTP 404/)
})

test('execute 返回值可 JSON 序列化（无 undefined）', async () => {
  const fetch = fakeFetch(read('rss2.xml'))
  const tools = buildRssTools(cfg, makeScope(), fetch)
  const value = await tools.find((t) => t.name === 'rss_fetch').execute({ url: 'https://blog.example.com/feed.xml' })
  const roundtrip = JSON.parse(JSON.stringify(value))
  assert.deepEqual(roundtrip, value)
})
