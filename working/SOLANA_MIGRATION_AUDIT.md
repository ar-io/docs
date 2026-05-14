# AR.IO Documentation — Solana Migration Audit

> **Info only / archived working notes:** This audit is no longer the active migration tracker. Keep it for background context and historical findings, but do not treat it as the source of truth. Use `working/MIGRATION_STATUS.md` for current status and ongoing tracking.

This document catalogs every page in `docs.ar.io` that needs updating to reflect the AR.IO Network migration from AO to Solana. It is organized by priority tier, with specific references and recommended actions for each file.

---

## How to Use This Document

- **Priority tiers** indicate suggested sequencing, not importance. All changes are required before public launch.
- **Action types**: `FULL REWRITE` = page premise changes; `MAJOR UPDATE` = significant sections change; `PARTIAL UPDATE` = targeted edits; `MINOR UPDATE` = terminology swaps; `NO CHANGE` = content is chain-agnostic.
- **References** cite the Solana migration docs (`BEHAVIORAL_DIFFERENCES.md`, `WHITEPAPER_SOLANA_CHANGES.md`, `FEATURE_MATRIX.md`, `WORKFLOWS.md`) for traceability.

---

## Tier 1 — CRITICAL (Core Identity & Getting Started)

These pages define what AR.IO *is* to new visitors. Incorrect information here undermines trust immediately.

### 1. `content/learn/token/index.mdx` — FULL REWRITE

**Current state:** Positions ARIO as "the multifunction AO Computer based token." The entire "Built on AO Computer" section (lines 67-87) describes AO-based architecture, computational permanence, and AO ecosystem integration.

**What changes:**
- ARIO is now an SPL Token on Solana (mint address TBD for docs)
- Remove all "Native AO Token" and "AO Computer" framing
- Key features should reference: SPL Token standard, Solana program execution, Solana wallet ecosystem (Phantom, Solflare, Backpack)
- Staking and multi-utility descriptions remain conceptually valid but need Solana framing
- Token decimals unchanged (6 decimals, 1 ARIO = 1,000,000 mARIO)

**Action:** Full rewrite. New positioning: "ARIO is the native token of the ar.io network, implemented as an SPL Token on Solana."

---

### 2. `content/learn/(introduction)/protocol-architecture.mdx` — MOVED + FULL REWRITE

**Current state:** Moved from `content/learn/token/architecture.mdx` to the introduction section because it describes the broader ar.io protocol architecture, not only token mechanics.

**What changes:**
- Architecture is now 3+1 Solana programs: ario-core, ario-gar, ario-arns, ario-ant
- CPI flow: ario-gar and ario-arns call into ario-core for token operations
- ANTs are Metaplex Core NFTs (not AO processes)
- Zero-copy registries: GatewayRegistry (3,000 slots), NameRegistry (50,000 slots)
- Mermaid diagram needs complete redesign showing Solana programs + CPI arrows

**Action:** Full rewrite with new architecture diagram.

---

### 3. `content/learn/token/get-the-token.mdx` — FULL REWRITE

**Current state:** Two-tab layout (AO canonical / Base bridged). AO tab references contract ID `qNvAoz0TgcH7DMg8BCVn8jF32QH5L6T29VjHxhHqqGE`, Permaswap DEX, Wander wallet for AO, and testnet process IDs.

**What changes:**
- Canonical ARIO is now on Solana (new mint address, Solana explorers)
- DEX access: Jupiter, Raydium (replace Permaswap)
- Wallet support: Phantom, Solflare, Backpack (replace Wander for AO)
- Base bridged ARIO status TBD (may still exist as secondary)
- Testnet: Solana devnet faucet replaces AO testnet process
- All contract/process IDs change completely

**Action:** Full rewrite. Restructure tabs as Solana (canonical) / Base (bridged, if retained).

---

### 4. `content/learn/token/add-to-wander.mdx` — FULL REWRITE or REPLACE

