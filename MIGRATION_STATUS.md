# Solana Migration — Documentation Page Status

Generated 2026-04-28. Tracks every content page and its migration status from AO to Solana.

## Legend

- **REWRITTEN** — Full rewrite with new Solana content
- **UPDATED** — Targeted edits (terminology, code examples, references)
- **NEW** — New page created for Solana features
- **DELETED** — Removed (AO-only content)
- **NO CHANGE** — Chain-agnostic, no migration needed

---

## Learn Section

| Page | Status | Notes |
|------|--------|-------|
| `learn/(introduction)/index.mdx` | NO CHANGE | Navigation page |
| `learn/(introduction)/what-is-ario.mdx` | UPDATED | "Arweave and AO" → "Arweave + Solana" |
| `learn/(introduction)/what-is-arweave.mdx` | NO CHANGE | Arweave storage layer |
| `learn/(introduction)/permaweb.mdx` | NO CHANGE | Broader ecosystem; AO refs valid |
| `learn/(introduction)/ans-104-bundles.mdx` | NO CHANGE | Bundle standard |

### learn/token/

| Page | Status | Notes |
|------|--------|-------|
| `learn/token/index.mdx` | REWRITTEN | SPL Token on Solana, new architecture section |
| `learn/token/architecture.mdx` | REWRITTEN | 3+1 programs, CPI, PDA state model, new mermaid |
| `learn/token/get-the-token.mdx` | REWRITTEN | Solana canonical, Jupiter/Raydium, Phantom/Solflare |
| `learn/token/staking.mdx` | REWRITTEN | Auto-compound, accumulator, pruning, redelegation |
| `learn/token/wallets.mdx` | NEW | Phantom/Solflare/Backpack setup (replaces add-to-wander) |
| `learn/token/migration.mdx` | NEW | Import-then-claim flow, address mapping, FAQ |
| `learn/token/add-to-wander.mdx` | DELETED | Replaced by wallets.mdx |

### learn/arns/

| Page | Status | Notes |
|------|--------|-------|
| `learn/arns/index.mdx` | UPDATED | Registry on Solana, mermaid diagram, ANT=NFT |
| `learn/arns/ants.mdx` | UPDATED | Metaplex Core NFTs, 10 controller max, lazy reconciliation |
| `learn/arns/name-registration.mdx` | UPDATED | 43-char prohibition, lowercase, 50K cap, Dutch auction |
| `learn/arns/pricing-model.mdx` | UPDATED | Fee halving, cost simulation |
| `learn/arns/returned-names.mdx` | NEW | Dutch auction 50x→1x, revenue split |

### learn/gateways/

| Page | Status | Notes |
|------|--------|-------|
| `learn/gateways/index.mdx` | UPDATED | Solana for protocol state, not AO |
| `learn/gateways/architecture.mdx` | NO CHANGE | Gateway tech stack |
| `learn/gateways/data-retrieval.mdx` | NO CHANGE | Data from Arweave |
| `learn/gateways/data-verification.mdx` | NO CHANGE | Merkle verification |
| `learn/gateways/gateway-registry.mdx` | UPDATED | Solana pubkeys, 3K cap, observer uniqueness, pruning |
| `learn/gateways/pruning.mdx` | NEW | 30 failed epochs → slash + removal |
| `learn/gateways/x402-payments.mdx` | NO CHANGE | USDC on Base |

### learn/oip/

| Page | Status | Notes |
|------|--------|-------|
| `learn/oip/index.mdx` | UPDATED | "Smart Contract" → "Solana Programs" |
| `learn/oip/epoch-pipeline.mdx` | NEW | 6-step pipeline with timing and costs |
| `learn/oip/cranker.mdx` | NEW | Standalone + observer-embedded cranker |
| `learn/oip/observer-selection.mdx` | UPDATED | Slot-based entropy, collision handling |
| `learn/oip/reporting.mdx` | UPDATED | "Smart Contract" → "Solana programs" |
| `learn/oip/performance-evaluation.mdx` | UPDATED | "Smart Contract" → "Solana programs" |
| `learn/oip/reward-distribution.mdx` | UPDATED | 6-step pipeline, auto-compound, accumulator |

### learn/wayfinder/

| Page | Status | Notes |
|------|--------|-------|
| `learn/wayfinder/index.mdx` | NO CHANGE | Routing infrastructure |
| `learn/wayfinder/integration.mdx` | NO CHANGE | Chain-agnostic |
| `learn/wayfinder/use-cases.mdx` | NO CHANGE | Chain-agnostic |

