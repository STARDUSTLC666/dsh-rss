/**
 * dsh-rss 配置解析：把 cordis.patch.yml 里的行配置解析成强类型配置。
 * 缺失字段给默认值；非法字段抛出带中文指引的错误。
 *
 * @module dsh-rss/config
 */
/** 插件行配置（cordis.patch.yml 里的 config 段，可缺省）。 */
export interface RssConfig {
    proxyUrl?: string;
    timeoutMs?: number;
    maxBodyBytes?: number;
    userAgent?: string;
    feedsYaml?: string;
    allowPrivateNetwork?: boolean;
    opmlWriteApproval?: boolean;
}
/** 解析后的配置：所有字段都有值。 */
export interface ResolvedRssConfig {
    proxyUrl: string;
    timeoutMs: number;
    maxBodyBytes: number;
    userAgent: string;
    feedsYaml: string;
    allowPrivateNetwork: boolean;
    opmlWriteApproval: boolean;
}
/**
 * 解析并校验配置。
 * @param config - 插件行配置（可能为 undefined/null）。
 * @throws 配置值非法时抛出中文错误。
 */
export declare function resolveConfig(config: RssConfig | undefined | null): ResolvedRssConfig;
