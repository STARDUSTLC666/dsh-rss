/**
 * dsh-rss 配置解析：把 cordis.patch.yml 里的行配置解析成强类型配置。
 * 缺失字段给默认值；非法字段抛出带中文指引的错误。
 *
 * @module dsh-rss/config
 */
const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_MAX_BODY_BYTES = 5 * 1024 * 1024;
const DEFAULT_USER_AGENT = 'dsh-rss/0.3.1 (DeepSeek Harness RSS plugin)';
function configRecord(config) {
    if (config === undefined || config === null)
        return {};
    if (typeof config !== 'object' || Array.isArray(config)) {
        throw new Error('dsh-rss config 必须是对象。');
    }
    return config;
}
function optionalString(config, key) {
    const value = config[key];
    if (value === undefined)
        return undefined;
    if (typeof value !== 'string')
        throw new Error(key + ' 必须是字符串。');
    return value;
}
function optionalBoolean(config, key, fallback) {
    const value = config[key];
    if (value === undefined)
        return fallback;
    if (typeof value !== 'boolean')
        throw new Error(key + ' 必须是 true 或 false。');
    return value;
}
/**
 * 解析并校验配置。
 * @param config - 插件行配置（可能为 undefined/null）。
 * @throws 配置值非法时抛出中文错误。
 */
export function resolveConfig(config) {
    const cfg = configRecord(config);
    const proxyUrl = (optionalString(cfg, 'proxyUrl') ?? '').trim();
    if (proxyUrl !== '') {
        try {
            const parsed = new URL(proxyUrl);
            if ((parsed.protocol !== 'http:' && parsed.protocol !== 'https:') || parsed.hostname === '')
                throw new Error();
        }
        catch {
            throw new Error('proxyUrl 必须是有效的 http(s) 地址，例如 http://127.0.0.1:7890。');
        }
    }
    let timeoutMs = DEFAULT_TIMEOUT_MS;
    if (cfg.timeoutMs !== undefined) {
        if (typeof cfg.timeoutMs !== 'number' || !Number.isInteger(cfg.timeoutMs) || cfg.timeoutMs < 1000 || cfg.timeoutMs > 120000) {
            throw new Error('timeoutMs 必须是 1000 到 120000 之间的整数（毫秒），例如 15000。');
        }
        timeoutMs = cfg.timeoutMs;
    }
    let maxBodyBytes = DEFAULT_MAX_BODY_BYTES;
    if (cfg.maxBodyBytes !== undefined) {
        if (typeof cfg.maxBodyBytes !== 'number' || !Number.isInteger(cfg.maxBodyBytes) || cfg.maxBodyBytes < 1024 * 1024 || cfg.maxBodyBytes > 50 * 1024 * 1024) {
            throw new Error('maxBodyBytes 必须是 1048576 到 52428800 之间的整数（字节），例如 5242880。');
        }
        maxBodyBytes = cfg.maxBodyBytes;
    }
    const userAgent = (optionalString(cfg, 'userAgent') ?? DEFAULT_USER_AGENT).trim();
    if (userAgent === '')
        throw new Error('userAgent 不能为空字符串。');
    const feedsYaml = optionalString(cfg, 'feedsYaml') ?? '';
    const allowPrivateNetwork = optionalBoolean(cfg, 'allowPrivateNetwork', false);
    const opmlWriteApproval = optionalBoolean(cfg, 'opmlWriteApproval', true);
    return { proxyUrl, timeoutMs, maxBodyBytes, userAgent, feedsYaml, allowPrivateNetwork, opmlWriteApproval };
}