---

## Build Section

| Page | Status | Notes |
|------|--------|-------|
| `build/index.mdx` | NO CHANGE | Navigation |

### build/access/

| Page | Status | Notes |
|------|--------|-------|
| `build/access/index.mdx` | NO CHANGE | |
| `build/access/arns.mdx` | NO CHANGE | Data access |
| `build/access/fetch-data.mdx` | NO CHANGE | HTTP requests |
| `build/access/find-data.mdx` | NO CHANGE | GraphQL |
| `build/access/wayfinder.mdx` | NO CHANGE | Routing |

### build/upload/

| Page | Status | Notes |
|------|--------|-------|
| `build/upload/index.mdx` | NO CHANGE | |
| `build/upload/turbo-credits.mdx` | UPDATED | AO→Solana for ARIO network labels, removed AO wallets |
| `build/upload/advanced-uploading-with-turbo.mdx` | NO CHANGE | Turbo SDK |
| `build/upload/bundling-services.mdx` | NO CHANGE | |
| `build/upload/encryption.mdx` | NO CHANGE | |
| `build/upload/manifests.mdx` | NO CHANGE | |
| `build/upload/receipts.mdx` | NO CHANGE | |
| `build/upload/tagging.mdx` | NO CHANGE | |
| `build/upload/x402-uploading-to-turbo.mdx` | NO CHANGE | |

### build/run-a-gateway/

| Page | Status | Notes |
|------|--------|-------|
| `build/run-a-gateway/index.mdx` | NO CHANGE | |
| `build/run-a-gateway/quick-start.mdx` | NO CHANGE | |
| `build/run-a-gateway/join-the-network.mdx` | UPDATED | Solana wallets, SOL fees, DEX refs |
| `build/run-a-gateway/manage/environment-variables.mdx` | UPDATED | Removed 2 AO sections, added Solana RPC, updated IO_PROCESS_ID |
| `build/run-a-gateway/manage/filters.mdx` | UPDATED | Removed compute-unit card link |
| `build/run-a-gateway/manage/cdb64.mdx` | NO CHANGE | Data indexing (AO refs are filter values) |
| `build/run-a-gateway/manage/content-moderation.mdx` | NO CHANGE | |
| `build/run-a-gateway/manage/index.mdx` | NO CHANGE | |
| `build/run-a-gateway/manage/index-snapshots.mdx` | NO CHANGE | |
| `build/run-a-gateway/manage/setting-apex-domain.mdx` | NO CHANGE | |
| `build/run-a-gateway/manage/ssl-certs.mdx` | NO CHANGE | |
| `build/run-a-gateway/manage/troubleshooting.mdx` | NO CHANGE | |
| `build/run-a-gateway/manage/upgrading-a-gateway.mdx` | NO CHANGE | |
| `build/run-a-gateway/manage/x402-setup.mdx` | NO CHANGE | |

### build/run-wayfinder-router/

| Page | Status | Notes |
|------|--------|-------|
| `build/run-wayfinder-router/index.mdx` | NO CHANGE | |
| `build/run-wayfinder-router/quick-start.mdx` | NO CHANGE | |
| `build/run-wayfinder-router/configuration.mdx` | NO CHANGE | |
| `build/run-wayfinder-router/admin-ui.mdx` | NO CHANGE | |
| `build/run-wayfinder-router/operations.mdx` | NO CHANGE | |

### build/extensions/

| Page | Status | Notes |
|------|--------|-------|
| `build/extensions/index.mdx` | UPDATED | Removed compute-unit card |
| `build/extensions/grafana.mdx` | UPDATED | Removed compute-unit card |
| `build/extensions/clickhouse.mdx` | UPDATED | Removed compute-unit card |
| `build/extensions/bundler.mdx` | UPDATED | Removed compute-unit card |
| `build/extensions/compute-unit.mdx` | DELETED | AO-only |

### build/guides/

