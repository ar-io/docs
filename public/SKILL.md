# ar.io Developer Skill — AI Agent Reference

This file gives AI coding agents the knowledge to build applications on ar.io and Arweave. It covers the full stack: permanent storage, naming, gateways, and SDKs.

## What ar.io Is

ar.io is the access and naming layer for Arweave (permanent storage). Protocol execution runs on Solana. You use it to:

- **Store data permanently** on Arweave (pay once, stored forever)
- **Name things** with ArNS (human-readable URLs like `myapp.turbo-gateway.com`)
- **Serve content** through decentralized network of gateways worldwide

## Architecture

```
Arweave (Layer 1)     — Permanent data storage
Solana (Protocol)     — ARIO token, ArNS registry, staking, epochs
ar.io Gateways        — Data retrieval, caching, ArNS resolution
Turbo                 — Fast upload service (accepts SOL, ARIO, fiat)
```

Four Solana programs: `ario-core` (token/vaults), `ario-gar` (gateways/staking/epochs), `ario-arns` (names/pricing), `ario-ant` (ANT NFTs/records).

## SDKs and Installation

```bash
# ar.io SDK (ArNS names, gateways, staking) — requires v3.23+
npm install @ar.io/sdk @solana/kit

# Turbo SDK (file/folder uploads to Arweave)
npm install @ardrive/turbo-sdk

# Wayfinder (decentralized data fetching with verification)
npm install @ar.io/wayfinder-core @ar.io/sdk
```

## Signer Setup

Two separate signer patterns — ar.io SDK uses `@solana/kit`, Turbo uses its own format:

```typescript
// === ar.io SDK signer (for ArNS, staking, records) ===
import { ARIO, ANT } from '@ar.io/sdk';
import { createKeyPairSignerFromBytes } from '@solana/kit';
import fs from 'fs';

const keypairBytes = new Uint8Array(
  JSON.parse(fs.readFileSync('./solana-keypair.json', 'utf-8')),
);
const signer = await createKeyPairSignerFromBytes(keypairBytes);
const ario = ARIO.mainnet({ signer });

// Browser: const ario = ARIO.init({ signer: phantomWalletAdapter });

// === Turbo signer (for uploading data to Arweave) ===
import { TurboFactory } from '@ardrive/turbo-sdk';
import bs58 from 'bs58';

const turbo = TurboFactory.authenticated({
  privateKey: bs58.encode(keypairBytes.slice(0, 32)),
  token: 'solana',
});

// Browser: TurboFactory.authenticated({ walletAdapter: window.solana, token: 'solana' });
```

## Common Recipes

### Upload a file to Arweave

```typescript
const result = await turbo.upload({
  data: fs.readFileSync('./my-file.pdf'),
  dataItemOpts: {
    tags: [
      { name: 'Content-Type', value: 'application/pdf' },
      { name: 'App-Name', value: 'MyApp' },
    ],
  },
});
console.log('TX:', result.id);
// Access: https://turbo-gateway.com/${result.id}
```

Files under 100 KiB upload free. Larger files paid with SOL via just-in-time funding.

### Upload a folder (website deployment)

```typescript
const { manifestResponse } = await turbo.uploadFolder({
  folderPath: './dist',
  dataItemOpts: {
    tags: [{ name: 'App-Name', value: 'MyApp' }],
  },
  manifestOptions: {
    indexFile: 'index.html',
    fallbackFile: '404.html',
  },
});
console.log('Manifest:', manifestResponse.id);
// Access: https://turbo-gateway.com/${manifestResponse.id}
```

### Register an ArNS name

```typescript
const ario = ARIO.mainnet({ signer });

// Check cost first
const cost = await ario.getTokenCost({
  intent: 'Buy-Name', name: 'myapp', type: 'lease', years: 1,
});
console.log('Cost:', cost / 1_000_000, 'ARIO');

// Buy (mints an ANT as Metaplex Core NFT)
await ario.buyRecord({ name: 'myapp', type: 'lease', years: 1 });
// type: 'lease' (1-5 years) or 'permabuy' (forever)
```

### Set a record on an ANT (point name to data)

```typescript
const record = await ario.getArNSRecord({ name: 'myapp' });
const ant = ANT.init({ signer, processId: record.processId });

// Set root record
await ant.setRecord({
  undername: '@',
  transactionId: manifestResponse.id, // Arweave TX ID
  ttlSeconds: 3600,
});
// Live at: https://myapp.turbo-gateway.com

// Set undername
await ant.setRecord({
  undername: 'docs',
  transactionId: docsManifestId,
  ttlSeconds: 3600,
});
// Live at: https://docs_myapp.turbo-gateway.com
```

