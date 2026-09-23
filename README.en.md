# dsh-rss

![npm](https://img.shields.io/npm/v/dsh-rss) ![downloads](https://img.shields.io/npm/dm/dsh-rss) ![license](https://img.shields.io/github/license/STARDUSTLC666/dsh-rss) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-rss?style=social)

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

DSH (DeepSeek Harness) plugin for RSS/Atom subscriptions: manage feeds, fetch and parse RSS 0.9x / 1.0 / 2.0 and Atom, with OPML bulk import/export, exposing nine model-facing tools.

## Compatibility

Version 0.4.0 supports official-source Harness **0.1.7-alpha.2** (2026-09-23, with a local `Symbol.for` tool-scheduler fix). All 18 plugins load together; tool contracts, subscription updates and restart persistence pass in isolation. Live feeds require working network access. Requires Node 22.19 or later within 22.x, or 24 or later.

Fetches honor the Harness cancellation signal through DNS, response streaming, and cross-feed searches. Hostname preflight checks reject loopback, private, and link-local addresses by default, including redirect destinations. Set `allowPrivateNetwork: true` for trusted internal feeds.

`rss_opml_export.path` is relative to the calling session's workspace, with an existing parent directory. Absolute paths, traversal, and links outside the workspace are rejected; the result returns the absolute written path. File writes request Harness approval by default (`opmlWriteApproval: false` disables this gate). Omit `path` to return only OPML text.

## Installation

```bash
dsh plugin --profile web add dsh-rss
```

Restart the web service after installing. Ask your assistant to subscribe to an RSS URL or list your subscriptions; ordinary subscription management needs no configuration-file editing.

## Uninstall

```bash
dsh plugin --profile web remove dsh-rss
```

Then restart the web service. To clean up fully, also remove the plugin entry from your profile `cordis.patch.yml` if you overrode it.


## Configuration

Override the plugin row in your profile's `cordis.patch.yml` (the plugin also loads with all defaults when absent):

```yaml
- id: rss
  name: 'dsh-rss'
  config:
    # proxyUrl: http://127.0.0.1:7890   # enable when a feed needs a special proxy
    timeoutMs: 15000                     # fetch timeout in ms (default 15000)
    # maxBodyBytes: 5242880              # response size cap (default 5MB, guards oversized responses)
    # userAgent: 'dsh-rss/0.2.0'         # custom fetch UA
    # feedsYaml: |                        # optional: pre-seed subscriptions (or use the rss_add tool)
    #   - url: https://example.com/feed.xml
    #     name: My feed
    #     category: tech
```

## Tools

| Tool | Purpose | Key parameters |
| :-- | :-- | :-- |
| `rss_list` | List subscribed feeds | none |
| `rss_add` | Add a subscription (fetches and validates the URL first) | `url` required; `name`/`category` optional |
| `rss_remove` | Remove a subscription | `url` or `name`, at least one |
| `rss_fetch` | Fetch and parse a feed, returning feed info and entries (with full `content`) | `url` or `name`, at least one; `limit` 1-100, default 20 |
| `rss_check` | Validate that a URL is a parseable feed | `url` required |
| `rss_opml_export` | Export subscriptions as OPML 2.0 text (optionally write a file) | `path` optional |
| `rss_opml_import` | Bulk-import subscriptions from OPML 2.0 text | `opml` required |

| `rss_search` | Search across feeds | `query` required; optional feed, date and limit filters |
| `rss_health` | Check configuration, feeds and cursors offline | none |

### Examples

```text
rss_add { url: https://example.com/feed.xml, name: my-feed }
rss_fetch { name: my-feed, limit: 10 }
rss_check { url: https://example.com/feed.xml }
rss_opml_export { path: subscriptions.opml }
rss_opml_import { opml: "<?xml version=\"1.0\"?>..." }
```

## Subscriptions

On Harness 0.1.7, subscriptions and read cursors are stored in the current profile’s `rss` entry. Changes apply immediately and survive restart. Default installations automatically import the retired `dsh-rss` section from `settings.yaml` or `settings.yaml.imported` once, preserving the original file and existing profile values. Older hosts retain their original settings storage. Use a URL to distinguish feeds with identical names.

## Proxy

Most feeds are reachable directly; a few require a special proxy from your network. When you hit a `fetch failed` error suggesting a proxy, set `proxyUrl` to your local proxy address (e.g. `http://127.0.0.1:7890`) and restart. The proxy only routes this plugin's fetch requests and does not affect other plugins in the same process.

## Parsing capabilities

- RSS 2.0 / RSS 1.0 (RDF) / Atom, normalized to one output shape
- Entity decoding, CDATA, `content:encoded`, `dc:creator` and other common fields
- RFC 822 / ISO 8601 dates normalized to ISO 8601 UTC (`pubDate`); the raw text stays in `pubDateRaw`
- Relative links resolved against the feed URL
- Summaries stripped of HTML tags and truncated at 500 chars; RSS `content:encoded` / Atom `content` is preserved as a `content` field (tags stripped, up to 20000 chars)
- Safety: no DTD / external entity parsing; 5MB body cap; configurable fetch timeout

## Development

```bash
pnpm install
pnpm test       # build + offline tests with explicit fetch and DNS fixtures
```

## License

MIT
