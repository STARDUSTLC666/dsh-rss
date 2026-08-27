/** 单个订阅。 */
export interface Feed {
    url: string;
    name: string;
    category: string;
}
/**
 * 解析 feedsYaml 为订阅数组。空文本返回空数组；非法 YAML / 缺 url 抛中文错误。
 */
export declare function parseFeedsYaml(text: string): Feed[];
/** 订阅数组序列化回 YAML 文本（带使用说明头）。 */
export declare function serializeFeeds(feeds: Feed[]): string;
/**
 * 添加订阅：按 url（不区分大小写）去重；已存在时合并更新 name/category。
 */
export declare function addFeed(feeds: Feed[], url: string, name: string, category: string): {
    feeds: Feed[];
    added: Feed;
    existed: boolean;
};
/**
 * 删除订阅：url 精确匹配（不区分大小写），或 name 匹配所有同名项（不区分大小写）。
 * 两者都缺或没有匹配项时抛中文错误。
 */
export declare function removeFeed(feeds: Feed[], url?: string, name?: string): {
    feeds: Feed[];
    removed: Feed[];
};
/** 按名字找订阅（不区分大小写）。 */
export declare function findFeedsByName(feeds: Feed[], name: string): Feed[];