### Resolve an ArNS name

```typescript
const ario = ARIO.mainnet(); // read-only, no signer needed

// Base name
const result = await ario.resolveArNSName({ name: 'ardrive' });
// { processId, txId, type, owner, name }

// Undername (use underscore separator)
const sub = await ario.resolveArNSName({ name: 'docs_ardrive' });
```

### Fetch data from a gateway

```typescript
// Direct fetch by TX ID
const res = await fetch('https://turbo-gateway.com/{txId}');

// Fetch via ArNS name
const res = await fetch('https://ardrive.turbo-gateway.com');

// Fetch with Wayfinder (verified, multi-gateway fallback)
import { createWayfinderClient } from '@ar.io/wayfinder-core';
const wayfinder = createWayfinderClient();
const res = await wayfinder.request('ar://ardrive');
```

### Query gateways and balances

```typescript
const ario = ARIO.mainnet();

const { items: gateways } = await ario.getGateways();
const gateway = await ario.getGateway({ address: 'solana-pubkey-here' });
const balance = await ario.getBalance({ address: 'solana-pubkey-here' });
const supply = await ario.getTokenSupply();
const epoch = await ario.getCurrentEpoch();
const demandFactor = await ario.getDemandFactor();
```

### Token conversion

```typescript
import { ARIOToken, mARIOToken } from '@ar.io/sdk';

new ARIOToken(1000).toMARIO();     // 1000 ARIO → 1000000000 mARIO
new mARIOToken(1000000).toARIO();  // 1000000 mARIO → 1 ARIO
// All protocol operations use mARIO internally (6 decimals)
```

## ArNS URL Patterns

ArNS names resolve as subdomains on ALL ar.io gateways:

```
https://<name>.<gateway>           → base name
https://<undername>_<name>.<gateway> → undername (UNDERSCORE, not dot)
```

Examples:
```
https://myapp.ar.io                → served by the ar.io gateway
https://myapp.turbo-gateway.com    → same content, different gateway
https://docs_myapp.ar.io           → "docs" undername
https://api_myapp.ar.io            → "api" undername
```

The `ar://` protocol works with Wayfinder: `ar://myapp`, `ar://docs_myapp`

## Gateway API Endpoints