**Current state:** Step-by-step guide for adding AO-based ARIO to Wander wallet with process ID `qNvAoz0TgcH7DMg8BCVn8jF32QH5L6T29VjHxhHqqGE`.

**What changes:**
- ARIO is now an SPL Token — Solana wallets auto-detect it (no manual "add token" step for most wallets)
- Guide should cover: Phantom/Solflare setup, viewing ARIO balance, ARIO mint address
- Wander guide may still be relevant if Wander adds Solana support, otherwise replace entirely

**Action:** Replace with "Add ARIO to Your Wallet" covering Solana wallets. If Wander supports Solana, include it as one option.

---

### 5. `content/learn/(introduction)/what-is-ario.mdx` — MAJOR UPDATE

**Current state:** "A decentralized infrastructure layer built on Arweave and AO."

**What changes:**
- Remove "and AO" from the foundational description
- ar.io still serves Arweave data (gateway role unchanged) but protocol execution is on Solana
- Update to: "built on Arweave for permanent data storage, with protocol execution on Solana"

**Action:** Update foundational description and any AO references. Core value proposition (decentralized gateways, permanent data) stays.

---

### 6. `content/sdks/ar-io-sdk/(ario-contract)/configuration.mdx` — FULL REWRITE

**Current state:** Shows `AOProcess` class, `@permaweb/aoconnect` import, AO infrastructure URLs (MU_URL, CU_URL, GRAPHQL_URL).

**What changes:**
- SDK now defaults to Solana backend (`SolanaARIOReadable` / `SolanaARIOWriteable`)
- `ARIO.init()` with no args → Solana mainnet RPC
- `ARIO.init({ process: '...' })` → AO backend (legacy, opt-in)
- Configuration is now RPC URL + optional Solana connection params
- `AOProcess`, `@permaweb/aoconnect` → legacy only, not default examples

**Action:** Full rewrite showing Solana-first configuration. Add legacy AO section for backwards compatibility.

---

### 7. `content/sdks/ar-io-sdk/(ario-contract)/networks.mdx` — MAJOR UPDATE

**Current state:** References `ARIO_MAINNET_PROCESS_ID`, `ARIO_TESTNET_PROCESS_ID`, `ARIO_DEVNET_PROCESS_ID`. Testnet faucet references "ar.io Testnet process (tARIO)."

**What changes:**
- Process IDs → Solana program addresses
- Testnet → Solana devnet
- `ARIO.mainnet()` / `ARIO.testnet()` now connect to Solana clusters
- Faucet mechanism changes (Solana devnet airdrop vs AO testnet)

**Action:** Update all process ID terminology, network references, and faucet documentation.

---

### 8. `content/build/run-a-gateway/manage/environment-variables.mdx` — MAJOR UPDATE

**Current state:** Contains `IO_PROCESS_ID` defaulting to AO process ID. Entire "AO (Autonomous Objects)" section (lines 233-242) with `AO_CU_URL`, `NETWORK_AO_CU_URL`, `ANT_AO_CU_URL`, `AO_MU_URL`, `AO_GATEWAY_URL`, `AO_GRAPHQL_URL`. Observer section also references these.

**What changes:**
- `IO_PROCESS_ID` → Solana program address (or replaced with `ARIO_PROGRAM_ID`)
- Entire AO section → replaced with Solana RPC configuration (`SOLANA_RPC_URL`, program addresses)
- Circuit breaker variables prefixed `ARIO_PROCESS_*` → update naming
- Observer contract interaction variables → Solana transaction submission

**Action:** Major update. Replace AO infrastructure block with Solana RPC configuration. Update all process ID defaults.

---

### 9. `content/build/run-a-gateway/join-the-network.mdx` — MAJOR UPDATE

**Current state:** CLI examples use `--wallet-file ./path/to/wallet.json` (Arweave JWK), mARIO amounts, Arweave wallet addresses. References Wander/Metamask/Beacon wallet connections. `IO_PROCESS_ID` referenced.

