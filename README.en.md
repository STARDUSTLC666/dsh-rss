# dsh-rss

## 0.5.1 update (2026-10-02)

Fixes public feeds being rejected when a VPN returns Fake-IP DNS addresses. Windows uses the enabled manual system proxy by default. For `198.18.0.0/15` answers, HTTPS DNS obtains real public addresses; connections are pinned to validated addresses while preserving the original hostname and TLS certificate verification. Keep the VPN enabled without changing its configuration or allowing private networks. Request-owned connections are released after redirects, errors or body reads.

All 106 Windows tests pass. With the VPN enabled and native DNS returning Fake-IP, normal plugin calls pass check/add/fetch/persisted incremental deduplication/search for SSPAI, Python Insider, NASA and GitHub Atom, with no injected DNS or fetch results. The legacy Python feed URL also remains readable. These results do not establish separate native desktop UI acceptance.

## 0.5.0 update (2026-10-02)

Adds **Settings → RSS subscriptions** with add/edit/remove, search, category filters, feed checks and OPML import/export. The panel and conversation tools share the existing subscription list. No migration is needed. UI labels follow the host language and appearance settings.

Import previews new feeds, duplicate changes and rejected items before confirmation. Existing labels/categories are preserved by default; updates require an explicit checkbox. Failed saves and stale previews preserve your input. Removing a feed requires confirmation of its name and URL.

Fixes partial imports of malformed XML, acceptance of invalid URLs or embedded credentials, and lost subscriptions during concurrent additions. Check history lasts for the current DSH run; importing does not fetch every feed.

All 94 Windows tests pass. Actual browser interaction in official-source Harness `0.2.0-rc.2` covers add/edit/filter/check/import/remove, Tab/Enter/Escape, two-page conflicts and restart persistence. Native desktop and narrow-screen interaction remain unverified in this run. Synthetic feeds do not establish production-network compatibility.

## 0.4.3 update (2026-10-01)

Fixes URL comparison for add, remove, OPML import and search. Schemes, hosts and default ports are normalized while case-sensitive paths and query parameters remain distinct, preventing unrelated subscriptions from being merged or removed. Existing Fake-IP DNS guidance and reserved-address checks remain available.

Validation host: Harness `0.2.0-rc.2` built from official sources (commit `639ed01539`) on 2026-10-01. All 81 Windows tests, the 18-plugin co-load and nine RSS tool contracts pass. Production external feeds still require separate network validation.

![npm](https://img.shields.io/npm/v/dsh-rss) ![downloads](https://img.shields.io/npm/dm/dsh-rss) ![license](https://img.shields.io/github/license/STARDUSTLC666/dsh-rss) ![stars](https://img.shields.io/github/stars/STARDUSTLC666/dsh-rss?style=social)

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

DSH (DeepSeek Harness) plugin for RSS/Atom subscriptions: manage feeds, fetch and parse RSS 0.9x / 1.0 / 2.0 and Atom, with OPML bulk import/export, exposing nine model-facing tools.

## Compatibility

Version 0.4.0 supports the declarative settings interface introduced in Harness **0.1.7**. The current baseline is official-source **0.2.0-rc.2**. All 18 plugins load together; tool contracts, subscription updates and restart persistence pass in isolation. Live feeds require working network access. Requires Node 22.19 or later within 22.x, or 24 or later.

Fetches honor the Harness cancellation signal through DNS, response streaming, and cross-feed searches. Hostname preflight checks reject loopback, private, and link-local addresses by default, including redirect destinations. Set `allowPrivateNetwork: true` for trusted internal feeds.

`rss_opml_export.path` is relative to the calling session's workspace, with an existing parent directory. Absolute paths, traversal, and links outside the workspace are rejected; the result returns the absolute written path. File writes request Harness approval by default (`opmlWriteApproval: false` disables this gate). Omit `path` to return only OPML text.

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
