# Whitepaper Draft Audit Notes (Retired)

> **Retired:** This audit is no longer part of the active workflow. The actionable v3.0.0 whitepaper findings have been folded into the docs and `working/MIGRATION_STATUS.md`. Keep this file only for historical context; do not use it as a task list or source of truth.

Date: 2026-04-30

These notes capture concrete documentation gaps still visible in the repository after the Solana migration pass, to help align docs with the latest whitepaper draft expectations.

---

## Findings Table

| Priority | Finding | Evidence | Impact | Recommended Fix |
|---|---|---|---|---|
| High | Token mint placeholders still visible | `content/learn/token/get-the-token.mdx`, `content/learn/token/wallets.mdx` | Users cannot reliably verify/add canonical token | Replace all `<ARIO_MINT_ADDRESS>` placeholders and verify explorer/deeplink URLs |
| High | Program ID placeholder in operator docs | `content/build/run-a-gateway/manage/environment-variables.mdx` (`IO_PROCESS_ID` still `<ARIO_PROGRAM_ID>`) | Operator docs are partially non-executable for production | Replace with final canonical program address and confirm program/process wording consistency |
| Medium | Migration timeline unresolved | `content/learn/token/migration.mdx` contains `/* TODO: Update with final dates */` | Migration guide lacks actionable timing | Add concrete phases/dates and claim app URL/deadline behavior |
| Medium | Legacy terminology needs cleanup pass | `processId` references + AO legacy notes across SDK and migration docs | Mixed default-vs-legacy messaging can confuse users | Add explicit "Default: Solana / Legacy: AO" callouts and label legacy paths consistently |

---

## Repo Alignment Check Against `working/MIGRATION_STATUS.md`

| Item in `MIGRATION_STATUS.md` | Still Present in Repo | Notes |
|---|---|---|
| Replace `<ARIO_MINT_ADDRESS>` and `<ARIO_PROGRAM_ID>` placeholders | Yes | Still visible in user and operator docs |
| Regenerate SDK outputs from Solana devnet | Yes | Pending generation pass |
| Update UI screenshots in ArNS UI guides | Yes | Still listed as pending |
| Regenerate LLM text outputs | Yes | Still listed as pending |
| Re-verify `turbo-credits.mdx` with Turbo team | Yes | Still listed as pending |

---

## Suggested Execution Order

| Order | Action | Why First/Next |
|---|---|---|
| 1 | Replace launch-critical placeholders (mint/program IDs) | Immediate user/operator correctness |
| 2 | Finalize migration timeline/claim details | Removes migration ambiguity |
| 3 | Run SDK/doc generation scripts | Refreshes stale generated outputs |
| 4 | Do terminology QA sweep (Solana default clarity) | Reduces support confusion |
| 5 | Update screenshots and rerun validations | Final polish + confidence check |

---

## Quick Validation Checklist

| Check | Command |
|---|---|
| Lint | `npm run lint` |
| Typecheck | `npx tsc --noEmit` |
| SDK docs generation | `npm run generate-sdk-docs` |
| Full docs generation | `npm run generate-all-docs` |
| Link validation | `npm run check-links` |

---

## 2026-05-14 Review Against v3.0.0 Final Whitepaper

Source of truth reviewed:

- `.temp/Ar.io Network and Token White Paper_v3.0.0-FINAL.docx/Ar.ioNetworkandTokenWhitePaper_v3.0.0FINAL.do.html`
- `working/MIGRATION_STATUS.md`

### High Priority Updates

