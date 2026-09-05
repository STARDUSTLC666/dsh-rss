/**
 * dsh-rss —— RSS/Atom 订阅工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：把九个面向模型的 RSS 工具注册进宿主进程的工具注册表，
 * 并把订阅列表接入 settings 命名空间（dsh-rss.feedsYaml）。
 *
 * @module dsh-rss
 */

import { resolveConfig, type RssConfig } from './config.js'
import { RSS_SETTINGS_NAMESPACE, RssSettingsSchema } from './settings.js'
import { buildRssTools, type RssSettingsScope, type RssToolDefinition } from './tools.js'

/** cordis 服务注入：apply 里要用 ctx.settings 与 ctx.tools，必须显式声明，否则宿主会抛 cannot get property without inject。 */
export const name = 'rss'
export const inject = ['settings', 'tools']

type RssPreToolDecision =
  | { kind: 'allow' }
  | { kind: 'deny'; reason: string }
  | { kind: 'ask'; reason?: string }

interface RssPendingToolExecution {
  readonly name: string
  readonly arguments: unknown
}

type RssPreExecuteListener = (
  exec: RssPendingToolExecution,
  next: () => Promise<RssPreToolDecision>,
) => Promise<RssPreToolDecision>

/** 插件所需的最小 ctx 面（社区插件不依赖宿主内部类型）。 */
export interface RssPluginContext {
  settings: {
    register(ns: string, schema: unknown, options?: { base?: Record<string, unknown>; applies?: string }): RssSettingsScope
  }
  tools: { register(definition: RssToolDefinition): () => void }
  on(event: 'tools/pre-execute', listener: RssPreExecuteListener): () => void
  on(event: 'dispose', listener: () => void): () => void
}

/**
 * 插件入口：严格解析配置、注册 settings 命名空间、九个 RSS 工具与 OPML 写入审批门。
 * @param ctx - 宿主上下文（至少含 settings.register 与 tools.register）。
 * @param config - 插件配置（可缺省）。
 */
export function apply(ctx: RssPluginContext, config?: RssConfig | null): void {
  const cfg = resolveConfig(config)

  const settingsScope = ctx.settings.register(RSS_SETTINGS_NAMESPACE, RssSettingsSchema, {
    base: { feedsYaml: cfg.feedsYaml },
    applies: 'live',
  })

  const disposers: Array<() => void> = []
  for (const definition of buildRssTools(cfg, settingsScope)) {
    disposers.push(ctx.tools.register(definition))
  }

  if (cfg.opmlWriteApproval) {
    ctx.on('tools/pre-execute', async (exec, next) => {
      if (exec.name !== 'rss_opml_export') return next()
      const args = typeof exec.arguments === 'object' && exec.arguments !== null
        ? exec.arguments as Record<string, unknown>
        : {}
      const path = typeof args.path === 'string' ? args.path.trim() : ''
      if (path === '') return next()
      const safeLabel = path.replace(/[\r\n]/g, ' ').slice(0, 200)
      return { kind: 'ask', reason: '将 RSS 订阅列表导出并写入当前会话工作区文件：' + safeLabel }
    })
  }
  ctx.on('dispose', () => {
    for (const dispose of disposers) dispose()
  })
}

export * from './config.js'
export * from './feeds.js'
export * from './opml.js'
export * from './parser.js'
export * from './proxy-fetch.js'
export * from './settings.js'
export * from './tools.js'
