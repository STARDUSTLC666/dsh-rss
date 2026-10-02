/** RSS 网络边界：地址校验、重定向、响应大小与调用取消。 */
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { createFeedTransport } from './proxy-fetch.js';
import { lookupPublicDns } from './public-dns.js';
import { readResponseText } from './response.js';
import { readWindowsProxy, selectWindowsProxy } from './system-proxy.js';
const MAX_REDIRECTS = 5;
const PROXY_HINT = '。请检查网络与代理连接；也可在 dsh-rss 配置中指定 proxyUrl。';
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
function isFakeIp(address) {
    const bytes = ipv4Bytes(address);
    return bytes !== null && bytes[0] === 198 && (bytes[1] === 18 || bytes[1] === 19);
}
async function resolvePublicUrl(url, cfg, lookupImpl, signal, fallbackLookup) {
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
        return [{ address: hostname, family: isIP(hostname) }];
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
    const privateAddress = addresses.find(entry => isBlockedNetworkAddress(entry.address) && !isFakeIp(entry.address));
    if (privateAddress !== undefined) {
        throw new Error('出于安全原因，域名 ' + hostname + ' 解析到了非公网地址 ' + privateAddress.address + '，已拒绝访问。若确需访问可信内网源，请显式配置 allowPrivateNetwork: true。');
    }
    if (addresses.some(entry => isFakeIp(entry.address))) {
        if (!cfg.fakeIpDnsFallback) {
            throw new Error('无法安全解析订阅源域名 ' + hostname + '：检测到代理 Fake-IP。可启用 fakeIpDnsFallback 查询真实 IP 后重试，VPN 可以保持开启。');
        }
        addresses = await lookupWithSignal(hostname, fallbackLookup, signal);
        if (addresses.length === 0)
            throw new Error('无法安全解析订阅源域名 ' + hostname + '：HTTPS DNS 未返回地址。');
    }
    const blocked = addresses.find((entry) => isBlockedNetworkAddress(entry.address));
    if (blocked !== undefined) {
        throw new Error('出于安全原因，域名 ' + hostname + ' 解析到了非公网地址 ' + blocked.address + '，已拒绝访问。若确需访问可信内网源，请显式配置 allowPrivateNetwork: true。');
    }
    return addresses;
}
export async function fetchFeedXml(url, cfg, exec, fetchImpl, lookupImpl = async (hostname) => await lookup(hostname, { all: true, verbatim: true })) {
    let currentUrl = parseHttpUrl(url);
    const signal = mergedSignal(cfg.timeoutMs, exec?.signal);
    let response;
    let transport;
    try {
        const systemProxy = fetchImpl === undefined && cfg.proxyUrl === '' && cfg.useSystemProxy
            ? await readWindowsProxy(signal) : undefined;
        const fallbackLookup = hostname => lookupPublicDns(hostname, signal, cfg.proxyUrl, systemProxy, fetchImpl);
        const validate = (target) => resolvePublicUrl(target, cfg, lookupImpl, signal, fallbackLookup);
        try {
            for (let redirectCount = 0;; redirectCount++) {
                signal.throwIfAborted();
                const addresses = await validate(currentUrl);
                transport = fetchImpl === undefined ? createFeedTransport(currentUrl, cfg.proxyUrl || selectWindowsProxy(systemProxy, currentUrl), addresses) : undefined;
                response = await (fetchImpl ?? transport.fetch)(currentUrl.href, {
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
                await transport?.dispose();
                transport = undefined;
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
        if (reportedUrl.href !== currentUrl.href)
            await validate(reportedUrl);
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
    finally {
        await response?.body?.cancel().catch(() => { });
        await transport?.dispose();
    }
}
