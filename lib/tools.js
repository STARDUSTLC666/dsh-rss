/**
 * 九个面向模型的 RSS 工具：list / add / remove / fetch / check / opml_export / opml_import / search / health（fetch 支持增量）。
 * 直接调用 ctx.tools.register 注册【编译好的 JSON Schema】参数与 canonical 输出。
 *
 * @module dsh-rss/tools
 */
import { writeFile } from 'node:fs/promises';
import { addFeed, findFeedsByName, parseFeedsYaml, removeFeed, serializeFeeds } from './feeds.js';
import { buildOpml, importOpmlFeeds, parseOpml } from './opml.js';
import { parseFeed } from './parser.js';
import { createProxyFetch } from './proxy-fetch.js';
const TIMEOUT_MS = 30000;
const PROXY_HINT = '。若该订阅源需要特殊代理（梯子）才能访问，请在 cordis.patch.yml 里给 dsh-rss 配置 proxyUrl（如 http://127.0.0.1:7890）后重启。';
/**
 * 编译作者 DSL 为原始 JSON Schema（正是 defineTool 存为 definition.parameters 的值）。
 * 原生线路会原样下发该值，原始 DSL 会被模型 API 拒绝（schema must be a JSON Schema）。
 */
function compileParameters(spec) {
    const properties = {};
    const required = [];
    for (const [key, prop] of Object.entries(spec)) {
        if (prop?.required === true)
            required.push(key);
        const node = {};
        if (typeof prop?.type === 'string')
            node.type = prop.type;
        if (typeof prop?.description === 'string')
            node.description = prop.description;
        if (prop?.type === 'array' && prop.items !== null && typeof prop.items === 'object') {
            const items = { type: 'string' };
            if (prop.items.type === 'object')
                items.additionalProperties = true;
            node.items = items;
        }
        properties[key] = node;
    }
    return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) };
}
function asRecord(value) {
    return typeof value === 'object' && value !== null ? value : {};
}
function optionalString(args, key) {
    const value = args[key];
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined;
}
function requiredString(args, key, label) {
    const value = optionalString(args, key);
    if (value === undefined) {
        throw new Error(label + '（参数 ' + key + '）为必填，请提供非空字符串。');
    }
    return value;
}
function clampedInteger(args, key, fallback, min, max) {
    const value = args[key];
    if (typeof value !== 'number' || !Number.isInteger(value))
        return fallback;
    return Math.min(max, Math.max(min, value));
}
function assertHttpUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
        throw new Error('订阅源地址必须是 http(s):// 开头的完整地址，例如 https://example.com/feed.xml。');
    }
}
/** 构造默认 fetch：配置了 proxyUrl 时走插件级代理。 */
function makeFetch(cfg) {
    if (cfg.proxyUrl === '')
        return globalThis.fetch;
    return createProxyFetch(cfg.proxyUrl);
}
/**
 * 抓取订阅源 XML：校验地址、限时、限制体积、剥 BOM。
 */
