/** Read a bounded response while retaining the caller's cancellation reason. */
export declare function readResponseText(response: Response, maxBodyBytes: number, signal: AbortSignal): Promise<string>;
