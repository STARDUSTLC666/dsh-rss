import type { FetchLike, DnsLookupLike } from './network.js';
import { type SystemProxy } from './system-proxy.js';
export declare function lookupPublicDns(hostname: string, signal: AbortSignal, proxyUrl: string, systemProxy?: SystemProxy, fetchImpl?: FetchLike): Promise<Awaited<ReturnType<DnsLookupLike>>>;
