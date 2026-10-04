/** Publisher-hosted feeds; browsing this list never contacts their websites. */
export declare const sourceCategories: readonly [{
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
export interface RecommendedSource {
    id: string;
    name: string;
    url: string;
    website: string;
    category: typeof sourceCategories[number]['id'];
    language: 'zh' | 'en';
    description: readonly [string, string];
}
export declare const recommendedSources: readonly RecommendedSource[];
/** Feed-provided links stay text-only or become ordinary HTTP(S) links. */
export declare function articleLink(value: string, base: string): string;
