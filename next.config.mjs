import { createMDX } from "fumadocs-mdx/next";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import redirects from './redirects.mjs';

const withMDX = createMDX();

/**
 * Files and directories whose contents determine the client bundle. Editing
 * MDX under `content/` does not belong here: it changes individual pages, not
 * the bundle those pages load.
 */
const BUILD_INPUTS = ["yarn.lock", "next.config.mjs", "source.config.ts"];
const BUILD_INPUT_DIRS = ["src"];

function hashDirectory(hash, dir) {
  for (const entry of readdirSync(dir).sort()) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) hashDirectory(hash, full);
    else hash.update(entry).update(readFileSync(full));
  }
}

/**
 * Deterministic build id derived from the inputs above.
 *
 * Next defaults to a random id per build and embeds it in every exported HTML
 * file and RSC payload. Two builds of identical source therefore shared almost
 * no bytes — 2,638 of 3,172 files differed — so every deploy re-uploaded the
 * whole site to Arweave instead of only what changed.
 *
 * Hard-coding a constant would also fix that, but the id is what Next uses to
 * detect deployment skew: when an RSC response carries a different build id
 * than the running bundle, the client forces a full navigation so the two
 * cannot drift apart. A constant disables that permanently.
 *
 * Hashing the bundle inputs keeps both properties. A docs edit leaves the id
 * (and every unrelated page) untouched, so the upload deduplicates; a change
 * to `src/`, the config, or a dependency moves it and skew detection behaves
 * exactly as upstream intends.
 *
 * Length matches Next's own ids (21 chars) to avoid surprising anything that
 * assumes that shape.
 */
function bundleInputsHash() {
  const hash = createHash("sha256");

  for (const file of BUILD_INPUTS) {
    try {
      hash.update(readFileSync(file));
    } catch {
      // A missing optional input simply does not contribute to the hash.
    }
  }
  for (const dir of BUILD_INPUT_DIRS) hashDirectory(hash, dir);

  return hash.digest("base64url").slice(0, 21);
}

/** @type {import('next').NextConfig} */
const config = {
  // Enable static export only for production builds
  output: process.env.NODE_ENV === "production" ? "export" : "standalone",
  trailingSlash: process.env.NODE_ENV === "production" ? true : false,
  basePath: process.env.BASE_PATH || "",
  reactStrictMode: true,
  generateBuildId: async () => bundleInputsHash(),
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, // required for static export + <Image>
  redirects: () => redirects,
};

export default withMDX(config);
