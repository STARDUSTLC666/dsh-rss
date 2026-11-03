> Full usage reference. The landing page focuses on outcomes, installation and workflows; detailed parameters, limits, update rules and historical validation links remain here.

# dsh-rss

[中文](../README.md)

![dsh-rss whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/assets/cover-whale-girl.png)

Choose, organize and read RSS or Atom subscriptions in DSH. Browse a categorized feed catalog, search entries, manage subscriptions and import or export OPML; browsing a source does not subscribe automatically.

[![npm](https://img.shields.io/npm/v/dsh-rss)](https://www.npmjs.com/package/dsh-rss) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-rss-downloads.svg)](https://www.npmjs.com/package/dsh-rss) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-rss-total-downloads.svg)](https://www.npmjs.com/package/dsh-rss)

[Download statistics](https://github.com/STARDUSTLC666/dsh-suite/blob/npm-downloads/README.md)

Feedback and contributions are welcome: report [issues](https://github.com/STARDUSTLC666/dsh-rss/issues) or submit [pull requests](https://github.com/STARDUSTLC666/dsh-rss/pulls).

Open the workbench from the native DSH sidebar. See the [workbench guide](WORKBENCH.md) for configuration and operating boundaries.

## What it does

- Add feeds, read articles and fetch updates.
- Choose from five catalog categories, preview recent articles and subscribe, or enter a URL.
- Import or export OPML and retain article content.
- Use a feed panel and optional plugin-level proxy configuration.

## Install

In DSH Desktop, install `dsh-rss` from the Plugins panel. If the bundled dsh command is available:

```bash
dsh plugin --profile desktop add dsh-rss
```

For the web version, replace `desktop` with `web`. Restart DSH after installation.

## Start using it

1. Open RSS in the sidebar; browse catalog categories or prepare your own RSS/Atom URL or OPML file.
2. Preview the sources and explicitly subscribe or import. Browsing the catalog alone does not subscribe.
3. Refresh subscriptions, filter by category, unread state or keywords, and open the content you need.
4. Ask for summaries of content actually read when needed; export OPML backups and manage subscriptions you no longer need.

## Requirements and configuration

No account key is required. Feeds are accessed directly by default; a proxy depends on feed reachability from your network.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](USAGE.en.md). For standalone development, follow the Node requirement in [package.json](../package.json).

## Documentation

- [Usage and troubleshooting](USAGE.en.md)
- [Suggest a feed and catalog criteria](CATALOG.md)
- [Changelog](../CHANGELOG.md)
- [Validation scope and history](VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-rss/issues)

## Plugin updates

Requires DSH 0.2.1-rc.3 or newer. Update controls sit at the bottom of the existing workbench, or native plugin details for plugins without a workbench. Checks, release notes and preferences expand in place, with no separate update page or settings menu. Automatic checks are on by default; **automatic installation is off by default**. Only explicit opt-in permits compatible stable patches while idle with no unsaved changes. Preferences are independent, with per-plugin disable, deferral and ignore controls. No forced DSH restart or upgrade, and local-source installations stay unchanged. Suite components explain and operate on the whole Suite in the same footer.

Older releases need one manual update in native plugin management to acquire these controls. Publishing to npm does not replace an existing user installation.

## License

[MIT](../LICENSE)