| Page | Status | Notes |
|------|--------|-------|
| `build/guides/index.mdx` | NO CHANGE | |
| `build/guides/arns-marketplace.mdx` | UPDATED | Rewritten for Tensor/Magic Eden NFT trading |
| `build/guides/working-with-arns/index.mdx` | UPDATED | ANT=Metaplex Core NFT, ario-arns program |
| `build/guides/working-with-arns/register-arns-programmatically.mdx` | UPDATED | Solana signer, SOL fees |
| `build/guides/working-with-arns/set-arns-records-programmatically.mdx` | UPDATED | Solana signer, removed ArweaveSigner |
| `build/guides/working-with-arns/purchase-arns-ui.mdx` | NO CHANGE | UI guide (screenshots TBD later) |
| `build/guides/working-with-arns/manage-arns-ui.mdx` | NO CHANGE | UI guide (screenshots TBD later) |
| `build/guides/working-with-arns/arns-primary-names.mdx` | NO CHANGE | |
| `build/guides/hosting-decentralised-apps/index.mdx` | NO CHANGE | |
| `build/guides/hosting-decentralised-apps/deploying-with-arlink.mdx` | NO CHANGE | |
| `build/guides/hosting-decentralised-apps/deploying-with-permaweb-deploy.mdx` | NO CHANGE | |
| `build/guides/hosting-decentralised-apps/hosting-with-ardrive.mdx` | NO CHANGE | |
| `build/guides/hosting-decentralised-apps/using-undernames-for-versioning.mdx` | NO CHANGE | |
| `build/guides/using-turbo-in-a-browser/index.mdx` | NO CHANGE | |
| `build/guides/using-turbo-in-a-browser/html.mdx` | NO CHANGE | |
| `build/guides/using-turbo-in-a-browser/nextjs.mdx` | NO CHANGE | |
| `build/guides/using-turbo-in-a-browser/vite.mdx` | NO CHANGE | |
| `build/guides/depin.mdx` | NO CHANGE | DePIN concepts |
| `build/guides/application-distribution.mdx` | NO CHANGE | |
| `build/guides/encrypted-data-nillion.mdx` | NO CHANGE | |
| `build/guides/crossmint-nft-minting-app.mdx` | NO CHANGE | |
| `build/guides/storing-nfts.mdx` | NO CHANGE | |

### build/advanced/

| Page | Status | Notes |
|------|--------|-------|
| `build/advanced/index.mdx` | NO CHANGE | |
| `build/advanced/arfs/index.mdx` | NO CHANGE | |
| `build/advanced/arfs/creating-drives.mdx` | NO CHANGE | |
| `build/advanced/arfs/data-model.mdx` | NO CHANGE | |
| `build/advanced/arfs/entity-types.mdx` | NO CHANGE | |
| `build/advanced/arfs/privacy.mdx` | NO CHANGE | |
| `build/advanced/arfs/reading-data.mdx` | NO CHANGE | |
| `build/advanced/arfs/upgrading-drives.mdx` | NO CHANGE | |
| `build/advanced/normalized-addresses.mdx` | NO CHANGE | |
| `build/advanced/sandboxing.mdx` | NO CHANGE | |
| `build/advanced/ethareum.mdx` | NO CHANGE | |

---

## SDKs Section

| Page | Status | Notes |
|------|--------|-------|
| `sdks/index.mdx` | UPDATED | "smart contracts" → "Solana programs" |

### sdks/ar-io-sdk/

