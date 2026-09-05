import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, symlink } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { buildRssTools, resolveConfig } from '../lib/index.js'

const scope = { get: () => ({ feedsYaml: '' }), update: async () => {} }
const exportTool = () => buildRssTools(resolveConfig({}), scope).find((tool) => tool.name === 'rss_opml_export')

test('OPML requires a session workspace and rejects absolute/traversing paths', async (t) => {
  const dir = await mkdtemp(join(tmpdir(), 'dsh-rss-workspace-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  const tool = exportTool()
  const exec = { signal: new AbortController().signal, agent: { session: { header: { cwd: dir } } } }
  await assert.rejects(tool.execute({ path: 'out.opml' }), /session cwd/)
  for (const path of [join(dir, 'out.opml'), 'C:\\Windows\\out.opml', '../out.opml']) {
    await assert.rejects(tool.execute({ path }, exec), /绝对路径|不能越过/)
  }
  const result = await tool.execute({ path: 'out.opml' }, exec)
  assert.match(await readFile(result.path, 'utf8'), /<opml/)
})

test('OPML refuses a parent directory linked outside the session workspace', async (t) => {
  const dir = await mkdtemp(join(tmpdir(), 'dsh-rss-links-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  const cwd = join(dir, 'workspace')
  const outside = join(dir, 'outside')
  await mkdir(cwd)
  await mkdir(outside)
  await symlink(outside, join(cwd, 'linked'), process.platform === 'win32' ? 'junction' : 'dir')
  const exec = { signal: new AbortController().signal, agent: { session: { header: { cwd } } } }
  await assert.rejects(exportTool().execute({ path: 'linked/out.opml' }, exec), /符号链接越过/)
})
