import modern from '@deepseek-ai/schemastery';
export declare const Config: modern<Schemastery.ObjectS<NoInfer<{
    feedsYaml: modern<string, string, "volatile">;
    cursorsJson: modern<string, string, "volatile">;
    proxyUrl: modern<string, string, "plain">;
    timeoutMs: modern<number, number, "plain">;
    maxBodyBytes: modern<number, number, "plain">;
    userAgent: modern<string, string, "plain">;
    allowPrivateNetwork: modern<boolean, boolean, "plain">;
    opmlWriteApproval: modern<boolean, boolean, "plain">;
    legacySettingsImported: modern<boolean, boolean, "volatile">;
}>>, Schemastery.ObjectT<NoInfer<{
    feedsYaml: modern<string, string, "volatile">;
    cursorsJson: modern<string, string, "volatile">;
    proxyUrl: modern<string, string, "plain">;
    timeoutMs: modern<number, number, "plain">;
    maxBodyBytes: modern<number, number, "plain">;
    userAgent: modern<string, string, "plain">;
    allowPrivateNetwork: modern<boolean, boolean, "plain">;
    opmlWriteApproval: modern<boolean, boolean, "plain">;
    legacySettingsImported: modern<boolean, boolean, "volatile">;
}>>, "plain">;
export declare function liveConfig<T extends object>(config: T): T;
/** 本插件拥有的 settings 文档命名空间。 */
export declare const RSS_SETTINGS_NAMESPACE = "dsh-rss";
/** settings 页形状：目前只有订阅列表（YAML 文本）。 */
export declare const RssSettingsSchema: modern<Schemastery.ObjectS<NoInfer<{
    feedsYaml: modern<string, string, Mode extends "volatile-defined" | "volatile" ? "volatile-defined" : "defined">;
    cursorsJson: modern<string, string, Mode extends "volatile-defined" | "volatile" ? "volatile-defined" : "defined">;
}>>, Schemastery.ObjectT<NoInfer<{
    feedsYaml: modern<string, string, Mode extends "volatile-defined" | "volatile" ? "volatile-defined" : "defined">;
    cursorsJson: modern<string, string, Mode extends "volatile-defined" | "volatile" ? "volatile-defined" : "defined">;
}>>, "plain">;
/** settings 解析后的值。 */
export interface RssSettingsValue {
    feedsYaml: string;
    cursorsJson: string;
}
