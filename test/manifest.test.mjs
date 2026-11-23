import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolveConfig } from '../lib/config.js'
import { recommendedSources } from '../lib/catalog.js'

const require = createRequire(import.meta.url)

test('package.json 的 dsh.bundle.patch 指向存在的补丁文件', () => {
  const pkg = require('../package.json')
  assert.equal(pkg.dsh.bundle.patch, './cordis.patch.yml')
  assert.ok(existsSync(new URL('../cordis.patch.yml', import.meta.url)))
})

test('exports 暴露 ./package.json 与 ./cordis.patch.yml', () => {
  const pkg = require('../package.json')
  assert.equal(pkg.exports['./package.json'], './package.json')
  assert.equal(pkg.exports['./cordis.patch.yml'], './cordis.patch.yml')
  assert.equal(pkg.exports['.'].default, './lib/index.js')
})

test('files 白名单包含 lib、cordis.patch.yml、README.md', () => {
  const pkg = require('../package.json')
  assert.ok(pkg.files.includes('lib'))
  assert.ok(pkg.files.includes('cordis.patch.yml'))
  assert.ok(pkg.files.includes('README.md'))
})

test('cordis.patch.yml 插入行名为 dsh-rss', () => {
  const patch = readFileSync(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
  assert.match(patch, /name: 'dsh-rss'/)
  assert.match(patch, /- insert:/)
})

test('名称与版本正确', () => {
  const pkg = require('../package.json')
  assert.equal(pkg.name, 'dsh-rss')
  assert.match(pkg.version, /^\d+\.\d+\.\d+$/)
})

test('默认 User-Agent 版本号与 package.json 一致，且全部推荐源均有中英文简介', () => {
  const pkg = require('../package.json')
  const cfg = resolveConfig({})
  assert.equal(cfg.userAgent, `dsh-rss/${pkg.version} (DeepSeek Harness RSS plugin)`)
  for (const source of recommendedSources) {
    assert.ok(source.description[0].trim().length > 0, `missing zh description for ${source.id}`)
    assert.ok(source.description[1].trim().length > 0, `missing en description for ${source.id}`)
  }
})
