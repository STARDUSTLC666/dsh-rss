# Historical release notes

[Current changelog](../CHANGELOG.md) · [Overview](../README.en.md)

These English notes preserve the earlier translations. The main changelog contains the consolidated version history.

## 0.5.1 (2026-10-02)

Fixes public feeds being rejected when a VPN returns Fake-IP DNS addresses. Windows uses the enabled manual system proxy by default. For `198.18.0.0/15` answers, HTTPS DNS obtains real public addresses; connections are pinned to validated addresses while preserving the original hostname and TLS certificate verification. Keep the VPN enabled without changing its configuration or allowing private networks. Request-owned connections are released after redirects, errors or body reads.

All 106 Windows tests pass. With the VPN enabled and native DNS returning Fake-IP, normal plugin calls pass check/add/fetch/persisted incremental deduplication/search for SSPAI, Python Insider, NASA and GitHub Atom, with no injected DNS or fetch results. The legacy Python feed URL also remains readable. These results do not establish separate native desktop UI acceptance.

## 0.5.0 (2026-10-02)

Adds **Settings → RSS subscriptions** with add/edit/remove, search, category filters, feed checks and OPML import/export. The panel and conversation tools share the existing subscription list. No migration is needed. UI labels follow the host language and appearance settings.

Import previews new feeds, duplicate changes and rejected items before confirmation. Existing labels/categories are preserved by default; updates require an explicit checkbox. Failed saves and stale previews preserve your input. Removing a feed requires confirmation of its name and URL.

Fixes partial imports of malformed XML, acceptance of invalid URLs or embedded credentials, and lost subscriptions during concurrent additions. Check history lasts for the current DSH run; importing does not fetch every feed.

All 94 Windows tests pass. Actual browser interaction in official-source Harness `0.2.0-rc.2` covers add/edit/filter/check/import/remove, Tab/Enter/Escape, two-page conflicts and restart persistence. Native desktop and narrow-screen interaction remain unverified in this run. Synthetic feeds do not establish production-network compatibility.

## 0.4.3 (2026-10-01)

Fixes URL comparison for add, remove, OPML import and search. Schemes, hosts and default ports are normalized while case-sensitive paths and query parameters remain distinct, preventing unrelated subscriptions from being merged or removed. Existing Fake-IP DNS guidance and reserved-address checks remain available.

Validation host: Harness `0.2.0-rc.2` built from official sources (commit `639ed01539`) on 2026-10-01. All 81 Windows tests, the 18-plugin co-load and nine RSS tool contracts pass. Production external feeds still require separate network validation.
