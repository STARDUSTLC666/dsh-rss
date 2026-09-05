/** 将 OPML 文件输出约束在工具调用所属的会话工作区。 */
import { lstat, realpath } from 'node:fs/promises'
import { basename, dirname, isAbsolute, relative, resolve, sep, win32 } from 'node:path'
import type { RssToolExecution } from './execution.js'

function isWithin(root: string, target: string): boolean {
  const rel = relative(root, target)
  return rel === '' || (rel !== '..' && !rel.startsWith('..' + sep) && !isAbsolute(rel))
}

/**
 * 把模型给出的 OPML 相对路径约束在本次调用的 session cwd 内。
 * 同时解析父目录的真实路径并拒绝目标符号链接，避免通过链接越界。
 */
export async function resolveOpmlOutputPath(requestedPath: string, exec: RssToolExecution | undefined): Promise<string> {
  if (isAbsolute(requestedPath) || win32.isAbsolute(requestedPath)) {
    throw new Error('OPML 输出 path 必须是相对当前会话工作区的路径，不能使用绝对路径。')
  }
  const sessionCwd = exec?.agent?.session.header.cwd
  if (typeof sessionCwd !== 'string' || sessionCwd.trim() === '') {
    throw new Error('无法确定本次调用的 session cwd，已拒绝写入 OPML 文件。')
  }
  const lexicalRoot = resolve(sessionCwd)
  const lexicalTarget = resolve(lexicalRoot, requestedPath)
  if (!isWithin(lexicalRoot, lexicalTarget)) {
    throw new Error('OPML 输出 path 不能越过当前会话工作区。')
  }
  const canonicalRoot = await realpath(lexicalRoot)
  const canonicalParent = await realpath(dirname(lexicalTarget))
  const canonicalTarget = resolve(canonicalParent, basename(lexicalTarget))
  if (!isWithin(canonicalRoot, canonicalTarget)) {
    throw new Error('OPML 输出 path 通过符号链接越过了当前会话工作区。')
  }
  try {
    const stat = await lstat(lexicalTarget)
    if (stat.isSymbolicLink()) throw new Error('OPML 输出目标不能是符号链接。')
  } catch (error) {
    const code = typeof error === 'object' && error !== null && 'code' in error ? (error as { code?: unknown }).code : undefined
    if (code !== 'ENOENT') throw error
  }
  return canonicalTarget
}
