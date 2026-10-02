/** Read the enabled Windows manual proxy; never modify OS or VPN settings. */
import { execFile } from 'node:child_process';
export function parseWindowsProxy(output) {
    const enabled = /^\s*ProxyEnable\s+REG_DWORD\s+(\S+)\s*$/mi.exec(output);
    if (enabled === null || Number(enabled[1]) !== 1)
        return undefined;
    const server = /^\s*ProxyServer\s+REG_SZ\s+(.+)$/mi.exec(output)?.[1].trim();
    if (!server)
        return undefined;
    return { server, bypass: /^\s*ProxyOverride\s+REG_SZ\s+(.+)$/mi.exec(output)?.[1].trim() ?? '' };
}
export function selectWindowsProxy(proxy, url) {
    if (proxy === undefined)
        return '';
    const hostname = url.hostname.toLowerCase();
    for (const pattern of proxy.bypass.split(';').map(value => value.trim().toLowerCase()).filter(Boolean)) {
        if (pattern === '<local>' && !hostname.includes('.'))
            return '';
        const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
        if (new RegExp('^' + escaped + '$', 'i').test(hostname))
            return '';
    }
    const entries = proxy.server.split(';').map(value => value.trim()).filter(Boolean);
    const protocol = url.protocol.slice(0, -1);
    const selected = entries.some(value => value.includes('='))
        ? entries.find(value => value.startsWith(protocol + '='))?.slice(protocol.length + 1)
        : entries[0];
    if (!selected)
        return '';
    try {
        const parsed = new URL(selected.includes('://') ? selected : 'http://' + selected);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:')
            return '';
        return parsed.href;
    }
    catch {
        return '';
    }
}
export async function readWindowsProxy(signal) {
    signal.throwIfAborted();
    if (process.platform !== 'win32')
        return undefined;
    return await new Promise((resolveProxy, reject) => {
        execFile('reg.exe', ['query', 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings'], { encoding: 'utf8', windowsHide: true, timeout: 1500, maxBuffer: 128 * 1024, signal }, (error, stdout) => {
            if (signal.aborted)
                reject(signal.reason);
            else
                resolveProxy(error === null ? parseWindowsProxy(stdout) : undefined);
        });
    });
}
