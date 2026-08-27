/**
 * OPML 导入 / 导出：把 dsh-rss 的订阅列表与常见 RSS 阅读器的 OPML 2.0 互转。
 *
 * 导入只读取 outline 树中的 xmlUrl / title / text / category 属性，忽略脚本与
 * 未知扩展；URL 必须 http(s)，非法项跳过并报告原因，不中断整个导入。
 *
 * @module dsh-rss/opml
 */
import { type Feed } from './feeds.js';
/** OPML 解析出的一个订阅。 */
export interface OpmlOutline {
    name: string;
    url: string;
    category: string;
}
/** 导入时被跳过的项。 */
export interface OpmlSkipped {
    title: string;
    url: string;
    reason: string;
}
/** OPML 导入结果。 */
export interface OpmlImportResult {
    feeds: Feed[];
    added: Feed[];
    addedCount: number;
    existedCount: number;
    skippedCount: number;
    skipped: OpmlSkipped[];
}
/** OPML 文档解析结果。 */
export interface OpmlDocument {
    title: string;
    outlines: OpmlOutline[];
}
/**
 * 解析 OPML 2.0 文本。没有 xmlUrl 的 outline 当作分类节点，其 text 会传给后代。
 */
export declare function parseOpml(text: string): OpmlDocument;
/** 把订阅列表序列化为 OPML 2.0 文本。 */
export declare function buildOpml(feeds: Feed[]): string;
/** 把 OPML 导入合并进现有订阅（按 url 去重），非法项跳过。 */
export declare function importOpmlFeeds(current: Feed[], document: OpmlDocument): OpmlImportResult;
