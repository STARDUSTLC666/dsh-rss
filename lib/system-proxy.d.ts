export interface SystemProxy {
    server: string;
    bypass: string;
}
export declare function parseWindowsProxy(output: string): SystemProxy | undefined;
export declare function selectWindowsProxy(proxy: SystemProxy | undefined, url: URL): string;
export declare function readWindowsProxy(signal: AbortSignal): Promise<SystemProxy | undefined>;
