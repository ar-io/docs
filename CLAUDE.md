# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Documentation site for the ar.io Developer Platform, covering services, SDKs, and tools for building on ar.io and Arweave. Built with [Fumadocs](https://fumadocs.dev/) on Next.js. Live site: [docs.ar.io](https://docs.ar.io)

The ar.io protocol runs on **Solana** (plus Arweave for storage). Content was migrated from an earlier AO-based architecture; `working/MIGRATION_STATUS.md` tracks that page-by-page and is the place to check before assuming an older AO-era doc is still accurate.

## Key Commands

```bash
npm run dev              # Start dev server (Turbo, standalone mode, no trailing slashes)
npm run build            # Production build → static export to out/, then injects chunk-load recovery and strips unused RSC segment files
npm run lint             # ESLint (src/ and content/, .ts/.tsx/.mdx)
npx tsc --noEmit         # TypeScript type checking
npm run check-links      # Validate internal links across all content/ MDX
npm run test:chunk-recovery    # Playwright test for chunk-load recovery (requires ./out + Playwright)

# Content generation
npm run generate-api-docs      # Generate OpenAPI docs from ar-io-node + turbo services
npm run generate-sdk-docs      # Generate SDK reference from external repo READMEs
npm run generate-llm-text      # Generate public/llms-full.txt
npm run generate-sdk-llm-texts # Generate per-SDK llm.txt files
npm run generate-all-docs      # sdk-docs + llm-text + sdk-llm-texts (NOT api-docs)
```

The `postinstall` script runs `fumadocs-mdx` to generate the `.source/` directory (content type definitions and index). This must run before the dev server or build will work. If `.source/` is missing, run `npm install` or `npx fumadocs-mdx`. The package manager is **yarn 1.22.22** (`packageManager` in `package.json`); Node **v22.14.0** is pinned in `.nvmrc`.

There is no unit test suite. `npm run check-links` is the practical correctness gate for content changes and should be clean (it currently reports `0 errored file, 0 errors`). The only other wired-up test is `test:chunk-recovery`, a Playwright integration test in `tests/` that is deliberately not run in build/lint/CI — run it on demand after `npm run build`. The `test-arns` / `test-signer` scripts in `package.json` reference files that no longer exist and are dead.

`README.md` is out of date: it describes `app/docs` and `app/(home)` routes and a `scripts/deploy-to-arweave.mjs`, none of which exist. Trust this file and the code over it.

## Architecture

### Deterministic output (deploy cost)

`next.config.mjs` sets **`generateBuildId`** to a hash of the bundle inputs (`yarn.lock`, `next.config.mjs`, `source.config.ts`, `src/`). This is a cost control, not a cosmetic choice.

Next defaults to a *random* build id per build and embeds it in every exported HTML file and RSC payload. Two builds of identical source therefore shared almost no bytes — 2,638 of 3,172 files differed — so every Arweave deploy re-uploaded the whole 367 MB site (~$169) instead of only what changed. With the hash, a docs edit leaves the id and every unrelated page untouched: **~90% of output deduplicates**.

Do **not** replace it with a hard-coded constant. The id is what Next uses to detect deployment skew — when an RSC response carries a different id than the running bundle, the client forces a full navigation. A constant disables that permanently; hashing the bundle inputs keeps it working (source/dependency changes still move the id) while making content edits deterministic.

Deduplication only pays off if `ar-io-deploy`'s transaction cache survives between deploys, so the deploy workflow persists `.ario-deploy/transaction-cache.json` to a dedicated unprotected `deploy-cache` branch (and restores it before deploying) — GitHub evicts Actions caches after 7 days unused, and deploys here are manual and infrequent.

The build id is not the only source of churn. Two others were found by diffing the Arweave manifests of consecutive deploys, and each is pinned down in config:
- **Turbopack module ids** (`experimental.turbopackModuleIds: "named"` in `next.config.mjs`). The default production ids are truncated hashes; two modules collided and the winner varied between CI runs (it does not reproduce locally). One flipped id renames a handful of chunks, and since every page references chunk filenames, every page changed — ~2,000 of ~3,500 files re-uploaded for a one-line edit.
- **Shiki's per-line tokenize time limit** (`tokenizeTimeLimit: 0` in `source.config.ts`). Under build load it fires at random and emits the line uncoloured, so ~40 pages with code blocks differed between builds of identical source.

