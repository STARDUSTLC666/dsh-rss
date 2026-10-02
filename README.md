[English](README.en.md)

# dsh-rss

## 0.5.1 更新（2026-10-02）

修复 VPN 开启 Fake-IP 后外部订阅源被拦截的问题。Windows 默认沿用已启用的手动系统代理；检测到 `198.18.0.0/15` 时，通过 HTTPS DNS 查询真实公网地址，再固定连接地址并保留原域名和 TLS 证书校验。VPN 可以保持开启，无需修改代理软件配置或放开内网访问。抓取、跳转或读取结束后释放本次请求的连接。

106 项 Windows 测试通过；在 VPN 开启、原生 DNS 返回 Fake-IP 的环境中，少数派、Python Insider、NASA 和 GitHub Atom 的检查、添加、抓取、持久化增量去重与搜索通过正常插件调用验证，没有注入测试 DNS 或抓取结果。Python 旧订阅地址也仍可读取。桌面原生窗口的单独验收不包含在这些结果中。

## 0.5.0 更新（2026-10-02）

新增 **设置 → RSS 订阅** 面板：添加、编辑、移除、搜索、分类筛选、检查可用性与 OPML 导入导出。面板与对话工具共用原有订阅列表，不需要迁移数据。跟随 DSH 的中文/英文和外观设置。

OPML 导入先预览新增、重复和无效项，再确认保存。默认保留重复订阅的名称和分类；勾选更新时会展示变化。保存失败或预览过期时保留输入。移除订阅需要确认具体名称和地址。

同时修复损坏 XML 被部分导入、无效/含密码 URL 被接受，以及并发添加覆盖另一笔订阅的问题。检查记录只保留在本次 DSH 运行中，导入不会自动抓取全部订阅。

94 项 Windows 测试通过；在官方 Harness `0.2.0-rc.2` 中实际操作了添加、编辑、筛选、检查、导入、移除、Tab/Enter/Esc、双页面冲突和重启持久化。桌面原生窗口与窄屏交互本轮未完成验收，外部生产订阅未替代为本地模拟测试。

## 0.4.3 更新（2026-10-01）

修复订阅 URL 的大小写比较：添加、删除、OPML 导入与搜索统一归一化协议、域名和默认端口，保留路径和查询参数的大小写，避免合并或删除不同订阅源。保留此前的代理 Fake-IP DNS 提示和保留地址检查。

验证宿主：官方源码构建的 Harness `0.2.0-rc.2`（commit `639ed01539`，2026-10-01）。81 项 Windows 插件测试、18 个插件共同加载与 9 个 RSS 工具的契约检查通过。真实外部订阅源仍需正常网络连接。

> **agent 的资讯雷达**：订阅管理 + RSS/Atom 抓取解析。

![npm version](https://img.shields.io/npm/v/dsh-rss?label=npm&color=blue) ![npm downloads](https://img.shields.io/npm/dm/dsh-rss) ![license](https://img.shields.io/npm/l/dsh-rss) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-rss?style=social)

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)


DSH（DeepSeek Harness）的 RSS/Atom 订阅工具插件：管理订阅源，抓取并解析 RSS 0.9x / 1.0 / 2.0 与 Atom，支持 OPML 批量导入导出，给模型提供九个可直接调用的工具。

## 兼容性

0.4.0 起适配官方源码构建的 Harness **0.1.7 及以上的声明式设置接口**；当前基线为 **0.2.0-rc.2**，18 个插件同载、工具契约、订阅读写与重启持久化在隔离环境通过验证；真实外部订阅源需要正常网络连接。Node 要求为 22.19 及以上的 22.x，或 24 及以上。

抓取接收 Harness 的取消信号，取消 DNS、网络读取或跨源搜索时保留原始取消原因。默认预检域名解析结果并拒绝回环、私网和链路本地地址；每次重定向都重新校验。可信内网源可显式配置 `allowPrivateNetwork: true`。

`rss_opml_export.path` 必须相对本次调用的会话工作区，父目录须已存在；工具拒绝绝对路径、目录穿越和指向工作区外的链接，并返回实际写入文件的绝对路径。文件写入默认通过 Harness 审批门，`opmlWriteApproval: false` 可关闭该门；省略 `path` 时仅返回 OPML 文本。

## 安装

```bash
dsh plugin --profile web add dsh-rss
```

安装后重启 Web 服务即可。直接对助手说「订阅这个 RSS 地址，命名为技术资讯」或「列出我的订阅」即可使用，日常增删订阅不需要编辑配置文件。

桌面版使用 `dsh plugin --profile desktop add dsh-rss`，安装或更新后重新打开 DSH。网页和桌面的共享设置页面均可显示订阅面板；已安装的旧版本请先通过插件管理器更新。

## 订阅面板

打开 **设置 → RSS 订阅**。添加时填写 RSS/Atom 地址，名称可留空，分类可选。新地址通过抓取检查后才会保存；编辑原地址的名称或分类不需要源网站在线。

导入可选择不超过 1 MiB 的 OPML 文件或粘贴文本。先检查预览，再点击确认；跳过的地址会说明原因。已有订阅发生变化时重新预览即可，原输入仍保留。导出通过浏览器下载 OPML，不会修改订阅。

列表卡片显示最近一次手动检查或工具抓取的时间和文章数，失败时显示具体原因。只读配置仍可查看、检查和导出。

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
    # proxyUrl: http://127.0.0.1:7890   # 可选；覆盖自动读取的 Windows 系统代理
    # useSystemProxy: true             # 默认读取 Windows 已启用的手动系统代理
    # fakeIpDnsFallback: true          # 默认在 Fake-IP 下查询并校验真实公网地址
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

Harness 0.1.7 把订阅列表和读取游标保存在当前 profile 的 `rss` 配置行；增删后立即生效，重启仍保留。默认安装会自动导入旧 `settings.yaml` 或 `settings.yaml.imported` 的 `dsh-rss` 数据一次，保留原文件，且不覆盖已有 profile 值。旧版宿主继续使用原 settings 存储。同名订阅请用 URL 区分。

## 代理与 VPN

Windows 上默认读取已启用的手动系统代理，尊重协议与绕过列表；不执行 PAC 脚本，也不修改系统设置。`proxyUrl` 显式配置优先；`useSystemProxy: false` 可关闭自动读取。其他平台仍可通过 `proxyUrl` 配置 HTTP(S) 代理。这些代理仅作用于本插件。

当系统 DNS 返回 VPN 的 Fake-IP（`198.18.0.0/15`）时，默认只向 [Cloudflare HTTPS DNS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-json/) 查询订阅源域名；服务不可用时尝试 Google HTTPS DNS。查询不会发送订阅源路径、正文、密钥或订阅列表，回答仍须通过公网地址检查；实际连接固定到检查过的地址。`fakeIpDnsFallback: false` 可关闭该兼容方式。普通公网 DNS、私网 DNS 和 IP 字面量不会触发此查询。可信内网订阅仍需单独显式配置 `allowPrivateNetwork: true`。

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