**What changes:**
- Wallet format: Solana keypair (Ed25519) replaces Arweave JWK (RSA-4096)
- Wallet options: Phantom, Solflare, Backpack (replace Wander for signing)
- CLI flags: `--rpc-url` for Solana RPC, `--ao` flag for legacy
- Observer wallet: Solana pubkey format
- Token amounts: Still mARIO (decimals unchanged), but SOL needed for transaction fees

**Action:** Major update. New wallet setup instructions, updated CLI examples, note about SOL for fees.

---

### 10. `content/learn/gateways/gateway-registry.mdx` — MAJOR UPDATE

**Current state:** References "registered Arweave wallet addresses" stored in the smart contract.

**What changes:**
- Wallet addresses are now Solana pubkeys (Ed25519, not RSA)
- Gateway registry capped at 3,000 slots (new constraint)
- Observer address must be unique across all gateways (new constraint)
- Pruning: 30 consecutive failed epochs → 100% minimum stake slashed (new mechanic)

**Action:** Update wallet address references, add capacity limits, document observer uniqueness and pruning.

---

## Tier 2 — HIGH (SDK, ArNS & Staking Mechanics)

These pages are used by developers building on ar.io and operators managing gateways.

### 11. `content/sdks/ar-io-sdk/index.mdx` — PARTIAL UPDATE

**Current state:** References "AO contract operations" in description.

**What changes:**
- Remove "AO contract operations" → "Solana program interactions" (or just "ar.io protocol")
- Code examples structurally unchanged (`ARIO.mainnet()`, method calls)
- Note that SDK abstracts the backend — same API, Solana underneath

**Action:** Update description text. Code examples remain valid.

---

### 12. `content/sdks/ar-io-sdk/token-conversion.mdx` — PARTIAL UPDATE

**Current state:** "The ARIO process stores all values as mARIO" and "All process interactions expect values in mARIO."

**What changes:**
- "ARIO process" → "ARIO program" or "ARIO protocol"
- "process interactions" → "protocol operations"
- Conversion logic (mARIO ↔ ARIO) unchanged

**Action:** Terminology swap. Logic unchanged.

---

### 13. `content/sdks/ar-io-sdk/(ario-contract)/general.mdx` — PARTIAL UPDATE

**Current state:** Signer examples show `ArConnectSigner` and `ArweaveSigner` exclusively.

**What changes:**
- Add Solana signer examples (Phantom wallet adapter, Solana keypair)
- Arweave signers remain valid for legacy AO backend
- Default examples should show Solana-first

**Action:** Add Solana signer examples as primary. Move Arweave signers to "Legacy AO Backend" section.

---

### 14. `content/sdks/ar-io-sdk/(ario-contract)/arweave-name-system-arns.mdx` — PARTIAL UPDATE

**Current state:** Line 62 references "ANT process spawned." Callback events reference AO-specific lifecycle (`spawning-ant`, `registering-ant`).

**What changes:**
- ANT is now a Metaplex Core NFT (minted, not "spawned as process")
- Callback events may use different names for Solana flow
- `processId` parameter → ANT mint address on Solana

**Action:** Update terminology (process → NFT mint), verify callback event names match Solana SDK.

---

### 15. `content/sdks/ar-io-sdk/(ant-contracts)/initialize.mdx` — PARTIAL UPDATE

**Current state:** `processId` parameter shown for AO process initialization.

**What changes:**
- `processId` → Solana mint address of the Metaplex Core NFT
- Add `backend: 'solana'` parameter example
- `ANT.init({ backend: 'solana', processId, connection })` → Solana ANT

**Action:** Update initialization examples to show Solana-first, legacy AO second.

---

### 16. `content/sdks/ar-io-sdk/(ant-contracts)/spawn.mdx` — PARTIAL UPDATE

**Current state:** "Spawns a new ANT process on the AO network."

