# dsh-rss

[English](README.en.md)

![dsh-rss 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/assets/cover-whale-girl.png)

订阅和阅读 RSS / Atom，在 DSH 中查看与管理更新。

[![npm](https://img.shields.io/npm/v/dsh-rss)](https://www.npmjs.com/package/dsh-rss) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-rss-downloads.svg)](https://www.npmjs.com/package/dsh-rss)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-rss/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-rss/pulls)。


本轮 DSH `0.2.1-alpha.5` 操作与窄窗口修复见 [0.6.3 验收记录](docs/validation-0.6.3.md)。

更新并重启 DSH 后，可从原生侧栏打开新版工作台，原设置入口继续保留。详见[工作台说明与验收范围](docs/WORKBENCH.md)。

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

需要 DSH 0.2.1-rc.3 或更新版本。每个插件在自己的页面或设置项提供检查、更新记录与确认安装入口，开关独立保存。自动检查默认开启；**自动安装默认关闭**，只有明确授权后，兼容的稳定补丁才会在空闲且没有未保存修改时安装。可单独关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 安装的组件会明确提示通过 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](LICENSE)
