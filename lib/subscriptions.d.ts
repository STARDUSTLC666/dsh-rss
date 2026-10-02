import { type Feed } from './feeds.js';
import type { RssSettingsScope } from './tools.js';
import type { ResolvedRssConfig } from './config.js';
import type { RssToolExecution } from './execution.js';
import { type FetchLike, type DnsLookupLike } from './network.js';
export declare class SubscriptionError extends Error {
    readonly status: number;
    readonly code: string;
    constructor(message: string, status?: number, code?: string);
}
export declare const feedId: (url: string) => string;
export declare function subscriptionSnapshot(scope: RssSettingsScope): {
    feeds: Feed[];
    revision: string;
};
/** Read inside the queue: concurrent tool/UI writes cannot overwrite one another. */
export declare function mutateSubscriptions<T>(scope: RssSettingsScope, mutate: (feeds: Feed[]) => {
    feeds: Feed[];
    value: T;
}, expectedRevision?: string): Promise<T>;
export interface FeedCheck {
    checkedAt: string;
    ok: boolean;
    title?: string;
    entryCount?: number;
    error?: string;
}
export declare function recentFeedChecks(scope: RssSettingsScope): Map<string, FeedCheck>;
/** Same network boundary, parsing and status for tool calls and manual checks. */
export declare function readRssFeed(scope: RssSettingsScope, url: string, config: ResolvedRssConfig, exec?: RssToolExecution, fetchImpl?: FetchLike, lookupImpl?: DnsLookupLike): Promise<{
    parsed: import("./parser.js").ParsedFeed;
    finalUrl: string;
}>;