**What changes:**
- "AO network" → "Solana" (ANT is minted as Metaplex Core NFT)
- "Spawns" → "Creates" or "Mints"
- Underlying SDK call may be different

**Action:** Update blockchain reference and creation terminology.

---

### 17. `content/sdks/ar-io-sdk/(ant-contracts)/static-methods.mdx` — PARTIAL UPDATE

**Current state:** `ANT.fork()` spawns new ANT processes. References `ARIO_MAINNET_PROCESS_ID`.

**What changes:**
- Fork → creates new Solana NFT
- Process ID constants → Solana program addresses

**Action:** Update terminology and constant references.

---

### 18. `content/sdks/ar-io-sdk/(ant-contracts)/upgrade.mdx` — PARTIAL UPDATE

**Current state:** References "ARIO process ID" and "ANT registry process ID."

**What changes:**
- Process IDs → Solana program addresses
- Upgrade mechanism differs (Metaplex Core NFT schema versioning via `migrate_ant` with `realloc`)

**Action:** Update terminology and explain new upgrade mechanism.

---

### 19. `content/sdks/ar-io-sdk/(ant-contracts)/transfer.mdx` — MINOR UPDATE

**Current state:** "Target MUST be an Arweave address."

**What changes:**
- Target must be a Solana address (for Solana backend)
- ANT transfers are Metaplex Core NFT transfers

**Action:** Update address format requirement.

---

### 20. `content/sdks/ar-io-sdk/(ant-contracts)/ario-integrations.mdx` — PARTIAL UPDATE

**Current state:** References `ARIO_MAINNET_PROCESS_ID` (lines 15, 28, 43, 56).

**What changes:**
- Process ID constants → Solana program addresses

**Action:** Update all constant references.

---

### 21. `content/learn/arns/ants.mdx` — MAJOR UPDATE

**Current state:** "Name Tokens are unique AO Computer based tokens/processes." "Each ANT is its own AO process with autonomous functionality."

**What changes:**
- ANTs are Metaplex Core NFTs on Solana
- Tradeable on Tensor, Magic Eden (NFT marketplaces)
- Max 10 controllers per ANT (was unlimited)
- @ record cannot be removed (only updated)
- Lazy reconciliation on marketplace transfer (controllers cleared on next write)
- No "AO process" — it's an NFT with onchain state in a PDA

**Action:** Major update. Reframe ANTs from AO processes to Solana NFTs. Document new constraints and marketplace compatibility.

---

### 22. `content/learn/arns/index.mdx` — PARTIAL UPDATE

**Current state:** "Registry is stored permanently on Arweave via AO."

**What changes:**
- Registry is now on Solana (NameRegistry zero-copy account, 50,000 slots)
- ArNS resolution mechanism unchanged for end users
- Mermaid diagram references "ar.io Smart Contract" → now Solana programs

**Action:** Update storage layer reference and diagram.

---

### 23. `content/learn/arns/name-registration.mdx` — PARTIAL UPDATE

**Current state:** Registration rules, pricing, lease mechanics.

**What changes:**
- New: 43-character names prohibited (Arweave TX ID collision prevention)
- New: Lowercase enforced at submission (not auto-lowercased)
- Registry capped at 50,000 names
- Returned name Dutch auction: 50x→1x over 14 days, 50%/50% revenue split
- Grace period: 14 days (unchanged but now in seconds)

**Action:** Add new validation rules, capacity limits, and returned name auction mechanics.

---

### 24. `content/learn/token/staking.mdx` — PARTIAL UPDATE

**Current state:** Staking mechanics for operators and delegators.

**What changes:**
- Operator rewards always auto-compound (no toggle — must `decrease_operator_stake` to realize)
- Delegate rewards use reward-per-share accumulator (not instant distribution)
- Operator cannot self-delegate
- Redelegation fee resets after 7 days (wall-clock, not epoch count)
- Gateway cap: 3,000 (registry can fill)
- Expedited withdrawal penalty: linear decay 50%→10% over 90 days

