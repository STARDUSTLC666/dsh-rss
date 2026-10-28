# dsh-rss

[English](README.en.md)

![dsh-rss 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/assets/cover-whale-girl.png)

在 DSH 中选择、分类和阅读 RSS / Atom 订阅。提供分类推荐目录、搜索、OPML 导入导出与订阅管理；先浏览来源，再由用户选择添加。

[![npm](https://img.shields.io/npm/v/dsh-rss)](https://www.npmjs.com/package/dsh-rss) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-rss-downloads.svg)](https://www.npmjs.com/package/dsh-rss)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-rss/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-rss/pulls)。

从 DSH 原生侧栏打开工作台；配置与操作边界见[工作台说明](docs/WORKBENCH.md)。

## 功能

- 添加订阅、查看文章和抓取更新。
- 从五类推荐目录选择来源，预览近期文章后订阅；也可输入地址或导入 OPML。
- 导入、导出 OPML，保留文章正文。
- 可视化订阅面板，支持插件级网络代理。

## 安装

桌面版可在「插件」面板按包名 `dsh-rss` 安装。已配置 dsh 命令时也可使用：

```bash
dsh plugin --profile desktop add dsh-rss
```

网页版把命令中的 `desktop` 改为 `web`。安装后重启 DSH。

## 开始使用

打开「设置 → RSS 订阅 → 推荐订阅源」，选择感兴趣的分类，预览后点击订阅；也可以输入自己的地址，或说：“订阅这个 RSS 地址并总结最新文章。”

## 依赖与配置

不需要账号密钥。默认尝试直接连接订阅源；是否需要代理取决于订阅源和当前网络。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [推荐订阅源与收录说明](docs/CATALOG.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-rss/issues)

## 插件更新

需要 DSH 0.2.1-rc.3 或更新版本。更新控件直接位于原有工作台内容末尾；没有工作台的插件，位于原生插件详情页底部。检查、更新记录和偏好在原地展开，不增加独立更新页面或设置菜单。自动检查默认开启；**自动安装默认关闭**，明确授权后才会在空闲且没有未保存修改时安装兼容的稳定补丁。开关按插件独立保存，可关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 组件在当前页面底部明确说明并操作 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](LICENSE)
