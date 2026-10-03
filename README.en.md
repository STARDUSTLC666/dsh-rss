# dsh-rss

[中文](README.md)

![dsh-rss whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/assets/cover-whale-girl.png)

Subscribe to and read RSS or Atom feeds, and manage updates from DSH.

[![npm](https://img.shields.io/npm/v/dsh-rss)](https://www.npmjs.com/package/dsh-rss) [![downloads](https://img.shields.io/npm/dm/dsh-rss)](https://www.npmjs.com/package/dsh-rss)

## What it does

- Add feeds, read articles and fetch updates.
- Import or export OPML and retain article content.
- Use a feed panel and optional plugin-level proxy configuration.

## Install

In DSH Desktop, install `dsh-rss` from the Plugins panel. If the bundled dsh command is available:

```bash
dsh plugin --profile desktop add dsh-rss
```

For the web version, replace `desktop` with `web`. Restart DSH after installation.

## Start using it

Add a feed in Settings → RSS subscriptions, or ask to subscribe to a feed URL and summarize recent articles.

## Requirements and configuration

No account key is required. Feeds are accessed directly by default; a proxy depends on feed reachability from your network.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](docs/USAGE.en.md). For standalone development, follow the Node requirement in [package.json](package.json).

## Documentation

- [Usage and troubleshooting](docs/USAGE.en.md)
- [Changelog](CHANGELOG.md)
- [Validation scope and history](docs/VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-rss/issues)

## License

[MIT](LICENSE)
