# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Documentation site for the ar.io Developer Platform, covering services, SDKs, and tools for building on ar.io and Arweave. Built with [Fumadocs](https://fumadocs.dev/) on Next.js. Live site: [docs.ar.io](https://docs.ar.io)

## Key Commands

```bash
npm run dev              # Start dev server (uses Turbo, standalone mode)
npm run build            # Production build (static export to out/)
npm run lint             # ESLint (src/ and content/, .ts/.tsx/.mdx)
npx tsc --noEmit         # TypeScript type checking
npm run check-links      # Validate internal/external links

# Content generation
npm run generate-api-docs      # Generate OpenAPI docs from ar-io-node + turbo services
npm run generate-sdk-docs      # Generate SDK reference from external repo READMEs
npm run generate-llm-text      # Generate public/llms-full.txt
npm run generate-sdk-llm-texts # Generate per-SDK llm.txt files
npm run generate-all-docs      # Run all generation scripts (except API docs)
```

Note: The `postinstall` script runs `fumadocs-mdx` to generate the `.source/` directory (content type definitions and index). This must run before the dev server or build will work. If `.source/` is missing, run `npm install` or `npx fumadocs-mdx`.

## Architecture

### Build Modes
- **Development** (`npm run dev`): Runs as standalone Next.js server with hot reload
- **Production** (`npm run build`): Static export (`output: "export"`) with trailing slashes and unoptimized images. ESLint errors are ignored during production builds.
- `redirects.mjs` contains legacy URL redirects from the old docs structure; these only work in dev mode (static export doesn't support server-side redirects)

### Routing
- `src/app/[[...slug]]/` - Single catch-all route handles all documentation pages
- `src/app/[[...slug]]/page.tsx` - Renders MDX content, generates static params, handles metadata/OG tags
- `src/app/api/search/route.ts` - Orama full-text search endpoint
- 404s redirect to `/learn` as a fallback

### Content Source Pipeline
- `src/lib/source.ts` - Content loader using `fumadocs-core`'s `loader()`, with:
  - OpenAPI transformer for API reference pages
  - Alphabetical sorting for `build/guides` folder (via `ALPHABETICALLY_SORTED_FOLDERS`)
  - Icon resolution from `meta.json` - supports Lucide icon names, SVG/PNG paths, and the special `ThemeIcon` for dark/light variants
- `.source/` (generated) - TypeScript types and content index produced by `fumadocs-mdx`
- `src/mdx-components.tsx` - All MDX components registered here, including 30+ Lucide icons available as JSX in MDX files

### Content Organization
- `content/` - All documentation in MDX format
  - `content/learn/` - Conceptual documentation (ArNS, gateways, token, etc.)
  - `content/build/` - Developer guides (access data, upload, run gateway)
  - `content/sdks/` - SDK documentation (ar-io-sdk, turbo-sdk, ardrive-cli, wayfinder)
  - `content/apis/` - API reference (ar-io-node, turbo services)
- `content/meta.json` - Root navigation structure
- Each folder uses `meta.json` to define page order and navigation
- Parenthesized folders like `(introduction)` are route groups (removed from URL)

### Path Aliases
- `@/*` → `./src/*`
- `@/.source` → `./.source/index.ts` (Fumadocs generated content)

### Key Components
- **Ask Arie** (`src/components/ask-arie/`) - AI chat widget with session persistence (sessionStorage), thread management, health checks against 3 backend APIs, and citation rendering
- **Page Actions** (`src/components/page-actions.tsx`) - LLM copy button (fetches raw markdown from GitHub) and "Open in AI" dropdown (ChatGPT, Claude, etc.)
- **Search** (`src/components/search.tsx`) - Orama full-text search on a static index built at build time

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

### Code Examples
- Use `fetch` instead of `axios` for HTTP requests
- Use `ARIO.mainnet()` from '@ar.io/sdk' for ArNS operations
- Call `setRecord` on ANT instances, not ARIO instances
- ArNS undernames use underscores: `api_myapp.arweave.net` (not periods)

### Navigation
- `meta.json` files control page ordering in each directory
- Format: `{ "pages": ["page-slug", "folder-name", "..."] }`
- Use `"..."` for auto-discovery of remaining pages
- Use `"!folder-name"` to exclude a folder from navigation
- Optional fields: `"icon"` (Lucide icon name), `"defaultOpen"` (expand on load)
- `build/guides` is automatically sorted alphabetically (configured in `src/lib/source.ts`)

## OpenAPI Integration

The site pulls OpenAPI specs from external sources via `scripts/generate-api-docs.ts`:
- ar-io-node: `https://raw.githubusercontent.com/ar-io/ar-io-node/refs/heads/main/docs/openapi.yaml`
- turbo upload-service and payment-service

Runtime rendering uses `src/lib/openapi.ts` which fetches the ar-io-node spec directly. Generated API docs go to `content/apis/`. Use `<APIPage>` component in MDX for rendering.

## LLM Text Generation

Scripts generate AI-friendly text files from docs:
- `public/llms-full.txt` - Complete site content
- `content/sdks/*/llm.txt` - Per-SDK content (also copied to `public/sdks/`)

## Deployment

The site deploys to Arweave via GitHub Actions (`.github/workflows/deploy-to-arweave.yaml`) on pushes to main. The `scripts/deploy-to-arweave.mjs` script handles the actual deployment using permaweb-deploy.
