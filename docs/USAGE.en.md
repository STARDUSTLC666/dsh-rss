# dsh-rss usage guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Installation

```bash
dsh plugin --profile web add dsh-rss
```

Restart the web service after installing. Ask your assistant to subscribe to an RSS URL or list your subscriptions; ordinary subscription management needs no configuration-file editing.

For the desktop profile, use `dsh plugin --profile desktop add dsh-rss` and reopen DSH after installation or updates. The shared web settings surface provides the panel in both shells. Update older installed versions through the plugin manager first.

## Subscription panel

Open **Settings → RSS subscriptions**. New URLs are fetched and checked before saving; the name and category are optional. Renaming or recategorizing an unchanged URL works without the remote feed being online.

Choose an OPML file (up to 1 MiB) or paste its text, review the preview, then confirm. Rejected URLs include a reason. If another page or tool changed the list, preview again without retyping. Export downloads OPML without changing subscriptions.

Cards show the most recent check/fetch time, article count or error during this run. Read-only configurations allow viewing, checking and exporting.

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
    # proxyUrl: http://127.0.0.1:7890   # optional override for the Windows system proxy
    # useSystemProxy: true             # use the enabled Windows manual proxy by default
    # fakeIpDnsFallback: true          # validate real public DNS answers when Fake-IP is detected
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

Windows uses its enabled manual proxy by default, honoring protocol selection and bypass entries. No PAC scripts are evaluated and OS settings are never modified. An explicit `proxyUrl` takes precedence; `useSystemProxy: false` disables automatic detection. Other platforms can still configure an HTTP(S) `proxyUrl`. These routes apply only to this plugin.

When native DNS returns VPN Fake-IP (`198.18.0.0/15`), only the feed hostname is sent to [Cloudflare HTTPS DNS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-json/), with Google HTTPS DNS as a service-failure fallback. No URL paths, feed content, credentials or subscription lists are sent. Answers must pass public-address checks, and actual connections are pinned to those addresses. Disable this behavior with `fakeIpDnsFallback: false`. Ordinary public DNS, private DNS and IP literals do not trigger it. Trusted internal feeds still require an explicit `allowPrivateNetwork: true`.

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
