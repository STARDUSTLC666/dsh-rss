[English](README.en.md)

# dsh-rss

> **agent 的资讯雷达**：订阅管理 + RSS/Atom 抓取解析。

![npm version](https://img.shields.io/npm/v/dsh-rss?label=npm&color=blue) ![npm downloads](https://img.shields.io/npm/dm/dsh-rss) ![license](https://img.shields.io/npm/l/dsh-rss) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-rss?style=social)

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)


DSH（DeepSeek Harness）的 RSS/Atom 订阅工具插件：管理订阅源，抓取并解析 RSS 0.9x / 1.0 / 2.0 与 Atom，支持 OPML 批量导入导出，给模型提供九个可直接调用的工具。

## 兼容性

按 `@deepseek-ai/dsh@0.1.3-alpha.1` 的工具执行接口适配。遵循 cordis 组合包补丁模型（`cordis.patch.yml` + `dsh.bundle.patch`），运行时不 import 任何 `@deepseek-ai/*` 内部模块。

抓取接收 Harness 的取消信号，取消 DNS、网络读取或跨源搜索时保留原始取消原因。默认预检域名解析结果并拒绝回环、私网和链路本地地址；每次重定向都重新校验。可信内网源可显式配置 `allowPrivateNetwork: true`。

`rss_opml_export.path` 必须相对本次调用的会话工作区，父目录须已存在；工具拒绝绝对路径、目录穿越和指向工作区外的链接，并返回实际写入文件的绝对路径。文件写入默认通过 Harness 审批门，`opmlWriteApproval: false` 可关闭该门；省略 `path` 时仅返回 OPML 文本。

## 安装

```bash
dsh plugin --profile web add dsh-rss
```

安装后重启 Web 服务即可。

## 卸载

```bash
dsh plugin --profile web remove dsh-rss
```

卸载后重启 Web 服务。如需彻底清理，可再手动删除自己 profile `cordis.patch.yml` 中覆盖的插件行。


## 配置

在你自己的 profile 的 `cordis.patch.yml` 里覆盖本插件行（缺省时插件也能加载，只是全部用默认值）：

```yaml
- id: rss
  name: 'dsh-rss'
  config:
    # proxyUrl: http://127.0.0.1:7890   # 部分订阅源需要特殊代理（梯子）才能访问时启用
    timeoutMs: 15000                     # 抓取超时（毫秒，默认 15000）
    # maxBodyBytes: 5242880              # 订阅源体积上限（默认 5MB，防超大响应）
    # userAgent: 'dsh-rss/0.2.0'         # 自定义抓取 UA
    # feedsYaml: |                        # 可选：预置订阅列表（也可用 rss_add 工具添加）
    #   - url: https://example.com/feed.xml
    #     name: 示例订阅
    #     category: 技术
```

## 工具一览

| 工具 | 作用 | 关键参数 |
| :-- | :-- | :-- |
| `rss_list` | 列出已订阅源 | 无 |
| `rss_add` | 添加订阅（先抓取校验地址） | `url` 必填；`name`/`category` 可选 |
| `rss_remove` | 删除订阅 | `url` 或 `name` 至少一个 |
| `rss_fetch` | 抓取解析订阅源，返回源信息与条目（含正文 content） | `url` 或 `name` 至少一个；`limit` 1-100 默认 20 |
| `rss_check` | 校验地址是否为可解析的订阅源 | `url` 必填 |
| `rss_opml_export` | 导出订阅列表为 OPML 2.0 文本（可写入文件） | `path` 可选 |
| `rss_opml_import` | 从 OPML 2.0 文本批量导入订阅源 | `opml` 必填 |
| `rss_search` | 跨订阅源关键词搜索条目（标题/摘要/正文/作者） | `query` 必填；`name`/`url`/`since`/`limit` 可选 |
| `rss_health` | 插件自检（配置/订阅/游标/解析器，离线） | 无 |

### 示例

```text
rss_add { url: https://example.com/feed.xml, name: 我的订阅 }
rss_fetch { name: 我的订阅, limit: 10 }
rss_check { url: https://example.com/feed.xml }
rss_opml_export { path: subscriptions.opml }
rss_opml_import { opml: "<?xml version=\"1.0\"?>..." }
```

## 订阅存储

订阅列表保存在 settings 的 `dsh-rss` 命名空间（`feedsYaml` 字段）里：`rss_add` / `rss_remove` 会自动读写并持久化，重启后仍在；也可以在配置里用 `feedsYaml` 预置初始订阅。同名订阅请用 `url` 区分。

## 特殊代理（梯子）

大部分订阅源可以直接访问；少数订阅源需要特殊代理（梯子）才能连通。遇到 `抓取失败` 且提示需要代理时，把 `proxyUrl` 配成你的本地代理地址（如 `http://127.0.0.1:7890`）并重启即可。代理只作用于本插件的抓取请求，不影响同进程其他插件。

## 解析能力

- RSS 2.0 / RSS 1.0（RDF）/ Atom 三种格式，统一归一化输出
- 实体解码、CDATA、`content:encoded`、`dc:creator`、`itunes` 等常见字段
- RFC 822 / ISO 8601 日期统一转 ISO 8601 UTC（`pubDate`），原始文本保留在 `pubDateRaw`
- 相对链接按订阅源地址解析成绝对链接
- 摘要去 HTML 标签并截断到 500 字符；RSS `content:encoded` / Atom `content` 作为 `content` 字段保留（去标签后最多 20000 字符）
- 安全：不解析 DTD/外部实体，内容只做文本抽取；响应体积上限 5MB；抓取超时可配

## 开发

```bash
pnpm install
pnpm test       # 构建 + 离线测试（fetch 与 DNS 均使用夹具）
```

发布前门禁：危险模式扫描、manifest 自检、`pnpm audit --prod`、全量测试，以及全新 profile 的真实启动冒烟测试。

## License

MIT
