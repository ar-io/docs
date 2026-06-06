# Solana Migration — Documentation Page Status

Updated 2026-06-05. Tracks every content page and its migration status from AO to Solana.

## Legend

- ✅ **DONE - REWRITTEN / UPDATED / NEW / MOVED / NO CHANGE** — Reviewed and complete
- 🗑️ **DONE - DELETED** — Removed page or deprecated AO-only content
- ⚠️ **NEEDS UPDATING** — Attention needed before launch
- 🔎 **NEEDS TECHNICAL REVIEW** — Light pass complete, but exact product/operator behavior should be verified
- ⏳ **PENDING - REWRITTEN / UPDATED / NEW / DELETED / NO CHANGE** — Migration type identified, but not yet reviewed in this branch

---

## Learn Section (IN PROGRESS)

| Page | Status | Notes |
|------|--------|-------|
| `learn/(introduction)/index.mdx` | ✅ DONE - UPDATED | arns.app → arns.ar.io |
| `learn/(introduction)/what-is-ario.mdx` | ✅ DONE - UPDATED | "Arweave and AO" → "Arweave + Solana" |
| `learn/(introduction)/protocol-architecture.mdx` | ✅ DONE - MOVED+UPDATED | Moved from `learn/token/architecture.mdx`; protocol-level 3+1 Solana programs; links to canonical mainnet addresses |
| `learn/(introduction)/what-is-arweave.mdx` | ✅ DONE - NO CHANGE | Arweave storage layer |
| `learn/(introduction)/what-is-permaweb.mdx` | 🗑️ DONE - DELETED | Removed standalone page; light permaweb context moved into `what-is-ario.mdx` |
| `learn/(introduction)/ans-104-bundles.mdx` | ✅ DONE - NO CHANGE | Bundle standard |

### learn/token/

| Page | Status | Notes |
|------|--------|-------|
| `learn/token/index.mdx` | ✅ DONE - REWRITTEN | Trimmed to lightweight Solana token overview and hub; includes canonical ARIO mint and mainnet program IDs |
| `learn/token/architecture.mdx` | ✅ DONE - MOVED | Moved to `learn/(introduction)/protocol-architecture.mdx` |
| `learn/token/get-the-token.mdx` | ✅ DONE - UPDATED | Solana canonical, Jupiter/Raydium, Phantom/Solflare; minimum gateway stake updated to 20,000 ARIO; canonical mint and Solscan link added |
| `learn/token/wallets.mdx` | ✅ DONE - NEW | Phantom/Solflare/Backpack setup (replaces add-to-wander); canonical mint added for manual token import |
| `learn/token/staking.mdx` | ✅ DONE - MOVED | Moved to `learn/oip/staking.mdx`; staking belongs with the incentive protocol section |
| `learn/token/migration.mdx` | 🗑️ DONE - DELETED | Removed standalone migration page; was provisional with unresolved dates/claim details |
| `learn/token/add-to-wander.mdx` | 🗑️ DONE - DELETED | Replaced by wallets.mdx |

### learn/arns/

| Page | Status | Notes |
|------|--------|-------|
| `learn/arns/index.mdx` | ✅ DONE - UPDATED | Solana registry, ANT routing, arns.ar.io examples |
| `learn/arns/ants.mdx` | ✅ DONE - UPDATED | Metaplex Core NFTs, controller model, lazy reconciliation |
| `learn/arns/name-registration.mdx` | ✅ DONE - UPDATED | Lease/permanent model, validation, returned-name lifecycle; primary-name fee and uniqueness rules aligned with v3.0.0 |
| `learn/arns/pricing-model.mdx` | ✅ DONE - UPDATED | Trimmed formula-heavy content into conceptual pricing overview; gateway operator discount criteria added |
| `learn/arns/returned-names.mdx` | ✅ DONE - NEW | Simplified Dutch auction lifecycle and revenue split |

### learn/gateways/