**Action:** Update reward mechanics, add new constraints, document expedited withdrawal formula.

---

### 25. `content/learn/oip/reward-distribution.mdx` — PARTIAL UPDATE

**Current state:** Reward distribution formulas using ARIO.

**What changes:**
- 6-step epoch pipeline (create → tally → prescribe → save observations → distribute → close)
- Operator rewards auto-compound; delegate rewards use accumulator pattern
- Missed observation penalty: 25% reduction
- Leaving gateways receive 0 rewards
- Reward rate: linear decay 0.1%→0.05% over epochs 365-547

**Action:** Update reward flow to reflect 6-step pipeline and accumulator pattern.

---

### 26. `content/build/guides/working-with-arns/register-arns-programmatically.mdx` — MAJOR UPDATE

**Current state:** SDK initialization with `ArweaveSigner(jwk)`, `processId` in registration.

**What changes:**
- Signer: Solana keypair or wallet adapter (not Arweave JWK)
- `processId` → ANT mint address (Solana Metaplex Core NFT)
- `ARIO.mainnet()` default is now Solana
- Gateway operator discount: now enforced (180+ day tenure, 90%+ pass rate, status=Joined)

**Action:** Update all code examples for Solana signers, update processId references.

---

### 27. `content/build/guides/working-with-arns/set-arns-records-programmatically.mdx` — MAJOR UPDATE

**Current state:** ANT initialization with AO process patterns.

**What changes:**
- ANT init: `ANT.init({ backend: 'solana', processId: mintAddress, connection })`
- Signer: Solana wallet adapter
- Transaction IDs for records remain Arweave TX IDs (unchanged — records still point to Arweave data)

**Action:** Update SDK initialization examples and signer patterns.

---

### 28. `content/build/run-a-gateway/quick-start.mdx` — PARTIAL UPDATE

**Current state:** `AR_IO_WALLET=<your-public-wallet-address>`, `OBSERVER_WALLET=<hot-wallet-public-address>`.

**What changes:**
- Wallet addresses are now Solana pubkeys
- Observer wallet: unique constraint (no two gateways share observer address)
- SOL needed in wallet for transaction fees (in addition to ARIO for staking)

**Action:** Update wallet format references, add SOL fee note.

---

## Tier 3 — MEDIUM (Conceptual & Reference Pages)

### 29. `content/learn/arns/pricing-model.mdx` — MINOR UPDATE

**Current state:** Pricing formulas in ARIO.

**What changes:**
- Fee halving: when demand factor stays at minimum (0.5x) for 7 consecutive periods, all base fees permanently halved (new mechanism)
- `get_token_cost` view instruction available for cost simulation

**Action:** Add fee halving note and cost simulation reference.

---

### 30. `content/learn/oip/index.mdx` — MINOR UPDATE

**Current state:** "Distribute ARIO token rewards automatically."

**What changes:**
- Rewards not "automatic" — requires cranker bot to drive 6-step pipeline
- Add reference to permissionless cranker role

**Action:** Minor wording update to reflect cranker-driven distribution.

---

### 31. `content/learn/oip/observer-selection.mdx` — MINOR UPDATE

**Current state:** Weighted random selection with hashchain entropy.

**What changes:**
- Entropy source: `SHA256(slot || epoch_index || timestamp)` (Solana-specific)
- Up to 50 observers per epoch
- 4-factor composite weight: stake, tenure, gateway performance, observer performance
- Collision handling: 10x retry multiplier (up to 500 iterations)

**Action:** Update entropy source description and add Solana-specific details.

---

### 32. `content/learn/(introduction)/what-is-permaweb.mdx` — DELETED

Removed standalone page. Light permaweb context was moved into `content/learn/(introduction)/what-is-ario.mdx` to avoid duplicate deep architecture explanations in the introduction section.

---

### 33. `content/sdks/ar-io-sdk/(ario-contract)/epochs.mdx` — MINOR UPDATE

