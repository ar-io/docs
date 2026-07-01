/**
 * Post-build step: inject the chunk-load recovery script as a real,
 * parser-blocking inline <script> at the very top of <head> in every exported
 * HTML file.
 *
 * Why a post-build step instead of rendering it in the React tree: under
 * `output: "export"` (Next.js static export + Turbopack + React 19) the RSC
 * renderer serializes any inline <script> — whether authored via next/script
 * or a plain <script> tag — into the React Flight payload (__next_f) rather
 * than emitting an executable tag. Such a script only runs after hydration,
 * which depends on the very app chunks it is meant to recover. Injecting into
 * the emitted HTML guarantees it executes before the async chunk scripts.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chunkLoadRecoveryScript } from "../src/lib/chunk-load-recovery-script";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../out");
const MARKER_ID = "chunk-load-recovery";
const SCRIPT_TAG = `<script id="${MARKER_ID}">${chunkLoadRecoveryScript}</script>`;

async function collectHtmlFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectHtmlFiles(full);
      return entry.isFile() && entry.name.endsWith(".html") ? [full] : [];
    }),
  );
  return files.flat();
}

async function main() {
  try {
    await fs.access(OUT_DIR);
  } catch {
    throw new Error(
      `Output directory not found: ${OUT_DIR}. Run "next build" first.`,
    );
  }

  const htmlFiles = await collectHtmlFiles(OUT_DIR);
  if (htmlFiles.length === 0) {
    throw new Error(`No HTML files found under ${OUT_DIR}.`);
  }

  let injected = 0;
  let skipped = 0;
  const missingHead: string[] = [];

  for (const file of htmlFiles) {
    const html = await fs.readFile(file, "utf8");

    if (html.includes(`id="${MARKER_ID}"`)) {
      skipped += 1;
      continue;
    }

    const headIndex = html.indexOf("<head>");
    if (headIndex === -1) {
      missingHead.push(path.relative(OUT_DIR, file));
      continue;
    }

    const insertAt = headIndex + "<head>".length;
    const next = html.slice(0, insertAt) + SCRIPT_TAG + html.slice(insertAt);
    await fs.writeFile(file, next);
    injected += 1;
  }

  console.log(
    `[inject-chunk-load-recovery] injected into ${injected} file(s), ` +
      `skipped ${skipped} already-injected file(s).`,
  );

  if (missingHead.length > 0) {
    throw new Error(
      `No <head> found in ${missingHead.length} HTML file(s): ` +
        missingHead.slice(0, 10).join(", ") +
        (missingHead.length > 10 ? ", …" : ""),
    );
  }
}

main().catch((error) => {
  console.error("[inject-chunk-load-recovery]", error);
  process.exit(1);
});
