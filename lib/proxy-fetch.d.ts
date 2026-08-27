/**
 * 构造一个把所有请求路由到 proxyUrl 的 fetch。
 * @param proxyUrl - 如 http://127.0.0.1:7890
 */
export declare function createProxyFetch(proxyUrl: string): typeof globalThis.fetch;
