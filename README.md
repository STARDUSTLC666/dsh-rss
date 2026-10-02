# dsh-rss

[English](README.en.md)

订阅和阅读 RSS / Atom，在 DSH 中查看与管理更新。

[![npm](https://img.shields.io/npm/v/dsh-rss)](https://www.npmjs.com/package/dsh-rss) [![downloads](https://img.shields.io/npm/dm/dsh-rss)](https://www.npmjs.com/package/dsh-rss)

## 功能

- 添加订阅、查看文章和抓取更新。
- 导入、导出 OPML，保留文章正文。
- 可视化订阅面板，支持插件级网络代理。

## 安装

桌面版可在「插件」面板按包名 `dsh-rss` 安装。已配置 dsh 命令时也可使用：

```bash
dsh plugin --profile desktop add dsh-rss
```

网页版把命令中的 `desktop` 改为 `web`。安装后重启 DSH。

## 开始使用

打开「设置 → RSS 订阅」添加订阅源，或说：“订阅这个 RSS 地址并总结最新文章。”

## 依赖与配置

不需要账号密钥。默认尝试直接连接订阅源；是否需要代理取决于订阅源和当前网络。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-rss/issues)

## License

[MIT](LICENSE)
