/** Authenticated, local settings route; no separate copy of subscription data. */
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { RssSettingsScope } from './tools.js';
import type { ResolvedRssConfig } from './config.js';
import { type FetchLike, type DnsLookupLike } from './network.js';
import { sourceCategories } from './catalog.js';
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
        catalog: {
            categories: readonly [{
                readonly id: "technology";
                readonly name: readonly ["科技资讯", "Technology news"];
            }, {
                readonly id: "research";
                readonly name: readonly ["AI 与科研", "AI and research"];
            }, {
                readonly id: "software";
                readonly name: readonly ["软件更新", "Software updates"];
            }, {
                readonly id: "reading";
                readonly name: readonly ["阅读与博客", "Reading and blogs"];
            }, {
                readonly id: "interests";
                readonly name: readonly ["生活与兴趣", "Life and interests"];
            }];
            sources: {
                subscribed: boolean;
                check: import("./subscriptions.js").FeedCheck | null;
                id: string;
                name: string;
                url: string;
                website: string;
                category: (typeof sourceCategories)[number]["id"];
                language: "zh" | "en";
                description: readonly [string, string];
            }[];
        };
    };
    handle(req: IncomingMessage, res: ServerResponse): Promise<void>;
};
export declare function installRssSettingsWeb(ctx: {
    inject?: Function;
}, backend: ReturnType<typeof createRssSettingsBackend>): void;
