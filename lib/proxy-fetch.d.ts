import type { FetchLike, DnsLookupLike } from './network.js';
/** One request/redirect hop owns its dispatcher until its body has been read. */
export declare function createFeedTransport(url: URL, proxyUrl: string, addresses?: Awaited<ReturnType<DnsLookupLike>>): {
    fetch: FetchLike;
    dispose: () => Promise<void>;
};
/**
 * 构造一个把所有请求路由到 proxyUrl 的 fetch。
 * @param proxyUrl - 如 http://127.0.0.1:7890
 */
export declare function createProxyFetch(proxyUrl: string): typeof globalThis.fetch;
