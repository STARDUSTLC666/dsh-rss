/**
 * 九个面向模型的 RSS 工具：list / add / remove / fetch / check / opml_export / opml_import / search / health（fetch 支持增量）。
 * 直接调用 ctx.tools.register 注册【编译好的 JSON Schema】参数与 canonical 输出。
 *
 * @module dsh-rss/tools
 */
import { type ResolvedRssConfig } from './config.js';
/** 模型可见的内容块。 */
export interface ContentBlock {
    type: 'text';
    text: string;
}
/** 注册给 ctx.tools.register 的原始工具定义（parameters 为编译好的 JSON Schema）。 */
export interface RssToolDefinition {
    name: string;
    description: string;
    parameters: {
        type: 'object';
        properties: Record<string, unknown>;
        required?: string[];
    };
    output: {
        schema: Record<string, unknown>;
        render(args: unknown, value: unknown): ContentBlock[];
    };
    execute(args: unknown, exec: unknown): Promise<unknown>;
    timeoutMs?: number;
}
/** 工具所需的 settings scope 最小面。 */
export interface RssSettingsScope {
    get(): unknown;
    update(patch: Record<string, unknown>): Promise<void>;
}
/** 可注入的 fetch 实现（测试用假 fetch 替换真网络）。 */
export type FetchLike = (url: string, init?: {
    headers?: Record<string, string>;
    redirect?: string;
    signal?: AbortSignal;
}) => Promise<Response>;
/** 单个订阅源的增量游标：已知条目 id 列表与更新时间。 */
export interface FeedCursor {
    guids: string[];
    updatedAt: string;
}
/** 解析 settings 里的增量游标 JSON，损坏时返回空对象（不阻断功能）。 */
export declare function parseCursors(json: string): Record<string, FeedCursor>;
/** 合并本次抓到的条目 id，截断到上限，返回新游标。 */
export declare function advanceCursor(prev: FeedCursor | undefined, entries: unknown[], now: string): FeedCursor;
/** 用游标过滤出未见过的条目（无游标时全部视为新）。 */
export declare function filterNewEntries(cursor: FeedCursor | undefined, entries: unknown[]): unknown[];
/**
 * 构建七个工具定义。每个 execute 惰性读取配置与订阅，错误时抛出中文指引。
 * @param config - 已解析配置。
 * @param settingsScope - dsh-rss settings scope（get/update）。
 * @param fetchImpl - 可选注入的 fetch（测试用），缺省按 proxyUrl 构造。
 */
export declare function buildRssTools(config: ResolvedRssConfig, settingsScope: RssSettingsScope, fetchImpl?: FetchLike): RssToolDefinition[];