**Current state:** Epoch API responses and examples.

**What changes:**
- Response structure may include new fields (6-step pipeline status)
- Core epoch data (observations, rewards) structurally similar

**Action:** Verify response examples match Solana epoch structure. Update if fields changed.

---

### 34. `content/sdks/ar-io-sdk/(ario-contract)/gateways.mdx` — MINOR UPDATE

**Current state:** Gateway operations using Arweave signers in examples.

**What changes:**
- Add Solana signer examples
- Address format in examples should show Solana pubkeys
- All gateway methods (join, leave, update, stake, delegate) remain functionally identical

**Action:** Update signer examples, add Solana address format in outputs.

---

### 35. `content/sdks/ar-io-sdk/(ario-contract)/primary-names.mdx` — MINOR UPDATE

**Current state:** Primary name operations.

**What changes:**
- Fee: 0.2 ARIO × demand_factor
- Two flows: direct set vs async request/approve
- Request expires after 7 days
- Uniqueness enforced by PrimaryNameReverse PDA

**Action:** Verify fee and flow documentation matches new mechanics.

---

### 36. `content/sdks/ar-io-sdk/(ario-contract)/vaults.mdx` — MINOR UPDATE

**Current state:** Vault operations.

**What changes:**
- Minimum vault size: 100 ARIO (new constraint)
- Duration: 14 days – 200 years
- Revoke: strict `<` check (cannot revoke at exact expiry)

**Action:** Add minimum size constraint if not already documented.

---

### 37. `content/sdks/ar-io-sdk/pagination.mdx` — PARTIAL UPDATE

**Current state:** Pagination patterns for SDK queries.

**What changes:**
- On-chain pagination removed on Solana
- SDK pagination now uses off-chain indexer (Helius DAS or custom)
- Zero-copy registries available for direct enumeration but not paginated

**Action:** Update to reflect off-chain pagination model.

---

### 38. `content/glossary/index.mdx` — PARTIAL UPDATE

**Current state:** "AO Computer... provides the compute layer for ar.io's smart contracts and token operations."

