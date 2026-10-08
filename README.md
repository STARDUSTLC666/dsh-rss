# dsh-rss

[English](README.en.md)

![dsh-rss 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/assets/cover-whale-girl.png)

订阅和阅读 RSS / Atom，在 DSH 中查看与管理更新。

[![npm](https://img.shields.io/npm/v/dsh-rss)](https://www.npmjs.com/package/dsh-rss) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-rss-downloads.svg)](https://www.npmjs.com/package/dsh-rss)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-rss/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-rss/pulls)。

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
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-rss/issues)

## License

[MIT](LICENSE)
