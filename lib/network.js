/** RSS 网络边界：地址校验、重定向、响应大小与调用取消。 */
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { createProxyFetch } from './proxy-fetch.js';
const MAX_REDIRECTS = 5;
const PROXY_HINT = '。若该订阅源需要特殊代理（梯子）才能访问，请在 cordis.patch.yml 里给 dsh-rss 配置 proxyUrl（如 http://127.0.0.1:7890）后重启。';
function parseHttpUrl(url) {
    let parsed;
    try {
        parsed = new URL(url);
    }
    catch {
        throw new Error('订阅源地址必须是 http(s):// 开头的完整地址，例如 https://example.com/feed.xml。');
    }
    if ((parsed.protocol !== 'http:' && parsed.protocol !== 'https:') || parsed.hostname === '') {
        throw new Error('订阅源地址必须是 http(s):// 开头的完整地址，例如 https://example.com/feed.xml。');
    }
    if (parsed.username !== '' || parsed.password !== '') {
        throw new Error('订阅源地址不能包含用户名或密码。');
    }
    return parsed;
}
export function assertHttpUrl(url) {
    parseHttpUrl(url);
}
function ipv4Bytes(address) {
    if (isIP(address) !== 4)
        return null;
    return address.split('.').map((part) => Number(part));
}
function ipv6Words(address) {
    let input = address.toLowerCase().replace(/^\[|\]$/g, '').split('%', 1)[0];
    if (isIP(input) !== 6)
        return null;
    if (input.includes('.')) {
        const lastColon = input.lastIndexOf(':');
        const v4 = ipv4Bytes(input.slice(lastColon + 1));
        if (v4 === null)
            return null;
        input = input.slice(0, lastColon) + ':' + ((v4[0] << 8) | v4[1]).toString(16) + ':' + ((v4[2] << 8) | v4[3]).toString(16);
    }
    const halves = input.split('::');
    if (halves.length > 2)
        return null;
    const left = halves[0] === '' ? [] : halves[0].split(':');
    const right = halves.length === 1 || halves[1] === '' ? [] : halves[1].split(':');
    const zeroCount = halves.length === 2 ? 8 - left.length - right.length : 0;
    if (zeroCount < 0 || (halves.length === 1 && left.length !== 8))
        return null;
    const words = [...left, ...Array.from({ length: zeroCount }, () => '0'), ...right].map((word) => Number.parseInt(word, 16));
    return words.length === 8 && words.every((word) => Number.isInteger(word) && word >= 0 && word <= 0xffff) ? words : null;
}
/** 仅允许可公开路由的地址，避免回环、私网、链路本地和保留地址。 */
export function isBlockedNetworkAddress(address) {
    const v4 = ipv4Bytes(address);
    if (v4 !== null) {
        const [a, b] = v4;
        return a === 0
            || a === 10
            || a === 127
            || (a === 100 && b >= 64 && b <= 127)
            || (a === 169 && b === 254)
            || (a === 172 && b >= 16 && b <= 31)
            || (a === 192 && b === 168)
            || (a === 198 && (b === 18 || b === 19))
            || a >= 224;
    }
    const v6 = ipv6Words(address);
    if (v6 === null)
        return true;
    const isUnspecified = v6.every((word) => word === 0);
    const isLoopback = v6.slice(0, 7).every((word) => word === 0) && v6[7] === 1;
    const isUniqueLocal = (v6[0] & 0xfe00) === 0xfc00;
    const isLinkLocal = (v6[0] & 0xffc0) === 0xfe80;
    const isMulticast = (v6[0] & 0xff00) === 0xff00;
    if (isUnspecified || isLoopback || isUniqueLocal || isLinkLocal || isMulticast)
        return true;
    const isMappedV4 = v6.slice(0, 5).every((word) => word === 0) && v6[5] === 0xffff;
    const isCompatibleV4 = v6.slice(0, 6).every((word) => word === 0);
    if (isMappedV4 || isCompatibleV4) {
        const mapped = [v6[6] >> 8, v6[6] & 0xff, v6[7] >> 8, v6[7] & 0xff].join('.');
        return isBlockedNetworkAddress(mapped);
    }
    return false;
}
function mergedSignal(timeoutMs, callerSignal) {
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    return callerSignal === undefined ? timeoutSignal : AbortSignal.any([callerSignal, timeoutSignal]);
}
async function lookupWithSignal(hostname, lookupImpl, signal) {
    signal.throwIfAborted();
    return await new Promise((resolveLookup, reject) => {
        const onAbort = () => reject(signal.reason);
        signal.addEventListener('abort', onAbort, { once: true });
        void Promise.resolve().then(() => lookupImpl(hostname)).then((addresses) => {
            signal.removeEventListener('abort', onAbort);
            resolveLookup(addresses);
        }, (error) => {
            signal.removeEventListener('abort', onAbort);
            reject(error);
        });
    });
}
async function assertPublicUrl(url, cfg, lookupImpl, signal) {
    if (cfg.allowPrivateNetwork)
        return;
    const hostname = url.hostname.replace(/^\[|\]$/g, '').toLowerCase();
    if (hostname === 'localhost' || hostname.endsWith('.localhost')) {
        throw new Error('出于安全原因，默认禁止访问 localhost。若确需访问可信内网源，请显式配置 allowPrivateNetwork: true。');
    }
    if (isIP(hostname) !== 0) {
        if (isBlockedNetworkAddress(hostname)) {
            throw new Error('出于安全原因，默认禁止访问回环、私网、链路本地或保留地址：' + hostname + '。若确需访问可信内网源，请显式配置 allowPrivateNetwork: true。');
        }
        return;
    }
    let addresses;
    try {
        addresses = await lookupWithSignal(hostname, lookupImpl, signal);
    }
    catch (error) {
        signal.throwIfAborted();
        throw new Error('无法安全解析订阅源域名 ' + hostname + '：' + (error instanceof Error ? error.message : String(error)));
    }
    if (addresses.length === 0)
        throw new Error('无法安全解析订阅源域名 ' + hostname + '：DNS 未返回地址。');
    const blocked = addresses.find((entry) => isBlockedNetworkAddress(entry.address));
    if (blocked !== undefined) {
        throw new Error('出于安全原因，域名 ' + hostname + ' 解析到了非公网地址 ' + blocked.address + '，已拒绝访问。若确需访问可信内网源，请显式配置 allowPrivateNetwork: true。');
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
async function readResponseText(response, maxBodyBytes, signal) {
    signal.throwIfAborted();
    const declaredLength = Number(response.headers.get('content-length'));
    if (Number.isFinite(declaredLength) && declaredLength > maxBodyBytes) {
        await response.body?.cancel('response body exceeds maxBodyBytes');
        throw new Error('订阅源内容超过 ' + maxBodyBytes + ' 字节上限，已停止读取。');
    }
    if (response.body === null)
        return '';
    const reader = response.body.getReader();
    const onAbort = () => { void reader.cancel(signal.reason).catch(() => { }); };
    signal.addEventListener('abort', onAbort, { once: true });
    const decoder = new TextDecoder('utf-8', { fatal: false });
    let byteLength = 0;
    let text = '';
    try {
        while (true) {
            signal.throwIfAborted();
            const chunk = await reader.read();
            signal.throwIfAborted();
            if (chunk.done)
                break;
            byteLength += chunk.value.byteLength;
            if (byteLength > maxBodyBytes) {
                await reader.cancel('response body exceeds maxBodyBytes');
                throw new Error('订阅源内容超过 ' + maxBodyBytes + ' 字节上限，已停止读取。');
            }
            text += decoder.decode(chunk.value, { stream: true });
        }
        return text + decoder.decode();
    }
    finally {
        signal.removeEventListener('abort', onAbort);
        reader.releaseLock();
    }
}
export async function fetchFeedXml(url, cfg, exec, fetchImpl, lookupImpl = async (hostname) => await lookup(hostname, { all: true, verbatim: true })) {
    let currentUrl = parseHttpUrl(url);
    const fetcher = fetchImpl ?? makeFetch(cfg);
    const signal = mergedSignal(cfg.timeoutMs, exec?.signal);
    let response;
    try {
        for (let redirectCount = 0;; redirectCount++) {
            signal.throwIfAborted();
            await assertPublicUrl(currentUrl, cfg, lookupImpl, signal);
            response = await fetcher(currentUrl.href, {
                headers: {
                    'user-agent': cfg.userAgent,
                    accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
                },
                redirect: 'manual',
                signal,
            });
            signal.throwIfAborted();
            if (![301, 302, 303, 307, 308].includes(response.status))
                break;
            const location = response.headers.get('location');
            if (location === null)
                break;
            await response.body?.cancel('following validated redirect');
            if (redirectCount >= MAX_REDIRECTS)
                throw new Error('抓取失败：重定向次数超过 ' + MAX_REDIRECTS + ' 次上限。');
            currentUrl = parseHttpUrl(new URL(location, currentUrl).href);
        }
    }
    catch (error) {
        signal.throwIfAborted();
        if (error instanceof Error && (error.message.includes('出于安全原因') || error.message.includes('无法安全解析') || error.message.includes('重定向次数超过')))
            throw error;
        throw new Error('抓取失败：' + (error instanceof Error ? error.message : String(error)) + PROXY_HINT);
    }
    if (response === undefined)
        throw new Error('抓取失败：未收到服务器响应。');
    if (!response.ok) {
        await response.body?.cancel('unsuccessful feed response');
        throw new Error('抓取失败：服务器返回 HTTP ' + response.status + '。');
    }
    const reportedUrl = response.url === '' ? currentUrl : parseHttpUrl(response.url);
    await assertPublicUrl(reportedUrl, cfg, lookupImpl, signal);
    let xml;
    try {
        xml = await readResponseText(response, cfg.maxBodyBytes, signal);
    }
    catch (error) {
        signal.throwIfAborted();
        if (error instanceof Error && error.message.includes('字节上限'))
            throw error;
        throw new Error('读取订阅源内容失败：' + (error instanceof Error ? error.message : String(error)));
    }
    xml = xml.replace(/^\uFEFF/, '');
    return { xml, finalUrl: reportedUrl.href };
}