| Page | Status | Notes |
|------|--------|-------|
| `learn/gateways/index.mdx` | ✅ DONE - UPDATED | Current gateway overview; Solana limited to protocol coordination |
| `learn/gateways/architecture.mdx` | ✅ DONE - UPDATED | Light terminology cleanup; gateway tech stack retained; serving capability group added |
| `learn/gateways/data-retrieval.mdx` | ✅ DONE - UPDATED | Multi-source retrieval clarified and trimmed |
| `learn/gateways/data-verification.mdx` | ✅ DONE - UPDATED | Verification overview simplified |
| `learn/gateways/gateway-registry.mdx` | ✅ DONE - UPDATED | Solana registry, staking, OIP, metadata; v3.0.0 gateway/delegator limits added |
| `learn/gateways/x402-payments.mdx` | ✅ DONE - NO CHANGE | USDC on Base; independent gateway monetization topic |

### learn/oip/

| Page | Status | Notes |
|------|--------|-------|
| `learn/oip/index.mdx` | ✅ DONE - UPDATED | Simplified OIP overview and observer flow |
| `learn/oip/staking.mdx` | ✅ DONE - MOVED | Moved from `learn/token/staking.mdx`; auto-compound, accumulator, pruning, redelegation, SOL cost estimates; v3.0.0 staking limits added |
| `learn/oip/epoch-pipeline.mdx` | ✅ DONE - NEW | Permissionless Solana epoch pipeline, trimmed parameters; absorbs former `cranker.mdx` content under "Who Cranks?" |
| `learn/oip/cranker.mdx` | 🗑️ DONE - DELETED | Folded into `epoch-pipeline.mdx`; content was too thin to justify a standalone page |
| `learn/oip/observer-selection.mdx` | ✅ DONE - UPDATED | Weighted random observer selection, removed stale hashchain details |
| `learn/oip/reporting.mdx` | ✅ DONE - UPDATED | Arweave reports plus compact onchain observations |
| `learn/oip/performance-evaluation.mdx` | ✅ DONE - UPDATED | Pass/fail classification and weight impacts without formulas |
| `learn/oip/reward-distribution.mdx` | ✅ DONE - UPDATED | Reward flow, auto-compound, accumulators, deficient gateway handling |
| `learn/oip/pruning.mdx` | ✅ DONE - MOVED+UPDATED | Moved from `learn/gateways/pruning.mdx`; pruning lifecycle generalized |

### learn/wayfinder/

| Page | Status | Notes |
|------|--------|-------|
| `learn/wayfinder/index.mdx` | ✅ DONE - UPDATED | Removed stale ArNS contract wording |
| `learn/wayfinder/integration.mdx` | ✅ DONE - UPDATED | Chain-agnostic; refreshed gateway examples and fixed import typo |
| `learn/wayfinder/use-cases.mdx` | ✅ DONE - UPDATED | Light wording cleanup; chain-agnostic |

---

## Build Section

| Page | Status | Notes |
|------|--------|-------|
| `build/index.mdx` | ✅ DONE - NO CHANGE | Navigation |

### build/access/

| Page | Status | Notes |
|------|--------|-------|
| `build/access/index.mdx` | ✅ DONE - NO CHANGE | Navigation |
| `build/access/arns.mdx` | 🔎 NEEDS TECHNICAL REVIEW | Updated ArNS host examples; SDK purchase snippet should be verified |
| `build/access/fetch-data.mdx` | ✅ DONE - NO CHANGE | HTTP requests |
| `build/access/find-data.mdx` | ✅ DONE - NO CHANGE | GraphQL |
| `build/access/wayfinder.mdx` | ✅ DONE - NO CHANGE | Routing |

### build/upload/

| Page | Status | Notes |
|------|--------|-------|
| `build/upload/index.mdx` | ✅ DONE - NO CHANGE | Upload overview is chain-agnostic |
| `build/upload/turbo-credits.mdx` | ✅ DONE - UPDATED | ARIO/Solana/Base payment matrix should be verified with Turbo team |
| `build/upload/advanced-uploading-with-turbo.mdx` | ✅ DONE - NO CHANGE | Turbo SDK wallet docs are upload-specific |
| `build/upload/bundling-services.mdx` | ✅ DONE - NO CHANGE | Bundling-service overview is chain-agnostic |
| `build/upload/encryption.mdx` | ✅ DONE - NO CHANGE | Encryption guide is chain-agnostic |
| `build/upload/manifests.mdx` | ✅ DONE - NO CHANGE | Manifest guide is chain-agnostic |
| `build/upload/receipts.mdx` | ✅ DONE - NO CHANGE | Receipt guide is chain-agnostic |
| `build/upload/tagging.mdx` | ✅ DONE - NO CHANGE | Tagging guide is chain-agnostic |
| `build/upload/x402-uploading-to-turbo.mdx` | ✅ DONE - NO CHANGE | x402/Turbo upload flow is independent |

