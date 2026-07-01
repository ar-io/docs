// Manual integration test for the chunk-load recovery script
// (src/lib/chunk-load-recovery-script.ts, injected into the static export by
// scripts/inject-chunk-load-recovery.ts).
//
// It is intentionally NOT wired into `npm run build`, lint, or CI — it requires
// Playwright + a browser and is meant to be run on demand when changing the
// recovery script or the injector.
//
// Prerequisites:
//   1. Build the static export:   npm run build      (produces ./out)
//   2. Install Playwright once:    npm i -D playwright && npx playwright install chromium
//
// Run:
//   node tests/chunk-load-recovery.test.mjs
//   (or: npm run test:chunk-recovery)
//
// What it does: serves ./out over HTTP, returns a real 502 Bad Gateway for an
// actual app chunk, then drives Chromium to confirm the injected inline
// recovery script detects the failure and reloads to recover.
//
//   Scenario A  transient  — chunk 502s once, then succeeds -> 1 reload, recovers
//   Scenario B  persistent — chunk 502s forever             -> 2 reloads then stops
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../out");
const PORT = Number(process.env.PORT) || 4599;
const RECOVERY_KEY = "ar-io-docs:chunk-load-recovery";

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "Playwright is not installed. Run:\n" +
      "  npm i -D playwright && npx playwright install chromium",
  );
  process.exit(1);
}

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".map": "application/json",
};

let indexHtml;
try {
  indexHtml = await readFile(path.join(OUT, "index.html"), "utf8");
} catch {
  console.error(`Missing ${path.join(OUT, "index.html")}. Run "npm run build" first.`);
  process.exit(1);
}

// Pick a real chunk the home page loads, so the 502 hits the actual pipeline.
const targetChunk = indexHtml.match(/\/_next\/static\/chunks\/[^"?]+\.js/)?.[0];
if (!targetChunk) {
  console.error("Could not find a chunk URL in index.html.");
  process.exit(1);
}

// Swapped per scenario: how many times the target chunk should 502.
let failBudget = 0;
let chunk502Count = 0;

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);

  if (urlPath === targetChunk && chunk502Count < failBudget) {
    chunk502Count += 1;
    res.writeHead(502, { "Content-Type": "text/html", "Cache-Control": "no-store" });
    res.end("<html><body>502 Bad Gateway</body></html>");
    return;
  }

  let filePath = path.join(OUT, urlPath);
  try {
    const s = await stat(filePath).catch(() => null);
    if (!s || s.isDirectory()) filePath = path.join(filePath, "index.html");
    const data = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  } catch {
    res.writeHead(404, { "Cache-Control": "no-store" });
    res.end("not found");
  }
});

await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch();

async function runScenario(name, budget, { expectReloads, expectCount }) {
  failBudget = budget;
  chunk502Count = 0;

  // Fresh context => fresh sessionStorage + window.name (counter resets).
  const context = await browser.newContext();
  const page = await context.newPage();

  const events = { loads: 0, chunkResponses: [], pageErrors: [], recoveryLogs: [] };

  page.on("load", () => (events.loads += 1));
  page.on("pageerror", (e) => events.pageErrors.push(e.message.split("\n")[0]));
  page.on("response", (r) => {
    const p = new URL(r.url()).pathname;
    if (p.includes("/_next/static/chunks/")) {
      events.chunkResponses.push({
        chunk: p === targetChunk ? "TARGET" : p.split("/").pop(),
        status: r.status(),
      });
    }
  });
  page.on("console", (m) => {
    const t = m.text();
    if (/chunk|ChunkLoadError|502|Bad Gateway/i.test(t)) {
      events.recoveryLogs.push(`[${m.type()}] ${t.slice(0, 100)}`);
    }
  });

  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "load" }).catch(() => {});
  // Allow the 250ms reload(s) + navigation to settle, then confirm it stops.
  await page.waitForTimeout(4000);

  const state = await page.evaluate((key) => {
    let parsed = null;
    try {
      parsed = JSON.parse(sessionStorage.getItem(key) || "null");
    } catch {}
    return {
      recovery: parsed,
      bodyText: (document.body?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 120),
      hasErrorBoundary: (document.body?.innerText || "").includes("hit a loading error"),
    };
  }, RECOVERY_KEY);

  const targetStatuses = events.chunkResponses
    .filter((c) => c.chunk === "TARGET")
    .map((c) => c.status);
  const count = state.recovery?.count ?? 0;
  const reloads = Math.max(0, events.loads - 1); // loads = initial + reloads
  const pass = reloads === expectReloads && count === expectCount;

  console.log(`\n=== Scenario ${name} (502 budget=${budget === Infinity ? "∞" : budget}) ===`);
  console.log(`  target chunk:        ${targetChunk}`);
  console.log(`  target responses:    [${targetStatuses.join(", ")}]`);
  console.log(`  document loads:      ${events.loads}  (=> ${reloads} reload(s))`);
  console.log(`  recovery counter:    count=${count} firstSeen=${state.recovery?.firstSeen ?? "-"}`);
  console.log(`  page errors:         ${events.pageErrors.length ? events.pageErrors.slice(0, 3).join(" | ") : "(none)"}`);
  console.log(`  recovery-ish logs:   ${events.recoveryLogs.length ? events.recoveryLogs.slice(0, 3).join(" | ") : "(none)"}`);
  console.log(`  error boundary shown:${state.hasErrorBoundary}`);
  console.log(`  final body (120ch):  ${state.bodyText}`);
  console.log(`  EXPECT reloads=${expectReloads} count=${expectCount}  =>  ${pass ? "PASS ✅" : "FAIL ❌"}`);

  await context.close();
  return pass;
}

const a = await runScenario("A: transient (recovers)", 1, { expectReloads: 1, expectCount: 1 });
const b = await runScenario("B: persistent (bounded give-up)", Infinity, { expectReloads: 2, expectCount: 2 });

await browser.close();
await new Promise((r) => server.close(r));

console.log(`\n================ RESULT: ${a && b ? "ALL PASS ✅" : "FAILURES ❌"} ================`);
process.exit(a && b ? 0 : 1);
