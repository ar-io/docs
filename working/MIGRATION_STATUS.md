# Solana Migration — Documentation Page Status

Updated 2026-04-29. Tracks every content page and its migration status from AO to Solana.

## Legend

- ✅ **DONE - REWRITTEN / UPDATED / NEW / MOVED / NO CHANGE** — Reviewed and complete
- 🗑️ **DONE - DELETED** — Removed page or deprecated AO-only content
- ⚠️ **NEEDS UPDATING** — Attention needed before launch
- ⏳ **PENDING - REWRITTEN / UPDATED / NEW / DELETED / NO CHANGE** — Migration type identified, but not yet reviewed in this pass

---

## Learn Section (IN PROGRESS)

| Page | Status | Notes |
|------|--------|-------|
| `learn/(introduction)/index.mdx` | ✅ DONE - UPDATED | arns.app → arns.ar.io |
| `learn/(introduction)/what-is-ario.mdx` | ✅ DONE - UPDATED | "Arweave and AO" → "Arweave + Solana" |
| `learn/(introduction)/protocol-architecture.mdx` | ✅ DONE - MOVED+UPDATED | Moved from `learn/token/architecture.mdx`; protocol-level 3+1 Solana programs |
| `learn/(introduction)/what-is-arweave.mdx` | ✅ DONE - NO CHANGE | Arweave storage layer |
| `learn/(introduction)/what-is-permaweb.mdx` | 🗑️ DONE - DELETED | Removed standalone page; light permaweb context moved into `what-is-ario.mdx` |
| `learn/(introduction)/ans-104-bundles.mdx` | ✅ DONE - NO CHANGE | Bundle standard |

### learn/token/

| Page | Status | Notes |
|------|--------|-------|
| `learn/token/index.mdx` | ✅ DONE - REWRITTEN | Trimmed to lightweight Solana token overview and hub |
| `learn/token/architecture.mdx` | ✅ DONE - MOVED | Moved to `learn/(introduction)/protocol-architecture.mdx` |
| `learn/token/get-the-token.mdx` | ⚠️ NEEDS UPDATING | Solana canonical, Jupiter/Raydium, Phantom/Solflare |
| `learn/token/wallets.mdx` | ✅ DONE - NEW | Phantom/Solflare/Backpack setup (replaces add-to-wander) |
| `learn/token/staking.mdx` | ✅ DONE - REWRITTEN | Auto-compound, accumulator, pruning, redelegation, SOL cost estimates |
| `learn/token/migration.mdx` | ⚠️ NEEDS UPDATING | Import-then-claim flow, address mapping, FAQ |
| `learn/token/add-to-wander.mdx` | 🗑️ DONE - DELETED | Replaced by wallets.mdx |

### learn/arns/

| Page | Status | Notes |
|------|--------|-------|
| `learn/arns/index.mdx` | ✅ DONE - UPDATED | Solana registry, ANT routing, arns.ar.io examples |
| `learn/arns/ants.mdx` | ✅ DONE - UPDATED | Metaplex Core NFTs, controller model, lazy reconciliation |
| `learn/arns/name-registration.mdx` | ✅ DONE - UPDATED | Lease/permanent model, validation, returned-name lifecycle |
| `learn/arns/pricing-model.mdx` | ✅ DONE - UPDATED | Trimmed formula-heavy content into conceptual pricing overview |
| `learn/arns/returned-names.mdx` | ✅ DONE - NEW | Simplified Dutch auction lifecycle and revenue split |

### learn/gateways/

| Page | Status | Notes |
|------|--------|-------|
| `learn/gateways/index.mdx` | ⏳ PENDING - UPDATED | Solana for protocol state, not AO |
| `learn/gateways/architecture.mdx` | ⏳ PENDING - NO CHANGE | Gateway tech stack |
| `learn/gateways/data-retrieval.mdx` | ⏳ PENDING - NO CHANGE | Data from Arweave |
| `learn/gateways/data-verification.mdx` | ⏳ PENDING - NO CHANGE | Merkle verification |
| `learn/gateways/gateway-registry.mdx` | ⏳ PENDING - UPDATED | Solana pubkeys, 3K cap, observer uniqueness, pruning |
| `learn/gateways/pruning.mdx` | ⏳ PENDING - NEW | 30 failed epochs → slash + removal |
| `learn/gateways/x402-payments.mdx` | ⏳ PENDING - NO CHANGE | USDC on Base |

### learn/oip/

