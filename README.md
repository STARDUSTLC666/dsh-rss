**简体中文** · [English](README.en.md)

# RSS

**自己选来源，把订阅整理成好读的信息流。**

DeepSeek Harness（`>=0.2.2-rc.3`）RSS / Atom 订阅工作台：提供分类推荐目录、先预览后订阅、多源检索与 OPML 预览导入导出，全部来源由用户自主选择。工作台内置 5 套明亮可切换界面风格（原生清透 / 米白纸感 / Claude 暖书卷 / 8-Bit 像素 / 晴空薄荷，深色模式自动柔和适配）与按钮微交互动效，跨插件实时同步。

[![npm](https://img.shields.io/npm/v/dsh-rss)](https://www.npmjs.com/package/dsh-rss) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-rss-downloads.svg)](https://www.npmjs.com/package/dsh-rss) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-rss-total-downloads.svg)](https://www.npmjs.com/package/dsh-rss)

**[安装使用](#安装) · [使用流程](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-rss/blob/master/docs/REFERENCE.zh.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/docs/assets/intro/workflow-zh-light.svg" alt="自己选来源，把订阅整理成好读的信息流。 · 流程示意" width="100%">
</picture>

## 功能

- 从分类来源目录开始，也能添加自己的 RSS / Atom 地址。
- 预览后再订阅；浏览目录不会自动添加或抓取来源。
- 适配 DeepSeek Harness `>=0.2.2-rc.3` 的 Workbench UI v2 工作台，支持 5 套主题（原生清透 / 米白纸感 / Claude 暖书卷 / 8-Bit 像素 / 晴空薄荷）与微交互动效。
- 按分类、未读或关键词阅读检索，并支持 OPML 预览导入与导出备份。

<details>
<summary>查看实际示例</summary>

![workbench example](https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/docs/assets/intro/screen-zh.webp)

图片来自验证环境的真实工作台界面，使用示例数据。

</details>

## 安装

在 DSH 桌面版「插件」面板安装 `dsh-rss`。已配置命令行时也可使用：

```bash
dsh plugin --profile desktop add dsh-rss
```

网页版把 `desktop` 改为 `web`；安装后重启对应的 DSH。宿主要求以包声明 `>=0.2.2-rc.3` 为准。

## 开始使用

推荐按 **「选源订阅 → 面板管理分组 / 导入 OPML → 一键复制指令让助手生成每日简报」** 的节奏使用：

1. **选源订阅**：从左侧栏打开「RSS 订阅」，在「推荐订阅源」按分类先预览近期文章再点订阅，或手动输入网站原生 RSS / Atom 地址（浏览目录不会自动添加或联网抓取）。
2. **面板管理分组 / 导入 OPML**：在「我的订阅」按分类筛选、编辑分组或检查订阅可用性；已有阅读器订阅可在「导入与导出」先预览再导入 OPML，并随时导出备份。
3. **一键复制指令生成每日简报**：在「我的订阅」列表或单源详情里点 **「复制今日简报指令」/「复制单源提炼指令」**，粘贴到 DSH 对话即可让助手按分类或单源抓取最新文章、提炼核心结论并附上原文链接。

常用对话指令（工作台内支持一键复制）：

- `抓取我订阅源的最新文章，按分类生成今日重点简报`
- `抓取「<订阅源名称>」最新更新并提炼 3 条核心结论`
- `整理我已读取的这些订阅文章，保留原文链接，并区分报道事实与推测`

## 开始前要知道

外部来源的可达性由网站与网络决定；代理是可选配置。

配置、完整工具与排错见[详细使用说明](https://github.com/STARDUSTLC666/dsh-rss/blob/master/docs/REFERENCE.zh.md)。

## 插件更新

在工作台或原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；是否安装、何时重启由你决定。Suite 管理的组件随整包更新。[查看更新规则](https://github.com/STARDUSTLC666/dsh-rss/blob/master/docs/REFERENCE.zh.md)。

## 文档

- [详细使用、配置与边界](https://github.com/STARDUSTLC666/dsh-rss/blob/master/docs/REFERENCE.zh.md)
- [更新记录](https://github.com/STARDUSTLC666/dsh-rss/blob/master/CHANGELOG.md)
- [验证范围与历史](https://github.com/STARDUSTLC666/dsh-rss/blob/master/docs/VALIDATION.md)

## 反馈与贡献

如果插件帮到了你，欢迎 Star，让更多人发现它。问题和建议请提交 [Issues](https://github.com/STARDUSTLC666/dsh-rss/issues)，也欢迎代码与文档 [PR](https://github.com/STARDUSTLC666/dsh-rss/pulls)。反馈时附上版本与复现步骤，并移除凭据。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-rss/blob/master/LICENSE)

<a id="依赖与配置"></a>

出版者收录与移除：[目录规则](docs/CATALOG-POLICY.md)。
