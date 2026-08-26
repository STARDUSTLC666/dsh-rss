/**
 * settings 命名空间：订阅列表（feedsYaml）存在这里，供设置页与工具共同读写。
 *
 * @module dsh-rss/settings
 */
import z from 'schemastery'

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
