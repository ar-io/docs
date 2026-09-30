import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";

import {
  remarkMdxMermaid,
  type RehypeCodeOptions,
} from "fumadocs-core/mdx-plugins";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: "content",
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMdxMermaid, remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    // Shiki gives up on a line after 500ms by default and emits it
    // uncoloured. Under a loaded build that fires at random, so identical
    // source produced different HTML each build and defeated deploy dedupe.
    // 0 disables the limit, making highlighting deterministic. The option is
    // forwarded to Shiki's codeToHast at runtime but missing from Fumadocs'
    // RehypeCodeOptions type, hence the cast.
    rehypeCodeOptions: { tokenizeTimeLimit: 0 } as RehypeCodeOptions,
    remarkImageOptions: {
      external: true, // allow remote images
      onError: "ignore", // don't fail build if size fetch fails
    },
  },
});