### build/run-a-gateway/

| Page | Status | Notes |
|------|--------|-------|
| `build/run-a-gateway/index.mdx` | ✅ DONE - NO CHANGE | Gateway operations landing page |
| `build/run-a-gateway/quick-start.mdx` | 🔎 NEEDS TECHNICAL REVIEW | Solana wallet/observer setup should be operator-verified |
| `build/run-a-gateway/join-the-network.mdx` | 🔎 NEEDS TECHNICAL REVIEW | Join flow, SOL fees, staking, and keypair guidance should be operator-verified; minimum stake updated to 20,000 ARIO; canonical mainnet program IDs added to CLI examples |
| `build/run-a-gateway/manage/solana-migration.mdx` | 🔎 NEEDS TECHNICAL REVIEW | Migration guide is intentionally old-vs-new; dates and claim flow need final review; pruning stake/withdrawal constants aligned with v3.0.0; canonical mainnet program IDs added to env/CLI examples |
| `build/run-a-gateway/manage/upgrading-a-gateway.mdx` | ✅ DONE - NO CHANGE | Generic upgrade process |
| `build/run-a-gateway/manage/environment-variables.mdx` | 🔎 NEEDS TECHNICAL REVIEW | Gateway env defaults and observer `IO_PROCESS_ID` naming should be verified; ar.io program-ID section links to canonical mainnet addresses |
| `build/run-a-gateway/manage/filters.mdx` | ✅ DONE - UPDATED | AO refs are data filter values; no protocol migration issue |
| `build/run-a-gateway/manage/setting-apex-domain.mdx` | ✅ DONE - UPDATED | Updated ArNS example hostnames |
| `build/run-a-gateway/manage/cdb64.mdx` | ✅ DONE - NO CHANGE | Data indexing; AO refs are filter values |
| `build/run-a-gateway/manage/content-moderation.mdx` | ✅ DONE - NO CHANGE | Content moderation is chain-agnostic |
| `build/run-a-gateway/manage/index.mdx` | ✅ DONE - NO CHANGE | Management navigation |
| `build/run-a-gateway/manage/index-snapshots.mdx` | ✅ DONE - NO CHANGE | Snapshot operations are gateway-specific |
| `build/run-a-gateway/manage/ssl-certs.mdx` | ✅ DONE - NO CHANGE | SSL certificate operations are chain-agnostic |
| `build/run-a-gateway/manage/troubleshooting.mdx` | ✅ DONE - UPDATED | Stake withdrawal troubleshooting aligned with v3.0.0 durations and minimum stake |
| `build/run-a-gateway/manage/x402-setup.mdx` | ✅ DONE - NO CHANGE | x402 setup is independent of protocol migration |

### build/run-wayfinder-router/

| Page | Status | Notes |
|------|--------|-------|
| All 5 pages | ✅ DONE - NO CHANGE | Chain-agnostic Wayfinder router docs |

### build/extensions/

| Page | Status | Notes |
|------|--------|-------|
| `build/extensions/index.mdx` | ✅ DONE - NO CHANGE | Sidecar overview; compute-unit page already absent |
| `build/extensions/grafana.mdx` | ✅ DONE - NO CHANGE | Gateway monitoring sidecar |
| `build/extensions/clickhouse.mdx` | ✅ DONE - NO CHANGE | Gateway data sidecar |
| `build/extensions/bundler.mdx` | ✅ DONE - NO CHANGE | Bundler sidecar remains Arweave-upload specific |
| `build/extensions/compute-unit.mdx` | 🗑️ DONE - DELETED | AO-only page is not present |