| Page | Status | Notes |
|------|--------|-------|
| `learn/oip/index.mdx` | ⏳ PENDING - UPDATED | "Solana Programs" in mermaid + text |
| `learn/oip/epoch-pipeline.mdx` | ⏳ PENDING - NEW | 6-step pipeline with timing and costs |
| `learn/oip/cranker.mdx` | ⏳ PENDING - NEW | Standalone + observer-embedded cranker |
| `learn/oip/observer-selection.mdx` | ⏳ PENDING - UPDATED | Slot-based entropy, collision handling |
| `learn/oip/reporting.mdx` | ⏳ PENDING - UPDATED | "onchain observations" terminology |
| `learn/oip/performance-evaluation.mdx` | ⏳ PENDING - UPDATED | "Solana programs", "onchain observations" |
| `learn/oip/reward-distribution.mdx` | ⏳ PENDING - UPDATED | 6-step pipeline, auto-compound, accumulator |

### learn/wayfinder/

| Page | Status | Notes |
|------|--------|-------|
| `learn/wayfinder/index.mdx` | ⏳ PENDING - NO CHANGE | Routing infrastructure |
| `learn/wayfinder/integration.mdx` | ⏳ PENDING - NO CHANGE | Chain-agnostic |
| `learn/wayfinder/use-cases.mdx` | ⏳ PENDING - NO CHANGE | Chain-agnostic |

---

## Build Section

| Page | Status | Notes |
|------|--------|-------|
| `build/index.mdx` | ⏳ PENDING - NO CHANGE | Navigation |

### build/access/

| Page | Status | Notes |
|------|--------|-------|
| `build/access/index.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/access/arns.mdx` | ⏳ PENDING - UPDATED | arns.ar.io |
| `build/access/fetch-data.mdx` | ⏳ PENDING - NO CHANGE | HTTP requests |
| `build/access/find-data.mdx` | ⏳ PENDING - NO CHANGE | GraphQL |
| `build/access/wayfinder.mdx` | ⏳ PENDING - NO CHANGE | Routing |

### build/upload/

| Page | Status | Notes |
|------|--------|-------|
| `build/upload/index.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/upload/turbo-credits.mdx` | ⏳ PENDING - UPDATED | ARIO on Solana network labels, removed AO wallet rows |
| `build/upload/advanced-uploading-with-turbo.mdx` | ⏳ PENDING - NO CHANGE | Turbo SDK (Arweave wallets correct for data uploads) |
| `build/upload/bundling-services.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/upload/encryption.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/upload/manifests.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/upload/receipts.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/upload/tagging.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/upload/x402-uploading-to-turbo.mdx` | ⏳ PENDING - NO CHANGE | |

### build/run-a-gateway/

| Page | Status | Notes |
|------|--------|-------|
| `build/run-a-gateway/index.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/run-a-gateway/quick-start.mdx` | ⏳ PENDING - UPDATED | Solana pubkey format for wallets, observer uniqueness, SOL note |
| `build/run-a-gateway/join-the-network.mdx` | ⏳ PENDING - UPDATED | Solana wallets, SOL fees, DEX refs, keypair CLI example |
| `build/run-a-gateway/manage/solana-migration.mdx` | ⏳ PENDING - NEW | Step-by-step operator migration guide (keypair, SOL, .env, risks) |
| `build/run-a-gateway/manage/upgrading-a-gateway.mdx` | ⏳ PENDING - NO CHANGE | Generic upgrade process |
| `build/run-a-gateway/manage/environment-variables.mdx` | ⏳ PENDING - UPDATED | Removed AO sections, added Solana RPC with provider guidance |
| `build/run-a-gateway/manage/filters.mdx` | ⏳ PENDING - UPDATED | Removed compute-unit card |
| `build/run-a-gateway/manage/setting-apex-domain.mdx` | ⏳ PENDING - UPDATED | arns.ar.io |
| `build/run-a-gateway/manage/cdb64.mdx` | ⏳ PENDING - NO CHANGE | Data indexing (AO refs are filter values) |
| `build/run-a-gateway/manage/content-moderation.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/run-a-gateway/manage/index.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/run-a-gateway/manage/index-snapshots.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/run-a-gateway/manage/ssl-certs.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/run-a-gateway/manage/troubleshooting.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/run-a-gateway/manage/x402-setup.mdx` | ⏳ PENDING - NO CHANGE | |

### build/run-wayfinder-router/

| Page | Status | Notes |
|------|--------|-------|
| All 5 pages | ⏳ PENDING - NO CHANGE | Chain-agnostic |

### build/extensions/

| Page | Status | Notes |
|------|--------|-------|
| `build/extensions/index.mdx` | ⏳ PENDING - UPDATED | Removed compute-unit card |
| `build/extensions/grafana.mdx` | ⏳ PENDING - UPDATED | Removed compute-unit card |
| `build/extensions/clickhouse.mdx` | ⏳ PENDING - UPDATED | Removed compute-unit card |
| `build/extensions/bundler.mdx` | ⏳ PENDING - UPDATED | Removed compute-unit card |
| `build/extensions/compute-unit.mdx` | ⏳ PENDING - DELETED | AO-only |

