[简体中文](README.md) · **English**

# RSS

> **Choose your own sources and turn RSS / Atom feeds into a calm, magazine-grade reading stream.**

RSS / Atom workbench for DeepSeek Harness (`>=0.2.2-rc.3`): opens in the **Editorial Zine Spread** (12-column asymmetric layout with native View Transitions Reader Sheet and 1-click classic List toggle), with 13 bright styles × 8 fonts.

[![npm](https://img.shields.io/npm/v/dsh-rss)](https://www.npmjs.com/package/dsh-rss) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-rss-downloads.svg)](https://www.npmjs.com/package/dsh-rss) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-rss-total-downloads.svg)](https://www.npmjs.com/package/dsh-rss)

**[Features](#features) · [Install](#install) · [Workflow](#start-using-it) · [Full guide](https://github.com/STARDUSTLC666/dsh-rss/blob/master/docs/REFERENCE.en.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/docs/assets/intro/workflow-en-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/docs/assets/intro/workflow-en-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/docs/assets/intro/workflow-en-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/docs/assets/intro/workflow-en-light.svg" alt="Choose your sources and build a readable feed. · workflow illustration" width="100%">
</picture>

## Features

| Pillar | Capabilities |
| :--- | :--- |
| **Editorial Zine Spread** | 12-column asymmetric magazine desk (Lead Hero + Feature Dispatches + Bento Grid) with `startViewTransition()` expand/collapse into a centered Reader Sheet, plus 1-click **List** toggle |
| **Preview Before Subscribing** | Categorized publisher directories and custom RSS / Atom URLs — browsing never auto-subscribes or fetches in the background |
| **Search, Filters & OPML** | Floating category filter pills, cross-feed instant search, and OPML preview import/export backups |
| **AI Briefings & Synced UI** | 1-click copyable daily/per-feed AI briefing prompts, `? Tour` walkthroughs, 13 bright styles & 8 fonts (`YouYuan Mono` default) |

<details>
<summary>See a workbench example (Editorial Zine Spread)</summary>

![workbench example](https://raw.githubusercontent.com/STARDUSTLC666/dsh-rss/master/docs/assets/intro/screen-en.webp)

Captured from the live DeepSeek Harness workbench using demo data.

</details>

## Install

Open **Plugins** in the DSH desktop app and install `dsh-rss`, or use the CLI:

```bash
dsh plugin --profile desktop add dsh-rss
```

For the web profile, replace `desktop` with `web` and restart DSH. Requires DSH `>=0.2.2-rc.3`.

## Start using it

1. **Curate on the Zine Desk**: Open **RSS subscriptions** from the sidebar, filter with category pills or search (toggle **Zine / List** anytime), preview recommended feeds, or import OPML.
2. **Morph-expand into the Reader Sheet**: Click any card to expand smoothly into the centered Reader Sheet, fetch recent headlines, edit categories, or collapse back to the desk.
3. **Copy AI briefing prompts**: Click **Copy daily briefing prompt** or **Copy 3-takeaway prompt** and paste into chat for source-linked summaries.

### Ready-to-copy prompts

- **Daily briefing**: `Fetch the latest articles from my subscribed feeds and generate today’s key briefing by category`
- **Single-feed digest**: `Fetch the latest updates from “<Feed Title>” and distill 3 key takeaways`
- **Fact vs. speculation**: `Summarize these articles I have read, keep source links, and distinguish reported facts from speculation`

## Before you start

- Feed reachability depends on external publishers and your network; proxy setup is optional.
- Publisher listing and removal: [catalog policy](docs/CATALOG-POLICY.en.md); full configuration: [full reference](https://github.com/STARDUSTLC666/dsh-rss/blob/master/docs/REFERENCE.en.md).

## Plugin updates

Check updates at the bottom of the workbench or native plugin details. Automatic checks are on by default; **automatic installation is off**. Suite-managed components update with their bundle.

## Documentation & feedback

- [Full usage, configuration and limits](https://github.com/STARDUSTLC666/dsh-rss/blob/master/docs/REFERENCE.en.md) · [Release notes](https://github.com/STARDUSTLC666/dsh-rss/blob/master/CHANGELOG.md) · [Validation history](https://github.com/STARDUSTLC666/dsh-rss/blob/master/docs/VALIDATION.md)
- Stars, [Issues](https://github.com/STARDUSTLC666/dsh-rss/issues), and [PRs](https://github.com/STARDUSTLC666/dsh-rss/pulls) are welcome (strip credentials first).

## License

[MIT](https://github.com/STARDUSTLC666/dsh-rss/blob/master/LICENSE)

<a id="what-it-does"></a>
<a id="requirements-and-configuration"></a>
