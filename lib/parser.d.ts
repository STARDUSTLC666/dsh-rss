/** 条目附件（播客等）。 */
export interface RssEnclosure {
    url: string;
    type: string;
    length: string;
}
/** 归一化后的条目。所有字符串字段都有值，categories 恒为数组，enclosure 缺省时省略。 */
export interface RssEntry {
    title: string;
    link: string;
    guid: string;
    pubDate: string;
    pubDateRaw: string;
    author: string;
    summary: string;
    categories: string[];
    /** RSS content:encoded / Atom content 的正文（去标签，最多 20000 字符）；缺失时省略。 */
    content?: string;
    enclosure?: RssEnclosure;
}
/** 订阅源元信息。 */
export interface RssFeedMeta {
    url: string;
    title: string;
    link: string;
    description: string;
    language: string;
    lastBuildDate: string;
    generator: string;
    feedType: 'rss' | 'atom' | 'rdf';
    entryCount: number;
}
/** 解析结果。 */
export interface ParsedFeed {
    feed: RssFeedMeta;
    entries: RssEntry[];
}
/**
 * 解析 XML 文本为归一化结构。
 * @param xmlText - 订阅源 XML 原文。
 * @param url - 订阅源地址（用于解析相对链接）。
 * @throws 内容为空 / XML 非法 / 缺少 feed 根元素时抛中文错误。
 */
export declare function parseFeed(xmlText: string, url: string): ParsedFeed;
