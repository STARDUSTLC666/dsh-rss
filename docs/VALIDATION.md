# dsh-rss 验证记录

本页整理原 README 的历史验证说明，保留当时的版本、日期与范围。自动测试、启动检查、浏览器操作和真实服务验收分别记录，不能相互替代。更详细的版本验收文件仍保留在仓库中。

## 原中文记录

0.4.0 起适配官方源码构建的 Harness **0.1.7 及以上的声明式设置接口**；当前基线为 **0.2.0-rc.2**，18 个插件同载、工具契约、订阅读写与重启持久化在隔离环境通过验证；真实外部订阅源需要正常网络连接。Node 要求为 22.19 及以上的 22.x，或 24 及以上。

抓取接收 Harness 的取消信号，取消 DNS、网络读取或跨源搜索时保留原始取消原因。默认预检域名解析结果并拒绝回环、私网和链路本地地址；每次重定向都重新校验。可信内网源可显式配置 `allowPrivateNetwork: true`。

`rss_opml_export.path` 必须相对本次调用的会话工作区，父目录须已存在；工具拒绝绝对路径、目录穿越和指向工作区外的链接，并返回实际写入文件的绝对路径。文件写入默认通过 Harness 审批门，`opmlWriteApproval: false` 可关闭该门；省略 `path` 时仅返回 OPML 文本。

## Original English record

Version 0.4.0 supports the declarative settings interface introduced in Harness **0.1.7**. The current baseline is official-source **0.2.0-rc.2**. All 18 plugins load together; tool contracts, subscription updates and restart persistence pass in isolation. Live feeds require working network access. Requires Node 22.19 or later within 22.x, or 24 or later.

Fetches honor the Harness cancellation signal through DNS, response streaming, and cross-feed searches. Hostname preflight checks reject loopback, private, and link-local addresses by default, including redirect destinations. Set `allowPrivateNetwork: true` for trusted internal feeds.

`rss_opml_export.path` is relative to the calling session's workspace, with an existing parent directory. Absolute paths, traversal, and links outside the workspace are rejected; the result returns the absolute written path. File writes request Harness approval by default (`opmlWriteApproval: false` disables this gate). Omit `path` to return only OPML text.

## 0.4.3 原验证说明

验证宿主：官方源码构建的 Harness `0.2.0-rc.2`（commit `639ed01539`，2026-10-01）。81 项 Windows 插件测试、18 个插件共同加载与 9 个 RSS 工具的契约检查通过。真实外部订阅源仍需正常网络连接。
