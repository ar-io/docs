# LLM Text Generation Scripts

This directory contains scripts for generating LLM-friendly text files from the documentation content.

## Scripts

### `generate-llm-text.js`

Generates a single comprehensive `llm.txt` file containing all content from the entire site.

**Usage:**

```bash
npm run generate-llm-text
```

**Output:** `public/llms-full.txt`

### `generate-sdk-llm-texts.js`

Generates dedicated `llm.txt` files for each SDK directory, making it easier to work with specific SDK documentation.

**Usage:**

```bash
npm run generate-sdk-llm-texts
```

**Output:** Each SDK directory gets its own `llm.txt` file:

- `content/sdks/ar-io-sdk/llm.txt` → `https://docs.ar.io/sdks/ar-io-sdk/llm.txt`
- `content/sdks/ardrive-core-js/llm.txt` → `https://docs.ar.io/sdks/ardrive-core-js/llm.txt`
- `content/sdks/turbo-sdk/llm.txt` → `https://docs.ar.io/sdks/turbo-sdk/llm.txt`
- `content/sdks/wayfinder/llm.txt` → `https://docs.ar.io/sdks/wayfinder/llm.txt`
- `content/sdks/(clis)/llm.txt` → `https://docs.ar.io/sdks/(clis)/llm.txt` (contains ardrive-cli content)

The files are also copied to the `public/sdks/` directory for web access, making them available as static files that can be accessed via HTTP URLs.

## Features

Both scripts:

- Extract frontmatter metadata (title, description)
- Clean content by removing imports, exports, and JSX tags
- Generate proper URLs for each page
- Handle nested directory structures
- Skip empty content
- Provide progress feedback during generation

## Content Processing

The scripts process `.mdx` files by:

1. Parsing frontmatter to extract titles and metadata
2. Removing technical elements (imports, exports, JSX)
3. Cleaning up whitespace and formatting
4. Generating relative URLs for each page
5. Combining all content into structured text files

This makes the content more suitable for LLM consumption while preserving the essential information and structure.