| Page | Status | Notes |
|------|--------|-------|
| `sdks/ar-io-sdk/index.mdx` | UPDATED | "AO contract" → "Solana program" |
| `sdks/ar-io-sdk/token-conversion.mdx` | UPDATED | "process" → "protocol" |
| `sdks/ar-io-sdk/pagination.mdx` | NO CHANGE | SDK pagination patterns |
| `sdks/ar-io-sdk/logging.mdx` | NO CHANGE | |
| `sdks/ar-io-sdk/(ario-contract)/configuration.mdx` | REWRITTEN | Solana RPC config, legacy footnote |
| `sdks/ar-io-sdk/(ario-contract)/networks.mdx` | REWRITTEN | Program addresses, Solana devnet |
| `sdks/ar-io-sdk/(ario-contract)/general.mdx` | REWRITTEN | Solana signers as default |
| `sdks/ar-io-sdk/(ario-contract)/arweave-name-system-arns.mdx` | UPDATED | mint address, minting-ant callback |
| `sdks/ar-io-sdk/(ario-contract)/epochs.mdx` | NO CHANGE | API responses (verify post-launch) |
| `sdks/ar-io-sdk/(ario-contract)/gateways.mdx` | NO CHANGE | API methods unchanged |
| `sdks/ar-io-sdk/(ario-contract)/primary-names.mdx` | NO CHANGE | API methods unchanged |
| `sdks/ar-io-sdk/(ario-contract)/vaults.mdx` | NO CHANGE | API methods unchanged |
| `sdks/ar-io-sdk/(ant-contracts)/initialize.mdx` | UPDATED | Solana wallet adapter + mint address |
| `sdks/ar-io-sdk/(ant-contracts)/spawn.mdx` | UPDATED | "Spawns AO process" → "Mints Metaplex Core NFT" |
| `sdks/ar-io-sdk/(ant-contracts)/static-methods.mdx` | UPDATED | Fork → new NFT, Solana signers |
| `sdks/ar-io-sdk/(ant-contracts)/upgrade.mdx` | UPDATED | Metaplex Core schema versioning |
| `sdks/ar-io-sdk/(ant-contracts)/transfer.mdx` | UPDATED | "Arweave address" → "Solana address" |
| `sdks/ar-io-sdk/(ant-contracts)/ario-integrations.mdx` | UPDATED | PROCESS_ID → PROGRAM_ID |
| `sdks/ar-io-sdk/(ant-contracts)/records.mdx` | NO CHANGE | API unchanged |
| `sdks/ar-io-sdk/(ant-contracts)/controllers.mdx` | NO CHANGE | |
| `sdks/ar-io-sdk/(ant-contracts)/metadata.mdx` | NO CHANGE | |
| `sdks/ar-io-sdk/(ant-contracts)/balances.mdx` | NO CHANGE | |
| `sdks/ar-io-sdk/(ant-contracts)/state.mdx` | NO CHANGE | |
| `sdks/ar-io-sdk/(ant-contracts)/undername-ownership.mdx` | NO CHANGE | |
| `sdks/ar-io-sdk/(ant-contracts)/versions.mdx` | NO CHANGE | |

### sdks/turbo-sdk/ (11 pages)

| Page | Status | Notes |
|------|--------|-------|
| `sdks/turbo-sdk/index.mdx` | NO CHANGE | Independent service |
| `sdks/turbo-sdk/logging.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/turbo-credit-sharing.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/(apis)/turbofactory.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/(apis)/turboauthenticatedclient.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/(apis)/turbounauthenticatedclient.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/(events)/file-upload-events.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/(events)/folder-upload-events.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/(signers)/arweave.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/(signers)/base.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/(signers)/ethereum.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/(signers)/kyve.mdx` | NO CHANGE | |
| `sdks/turbo-sdk/(signers)/solana.mdx` | NO CHANGE | |

### sdks/ardrive-core-js/ (16 pages)

| Page | Status | Notes |
|------|--------|-------|
| All pages | NO CHANGE | ArDrive SDK, chain-agnostic |

### sdks/(clis)/ardrive-cli/ (~40 pages)

| Page | Status | Notes |
|------|--------|-------|
| All pages | NO CHANGE | ArDrive CLI, chain-agnostic |

### sdks/wayfinder/ (~12 pages)

| Page | Status | Notes |
|------|--------|-------|
| All pages | NO CHANGE | Wayfinder SDK, chain-agnostic |

---

## APIs Section

| Page | Status | Notes |
|------|--------|-------|
| `apis/index.mdx` | NO CHANGE | |
| `apis/ar-io-node/*.mdx` (13 pages) | NO CHANGE | Gateway API, chain-agnostic |
| `apis/turbo/**/*.mdx` (12 pages) | NO CHANGE | Turbo service APIs |

---

## Glossary

| Page | Status | Notes |
|------|--------|-------|
| `glossary/index.mdx` | UPDATED | Updated AO def, added 7 Solana terms |

---

## Summary

| Status | Count |
|--------|-------|
| REWRITTEN | 7 |
| UPDATED | 33 |
| NEW | 6 |
| DELETED | 2 |
| NO CHANGE | ~207 |
| **Total** | **255** |

## Remaining TODOs

- [ ] Replace `<ARIO_MINT_ADDRESS>` and `<ARIO_PROGRAM_ID>` placeholders with final addresses before launch
- [ ] Update UI screenshots in `purchase-arns-ui.mdx` and `manage-arns-ui.mdx` once Solana UI is live
- [ ] Run `npm run build` to verify no broken MDX
- [ ] Run `npm run check-links` to validate all internal links
- [ ] Run `npm run generate-all-docs` to regenerate LLM text files
- [ ] Verify `turbo-credits.mdx` with Turbo team once ARIO payment chain is finalized