| Area | Portal Evidence | Whitepaper v3.0.0 Source Point | Recommended Update |
|---|---|---|---|
| Gateway minimum stake | `content/learn/token/get-the-token.mdx`, `content/learn/token/migration.mdx`, `content/build/run-a-gateway/join-the-network.mdx`, generated SDK gateway examples still say `10,000 ARIO` | Section 6 staking values and v3.0.0 revisions say the minimum network-join stake increased to `20,000 ARIO` | Replace user/operator guidance and CLI examples with `20,000 ARIO` / `20,000,000,000` mARIO; regenerate SDK docs if examples come from upstream |
| Withdrawal durations | `content/build/run-a-gateway/manage/solana-migration.mdx` and `content/build/run-a-gateway/manage/troubleshooting.mdx` still describe excess/delegated stake as a `90-day` queue | Whitepaper says excess operator stake withdraw duration is `30 days`; delegated stake withdraw duration is `30 days`; network leave duration remains `90 days` | Separate the concepts clearly: excess operator stake and delegated stake withdrawal = 30 days; full network leave / network-join stake return = 90 days |
| Solana launch placeholders | `content/learn/token/get-the-token.mdx`, `content/learn/token/wallets.mdx`, `content/build/run-a-gateway/manage/environment-variables.mdx` | `MIGRATION_STATUS.md` still tracks `<ARIO_MINT_ADDRESS>` and `<ARIO_PROGRAM_ID>` as launch blockers | Replace final mint/program IDs and verify explorer links, wallet instructions, and `IO_PROCESS_ID` defaults |
| Migration guide finality | `content/learn/token/migration.mdx` still has generic "as migration progresses", missing dates, and `TODO: Update with final dates` | Whitepaper states v3.0.0 hard-forks the protocol to Solana; migration status flags this page as needing update | Replace provisional copy with final cutover/claim wording, claim app URL, claim window behavior, and whether legacy AO access is still relevant |

### Medium Priority Updates

| Area | Portal Evidence | Whitepaper v3.0.0 Source Point | Recommended Update |
|---|---|---|---|
| Gateway and delegate capacity | `content/learn/gateways/gateway-registry.mdx` and `content/learn/token/staking.mdx` omit hard limits | Whitepaper adds maximum `3,000` gateways and maximum `10,000` delegated stakers per gateway | Add concise limits to gateway registry/staking docs, especially operator-facing pages |
| Delegated staking constants | Portal covers the concept but generally omits `10 ARIO` global minimum delegation and `0 to 95%` reward share range | Whitepaper Table 6.3 lists these delegated staking values | Add constants where users configure delegation or read operator settings |
| Primary-name fee and uniqueness | `content/learn/arns/name-registration.mdx` says "small fee"; primary-name guide does not cover uniqueness/removal rules | Whitepaper says the primary-name fee equals one undername purchase on a 51-character name of the same purchase type, adjusted by Demand Factor; a name cannot be primary for more than one wallet; base ANT owner can remove primary names on undernames | Update conceptual and build guides with exact fee basis and ownership/removal rules |
| Gateway operator ArNS discount | `content/learn/arns/pricing-model.mdx` mentions eligibility only generally | Whitepaper says eligibility requires `0.9 GPRW` and `1.0 TW`; discount is `20%` on registrations, lease extensions, lease upgrades, and undername purchases | Add criteria and scope, or link to a live source if product wants to avoid hardcoding |
| Gateway serving function coverage | `content/learn/gateways/architecture.mdx` covers retrieval/verification but not the new serving function group as a grouped capability | Whitepaper v3.0.0 adds a Serving function group: range requests, signed responses, x402, hedged peer routing, and content moderation hooks | Add/refresh a section that frames these as gateway serving capabilities and links to `verification-headers`, `x402`, caching/routing, and moderation docs |

### Existing Tracker Items Still Valid

These align with `working/MIGRATION_STATUS.md` and should stay on the launch checklist:

- Regenerate SDK docs with `npm run generate-sdk-docs`; generated ar.io SDK pages still contain stale `10_000` gateway stake examples.
- Regenerate API docs with `npm run generate-api-docs`.
- Regenerate LLM text outputs after content updates.
- Update ArNS UI screenshots and flows in `purchase-arns-ui.mdx` and `manage-arns-ui.mdx`.
- Operator technical review is still needed for Solana wallet, observer, env var, SOL fee, cranker, and pruning guidance.

