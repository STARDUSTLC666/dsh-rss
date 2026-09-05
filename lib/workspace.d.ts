import type { RssToolExecution } from './execution.js';
/**
 * 把模型给出的 OPML 相对路径约束在本次调用的 session cwd 内。
 * 同时解析父目录的真实路径并拒绝目标符号链接，避免通过链接越界。
 */
export declare function resolveOpmlOutputPath(requestedPath: string, exec: RssToolExecution | undefined): Promise<string>;