Base URL: `https://<gateway>/`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/{txId}` | Fetch transaction/data-item content |
| GET | `/raw/{txId}` | Raw content (no manifest resolution) |
| GET | `/ar-io/resolver/{name}` | Resolve an ArNS name |
| GET | `/ar-io/info` | Gateway info (wallet, release, config) |
| GET | `/ar-io/healthcheck` | Health status |
| GET | `graphql` | GraphQL endpoint for querying transactions |

Public gateways: `turbo-gateway.com`, `perma.online`

## Key Constants

| Constant | Value |
|----------|-------|
| ARIO decimals | 6 (1 ARIO = 1,000,000 mARIO) |
| Total supply | 1,000,000,000 ARIO (fixed, non-inflationary) |
| Token standard | SPL Token on Solana |
| Min operator stake | 10,000 ARIO |
| Gateway registry cap | 3,000 |
| Name registry cap | 50,000 |
| Name characters | a-z, 0-9, hyphens (1-51 chars, no 43-char names) |
| Default undernames | 10 per name (up to 10,000) |
| Max lease duration | 5 years |
| Lease grace period | 2 weeks |
| Epoch duration | 24 hours |
| Solana TX fees | < 0.01 SOL per operation |
| Free upload limit | 100 KiB via Turbo |

### ArNS Pricing (Genesis Base Fees)

| Name Length | Fee (ARIO) |
|-------------|-----------|
| 1 char | 1,000,000 |
| 2 chars | 200,000 |
| 3 chars | 20,000 |
| 4 chars | 10,000 |
| 5 chars | 2,500 |
| 6 chars | 1,500 |
| 7 chars | 800 |
| 8 chars | 500 |
| 9 chars | 400 |
| 10 chars | 350 |
| 11 chars | 300 |
| 12 chars | 250 |
| 13+ chars | 200 |

Actual price = Base Fee x Demand Factor. Use `ario.getTokenCost()` to check live pricing.

## Critical Rules for Code Generation

- **Use `fetch` not `axios`** for HTTP requests
- **Use `ARIO.mainnet()` from `@ar.io/sdk`** — this defaults to Solana
- **ArNS undernames use underscores**: `docs_myapp.turbo-gateway.com` (NOT dots)
- **Call `setRecord` on ANT instances**, not on the ARIO client
- **All token amounts are in mARIO** (multiply ARIO by 1,000,000)
- **SOL is needed** for every write operation (Solana transaction fees)
- **`processId` in API responses** refers to the ANT's Metaplex Core NFT mint address (legacy field name)
- **Do NOT use `@solana/web3.js`** — it is deprecated. Use `@solana/kit`
- **Turbo and ar.io SDK use different signer formats** — Turbo takes `privateKey` as base58 string with `token: 'solana'`; ar.io SDK takes a `@solana/kit` KeyPairSigner
- **Files < 100 KiB upload free** via Turbo — no payment needed
- **ArNS names are NOT case-sensitive** — always lowercase at submission

## Full API Method Reference

### ARIO Read Methods (no signer needed)
`getInfo()`, `getTokenSupply()`, `getBalance({ address })`, `getBalances()`, `getArNSRecord({ name })`, `getArNSRecords()`, `getArNSRecordsForAddress({ address })`, `resolveArNSName({ name })`, `getGateway({ address })`, `getGateways()`, `getCurrentEpoch()`, `getEpoch({ epochIndex })`, `getDemandFactor()`, `getTokenCost({ intent, name, type, years? })`, `getCostDetails({ intent, fromAddress, fundFrom, name, type })`, `getPrimaryName({ address })`, `getPrimaryNames()`, `getArNSReturnedNames()`, `getArNSReturnedName({ name })`, `getRedelegationFee({ address })`

### ARIO Write Methods (require signer)
`transfer({ target, qty })`, `buyRecord({ name, type, years?, processId?, referrer? })`, `upgradeRecord({ name })`, `extendLease({ name, years })`, `increaseUndernameLimit({ name, qty })`, `joinNetwork({ qty, allowDelegatedStaking, minDelegatedStake, delegateRewardShareRatio, label, note, fqdn, port, protocol, observerWallet, properties })`, `leaveNetwork()`, `updateGatewaySettings({...})`, `increaseOperatorStake({ qty })`, `decreaseOperatorStake({ qty })`, `delegateStake({ target, qty })`, `decreaseDelegateStake({ target, qty })`, `redelegateStake({ source, target, qty })`, `instantWithdrawal({ gatewayAddress, vaultId })`, `cancelWithdrawal({ gatewayAddress, vaultId })`, `setPrimaryName({ name })`, `requestPrimaryName({ name })`, `createVault({ qty, lockLengthMs })`, `extendVault({ vaultId, extendLength })`, `increaseVault({ vaultId, qty })`, `revokeVault({ vaultId })`, `saveObservations({ reportTxId, failedGateways })`

### ANT Methods
`ANT.init({ signer?, processId })` — initialize ANT client
`ANT.spawn({ signer, state: { name, ticker, description } })` — mint new ANT (Metaplex Core NFT)
`getInfo()`, `getState()`, `getRecord({ undername })`, `getRecords()`, `getOwner()`, `getControllers()`
`setRecord({ undername, transactionId, ttlSeconds })`, `removeRecord({ undername })`, `transfer({ target })`, `addController({ controller })`, `removeController({ controller })`, `setName({ name })`, `setTicker({ ticker })`

### Turbo Methods
`TurboFactory.authenticated({ privateKey, token })` or `TurboFactory.unauthenticated()`
`upload({ data, dataItemOpts? })`, `uploadFile({ fileStreamFactory, fileSizeFactory, dataItemOpts? })`, `uploadFolder({ folderPath, dataItemOpts?, manifestOptions? })`, `getBalance()`, `getUploadCosts({ bytes: [size] })`, `topUpWithTokens({ tokenAmount })`, `shareCredits({ approvedAddress, approvedWincAmount })`, `revokeCredits({ approvedAddress })`

## Documentation

Full docs: https://docs.ar.io
- SDK reference: https://docs.ar.io/sdks/ar-io-sdk
- Turbo SDK: https://docs.ar.io/sdks/turbo-sdk
- Gateway API: https://docs.ar.io/apis/ar-io-node
- ArNS guide: https://docs.ar.io/learn/arns
- Wayfinder: https://docs.ar.io/sdks/wayfinder