### build/guides/

| Page | Status | Notes |
|------|--------|-------|
| `build/guides/index.mdx` | ✅ DONE - UPDATED | Guide navigation reordered |
| `build/guides/hosting-decentralised-apps/migrating-your-app-to-new-sdks.mdx` | 🔎 NEEDS TECHNICAL REVIEW | Moved under app hosting guides; final SDK migration examples need review |
| `build/guides/hosting-decentralised-apps/deploy-permanent-dapp.mdx` | 🔎 NEEDS TECHNICAL REVIEW | Moved under app hosting guides; Solana wallet + Turbo + ArNS flow should be verified |
| `build/guides/arns-marketplace.mdx` | ✅ DONE - NO CHANGE | Tensor/Magic Eden marketplace behavior should be verified |
| `build/guides/working-with-arns/index.mdx` | ✅ DONE - NO CHANGE | ANT/Metaplex/Core program framing should be verified |
| `build/guides/working-with-arns/register-arns-programmatically.mdx` | 🔎 NEEDS TECHNICAL REVIEW | SDK registration examples need Solana verification |
| `build/guides/working-with-arns/set-arns-records-programmatically.mdx` | 🔎 NEEDS TECHNICAL REVIEW | SDK record-setting examples need Solana verification |
| `build/guides/working-with-arns/purchase-arns-ui.mdx` | 🔎 NEEDS UPDATING | arns.ar.io UI screenshots and flow need product review |
| `build/guides/working-with-arns/manage-arns-ui.mdx` | 🔎 NEEDS UPDATING | arns.ar.io UI screenshots and flow need product review |
| `build/guides/working-with-arns/arns-primary-names.mdx` | ✅ DONE - UPDATED | Primary-name concept plus v3.0.0 fee, uniqueness, and base-owner removal rules |
| `build/guides/hosting-decentralised-apps/index.mdx` | ✅ DONE - UPDATED | Added end-to-end permanent dApp guide entry |
| `build/guides/hosting-decentralised-apps/deploying-with-arlink.mdx` | 🔎 NEEDS TECHNICAL REVIEW | Needs review when ArLink is updated for Solana |
| `build/guides/hosting-decentralised-apps/deploying-with-permaweb-deploy.mdx` | 🔎 NEEDS TECHNICAL REVIEW | CLI ArNS deployment flow should be verified against current tooling |
| `build/guides/hosting-decentralised-apps/hosting-with-ardrive.mdx` | ✅ DONE - UPDATED | ArDrive upload flow; arns.ar.io already used |
| `build/guides/hosting-decentralised-apps/using-undernames-for-versioning.mdx` | ✅ DONE - UPDATED | Updated ArNS host examples and fixed copy typo |
| `build/guides/using-turbo-in-a-browser/index.mdx` | ✅ DONE - NO CHANGE | Turbo browser upload guide is wallet/provider specific |
| `build/guides/using-turbo-in-a-browser/html.mdx` | ✅ DONE - NO CHANGE | Turbo browser upload guide |
| `build/guides/using-turbo-in-a-browser/nextjs.mdx` | ✅ DONE - NO CHANGE | Turbo browser upload guide |
| `build/guides/using-turbo-in-a-browser/vite.mdx` | ✅ DONE - NO CHANGE | Turbo browser upload guide |
| `build/guides/depin.mdx` | ✅ DONE - NO CHANGE | Storage/distribution guide is chain-agnostic |
| `build/guides/application-distribution.mdx` | ✅ DONE - NO CHANGE | Arweave upload/signing guide |
| `build/guides/encrypted-data-nillion.mdx` | ✅ DONE - NO CHANGE | Arweave/Turbo encryption guide |
| `build/guides/crossmint-nft-minting-app.mdx` | 🗑️ DONE - DELETED | Outdated |
| `build/guides/storing-nfts.mdx` | ✅ DONE - NO CHANGE | NFT storage guide is chain-agnostic |

### build/advanced/

