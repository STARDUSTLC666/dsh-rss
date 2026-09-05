import { buildRssTools as buildTools } from '../lib/index.js'

// Both transports are explicit: replacing fetch must never leave tests using real DNS.
export const publicLookup = async () => [{ address: '93.184.216.34', family: 4 }]
export const buildRssTools = (config, scope, fetchImpl) => buildTools(config, scope, fetchImpl, publicLookup)