### build/guides/

| Page | Status | Notes |
|------|--------|-------|
| `build/guides/index.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/guides/arns-marketplace.mdx` | ⏳ PENDING - UPDATED | Rewritten for Tensor/Magic Eden NFT trading |
| `build/guides/working-with-arns/index.mdx` | ⏳ PENDING - UPDATED | ANT=Metaplex Core NFT, ario-ant program, arns.ar.io |
| `build/guides/working-with-arns/register-arns-programmatically.mdx` | ⏳ PENDING - UPDATED | Solana signer, SOL fees, @solana/kit reference |
| `build/guides/working-with-arns/set-arns-records-programmatically.mdx` | ⏳ PENDING - UPDATED | Solana signer, removed ArweaveSigner |
| `build/guides/working-with-arns/purchase-arns-ui.mdx` | ⏳ PENDING - UPDATED | arns.ar.io |
| `build/guides/working-with-arns/manage-arns-ui.mdx` | ⏳ PENDING - UPDATED | arns.ar.io |
| `build/guides/working-with-arns/arns-primary-names.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/guides/hosting-decentralised-apps/index.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/guides/hosting-decentralised-apps/deploying-with-arlink.mdx` | ⏳ PENDING - UPDATED | arns.ar.io |
| `build/guides/hosting-decentralised-apps/deploying-with-permaweb-deploy.mdx` | ⏳ PENDING - UPDATED | arns.ar.io |
| `build/guides/hosting-decentralised-apps/hosting-with-ardrive.mdx` | ⏳ PENDING - UPDATED | arns.ar.io (was arns.arweave.net) |
| `build/guides/hosting-decentralised-apps/using-undernames-for-versioning.mdx` | ⏳ PENDING - UPDATED | arns.ar.io |
| `build/guides/using-turbo-in-a-browser/index.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/guides/using-turbo-in-a-browser/html.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/guides/using-turbo-in-a-browser/nextjs.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/guides/using-turbo-in-a-browser/vite.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/guides/depin.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/guides/application-distribution.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/guides/encrypted-data-nillion.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/guides/crossmint-nft-minting-app.mdx` | ⏳ PENDING - UPDATED | arns.ar.io |
| `build/guides/storing-nfts.mdx` | ⏳ PENDING - NO CHANGE | |

### build/advanced/

| Page | Status | Notes |
|------|--------|-------|
| `build/advanced/index.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/advanced/arfs/*.mdx` (6 pages) | ⏳ PENDING - NO CHANGE | ArFS |
| `build/advanced/normalized-addresses.mdx` | ⏳ PENDING - UPDATED | Removed AO process reference |
| `build/advanced/sandboxing.mdx` | ⏳ PENDING - NO CHANGE | |
| `build/advanced/ethareum.mdx` | ⏳ PENDING - NO CHANGE | |

---

## SDKs Section

| Page | Status | Notes |
|------|--------|-------|
| `sdks/index.mdx` | ⏳ PENDING - UPDATED | "Solana programs" |

### sdks/ar-io-sdk/

