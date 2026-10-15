import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

for (const mode of ['direct', 'proxy-tls', 'proxy-abort', 'direct-https', 'proxy-https', 'proxy-bad-cert']) {
  test('failed RSS ' + mode + ' connection and late socket errors stay inside the request (#2)', () => {
    const result = spawnSync(process.execPath, [fileURLToPath(new URL('./fixtures/connection-error-child.mjs', import.meta.url)), mode], {
      encoding: 'utf8', timeout: 6000,
      env: { ...process.env, NODE_EXTRA_CA_CERTS: fileURLToPath(new URL('./fixtures/rss-test-cert.pem', import.meta.url)) },
    })
    assert.equal(result.status, 0, String(result.error ?? '') + result.stderr)
    assert.match(result.stdout, new RegExp('SURVIVED ' + mode))
  })
}
