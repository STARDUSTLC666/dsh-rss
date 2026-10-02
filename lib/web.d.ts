/** Authenticated, local settings route; no separate copy of subscription data. */
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { RssSettingsScope } from './tools.js';
import type { ResolvedRssConfig } from './config.js';
import { type FetchLike, type DnsLookupLike } from './network.js';
export declare const RSS_SETTINGS_ROUTE = "/_dsh/dsh-rss/subscriptions";
export declare function createRssSettingsBackend(config: ResolvedRssConfig, scope: RssSettingsScope, options?: {
    writable?: () => boolean;
    fetchImpl?: FetchLike;
    lookupImpl?: DnsLookupLike;
}): {
    snapshot: () => {
        revision: string;
        writable: boolean;
        feeds: {
            id: string;
            check: import("./subscriptions.js").FeedCheck | null;
            url: string;
            name: string;
            category: string;
        }[];
    };
    handle(req: IncomingMessage, res: ServerResponse): Promise<void>;
};
export declare function installRssSettingsWeb(ctx: {
    inject?: Function;
}, backend: ReturnType<typeof createRssSettingsBackend>): void;
