/** Read a bounded response while retaining the caller's cancellation reason. */
export async function readResponseText(response, maxBodyBytes, signal) {
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
