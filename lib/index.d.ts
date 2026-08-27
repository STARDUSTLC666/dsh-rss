/**
 * dsh-rss —— RSS/Atom 订阅工具插件（node 半身，配置走 cordis.patch.yml）。
 *
 * 插件导出 apply(ctx, config)：把七个面向模型的工具（rss_list / rss_add / rss_remove /
 * rss_fetch / rss_check / rss_opml_export / rss_opml_import）注册进宿主进程的工具注册表，并把订阅列表接入 settings
 * 命名空间（dsh-rss.feedsYaml）。配置缺失时插件照常加载，工具在 execute 时才抛出
 * 带中文指引的错误。
 *
 * @module dsh-rss
 */
import { type RssConfig } from './config.js';
import { type RssSettingsScope, type RssToolDefinition } from './tools.js';
/** cordis 服务注入：apply 里要用 ctx.settings 与 ctx.tools，必须显式声明，否则宿主会抛 cannot get property without inject。 */
export declare const name = "rss";
export declare const inject: string[];
/** 插件所需的最小 ctx 面（社区插件不依赖宿主内部类型）。 */
export interface RssPluginContext {
    settings: {
        register(ns: string, schema: unknown, options?: {
            base?: Record<string, unknown>;
            applies?: string;
        }): RssSettingsScope;
    };
    tools: {
        register(definition: RssToolDefinition): () => void;
    };
    on?(event: string, listener: () => void): () => void;
}
/**
 * 插件入口：解析配置、注册 settings 命名空间与五个 RSS 工具。
 * @param ctx - 宿主上下文（至少含 settings.register 与 tools.register）。
 * @param config - 插件配置（可缺省）。
 */
export declare function apply(ctx: RssPluginContext, config?: RssConfig | null): void;
export * from './config.js';
export * from './feeds.js';
export * from './opml.js';
export * from './parser.js';
export * from './proxy-fetch.js';
export * from './settings.js';
export * from './tools.js';