async function fetchFeedXml(url, cfg, fetchImpl) {
    assertHttpUrl(url);
    const fetcher = fetchImpl ?? makeFetch(cfg);
    let response;
    try {
        response = await fetcher(url, {
            headers: {
                'user-agent': cfg.userAgent,
                accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
            },
            redirect: 'follow',
            signal: AbortSignal.timeout(cfg.timeoutMs),
        });
    }
    catch (error) {
        throw new Error('抓取失败：' + (error instanceof Error ? error.message : String(error)) + PROXY_HINT);
    }
    if (!response.ok) {
        throw new Error('抓取失败：服务器返回 HTTP ' + response.status + '。');
    }
    let bytes;
    try {
        bytes = new Uint8Array(await response.arrayBuffer());
    }
    catch (error) {
        throw new Error('读取订阅源内容失败：' + (error instanceof Error ? error.message : String(error)));
    }
    if (bytes.length > cfg.maxBodyBytes) {
        throw new Error('订阅源内容超过 ' + cfg.maxBodyBytes + ' 字节上限，已停止读取。');
    }
    let xml = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    xml = xml.replace(/^\uFEFF/, '');
    return { xml, finalUrl: response.url || url };
}
// ---------- 输出 JSON Schema ----------
const feedItemSchema = {
    type: 'object',
    properties: {
        url: { type: 'string' },
        name: { type: 'string' },
        category: { type: 'string' },
    },
    additionalProperties: true,
};
const entrySchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        link: { type: 'string' },
        guid: { type: 'string' },
        pubDate: { type: 'string' },
        pubDateRaw: { type: 'string' },
        author: { type: 'string' },
        summary: { type: 'string' },
        content: { type: 'string' },
        categories: { type: 'array', items: { type: 'string' } },
        enclosure: {
            type: 'object',
            properties: {
                url: { type: 'string' },
                type: { type: 'string' },
                length: { type: 'string' },
            },
            additionalProperties: true,
        },
    },
    additionalProperties: true,
};
const feedMetaSchema = {
    type: 'object',
    properties: {
        url: { type: 'string' },
        title: { type: 'string' },
        link: { type: 'string' },
        description: { type: 'string' },
        language: { type: 'string' },
        lastBuildDate: { type: 'string' },
        generator: { type: 'string' },
        feedType: { type: 'string' },
        entryCount: { type: 'integer' },
    },
    additionalProperties: true,
};
const listSchema = {
    type: 'object',
    properties: {
        count: { type: 'integer' },
        feeds: { type: 'array', items: feedItemSchema },
    },
    additionalProperties: true,
};
const addSchema = {
    type: 'object',
    properties: {
        added: feedItemSchema,
        existed: { type: 'boolean' },
        count: { type: 'integer' },
        feedTitle: { type: 'string' },
        feedType: { type: 'string' },
    },
    additionalProperties: true,
};
const removeSchema = {
    type: 'object',
    properties: {
        removed: { type: 'array', items: feedItemSchema },
        count: { type: 'integer' },
    },
    additionalProperties: true,
};
const fetchSchema = {
    type: 'object',
    properties: {
        url: { type: 'string' },
        feed: feedMetaSchema,
        entries: { type: 'array', items: entrySchema },
        truncated: { type: 'boolean' },
    },
    additionalProperties: true,
};
const checkSchema = {
    type: 'object',
    properties: {
        ok: { type: 'boolean' },
        url: { type: 'string' },
        title: { type: 'string' },
        feedType: { type: 'string' },
        entryCount: { type: 'integer' },
        description: { type: 'string' },
    },
    additionalProperties: true,
};
const opmlExportSchema = {
    type: 'object',
    properties: {
        opml: { type: 'string' },
        path: { type: 'string' },
        feedCount: { type: 'integer' },
    },
    additionalProperties: true,
};
const opmlImportSchema = {
    type: 'object',
    properties: {
        addedCount: { type: 'integer' },
        existedCount: { type: 'integer' },
        skippedCount: { type: 'integer' },
        totalCount: { type: 'integer' },
        added: { type: 'array', items: feedItemSchema },
        skipped: { type: 'array', items: { type: 'object', additionalProperties: true } },
    },
    additionalProperties: true,
};
// ---------- render 帮助函数 ----------
function feedLabel(feed) {
    const rec = asRecord(feed);
    const url = typeof rec.url === 'string' ? rec.url : '';
    const name = typeof rec.name === 'string' && rec.name !== '' ? rec.name : '';
    const category = typeof rec.category === 'string' && rec.category !== '' ? '，分类：' + rec.category : '';
    return (name !== '' ? name + '（' + url + '）' : url) + category;
}
function renderList(_args, value) {
    const rec = asRecord(value);
    const feeds = Array.isArray(rec.feeds) ? rec.feeds : [];
    const lines = ['共订阅 ' + feeds.length + ' 个订阅源：'];
    for (const feed of feeds)
        lines.push('- ' + feedLabel(feed));
    return [{ type: 'text', text: lines.join('\n') }];
}
function renderAdd(_args, value) {
    const rec = asRecord(value);
    const existed = rec.existed === true;
    const text = existed
        ? '该订阅已存在，已更新其信息：' + feedLabel(rec.added) + '。当前共 ' + String(rec.count) + ' 个订阅源。'
        : '已添加订阅：' + feedLabel(rec.added) + '。当前共 ' + String(rec.count) + ' 个订阅源。';
    return [{ type: 'text', text }];
}
function renderRemove(_args, value) {
    const rec = asRecord(value);
    const removed = Array.isArray(rec.removed) ? rec.removed : [];
    const lines = ['已移除 ' + removed.length + ' 个订阅：'];
    for (const feed of removed)
        lines.push('- ' + feedLabel(feed));
    lines.push('剩余 ' + String(rec.count) + ' 个订阅源。');
    return [{ type: 'text', text: lines.join('\n') }];
}
function renderFetch(_args, value) {
    const rec = asRecord(value);
    const feed = asRecord(rec.feed);
    const entries = Array.isArray(rec.entries) ? rec.entries : [];
    const title = typeof feed.title === 'string' && feed.title !== '' ? feed.title : (typeof rec.url === 'string' ? rec.url : '');
    const feedType = typeof feed.feedType === 'string' ? feed.feedType : '';
    const lines = ['订阅源 ' + title + '（' + feedType + '）：共 ' + String(feed.entryCount) + ' 条，本次返回 ' + entries.length + ' 条。'];
    for (const entry of entries) {
        const item = asRecord(entry);
        const entryTitle = typeof item.title === 'string' && item.title !== '' ? item.title : '(无标题)';
        const pubDate = typeof item.pubDate === 'string' && item.pubDate !== '' ? '（' + item.pubDate + '）' : '';
        const link = typeof item.link === 'string' && item.link !== '' ? ' ' + item.link : '';
        lines.push('- ' + entryTitle + pubDate + link);
    }
    return [{ type: 'text', text: lines.join('\n') }];
}
function renderCheck(_args, value) {
    const rec = asRecord(value);
    const title = typeof rec.title === 'string' && rec.title !== '' ? rec.title : (typeof rec.url === 'string' ? rec.url : '');
    const text = '订阅源可用：' + title + '（' + String(rec.feedType) + '），共 ' + String(rec.entryCount) + ' 条。';
    return [{ type: 'text', text }];
}
function renderOpmlExport(_args, value) {
    const rec = asRecord(value);
    const path = typeof rec.path === 'string' && rec.path !== '' ? '，已写入 ' + rec.path : '';
    return [{ type: 'text', text: '已导出 ' + String(rec.feedCount ?? 0) + ' 个订阅为 OPML' + path + '。' }];
}
function renderOpmlImport(_args, value) {
    const rec = asRecord(value);
    const lines = [
        'OPML 导入完成：新增 ' + String(rec.addedCount ?? 0) + '，已存在 ' + String(rec.existedCount ?? 0) + '，跳过 ' + String(rec.skippedCount ?? 0) + '。当前共 ' + String(rec.totalCount ?? 0) + ' 个订阅源。',
    ];
    const skipped = Array.isArray(rec.skipped) ? rec.skipped : [];
    for (const item of skipped) {
        const row = asRecord(item);
        lines.push('- 跳过：' + String(row.title ?? '') + '（' + String(row.reason ?? '') + '）');
    }
    return [{ type: 'text', text: lines.join('\n') }];
}
const CURSOR_GUID_LIMIT = 200;
/** 条目唯一 id：优先 guid，退回 link，再退回 标题|发布时间。 */
function entryId(entry) {
    const rec = asRecord(entry);
    const guid = typeof rec.guid === 'string' && rec.guid !== '' ? rec.guid : '';
    if (guid !== '')
        return guid;
    const link = typeof rec.link === 'string' && rec.link !== '' ? rec.link : '';
    if (link !== '')
        return link;
    const title = typeof rec.title === 'string' ? rec.title : '';
    const pubDate = typeof rec.pubDate === 'string' ? rec.pubDate : '';
    return title + '|' + pubDate;
}
/** 解析 settings 里的增量游标 JSON，损坏时返回空对象（不阻断功能）。 */
export function parseCursors(json) {
    if (json.trim() === '')
        return {};
    try {
        const value = JSON.parse(json);
        if (typeof value !== 'object' || value === null || Array.isArray(value))
            return {};
        const out = {};
        for (const [url, cur] of Object.entries(value)) {
            const rec = typeof cur === 'object' && cur !== null ? cur : {};
            const guids = Array.isArray(rec.guids) ? rec.guids.filter((g) => typeof g === 'string') : [];
            out[url] = { guids, updatedAt: typeof rec.updatedAt === 'string' ? rec.updatedAt : '' };
        }
        return out;
    }
    catch {
        return {};
    }
}
/** 合并本次抓到的条目 id，截断到上限，返回新游标。 */
export function advanceCursor(prev, entries, now) {
    const known = new Set(prev?.guids ?? []);
    for (const entry of entries)
        known.add(entryId(entry));
    const guids = [...known];
    return { guids: guids.slice(-CURSOR_GUID_LIMIT), updatedAt: now };
}
/** 用游标过滤出未见过的条目（无游标时全部视为新）。 */
export function filterNewEntries(cursor, entries) {
    if (cursor === undefined || cursor.guids.length === 0)
        return entries;
    const known = new Set(cursor.guids);
    return entries.filter((entry) => !known.has(entryId(entry)));
}
// ---------- 搜索辅助 ----------
/** 解析 since 参数为毫秒时间戳，非法时报错。 */
function parseSinceMs(input) {
    if (input === undefined)
        return null;
    const text = input.trim();
    const ms = /^\d{4}-\d{2}-\d{2}$/.test(text) ? Date.parse(text + 'T00:00:00Z') : Date.parse(text);
    if (Number.isNaN(ms)) {
        throw new Error('since 参数不是有效日期，请给形如 2026-08-01 或 2026-08-01T00:00:00Z 的值。');
    }
    return ms;
}
/** 关键词是否命中条目的标题/摘要/正文/作者/分类（不区分大小写）。 */
function entryMatches(entry, queryLower) {
    const rec = asRecord(entry);
    const fields = [];
    for (const key of ['title', 'summary', 'content', 'author']) {
        const value = rec[key];
        if (typeof value === 'string')
            fields.push(value);
    }
    const categories = rec.categories;
    if (Array.isArray(categories)) {
        for (const category of categories) {
            if (typeof category === 'string')
                fields.push(category);
        }
    }
    return fields.some((value) => value.toLowerCase().includes(queryLower));
}
// ---------- 搜索与健康自检输出 Schema ----------
const searchHitSchema = {
    type: 'object',
    properties: {
        feedName: { type: 'string' },
        feedUrl: { type: 'string' },
        title: { type: 'string' },
        link: { type: 'string' },
        pubDate: { type: 'string' },
        summary: { type: 'string' },
    },
    additionalProperties: true,
};
const searchSchema = {
    type: 'object',
    properties: {
        count: { type: 'integer' },
        hits: { type: 'array', items: searchHitSchema },
        failedFeeds: { type: 'array', items: { type: 'object', additionalProperties: true } },
    },
    additionalProperties: true,
};
const healthSchema = {
    type: 'object',
    properties: {
        ok: { type: 'boolean' },
        plugin: { type: 'string' },
        feedCount: { type: 'integer' },
        proxyConfigured: { type: 'boolean' },
        cursorCount: { type: 'integer' },
        parserSelfTest: { type: 'boolean' },
        config: { type: 'object', additionalProperties: true },
    },
    additionalProperties: true,
};
/** rss_search 的渲染。 */
function renderSearch(_args, value) {
    const rec = asRecord(value);
    const hits = Array.isArray(rec.hits) ? rec.hits : [];
    const failed = Array.isArray(rec.failedFeeds) ? rec.failedFeeds : [];
    const lines = ['搜索命中 ' + hits.length + ' 条：'];
    for (const hit of hits) {
        const item = asRecord(hit);
        const title = typeof item.title === 'string' && item.title !== '' ? item.title : '(无标题)';
        const from = typeof item.feedName === 'string' && item.feedName !== '' ? '【' + item.feedName + '】' : '';
        const pubDate = typeof item.pubDate === 'string' && item.pubDate !== '' ? '（' + item.pubDate + '）' : '';
        const link = typeof item.link === 'string' && item.link !== '' ? ' ' + item.link : '';
        lines.push('- ' + from + title + pubDate + link);
    }
    for (const item of failed) {
        const row = asRecord(item);
        lines.push('- 抓取失败 ' + String(row.name ?? row.url ?? '') + '：' + String(row.error ?? ''));
    }
    return [{ type: 'text', text: lines.join('\n') }];
}
/** rss_health 的渲染。 */
function renderHealth(_args, value) {
    const rec = asRecord(value);
    const ok = rec.ok === true;
    const lines = [
        'dsh-rss 自检' + (ok ? '：正常。' : '：发现异常，请查看下方详情。'),
        '- 订阅源数量：' + String(rec.feedCount ?? 0),
        '- 特殊代理（梯子）：' + (rec.proxyConfigured === true ? '已配置' : '未配置'),
        '- 增量游标数量：' + String(rec.cursorCount ?? 0),
        '- 解析器自检：' + (rec.parserSelfTest === true ? '通过' : '失败'),
    ];
    return [{ type: 'text', text: lines.join('\n') }];
}
// ---------- 工具构建 ----------
/**
 * 构建七个工具定义。每个 execute 惰性读取配置与订阅，错误时抛出中文指引。
 * @param config - 已解析配置。
 * @param settingsScope - dsh-rss settings scope（get/update）。
 * @param fetchImpl - 可选注入的 fetch（测试用），缺省按 proxyUrl 构造。
 */
