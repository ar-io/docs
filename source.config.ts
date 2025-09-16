import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";

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
  exclude: ["migrated/**"],
});

export default defineConfig({
  mdxOptions: {
    remarkImageOptions: {
      external: true, // allow remote images
      onError: "ignore", // don’t fail build if size fetch fails
    },
  },
});
