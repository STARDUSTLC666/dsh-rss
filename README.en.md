# dsh-rss

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

DSH (DeepSeek Harness) plugin for RSS/Atom subscriptions: manage feeds, fetch and parse RSS 0.9x / 1.0 / 2.0 and Atom, with OPML bulk import/export, exposing seven model-facing tools.

## Compatibility

Verified against `@deepseek-ai/dsh@0.1.2-alpha.2` on 2026-08-31. Built for the cordis patch-bundle plugin model (`cordis.patch.yml` + `dsh.bundle.patch`). No runtime imports of `@deepseek-ai/*` internals.

## Installation

```bash
dsh plugin --profile web add dsh-rss
```

Restart the web service after installing.

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

### Examples

```text
rss_add { url: https://example.com/feed.xml, name: my-feed }
rss_fetch { name: my-feed, limit: 10 }
rss_check { url: https://example.com/feed.xml }
rss_opml_export { path: subscriptions.opml }
rss_opml_import { opml: "<?xml version=\"1.0\"?>..." }
```

## Subscriptions

Subscriptions live in the settings namespace `dsh-rss` (the `feedsYaml` field): `rss_add` / `rss_remove` read and write it automatically and changes persist across restarts. You can also pre-seed subscriptions via the `feedsYaml` config field. Use `url` to distinguish feeds that share a name.

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
pnpm test       # builds + 55 tests
```

## License

MIT