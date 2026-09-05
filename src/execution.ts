/** Harness 0.1.3 传给工具实现的最小执行上下文。 */
export interface RssToolExecution {
  readonly signal: AbortSignal
  readonly agent?: {
    readonly session: {
      readonly header: { readonly cwd?: string }
    }
  }
}
