# RSS 0.5.1 VPN / Fake-IP acceptance

Date: 2026-10-02. Host: official-source Harness `0.2.0-rc.2`, commit `639ed015397290b3745d163aafe02ffee4aa3f84`. Windows, Node 24.16.0, Undici 8.11.2.

## Reproduction and fix

Native Windows DNS returned `198.18.*` for public feed domains while FlClash remained enabled in Fake-IP mode. Version 0.5.0 rejected those answers before fetching. Version 0.5.1 uses the already-enabled manual Windows proxy and HTTPS DNS for Fake-IP answers. Feed connections are pinned to validated public addresses, with the original HTTP Host and TLS servername. Each redirect is separately validated. TLS verification and private-network protection remain enabled. Request-owned dispatchers are destroyed after completion or cancellation.

The VPN was not stopped or reconfigured. Its three process IDs and generated configuration SHA256 remained unchanged during acceptance. No user profile, API key or existing subscription was used or modified.

## Verification

- `pnpm test`: 106/106 on Windows. Includes real local CONNECT-proxy transport, preserved Host, no second socket DNS lookup, HTTPS DNS cancellation/body cap/redirect handling, private answers, opt-outs and Windows proxy parsing/bypass behavior.
- `pnpm audit --prod --registry https://registry.npmjs.org`: no known vulnerabilities.
- `node --check lib/client.js`: passed.
- Exact npm tarball installed into a fresh consumer: 34/34 relevant regressions passed. The tarball contains the compiled networking modules and client entry.
- Normal `buildRssTools` calls from that installation used production fetch/DNS without injection, the default 15-second timeout, no explicit `proxyUrl`, and `allowPrivateNetwork: false`.

| Real source | Format / entries | Check | Add / fetch / search | Incremental after tools rebuilt from disk |
| --- | --- | --- | --- | --- |
| `https://sspai.com/feed` | RSS / 10 | Pass | Pass | 10 first, 0 repeated |
| `https://blog.python.org/rss.xml` | RSS / 50 | Pass | Pass | 50 first, 0 repeated |
| `https://www.nasa.gov/feed/` | RSS / 10 | Pass | Pass | 10 first, 0 repeated |
| `https://github.com/deepseek-ai/deepseek-harness/releases.atom` | Atom / 10 | Pass | Pass | 10 first, 0 repeated |

The old Python URL `https://blog.python.org/feeds/posts/default?alt=rss` also passed. It returned a valid RSS feed without an HTTP redirect in the earlier URL diagnostic.

## Human browser operations

An isolated, keyless profile loaded the fresh tarball installation in the official host. Through Settings → RSS subscriptions, all four public feeds were entered and saved using the visible form. Every card displayed its real entry count and a passing check. Clicking the GitHub Atom check button completed successfully. Adding `http://127.0.0.1/private-feed` was rejected, retained the typed form values and left the four subscriptions intact. No console errors were recorded. Screenshots and DOM snapshots were retained in the local validation directory. The temporary browser tab and test host closed after acceptance.

This covers the shared browser settings surface and production networking. It does not constitute separate native desktop-window acceptance or live testing of other plugins.
