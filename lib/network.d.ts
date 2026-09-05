import type { ResolvedRssConfig } from './config.js';
import type { RssToolExecution } from './execution.js';
/** 可注入的 fetch 实现（测试用假 fetch 替换真网络）。 */
export type FetchLike = (url: string, init?: {
    headers?: Record<string, string>;
    redirect?: string;
    signal?: AbortSignal;
}) => Promise<Response>;
/** 可注入的 DNS 查询（测试不依赖公网 DNS）。 */
export type DnsLookupLike = (hostname: string) => Promise<readonly {
    address: string;
    family: number;
}[]>;
export declare function assertHttpUrl(url: string): void;
/** 仅允许可公开路由的地址，避免回环、私网、链路本地和保留地址。 */
export declare function isBlockedNetworkAddress(address: string): boolean;
export declare function fetchFeedXml(url: string, cfg: ResolvedRssConfig, exec: RssToolExecution | undefined, fetchImpl?: FetchLike, lookupImpl?: DnsLookupLike): Promise<{
    xml: string;
    finalUrl: string;
}>;