If a deploy uploads more than it should, diff the manifests: `ar-io-deploy` logs `(N/M files cached, K uploaded)`, and `https://turbo-gateway.com/raw/<manifest-tx>` returns each deploy's path→tx map.

The sidebar tree is serialized into every page (the layout sits inside the catch-all route). Given the whole site's tree, it was ~100 KB of every page and any navigation change — a new page, a renamed title, a `meta.json` edit — rewrote every page. `sidebarTreeFor()` in `src/lib/source.ts` hands each page only its own section (Learn, Build, SDKs, ...) in full, other sections as tab stubs, no `fallback`, and no build-time `$ref` paths, so a nav change rewrites only its own section. Pages outside every section (e.g. those no `meta.json` lists) still get the full tree.

**RSC segment files are deleted after export** (`scripts/strip-rsc-segments.ts`). Next writes each page's React Server Components payload as `index.txt` plus several `__next.*.txt` segment files (`__next._full.txt` is a byte-for-byte copy of `index.txt`). Only `index.txt` is ever requested -- client-side navigation fetches it; the segment files serve Next's per-segment prefetch cache, and prefetching is switched off site-wide -- so the segments were ~75 MB of dead weight in every deploy. Deleting `index.txt` as well would halve the export again but turn every click into a full page load; Next falls back to that whenever a payload is missing or is not Flight data (the gateway's 404 fallback is HTML). When testing navigation, wait for hydration before clicking: an unhydrated link is a plain `<a>` and always does a full load, which looks exactly like broken client-side navigation.

**Prefetching is off everywhere, and that pairs with the segment stripping.** `src/components/provider.tsx` replaces Fumadocs' `RootProvider` so the framework `Link` behind every sidebar, card, prev/next and MDX link renders `next/link` with `prefetch={false}`; a direct `next/link` in our own components needs `prefetch={false}` too. With prefetching on, each visible link cost a HEAD plus `__next.*.txt` GETs for files that no longer exist; the gateway answers those with a 200 HTML page, Next retries ~10s later, and the resulting flood (30+ requests a click over HTTP/1.1) stalled real navigations for seconds or left clicks doing nothing. Keeping the segment files instead does not work on Next 16: the export writes `__next.<seg>/__PAGE__.txt` but the client requests `__next.<seg>.__PAGE__.txt`, and prefetched navigations rendered blank pages even with that name aliased. Measured against a gateway-like server, turning prefetch off left click latency unchanged (~280 ms) and cut requests ~6x.

Known remaining per-deploy churn: the Orama search index (`api/search`, ~14 MB) changes on any content edit because its document ids are sequential, and a few `apis/ar-io-node` pages vary between builds because React emits their async RSC rows in completion order. `ar-io-deploy`'s pre-flight credit check prices the whole folder, ignoring the cache, so the wallet must hold enough for a full upload even when the real cost is small.

**Gotcha worth knowing:** Tailwind v4 is configured with a bare `@import "tailwindcss"` and no `@source`, so it auto-scans the project honouring `.gitignore`. A build artifact left in the tree under a name `.gitignore` does not cover (`out-old/`, a copied `out/`) gets scanned, adds classes, and changes the CSS bundle — which then changes every page. If output ever looks non-deterministic, check for stray copies before suspecting the framework. `.ario-deploy/transaction-cache.json` is safe because Tailwind does not scan `.json`.

### Build Modes
- **Development** (`npm run dev`): Standalone Next.js server with Turbo, hot reload, no trailing slashes. Redirects from `redirects.mjs` work here.
- **Production** (`npm run build`): Static export (`output: "export"`) to `out/`, trailing slashes enabled, unoptimized images. ESLint errors are ignored during production builds. Redirects from `redirects.mjs` do **not** work (static export limitation) — they exist for reference and for the dev server only.

### Routing
- `src/app/[[...slug]]/` - Single catch-all route handles all documentation pages
- `src/app/[[...slug]]/page.tsx` - Renders MDX content, generates static params, handles metadata/OG tags
- `src/app/api/search/route.ts` - Orama static search endpoint (`staticGET`, built at build time)
- `src/app/robots.ts` and `src/app/sitemap.ts` - Emit `robots.txt` and `sitemap.xml` at build time (`dynamic = "force-static"`, required under static export). The sitemap lists every page `source.getPages()` knows, generated API pages included, with trailing-slash URLs to match the production export
- Unmatched pages `redirect("/learn")` rather than rendering a 404

### Content Source Pipeline
- `source.config.ts` - Fumadocs MDX configuration: registers remark plugins (Mermaid, math) and rehype plugins (KaTeX)
- `src/lib/source.ts` - Content loader using `fumadocs-core`'s `loader()`, with:
  - OpenAPI page-tree transformer for API reference pages
  - Alphabetical sorting for `build/guides` folder (via `ALPHABETICALLY_SORTED_FOLDERS`)
  - Icon resolution from `meta.json` - supports Lucide icon names, SVG/PNG paths, and the special `ThemeIcon` for dark/light variants
- `.source/` (generated) - TypeScript types and content index produced by `fumadocs-mdx`
- `src/mdx-components.tsx` - All MDX components registered here, including 20 Lucide icons available as JSX in MDX files
- `src/lib/layout.shared.tsx` - Shared layout options; the White Paper nav link only appears under `/learn`

### Content Organization
- `content/` - All documentation in MDX format
  - `content/learn/` - Conceptual documentation (ArNS, gateways, token, etc.)
  - `content/build/` - Developer guides (access data, upload, run gateway)
  - `content/sdks/` - SDK and CLI reference (`(clis)/` for CLIs such as ardrive-cli and ario-deploy; SDKs include ar-io-sdk, turbo-sdk, ardrive-core-js, wayfinder)
  - `content/apis/` - API reference (ar-io-node, turbo); generated into `content/apis/<service>/`
  - `content/glossary/` - Term definitions
- `content/meta.json` - Root navigation structure
- Each folder uses `meta.json` to define page order and navigation
- Parenthesized folders like `(introduction)` are route groups (removed from URL). This matters when writing links: `content/sdks/turbo-sdk/(events)/file-upload-events.mdx` is `/sdks/turbo-sdk/file-upload-events`.

### Path Aliases
- `@/*` → `./src/*`
- `@/.source` → `./.source/index.ts` (Fumadocs generated content)

### Key Components
- **Ask Arie** (`src/components/ask-arie/`) - AI chat widget with session persistence (sessionStorage), thread management, and citation rendering. Talks to one external backend (`sparklechat-*.onrender.com`) across three endpoints — ask, health, access-check — with a `corsproxy.io` fallback.
- **Page Actions** (`src/components/page-actions.tsx`) - LLM copy button (fetches raw markdown from GitHub) and "Open in AI" dropdown (ChatGPT, Claude, etc.)
- **Search** (`src/components/search.tsx`) - Orama full-text search on a static index built at build time
- **Chunk-load recovery** (`src/lib/chunk-load-recovery-script.ts`) - Injected as a real inline `<script>` into every exported HTML file by `scripts/inject-chunk-load-recovery.ts` as a post-build step. It cannot be rendered in the React tree: under `output: "export"` the RSC renderer serializes inline scripts into the Flight payload, so they would only run after hydration — which depends on the very chunks they exist to recover.

### Styling
- Tailwind CSS v4 with CSS-driven configuration (no `tailwind.config.*` file)
- Theme customization in `src/app/global.css` via `@theme` directive
- Brand colors: ar.io purple `#5427C8`, accent `#DFD6F7`

## Code Standards

### MDX Content
- Use Fumadocs UI components: `<Cards>`, `<Card>`, `<Steps>`, `<Step>`, `<Tabs>`, `<Tab>`
- Icons from lucide-react only (imported in mdx-components.tsx)
- Frontmatter required: `title`, `description`
- Optional frontmatter: `image`, `icon`, `keywords`, `author`, `full` (full-width layout)
- Custom components available: `<Tip>`, `<CodeGroup>`, `<Mermaid>`, `<APIPage>`, `<AskArieTooltip>`, `<Image>`
- Math/LaTeX: Use `$inline$` and `$$block$$` syntax (remark-math + rehype-katex)
- ESLint is relaxed in `.mdx` files: unused vars, unescaped entities, and `<img>` elements are allowed
- Write internal links without a trailing slash — `check-links` only registers the trailing-slash form for `index.mdx` pages

### Code Examples
- Use `fetch` instead of `axios` for HTTP requests
- Use `ARIO.mainnet()` from '@ar.io/sdk' for ArNS operations
- Call `setRecord` on ANT instances, not ARIO instances
- ArNS undernames use underscores: `api_myapp.gateway-url.tld` (not periods)
- Host conventions: gateway examples use `turbo-gateway.com`; ArNS names use `<name>.ar.io`; both Turbo services are served from `turbo.ardrive.io` (upload at the root, payment under `/v1`)

### Navigation
- `meta.json` files control page ordering in each directory
- Format: `{ "pages": ["page-slug", "folder-name", "..."] }`
- Use `"..."` for auto-discovery of remaining pages
- Use `"!folder-name"` to exclude a folder from navigation
- Optional fields: `"icon"` (Lucide icon name), `"defaultOpen"` (expand on load)
- `build/guides` is automatically sorted alphabetically (configured in `src/lib/source.ts`)
- Entries naming a page that does not exist are silently ignored, so they linger — `content/meta.json` still lists a `guides` folder that was never created

## OpenAPI Integration

`scripts/generate-api-docs.ts` pulls three specs and writes tag-grouped pages into `content/apis/<service>/`:
- ar-io-node: `ar-io/ar-io-node` on GitHub, **`main`** (the released branch; the repo's default is `develop`). It previously tracked `openapi-update`, a non-default branch last touched 2025-09-16 that was missing six endpoints and the entire Rate Limiting tag — the same "stale branch nobody watches" failure that hit the Turbo specs.
- turbo upload-service and payment-service: **the running services' own `/openapi.json`** (`upload.ardrive.io`, `payment.ardrive.io`), not GitHub. The `ardriveapp/turbo-*-service` repos were made private on 2026-08-28 and their specs were years stale (0.1.0 vs the deployed 1.5.0). The service endpoints are public, need no auth, and track what is actually deployed. This is the spec *source* — the base URL shown in examples is `turbo.ardrive.io`, applied as a `servers` override.

The generated MDX only carries the spec URL in `<APIPage document={...}>`; the spec itself is fetched and rendered through `src/lib/openapi.ts`.

**`src/lib/openapi.ts` overrides each spec's `servers` block, and this is load-bearing.** Fumadocs takes the base URL for every request example and the API playground from `servers`, falling back to `[{ url: "/" }]`, and the browser resolves a relative entry against `window.location.origin` — which silently turns every example into a request to `docs.ar.io`. The upstream specs cannot be trusted here: turbo-upload-service ships relative servers, and ar-io-node points at a gateway these docs do not use. The override map is keyed by the exact spec URLs that `generate-api-docs.ts` bakes into the MDX, so **those strings must stay in sync between the two files** — a mismatch does not error, it just silently renders the wrong host.

`src/lib/openapi.ts` also registers **media adapters** for `application/pdf`, `image/png`, `image/jpeg`, `text/plain` and `text/html`. A media type with no adapter is not a warning — it fails the build at prerender with `Media type <x> is not supported (in <path>)`. If a spec revision introduces another one, add it there.

Note `createOpenAPI()` is called with **no `input`** on purpose. Registering specs there makes `getSchemas()` fetch them all under a single `Promise.all`, so one unreachable spec fails *every* API page rather than only its own. With no registered schemas each page resolves its own document and failures stay contained.

`src/lib/openapi.ts` also supplies its own **`generateTypeScriptSchema`**. Fumadocs' default compiles `processed.bundled` — the entire OpenAPI document — instead of the response schema, which silently emitted `interface Response { [k: string]: unknown }` on every ar-io-node operation and threw ~121 warnings a build on the Turbo specs. Supplying the option also bypasses the default, which only runs when it is `undefined`.

The generator handles its own housekeeping, so `generate-api-docs` is just `tsx scripts/generate-api-docs.ts`:
- **Stale pages are swept.** Pages whose tag disappeared upstream are deleted, identified by the `This file was generated by Fumadocs` marker that every generated page carries. Hand-authored files (`content/apis/*/index.mdx` and every `meta.json`) never carry it and are never touched — which is why the directory must not simply be wiped.
- **`meta.json` is reconciled.** New tags are appended to `pages`, preserving the hand-ordered list; these arrays lead with `"..."`, so an unlisted page would otherwise surface above the established entries. Entries that no longer resolve are reported, not deleted — some are deliberate (separators, folder refs).

One hazard remains: generated pages are overwritten wholesale. Corrections that must survive belong in `src/lib/openapi.ts` (server URLs, TypeScript types, media adapters) or upstream in the spec — never in the generated MDX.

## Generated SDK Docs

`scripts/generate-sdk-docs.ts` rebuilds each SDK/CLI directory from the upstream repo README, splitting on H2/H3 headers.

**It deletes the whole destination directory and preserves only `index.mdx`.** So:
- `content/sdks/<pkg>/index.mdx` is hand-maintained and safe to edit — this is where landing-page content and `<Cards>` navigation live.
- Every other page under `content/sdks/<pkg>/` is generated; edits there are reverted on the next regeneration. Fix the upstream README, or fix the transform in `generate-sdk-docs.ts`.
- `resolveRelativeLinks()` rewrites repo-relative README links (`./examples/foo/`) into absolute GitHub URLs, since they would otherwise resolve against the docs site and 404.
- Regenerating also deletes the committed `llm.txt` files that live in those directories, which is why `generate-sdk-llm-texts` must run after `generate-sdk-docs`.
- `content/sdks/meta.json` (the SDKs section's own nav) is hand-curated and only created when missing; it lists pages the generator does not produce (`index`, `turbo-upload`). An earlier version rewrote it every run and silently dropped those from the sidebar.

## LLM Text Generation

Scripts generate AI-friendly text files from docs:
- `public/llms-full.txt` - Complete site content
- `content/sdks/*/llm.txt` - Per-SDK content (also copied to `public/sdks/`)

## Deployment

- **Production**: Deploys to Arweave via GitHub Actions (`.github/workflows/deploy-to-arweave.yaml`) on manual dispatch only (`workflow_dispatch`). Lints, builds, then uses the [`ar-io/ar-io-deploy`](https://github.com/ar-io/ar-io-deploy) action. Requires an ArNS undername input (`@` for the base name). Uploads are paid for in Turbo credits from the `DEPLOY_KEY` wallet — a failed deploy is usually an insufficient-credits error at the pre-flight check, not a build problem. The final step persists the dedupe cache to the unprotected `deploy-cache` branch (never the deployed branch); it is `continue-on-error` and can never fail an otherwise successful deploy. Deploys run with `incremental: "true"`: each file carries a `File-SHA256` tag and every deploy looks the wallet's past uploads up on chain (turbo-gateway.com GraphQL), so a runner with a cold dedupe cache still uploads only what changed; uploads take about 5-7 minutes to become findable. Files are uploaded **gzip-compressed** (`compress` input, default `gzip`; choose `none` to deploy uncompressed) and tagged `Content-Encoding`, which cuts each deploy's upload ~7x; `llm*.txt` and `*.md` are excluded so plain HTTP clients can read them. This depends on gateways sending `Content-Encoding` even for items they have not indexed yet -- true on the ar.io/Turbo gateways since 2026-09-30, and on other operators' gateways once they run the ar-io-node release with #964/#966. If compressed pages ever render as garbage right after a deploy, that is the first thing to check (`curl -sI` a page: a gzip body with no `content-encoding` header).
- **Preview**: `.github/workflows/deploy-to-pages.yml` publishes to GitHub Pages, also manual dispatch only. It builds with `BASE_PATH=/ar-io-docs`. There is no automatic per-PR preview.
- **Docker** (`Dockerfile` + `nginx.conf`): an alternative self-hosting path that builds the static export and serves `out/` from nginx. No workflow uses it.
- `scripts/delete-arns-undername.mjs` is a standalone maintenance utility (env: `DEPLOY_KEY`, `ARNS_NAME`, `UNDERNAME`) that is not wired into `package.json` or CI.
- **Doc regeneration**: `.github/workflows/regenerate-docs.yaml` runs **weekly (Mondays 07:00 UTC)** and on manual dispatch. Pick a generator (`all`, `api-docs`, `sdk-docs`, `llm-text`, `sdk-llm-texts`); scheduled runs default to `all`. It regenerates, verifies `yarn build`, and opens a PR rather than pushing to `main` — and only when output actually changed. None of the generation scripts run during `yarn build`, so without the weekly run generated content drifts silently. Read its diffs carefully — regeneration reverts hand-edits to generated pages.
