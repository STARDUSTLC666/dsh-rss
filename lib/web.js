import { sameFeedUrl } from './feeds.js';
import { assertHttpUrl } from './network.js';
import { buildOpml, parseOpml, importOpmlFeeds } from './opml.js';
import { feedId, subscriptionSnapshot, mutateSubscriptions, recentFeedChecks, readRssFeed, SubscriptionError } from './subscriptions.js';
export const RSS_SETTINGS_ROUTE = '/_dsh/dsh-rss/subscriptions';
// JSON quoting can double the OPML file size; limit the actual text separately.
const MAX_OPML = 1024 * 1024;
const MAX_BODY = MAX_OPML * 2 + 16384;
const loopback = (host) => ['127.0.0.1', 'localhost', '::1', '[::1]', '::ffff:127.0.0.1'].includes(host.toLowerCase());
const record = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const text = (args, key) => typeof args[key] === 'string' ? args[key].trim() : '';
function requestGuard(req) {
    const host = req.headers.host;
    if (!host || !loopback(req.socket.remoteAddress ?? ''))
        throw new SubscriptionError('设置面板仅允许本机访问。', 403, 'local_only');
    let target;
    try {
        target = new URL('http://' + host);
    }
    catch {
        throw new SubscriptionError('无效的请求地址。', 403);
    }
    if (!loopback(target.hostname) || target.username || target.password || target.pathname !== '/' || target.search || target.hash) {
        throw new SubscriptionError('设置面板仅允许本机访问。', 403, 'local_only');
    }
    const protocol = req.socket.encrypted ? 'https:' : 'http:';
    target.protocol = protocol;
    const origin = req.headers.origin;
    if ((req.method === 'POST' && !origin) || (origin !== undefined && origin !== target.origin)) {
        throw new SubscriptionError('请从当前 DSH 设置页面操作。', 403, 'origin');
    }
    if (req.method === 'POST' && !/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] ?? '')) {
        throw new SubscriptionError('请求必须使用 JSON。', 415);
    }
}
function readBody(req, signal) {
    return new Promise((resolve, reject) => {
        let length = 0;
        const chunks = [];
        const cleanup = () => { req.off('data', data); req.off('end', end); req.off('error', error); signal.removeEventListener('abort', abort); };
        const fail = (reason) => { cleanup(); reject(reason); };
        const data = (chunk) => {
            length += chunk.length;
            if (length > MAX_BODY) {
                chunks.length = 0;
                fail(new SubscriptionError('内容超过 1 MiB，请拆分 OPML 文件后重试。', 413));
                req.resume();
            }
            else
                chunks.push(chunk);
        };
        const error = (reason) => fail(reason);
        const abort = () => fail(signal.reason);
        const end = () => {
            cleanup();
            try {
                const value = JSON.parse(Buffer.concat(chunks).toString('utf8'));
                if (!value || typeof value !== 'object' || Array.isArray(value))
                    throw new Error();
                resolve(value);
            }
            catch {
                reject(new SubscriptionError('请求内容不是有效的 JSON。'));
            }
        };
        if (signal.aborted) {
            abort();
            return;
        }
        req.on('data', data);
        req.on('end', end);
        req.on('error', error);
        signal.addEventListener('abort', abort, { once: true });
    });
}
export function createRssSettingsBackend(config, scope, options = {}) {
    const writable = () => options.writable?.() !== false;
    const snapshot = () => {
        const state = subscriptionSnapshot(scope);
        const checks = recentFeedChecks(scope);
        return { revision: state.revision, writable: writable(), feeds: state.feeds.map(feed => ({ ...feed, id: feedId(feed.url), check: checks.get(feed.url) ?? null })) };
    };
    const find = (feeds, id) => {
        const feed = feeds.find(feed => feedId(feed.url) === id);
        if (!feed)
            throw new SubscriptionError('这个订阅已被移除，请刷新列表。', 409, 'conflict');
        return feed;
    };
    const check = (url, signal) => {
        assertHttpUrl(url);
        return readRssFeed(scope, url, config, { signal }, options.fetchImpl, options.lookupImpl);
    };
    const preview = (args) => {
        const opml = text(args, 'opml');
        if (Buffer.byteLength(opml, 'utf8') > MAX_OPML)
            throw new SubscriptionError('OPML 内容超过 1 MiB，请拆分后导入。', 413, 'bodyLarge');
        const state = subscriptionSnapshot(scope);
        const updateExisting = args.updateExisting === true;
        const outcome = importOpmlFeeds(state.feeds, parseOpml(opml), updateExisting);
        // Never return credentials embedded in rejected URLs.
        const skipped = outcome.skipped.map(item => ({ ...item, url: item.url.replace(/(https?:\/\/)[^/@\s]+@/gi, '$1***@') }));
        return { ...outcome, feeds: undefined, skipped, revision: state.revision,
            token: feedId(JSON.stringify([state.revision, opml, updateExisting])) };
    };
    async function dispatch(args, signal) {
        const action = text(args, 'action');
        if (action === 'export')
            return { opml: buildOpml(subscriptionSnapshot(scope).feeds) };
        if (action === 'preview')
            return { preview: preview(args) };
        if (action === 'check') {
            const url = text(args, 'id') ? find(subscriptionSnapshot(scope).feeds, text(args, 'id')).url : text(args, 'url');
            const { parsed } = await check(url, signal);
            return { check: { ok: true, title: parsed.feed.title, entryCount: parsed.entries.length } };
        }
        if (!['add', 'edit', 'remove', 'import'].includes(action))
            throw new SubscriptionError('未知的操作。');
        if (!writable())
            throw new SubscriptionError('当前配置是只读的，无法保存订阅。', 403, 'readonly');
        const revision = text(args, 'revision');
        if (!revision)
            throw new SubscriptionError('请先刷新订阅列表。', 409, 'conflict');
        let result;
        if (action === 'import') {
            const candidate = preview(args);
            if (candidate.revision !== revision || candidate.token !== text(args, 'token')) {
                throw new SubscriptionError('订阅列表或导入内容已经变化，请重新预览；你的输入已保留。', 409, 'conflict');
            }
            result = await mutateSubscriptions(scope, feeds => {
                signal.throwIfAborted();
                const outcome = importOpmlFeeds(feeds, parseOpml(text(args, 'opml')), args.updateExisting === true);
                return { feeds: outcome.feeds, value: { addedCount: outcome.addedCount, existedCount: outcome.existedCount, skippedCount: outcome.skippedCount } };
            }, revision);
        }
        else if (action === 'remove') {
            result = await mutateSubscriptions(scope, feeds => {
                signal.throwIfAborted();
                const target = find(feeds, text(args, 'id'));
                return { feeds: feeds.filter(feed => feed !== target), value: { removed: target.name || target.url } };
            }, revision);
        }
        else {
            const url = text(args, 'url');
            assertHttpUrl(url);
            const current = subscriptionSnapshot(scope);
            if (current.revision !== revision)
                throw new SubscriptionError('订阅列表已经变化，请刷新后再保存；你的输入已保留。', 409, 'conflict');
            const old = action === 'edit' ? find(current.feeds, text(args, 'id')) : undefined;
            let defaultName = '';
            if (!old || !sameFeedUrl(old.url, url))
                defaultName = (await check(url, signal)).parsed.feed.title;
            result = await mutateSubscriptions(scope, feeds => {
                signal.throwIfAborted();
                const previous = action === 'edit' ? find(feeds, text(args, 'id')) : undefined;
                if (feeds.some(feed => feed !== previous && sameFeedUrl(feed.url, url))) {
                    throw new SubscriptionError('这个地址已经订阅，请编辑现有订阅。', 409, 'duplicate');
                }
                const next = { url, name: text(args, 'name') || defaultName, category: text(args, 'category') };
                return { feeds: previous ? feeds.map(feed => feed === previous ? next : feed) : [...feeds, next], value: { saved: next.name || next.url } };
            }, revision);
        }
        return { result };
    }
    return {
        snapshot,
        async handle(req, res) {
            const controller = new AbortController();
            const abort = () => { if (!res.writableFinished)
                controller.abort(new Error('请求已取消')); };
            req.on('aborted', abort);
            res.on('close', abort);
            const send = (status, value) => {
                if (res.destroyed)
                    return;
                res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
                res.end(JSON.stringify(value));
            };
            try {
                requestGuard(req);
                if (req.method === 'GET')
                    send(200, { snapshot: snapshot() });
                else if (req.method === 'POST') {
                    const result = await dispatch(await readBody(req, controller.signal), controller.signal);
                    send(200, { ...result, snapshot: snapshot() });
                }
                else {
                    res.setHeader('Allow', 'GET, POST');
                    send(405, { error: '仅支持 GET 和 POST。', code: 'method' });
                }
            }
            catch (error) {
                if (!controller.signal.aborted) {
                    let state;
                    try {
                        state = snapshot();
                    }
                    catch { /* Malformed saved YAML must not hide the original error. */ }
                    send(error instanceof SubscriptionError ? error.status : 400, {
                        error: error instanceof Error ? error.message : String(error), code: error instanceof SubscriptionError ? error.code : 'invalid', snapshot: state,
                    });
                }
            }
            finally {
                req.off('aborted', abort);
                res.off('close', abort);
            }
        },
    };
}
export function installRssSettingsWeb(ctx, backend) {
    if (typeof ctx.inject !== 'function')
        return;
    ctx.inject(['webServer'], (webCtx) => webCtx.effect(() => webCtx.webServer.register({
        kind: 'exact', path: RSS_SETTINGS_ROUTE,
        handler: (req, res) => backend.handle(req, res),
    }), 'dsh-rss: settings route'));
}