| Page | Status | Notes |
|------|--------|-------|
| `build/advanced/index.mdx` | ✅ DONE - NO CHANGE | Advanced navigation |
| `build/advanced/arfs/*.mdx` (6 pages) | ✅ DONE - NO CHANGE | ArFS docs intentionally include ArDrive legacy-drive language |
| `build/advanced/normalized-addresses.mdx` | ✅ DONE - NO CHANGE | Multi-chain address normalization remains relevant |
| `build/advanced/sandboxing.mdx` | ✅ DONE - NO CHANGE | Gateway sandboxing is chain-agnostic |
| `build/advanced/ethareum.mdx` | ✅ DONE - NO CHANGE | Ethereum/Arweave bridge topic |

---

## SDKs Section

> SDK reference pages are generated from upstream READMEs by `npm run generate-sdk-docs`. They are not regenerated automatically by `npm run build`; regenerate all SDK docs before launch because they have likely drifted from upstream. Track generated SDK docs at group level rather than per generated file.

| Page | Status | Notes |
|------|--------|-------|
| `sdks/index.mdx` | 🔎 NEEDS TECHNICAL REVIEW | Handwritten landing page; verify Solana SDK framing |

### sdks/ar-io-sdk/

| Page | Status | Notes |
|------|--------|-------|
| `sdks/ar-io-sdk/index.mdx` | 🔎 NEEDS TECHNICAL REVIEW | Handwritten landing page; verify version/signing guidance |
| Generated ar.io SDK pages | ✅ DONE - UPDATED | Regenerated from upstream README; Solana signer, ArNS, ANT, gateway, epoch, vault, and `processId`/mint-address examples marked complete |

### sdks/turbo-sdk/ (13 pages)

| Page | Status | Notes |
|------|--------|-------|
| Generated Turbo SDK pages | ✅ DONE - UPDATED | Regenerated from upstream README; independent service reference marked complete |

### sdks/ardrive-core-js/ (16 pages)

| Page | Status | Notes |
|------|--------|-------|
| Generated ArDrive Core JS pages | ✅ DONE - UPDATED | Regenerated from upstream README; not part of ar.io protocol migration |

### sdks/(clis)/ardrive-cli/ (~40 pages)

| Page | Status | Notes |
|------|--------|-------|
| Generated ArDrive CLI pages | ✅ DONE - UPDATED | Regenerated from upstream README; not part of ar.io protocol migration |

### sdks/wayfinder/ (~12 pages)

| Page | Status | Notes |
|------|--------|-------|
| Generated Wayfinder SDK pages | ✅ DONE - UPDATED | Regenerated from upstream README; chain-agnostic reference marked complete |

---

## APIs Section

> API reference pages are generated from upstream OpenAPI specs by `npm run generate-api-docs`. They are not regenerated automatically by `npm run build`; regenerate all API docs before launch because they have likely drifted from upstream. Track generated API docs at group level rather than per generated file.

| Page | Status | Notes |
|------|--------|-------|
| `apis/index.mdx` | ✅ DONE - NO CHANGE | API landing page |
| Generated `apis/ar-io-node/*` pages | ✅ DONE - UPDATED | Regenerated from ar-io-node OpenAPI spec; gateway API terminology marked complete |
| Generated `apis/turbo/**/*` pages | ✅ DONE - UPDATED | Regenerated from Turbo OpenAPI specs; independent generated reference marked complete |

---

## Glossary

| Page | Status | Notes |
|------|--------|-------|
| `glossary/index.mdx` | ✅ DONE - UPDATED | Updated AO def, added 7 Solana terms |

---


## Remaining TODOs

- [x] Regenerate all API docs with `npm run generate-api-docs`; not automatic on build
- [x] Regenerate all SDK docs with `npm run generate-sdk-docs`; not automatic on build
- [x] Regenerate SDK output examples from Solana devnet — generated ar.io SDK pages still need spot-checking for Arweave-format addresses and Solana signer examples
- [ ] Operator/product review: verify join-network, Solana migration, gateway env defaults, observer `IO_PROCESS_ID`, and RPC guidance against current mainnet release behavior
- [ ] Update UI screenshots in `purchase-arns-ui.mdx` and `manage-arns-ui.mdx` once Solana UI is live
- [ ] Run `npm run generate-all-docs` to regenerate LLM text files
