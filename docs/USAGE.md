# dsh-rss 使用说明

[返回简介](../README.md) · [更新记录](../CHANGELOG.md) · [验证记录](VALIDATION.md)

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
