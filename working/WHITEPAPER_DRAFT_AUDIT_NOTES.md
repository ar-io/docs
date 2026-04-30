# Whitepaper Draft Audit Notes (Working)

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