| Page | Status | Notes |
|------|--------|-------|
| `sdks/ar-io-sdk/index.mdx` | ⏳ PENDING - UPDATED | "Solana program", v3.23+ callout, @solana/kit install note |
| `sdks/ar-io-sdk/token-conversion.mdx` | ⏳ PENDING - UPDATED | "process" → "protocol" |
| `sdks/ar-io-sdk/pagination.mdx` | ⏳ PENDING - NO CHANGE | |
| `sdks/ar-io-sdk/logging.mdx` | ⏳ PENDING - NO CHANGE | |
| `sdks/ar-io-sdk/(ario-contract)/configuration.mdx` | ⏳ PENDING - REWRITTEN | Solana RPC, @solana/kit install, version callout, RPC provider guidance, SOL costs |
| `sdks/ar-io-sdk/(ario-contract)/networks.mdx` | ⏳ PENDING - REWRITTEN | Program addresses, Solana devnet |
| `sdks/ar-io-sdk/(ario-contract)/general.mdx` | ⏳ PENDING - REWRITTEN | Solana signers with @solana/kit example, @solana/kit install note |
| `sdks/ar-io-sdk/(ario-contract)/arweave-name-system-arns.mdx` | ⏳ PENDING - UPDATED | processId field note, mint address, minting-ant callback, Solana signers |
| `sdks/ar-io-sdk/(ario-contract)/epochs.mdx` | ⏳ PENDING - UPDATED | Solana signer in saveObservations |
| `sdks/ar-io-sdk/(ario-contract)/gateways.mdx` | ⏳ PENDING - UPDATED | Solana signers (12 instances), removed autoStake, Solana observer address |
| `sdks/ar-io-sdk/(ario-contract)/primary-names.mdx` | ⏳ PENDING - UPDATED | Solana signers, processId → ANT owner note |
| `sdks/ar-io-sdk/(ario-contract)/vaults.mdx` | ⏳ PENDING - UPDATED | Solana signers (5 instances) |
| `sdks/ar-io-sdk/(ant-contracts)/initialize.mdx` | ⏳ PENDING - UPDATED | Solana wallet adapter + mint address |
| `sdks/ar-io-sdk/(ant-contracts)/spawn.mdx` | ⏳ PENDING - UPDATED | "Mints Metaplex Core NFT", Solana signer |
| `sdks/ar-io-sdk/(ant-contracts)/static-methods.mdx` | ⏳ PENDING - UPDATED | Fork → new NFT, Solana signers |
| `sdks/ar-io-sdk/(ant-contracts)/upgrade.mdx` | ⏳ PENDING - UPDATED | Metaplex Core schema versioning |
| `sdks/ar-io-sdk/(ant-contracts)/transfer.mdx` | ⏳ PENDING - UPDATED | "Solana address", Metaplex Core transfer |
| `sdks/ar-io-sdk/(ant-contracts)/ario-integrations.mdx` | ⏳ PENDING - UPDATED | PROCESS_ID → PROGRAM_ID |
| `sdks/ar-io-sdk/(ant-contracts)/undername-ownership.mdx` | ⏳ PENDING - UPDATED | Solana signer |
| `sdks/ar-io-sdk/(ant-contracts)/records.mdx` | ⏳ PENDING - NO CHANGE | |
| `sdks/ar-io-sdk/(ant-contracts)/controllers.mdx` | ⏳ PENDING - NO CHANGE | |
| `sdks/ar-io-sdk/(ant-contracts)/metadata.mdx` | ⏳ PENDING - NO CHANGE | |
| `sdks/ar-io-sdk/(ant-contracts)/balances.mdx` | ⏳ PENDING - NO CHANGE | |
| `sdks/ar-io-sdk/(ant-contracts)/state.mdx` | ⏳ PENDING - NO CHANGE | |
| `sdks/ar-io-sdk/(ant-contracts)/versions.mdx` | ⏳ PENDING - NO CHANGE | |

### sdks/turbo-sdk/ (13 pages)

| Page | Status | Notes |
|------|--------|-------|
| All pages | ⏳ PENDING - NO CHANGE | Independent service, Arweave wallets correct for data uploads |

### sdks/ardrive-core-js/ (16 pages)

| Page | Status | Notes |
|------|--------|-------|
| All pages | ⏳ PENDING - NO CHANGE | ArDrive SDK |

### sdks/(clis)/ardrive-cli/ (~40 pages)

| Page | Status | Notes |
|------|--------|-------|
| All pages | ⏳ PENDING - NO CHANGE | ArDrive CLI |

### sdks/wayfinder/ (~12 pages)

| Page | Status | Notes |
|------|--------|-------|
| All pages | ⏳ PENDING - NO CHANGE | Wayfinder SDK |

---

## APIs Section

| Page | Status | Notes |
|------|--------|-------|
| `apis/index.mdx` | ⏳ PENDING - NO CHANGE | |
| `apis/ar-io-node/*.mdx` (13 pages) | ⏳ PENDING - NO CHANGE | Gateway API, chain-agnostic |
| `apis/turbo/**/*.mdx` (12 pages) | ⏳ PENDING - NO CHANGE | Turbo service APIs |

---

## Glossary

| Page | Status | Notes |
|------|--------|-------|
| `glossary/index.mdx` | ⏳ PENDING - UPDATED | Updated AO def, added 7 Solana terms |

---

## Summary

| Status | Scope |
|--------|-------|
| ✅ Done | `learn/(introduction)` and completed `learn/token` pages |
| ⚠️ Needs updating | `learn/token/get-the-token.mdx`, `learn/token/migration.mdx` |
| ⏳ Pending | `learn/arns` onward, Build, SDKs, APIs, Glossary |

## Remaining TODOs

- [ ] Replace `<ARIO_MINT_ADDRESS>` and `<ARIO_PROGRAM_ID>` placeholders with final addresses before launch
- [ ] Regenerate SDK output examples from Solana devnet (`npm run generate-sdk-docs`) — 8 files still show Arweave-format addresses in JSON output
- [ ] Update UI screenshots in `purchase-arns-ui.mdx` and `manage-arns-ui.mdx` once Solana UI is live
- [ ] Run `npm run generate-all-docs` to regenerate LLM text files
- [ ] Verify turbo-credits.mdx with Turbo team once ARIO Solana payment is finalized
