/**
 * settings 命名空间：订阅列表（feedsYaml）存在这里，供设置页与工具共同读写。
 *
 * @module dsh-rss/settings
 */
import z from 'schemastery'
import modern from '@deepseek-ai/schemastery'

export const Config = modern.object({
  feedsYaml: modern.string().volatile(), cursorsJson: modern.string().volatile(),
  proxyUrl: modern.string(), timeoutMs: modern.number(), maxBodyBytes: modern.number(),
  userAgent: modern.string(), allowPrivateNetwork: modern.boolean(), opmlWriteApproval: modern.boolean(),
  legacySettingsImported: modern.boolean().volatile(),
})

export function liveConfig<T extends object>(config: T): T {
  return new Proxy(config, { get(target, key, receiver) {
    const value: any = Reflect.get(target, key, receiver)
    return value !== null && typeof value === 'object' && typeof value.get === 'function' ? value.get() : value
  } })
}

/** 本插件拥有的 settings 文档命名空间。 */
export const RSS_SETTINGS_NAMESPACE = 'dsh-rss'

/** settings 页形状：目前只有订阅列表（YAML 文本）。 */
export const RssSettingsSchema = z.object({
  feedsYaml: z.string().default(''),
  cursorsJson: z.string().default(''),
})

/** settings 解析后的值。 */
export interface RssSettingsValue {
  feedsYaml: string
  cursorsJson: string
}
