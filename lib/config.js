/**
 * dsh-rss 配置解析：把 cordis.patch.yml 里的行配置解析成强类型配置。
 * 缺失字段给默认值；非法字段抛出带中文指引的错误。
 *
 * @module dsh-rss/config
 */
const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_MAX_BODY_BYTES = 5 * 1024 * 1024;
const DEFAULT_USER_AGENT = 'dsh-rss/0.3.1 (DeepSeek Harness RSS plugin)';
function optionalString(value) {
    return typeof value === 'string' ? value : undefined;
}
/**
 * 解析并校验配置。
 * @param config - 插件行配置（可能为 undefined/null）。
 * @throws 配置值非法时抛出中文错误。
 */
export function resolveConfig(config) {
    const cfg = config ?? {};
    const proxyUrl = (optionalString(cfg.proxyUrl) ?? '').trim();
    if (proxyUrl !== '' && !/^https?:\/\//i.test(proxyUrl)) {
        throw new Error('proxyUrl 必须是 http(s):// 开头的地址，例如 http://127.0.0.1:7890。');
    }
    let timeoutMs = DEFAULT_TIMEOUT_MS;
    if (cfg.timeoutMs !== undefined) {
        if (typeof cfg.timeoutMs !== 'number' || !Number.isFinite(cfg.timeoutMs) || cfg.timeoutMs <= 0) {
            throw new Error('timeoutMs 必须是大于 0 的数字（毫秒），例如 15000。');
        }
        timeoutMs = Math.min(120000, Math.max(1000, Math.round(cfg.timeoutMs)));
    }
    let maxBodyBytes = DEFAULT_MAX_BODY_BYTES;
    if (cfg.maxBodyBytes !== undefined) {
        if (typeof cfg.maxBodyBytes !== 'number' || !Number.isFinite(cfg.maxBodyBytes) || cfg.maxBodyBytes <= 0) {
            throw new Error('maxBodyBytes 必须是大于 0 的数字（字节），例如 5242880。');
        }
        maxBodyBytes = Math.min(50 * 1024 * 1024, Math.max(1024 * 1024, Math.round(cfg.maxBodyBytes)));
    }
    const userAgent = optionalString(cfg.userAgent) ?? DEFAULT_USER_AGENT;
    const feedsYaml = optionalString(cfg.feedsYaml) ?? '';
    return { proxyUrl, timeoutMs, maxBodyBytes, userAgent, feedsYaml };
}
