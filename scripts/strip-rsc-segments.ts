/**
 * Post-build step: delete the React Server Components segment payloads that
 * the static export writes next to every page (`__next.*.txt`, including
 * `__next._full.txt`, a byte-for-byte copy of `index.txt`).
 *
 * Why: they are never requested. Next's per-segment prefetch cache is what
 * reads them, and prefetching is switched off site-wide (the Link handed to
 * Fumadocs in src/components/provider.tsx); client-side navigation fetches
 * only the page's `index.txt`. Yet they are ~75 MB of the export, and every
 * Arweave deploy pays to upload the ones that change with a page.
 *
 * Do not re-enable prefetching on the strength of keeping these files: on
 * Next 16 the export writes the page segment as `__next.<seg>/__PAGE__.txt`
 * while the client requests `__next.<seg>.__PAGE__.txt`, and with the
 * payloads kept, prefetched navigations rendered blank pages.
 *
 * `index.txt` is kept: it is what makes navigation client-side. Removing it
 * too would halve the export again at the cost of a full page load per click
 * -- Next falls back to one (`doMpaNavigation`) whenever a payload is missing
 * or is not Flight data, e.g. the gateway's 404 fallback page.
 *
 * A link that does prefetch (any `next/link` without `prefetch={false}`)
 * does not break, but it is not free: each miss is a HEAD plus segment GETs
 * that the gateway answers with a 200 HTML page, retried ~10s later. Before
 * prefetching was switched off that was 30+ requests a click over HTTP/1.1,
 * and real navigations queued behind them for seconds.
 *
 * Only files that look like Flight data are removed.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../out");

/** A Flight payload's first row: `1:"$Sreact.fragment"`, `0:{...}`, `:HL[...]`. */
const FLIGHT_ROW = /^[0-9a-f]*:/;

function isPayloadName(name: string): boolean {
  return name.startsWith("__next.") && name.endsWith(".txt");
}

async function collectPayloads(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectPayloads(full);
      return entry.isFile() && isPayloadName(entry.name) ? [full] : [];
    }),
  );
  return files.flat();
}

async function main() {
  try {
    await fs.access(OUT_DIR);
  } catch {
    throw new Error(`Output directory not found: ${OUT_DIR}. Run "next build" first.`);
  }

  let removed = 0;
  let bytes = 0;
  const kept: string[] = [];

  for (const file of await collectPayloads(OUT_DIR)) {
    const handle = await fs.open(file);
    const { buffer, bytesRead } = await handle.read(Buffer.alloc(64), 0, 64, 0);
    const { size } = await handle.stat();
    await handle.close();

    if (!FLIGHT_ROW.test(buffer.subarray(0, bytesRead).toString("utf8"))) {
      kept.push(path.relative(OUT_DIR, file));
      continue;
    }

    await fs.unlink(file);
    removed += 1;
    bytes += size;
  }

  console.log(
    `[strip-rsc-segments] removed ${removed} payload file(s), ` +
      `${(bytes / 1048576).toFixed(1)} MB.`,
  );
  if (kept.length > 0) {
    console.log(`[strip-rsc-segments] kept ${kept.length} non-payload file(s): ${kept.join(", ")}`);
  }
}

main().catch((error) => {
  console.error("[strip-rsc-segments]", error);
  process.exit(1);
});