**What changes:**
- AO no longer provides compute for ar.io contracts — Solana does
- AO definition should remain (it's still a real thing) but ar.io-specific claim must be removed
- Add Solana-specific terms: PDA, SPL Token, Metaplex Core, CPI, Cranker

**Action:** Update AO definition, add Solana glossary entries.

---

### 39. `content/build/guides/working-with-arns/index.mdx` — MINOR UPDATE

**Current state:** "The smart contract system that manages ArNS name ownership."

**What changes:**
- "Smart contract" → "Solana program" (ario-arns)
- ANT description → Metaplex Core NFT

**Action:** Terminology update.

---

### 40. `content/build/guides/working-with-arns/manage-arns-ui.mdx` — PARTIAL UPDATE

**Current state:** UI-based ArNS management guide.

**What changes:**
- Wallet connection: Solana wallet (Phantom etc.) instead of Arweave wallet
- UI may look different with Solana backend
- Screenshots may need updating

**Action:** Update wallet instructions and verify screenshots.

---

### 41. `content/build/guides/working-with-arns/purchase-arns-ui.mdx` — PARTIAL UPDATE

**Current state:** UI-based ArNS purchase guide.

**What changes:**
- Same wallet/UI changes as manage-arns-ui.mdx
- Payment: ARIO from Solana wallet + SOL for fees

**Action:** Update wallet and payment instructions.

---

### 42. `content/build/guides/arns-marketplace.mdx` — MAJOR UPDATE

**Current state:** ANT trading and marketplace explanation.

**What changes:**
- ANTs are now Metaplex Core NFTs — tradeable on Tensor, Magic Eden
- Lazy reconciliation: marketplace transfer clears controllers on next write
- Standard NFT marketplace UX (no special ar.io marketplace needed)

**Action:** Rewrite marketplace section for NFT marketplace integration.

---

## Tier 4 — LOW (Minimal or No Changes)

### Pages requiring NO CHANGES (chain-agnostic content):

| File | Reason |
|------|--------|
| `content/learn/gateways/architecture.mdx` | Gateway tech stack is chain-agnostic |
| `content/learn/gateways/data-retrieval.mdx` | Data retrieval from Arweave, not chain-specific |
| `content/learn/gateways/data-verification.mdx` | Merkle verification, chain-agnostic |
| `content/learn/gateways/index.mdx` | Conceptual gateway overview |
| `content/learn/gateways/x402-payments.mdx` | USDC on Base, independent of ARIO chain |
| `content/learn/oip/performance-evaluation.mdx` | Weight calculations, implementation-agnostic |
| `content/learn/oip/reporting.mdx` | Reporting mechanics, chain-agnostic |
| `content/learn/(introduction)/what-is-arweave.mdx` | Arweave storage layer description |
| `content/learn/(introduction)/ans-104-bundles.mdx` | Bundle standard, protocol-agnostic |
| `content/learn/(introduction)/index.mdx` | Navigation page |
| `content/learn/wayfinder/*` | Routing infrastructure, chain-agnostic |
| `content/build/access/fetch-data.mdx` | Data fetching from Arweave |
| `content/build/access/find-data.mdx` | Data discovery |
| `content/build/upload/*` | Upload to Arweave via Turbo (independent) |
| `content/build/extensions/*` | Gateway extensions (Grafana, ClickHouse, etc.) |
| `content/build/advanced/*` | ArFS, sandboxing, normalized addresses |
| `content/build/run-a-gateway/manage/ssl-certs.mdx` | Infrastructure config |
| `content/build/run-a-gateway/manage/content-moderation.mdx` | Gateway policy |
| `content/build/run-a-gateway/manage/troubleshooting.mdx` | General troubleshooting |
| `content/build/run-a-gateway/manage/upgrading-a-gateway.mdx` | Node upgrades |
| `content/build/run-a-gateway/manage/setting-apex-domain.mdx` | DNS config |
| `content/build/run-a-gateway/manage/index-snapshots.mdx` | Index management |
| `content/build/run-a-gateway/manage/cdb64.mdx` | Database index |
| `content/build/run-wayfinder-router/*` | Router config, chain-agnostic |
| `content/build/guides/hosting-decentralised-apps/*` | Deployment guides |
| `content/build/guides/using-turbo-in-a-browser/*` | Turbo integration |
| `content/build/guides/depin.mdx` | DePIN concepts |
| `content/build/guides/application-distribution.mdx` | App distribution |
| `content/build/guides/encrypted-data-nillion.mdx` | Encryption guide |
| `content/build/guides/crossmint-nft-minting-app.mdx` | NFT minting |
| `content/build/guides/storing-nfts.mdx` | NFT storage |
| `content/apis/ar-io-node/*` | Gateway API endpoints (chain-agnostic) |
| `content/apis/turbo/*` | Turbo service APIs |
| `content/sdks/turbo-sdk/*` | Turbo SDK (already has Solana signer) |
| `content/sdks/ardrive-core-js/*` | ArDrive SDK |
| `content/sdks/(clis)/ardrive-cli/*` | ArDrive CLI |
| `content/sdks/wayfinder/*` | Wayfinder SDK |
| `content/sdks/ar-io-sdk/(ant-contracts)/metadata.mdx` | ANT metadata ops |
| `content/sdks/ar-io-sdk/(ant-contracts)/records.mdx` | ANT record ops |
| `content/sdks/ar-io-sdk/(ant-contracts)/controllers.mdx` | ANT controller ops |
| `content/sdks/ar-io-sdk/(ant-contracts)/balances.mdx` | ANT balance ops |
| `content/sdks/ar-io-sdk/(ant-contracts)/state.mdx` | ANT state queries |
| `content/sdks/ar-io-sdk/(ant-contracts)/undername-ownership.mdx` | Undername ops |
| `content/sdks/ar-io-sdk/(ant-contracts)/versions.mdx` | ANT versions |
| `content/sdks/ar-io-sdk/logging.mdx` | SDK logging config |

---

## New Content Needed

These pages don't exist yet and should be created for the Solana migration:

### New Pages

1. **`content/learn/token/migration.mdx`** — Migration guide: Arweave→Solana address attestation, import-then-claim flow, wallet mapping
2. **`content/learn/token/solana-wallets.mdx`** — How to set up Phantom/Solflare/Backpack for ARIO (replaces add-to-wander.mdx)
3. **`content/learn/oip/epoch-pipeline.mdx`** — 6-step epoch pipeline overview (create → tally → prescribe → observe → distribute → close)
4. **`content/learn/oip/cranker.mdx`** — Permissionless cranker bot: what it does, why it matters, how to run one
5. **`content/learn/oip/pruning.mdx`** — Gateway pruning/slashing: 30 failed epochs, stake slash, removal mechanics
6. **`content/learn/arns/returned-names.mdx`** — Returned name Dutch auction: 50x→1x decay, revenue split, lifecycle phases
7. **`content/build/guides/working-with-arns/arns-on-nft-marketplaces.mdx`** — Buying/selling ArNS names on Tensor, Magic Eden via Metaplex Core NFTs

### New Glossary Entries

- **SPL Token** — Solana Program Library token standard (ARIO is an SPL Token)
- **PDA (Program Derived Address)** — Deterministic Solana account addresses derived from program seeds
- **Metaplex Core** — NFT standard used for ANTs on Solana
- **CPI (Cross-Program Invocation)** — How Solana programs call each other
- **Cranker** — Permissionless bot that drives the epoch pipeline
- **Epoch Pipeline** — 6-step process for observation, reward calculation, and distribution
- **Reward Accumulator** — Pattern for distributing delegate rewards (settled on interaction)

---

## Key Terminology Changes (Global Find & Replace)

These terms should be updated consistently across ALL documentation:

| Old Term | New Term | Context |
|----------|----------|---------|
| AO Computer based token | SPL Token on Solana | Token description |
| AO process | Solana program | Contract references |
| process ID | program address / mint address | Identifiers |
| smart contract (singular) | Solana programs (3+1) | Architecture |
| Arweave wallet address | Solana wallet address | User identifiers |
| Wander wallet | Phantom / Solflare / Backpack | Wallet recommendations |
| `AOProcess` | `SolanaARIOReadable` / legacy | SDK classes |
| `@permaweb/aoconnect` | `@solana/web3.js` | SDK dependencies |
| `ArweaveSigner` / `ArConnectSigner` | Solana wallet adapter | Default signers |
| spawned (ANT) | minted (ANT as NFT) | ANT creation |
| ANT process | ANT (Metaplex Core NFT) | ANT references |

---

## Cross-Cutting Concerns

### Time Units
All durations in documentation that reference protocol timings should use seconds (not milliseconds). The SDK handles conversion transparently, but any raw protocol references should note seconds.

### SOL Fee Requirement
Any page that documents an ARIO-spending operation should note that SOL is also required for Solana transaction fees. This is a new concept for users coming from AO (where fees were abstracted).

### Dual-Backend Period
During the transition period, documentation should acknowledge the `--ao` flag / AO backend option for legacy compatibility, while making Solana the default in all examples.

### Screenshots & UI
Any screenshots of arns.app, the gateway management portal, or wallet interfaces will need updating to show Solana wallet connections and Solana-based interfaces.

---

## Summary Statistics

| Category | Count |
|----------|-------|
| **Full Rewrite** | 6 pages |
| **Major Update** | 8 pages |
| **Partial Update** | 16 pages |
| **Minor Update** | 8 pages |
| **No Change** | ~65 pages |
| **New Pages Needed** | 7 pages |
| **New Glossary Entries** | 7 entries |
| **Total pages audited** | ~97 pages |