export function buildRssTools(config, settingsScope, fetchImpl) {
    const cfg = config;
    const getFeeds = () => {
        const value = settingsScope.get();
        const yamlText = value !== null && typeof value === 'object' && typeof value.feedsYaml === 'string' ? value.feedsYaml : '';
        return parseFeedsYaml(yamlText);
    };
    const persistFeeds = async (feeds) => {
        try {
            await settingsScope.update({ feedsYaml: serializeFeeds(feeds) });
        }
        catch (error) {
            throw new Error('写入订阅配置失败（可能已被其他会话修改，请重试）：' + (error instanceof Error ? error.message : String(error)));
        }
    };
    const rssList = {
        name: 'rss_list',
        description: '列出已订阅的 RSS/Atom 源（存在 settings 的 dsh-rss.feedsYaml 里，可用 rss_add / rss_remove 管理）。返回每个订阅的 url、name、category 与总数。',
        parameters: compileParameters({}),
        output: {
            schema: listSchema,
            render: renderList,
        },
        async execute(rawArgs) {
            const feeds = getFeeds();
            return { count: feeds.length, feeds };
        },
        timeoutMs: TIMEOUT_MS,
    };
    const rssAdd = {
        name: 'rss_add',
        description: '添加一个 RSS/Atom 订阅源（会先抓取校验该地址是否可用）。url 必填；name 缺省时用订阅源自身的标题；category 可选。同一 url 重复添加时只更新 name/category。添加结果持久化到 settings，重启后仍在。',
        parameters: compileParameters({
            url: { type: 'string', required: true, description: '订阅源地址（http(s):// 开头，必填）。' },
            name: { type: 'string', description: '显示名（可选，缺省用订阅源标题）。' },
            category: { type: 'string', description: '分类标签（可选）。' },
        }),
        output: {
            schema: addSchema,
            render: renderAdd,
        },
        async execute(rawArgs) {
            const args = asRecord(rawArgs);
            const url = requiredString(args, 'url', '订阅源地址');
            assertHttpUrl(url);
            const name = optionalString(args, 'name') ?? '';
            const category = optionalString(args, 'category') ?? '';
            const { xml, finalUrl } = await fetchFeedXml(url, cfg, fetchImpl);
            const parsed = parseFeed(xml, finalUrl);
            const effectiveName = name !== '' ? name : parsed.feed.title;
            const { feeds, added, existed } = addFeed(getFeeds(), url, effectiveName, category);
            await persistFeeds(feeds);
            return { added, existed, count: feeds.length, feedTitle: parsed.feed.title, feedType: parsed.feed.feedType };
        },
        timeoutMs: TIMEOUT_MS,
    };
    const rssRemove = {
        name: 'rss_remove',
        description: '删除已订阅的 RSS/Atom 源。url 与 name 至少给一个：url 精确匹配（不区分大小写），name 匹配所有同名订阅。删除结果持久化到 settings。',
        parameters: compileParameters({
            url: { type: 'string', description: '要删除的订阅源地址（可选，与 name 至少给一个）。' },
            name: { type: 'string', description: '要删除的订阅显示名（可选，与 url 至少给一个；同名全部删除）。' },
        }),
        output: {
            schema: removeSchema,
            render: renderRemove,
        },
        async execute(rawArgs) {
            const args = asRecord(rawArgs);
            const { feeds, removed } = removeFeed(getFeeds(), optionalString(args, 'url'), optionalString(args, 'name'));
            await persistFeeds(feeds);
            return { removed, count: feeds.length };
        },
        timeoutMs: TIMEOUT_MS,
    };
    const readCursorsJson = () => {
        const value = settingsScope.get();
        return value !== null && typeof value === 'object' && typeof value.cursorsJson === 'string' ? value.cursorsJson : '';
    };
    const persistCursors = async (cursors) => {
        try {
            await settingsScope.update({ cursorsJson: JSON.stringify(cursors) });
        }
        catch (error) {
            throw new Error('写入增量游标失败（可能已被其他会话修改，请重试）：' + (error instanceof Error ? error.message : String(error)));
        }
    };
    const rssFetch = {
        name: 'rss_fetch',
        description: '抓取并解析一个 RSS/Atom 订阅源，返回源信息与最新条目（标题、链接、guid、发布时间、作者、摘要、分类、附件）。url 与 name 至少给一个：name 查已订阅源（同名多个时需改用 url），url 直接抓取任意地址。limit 控制返回条数（1-100，默认 20），超过部分以 truncated=true 提示。incremental=true 时启用增量模式：只返回上次抓取以来的新条目（按条目 id 去重，游标持久化在 settings），适合定时巡检省 token。',
        parameters: compileParameters({
            url: { type: 'string', description: '订阅源地址（可选，与 name 至少给一个）。' },
            name: { type: 'string', description: '已订阅源的名字（可选，可用 rss_list 查看）。' },
            limit: { type: 'integer', description: '返回条数，1-100，默认 20。' },
            incremental: { type: 'boolean', description: '增量模式：只返回上次抓取后的新条目（默认 false）。' },
        }),
        output: {
            schema: fetchSchema,
            render: renderFetch,
        },
        async execute(rawArgs) {
            const args = asRecord(rawArgs);
            let url = optionalString(args, 'url');
            const name = optionalString(args, 'name');
            if (url === undefined) {
                if (name === undefined) {
                    throw new Error('rss_fetch 需要 url 参数（订阅源地址），或 name 参数（已订阅源的名字）。');
                }
                const matches = findFeedsByName(getFeeds(), name);
                if (matches.length === 0) {
                    throw new Error('没有找到名为 ' + name + ' 的订阅。可用 rss_list 查看已订阅源，或直接给 url 参数。');
                }
                if (matches.length > 1) {
                    throw new Error('有 ' + matches.length + ' 个同名订阅，请改用 url 参数指定。');
                }
                url = matches[0].url;
            }
            assertHttpUrl(url);
            const limit = clampedInteger(args, 'limit', 20, 1, 100);
            const incremental = args.incremental === true;
            const { xml, finalUrl } = await fetchFeedXml(url, cfg, fetchImpl);
            const parsed = parseFeed(xml, finalUrl);
            if (!incremental) {
                const entries = parsed.entries.slice(0, limit);
                return { url: finalUrl, feed: parsed.feed, entries, truncated: parsed.entries.length > limit };
            }
            const cursors = parseCursors(readCursorsJson());
            const fresh = filterNewEntries(cursors[url], parsed.entries);
            cursors[url] = advanceCursor(cursors[url], parsed.entries, new Date().toISOString());
            await persistCursors(cursors);
            const entries = fresh.slice(0, limit);
            return { url: finalUrl, feed: parsed.feed, entries, truncated: fresh.length > limit, incremental: true, newCount: fresh.length };
        },
        timeoutMs: TIMEOUT_MS,
    };
    const rssCheck = {
        name: 'rss_check',
        description: '校验一个地址是否为可解析的 RSS/Atom 订阅源（不修改订阅列表）。返回 ok、源标题、类型与条目数，供添加订阅前检查。',
        parameters: compileParameters({
            url: { type: 'string', required: true, description: '要校验的订阅源地址（必填）。' },
        }),
        output: {
            schema: checkSchema,
            render: renderCheck,
        },
        async execute(rawArgs) {
            const args = asRecord(rawArgs);
            const url = requiredString(args, 'url', '订阅源地址');
            assertHttpUrl(url);
            const { xml, finalUrl } = await fetchFeedXml(url, cfg, fetchImpl);
            const parsed = parseFeed(xml, finalUrl);
            return {
                ok: true,
                url: finalUrl,
                title: parsed.feed.title,
                feedType: parsed.feed.feedType,
                entryCount: parsed.entries.length,
                description: parsed.feed.description,
            };
        },
        timeoutMs: TIMEOUT_MS,
    };
    const rssOpmlExport = {
        name: 'rss_opml_export',
        description: '把当前订阅列表导出为 OPML 2.0 文本（可直接导入 Feedly / Inoreader / NetNewsWire 等阅读器）。path 可选：提供时同时写入工作区文件。',
        parameters: compileParameters({
            path: { type: 'string', description: '可选输出文件路径（相对当前工作区）。缺省时只返回 OPML 文本。' },
        }),
        output: {
            schema: opmlExportSchema,
            render: renderOpmlExport,
        },
        async execute(rawArgs) {
            const args = asRecord(rawArgs);
            const feeds = getFeeds();
            const opml = buildOpml(feeds);
            const target = optionalString(args, 'path');
            if (target !== undefined) {
                await writeFile(target, opml, 'utf8');
            }
            return { opml, path: target ?? '', feedCount: feeds.length };
        },
        timeoutMs: TIMEOUT_MS,
    };
    const rssOpmlImport = {
        name: 'rss_opml_import',
        description: '从 OPML 2.0 文本批量导入订阅源（与现有订阅按 url 去重，已存在的只更新 name/category；非法 URL 跳过并报告原因）。导入结果持久化到 settings。',
        parameters: compileParameters({
            opml: { type: 'string', required: true, description: 'OPML 2.0 XML 文本（必填，可直接粘贴导出文件的内容）。' },
        }),
        output: {
            schema: opmlImportSchema,
            render: renderOpmlImport,
        },
        async execute(rawArgs) {
            const args = asRecord(rawArgs);
            const opmlText = requiredString(args, 'opml', 'OPML 文本');
            const document = parseOpml(opmlText);
            const outcome = importOpmlFeeds(getFeeds(), document);
            await persistFeeds(outcome.feeds);
            return {
                addedCount: outcome.addedCount,
                existedCount: outcome.existedCount,
                skippedCount: outcome.skippedCount,
                totalCount: outcome.feeds.length,
                added: outcome.added,
                skipped: outcome.skipped,
            };
        },
        timeoutMs: TIMEOUT_MS,
    };
    const rssSearch = {
        name: 'rss_search',
        description: '跨订阅源搜索条目：实时抓取已订阅源，对标题/摘要/正文/作者/分类做不区分大小写的关键词匹配。query 必填；name 或 url 可限定单个订阅；since 过滤发布日期（如 2026-08-01）；limit 控制返回条数（1-50，默认 20）。个别源抓取失败会单独报告，不影响其他源的搜索。',
        parameters: compileParameters({
            query: { type: 'string', required: true, description: '搜索关键词（必填，不区分大小写）。' },
            name: { type: 'string', description: '只搜索这个名字的订阅（可选）。' },
            url: { type: 'string', description: '只搜索这个地址的订阅（可选）。' },
            since: { type: 'string', description: '只要该日期之后发布的条目（可选，如 2026-08-01）。' },
            limit: { type: 'integer', description: '返回条数，1-50，默认 20。' },
        }),
        output: {
            schema: searchSchema,
            render: renderSearch,
        },
        async execute(rawArgs) {
            const args = asRecord(rawArgs);
            const query = requiredString(args, 'query', '搜索关键词').toLowerCase();
            const limit = clampedInteger(args, 'limit', 20, 1, 50);
            const sinceMs = parseSinceMs(optionalString(args, 'since'));
            const urlFilter = optionalString(args, 'url');
            const nameFilter = optionalString(args, 'name');
            let targets = getFeeds();
            if (urlFilter !== undefined)
                targets = targets.filter((feed) => feed.url.toLowerCase() === urlFilter.toLowerCase());
            if (nameFilter !== undefined)
                targets = findFeedsByName(targets, nameFilter);
            if (targets.length === 0) {
                if (urlFilter !== undefined || nameFilter !== undefined) {
                    throw new Error('没有找到匹配的订阅。可用 rss_list 查看订阅列表。');
                }
                throw new Error('当前还没有订阅。请先用 rss_add 添加订阅。');
            }
            const hits = [];
            const failedFeeds = [];
            for (const feed of targets) {
                if (hits.length >= limit)
                    break;
                try {
                    const { xml, finalUrl } = await fetchFeedXml(feed.url, cfg, fetchImpl);
                    const parsed = parseFeed(xml, finalUrl);
                    for (const entry of parsed.entries) {
                        const rec = asRecord(entry);
                        const at = Date.parse(typeof rec.pubDate === 'string' ? rec.pubDate : '');
                        if (sinceMs !== null && !Number.isNaN(at) && at < sinceMs)
                            continue;
                        if (entryMatches(entry, query)) {
                            hits.push({ feedName: feed.name, feedUrl: feed.url, ...rec });
                            if (hits.length >= limit)
                                break;
                        }
                    }
                }
                catch (error) {
                    failedFeeds.push({ url: feed.url, name: feed.name, error: error instanceof Error ? error.message : String(error) });
                }
            }
            return { count: hits.length, hits, failedFeeds };
        },
        timeoutMs: Math.min(300000, Math.max(TIMEOUT_MS, cfg.timeoutMs * 10)),
    };
    const rssHealth = {
        name: 'rss_health',
        description: 'dsh-rss 自检：检查配置有效性、订阅数量、增量游标与解析器自检（不发任何网络请求）。遇到问题时先运行本工具定位。',
        parameters: compileParameters({}),
        output: {
            schema: healthSchema,
            render: renderHealth,
        },
        async execute() {
            const feeds = getFeeds();
            const settingsValue = settingsScope.get();
            const cursorsJson = settingsValue !== null && typeof settingsValue === 'object' && typeof settingsValue.cursorsJson === 'string' ? settingsValue.cursorsJson : '';
            let parserSelfTest = false;
            try {
                const sample = parseFeed('<?xml version="1.0"?><rss version="2.0"><channel><title>selftest</title><item><title>item</title></item></channel></rss>', 'https://selftest.local/');
                parserSelfTest = sample.entries.length === 1 && sample.feed.feedType === 'rss';
            }
            catch {
                parserSelfTest = false;
            }
            return {
                ok: parserSelfTest,
                plugin: 'dsh-rss',
                feedCount: feeds.length,
                proxyConfigured: cfg.proxyUrl !== '',
                cursorCount: Object.keys(parseCursors(cursorsJson)).length,
                parserSelfTest,
                config: { timeoutMs: cfg.timeoutMs, maxBodyBytes: cfg.maxBodyBytes, userAgent: cfg.userAgent },
            };
        },
        timeoutMs: TIMEOUT_MS,
    };
    return [rssList, rssAdd, rssRemove, rssFetch, rssCheck, rssOpmlExport, rssOpmlImport, rssSearch, rssHealth];
}
