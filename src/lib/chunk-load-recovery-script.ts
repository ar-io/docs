// Chunk-load recovery: when a gateway returns a transient error (e.g. 502/Bad
// Gateway) for a Next.js app chunk, the page fails to hydrate. This script
// installs global error/unhandledrejection listeners that detect such failures
// and reload a bounded number of times to route around the bad response.
//
// It MUST run before any app chunk executes, so it is injected as a real,
// parser-blocking inline <script> at the top of <head> in every exported HTML
// file by scripts/inject-chunk-load-recovery.ts (run as a post-build step).
//
// It is NOT rendered via React/next/script: under `output: "export"` the RSC
// renderer serializes any inline <script> into the React Flight payload
// (__next_f) instead of emitting an executable tag, so it would only run after
// hydration — which depends on the very chunks this is meant to recover.
//
// Validated by tests/chunk-load-recovery.test.mjs (manual, Playwright-driven):
// it serves the static export, simulates a 502 on a real chunk, and asserts
// the recovery reloads and recovers. Re-run it after changing this script:
//   npm run test:chunk-recovery   (see that file for prerequisites)
export const chunkLoadRecoveryScript = `
(function () {
  var storageKey = "ar-io-docs:chunk-load-recovery";
  var retryWindowMs = 30000;
  var maxReloads = 2;
  var scheduled = false;
  var fallbackPrefix = "ar-io-docs:chunk-load-recovery=";

  function getMessage(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (value.message) return String(value.message);
    if (value.reason) return getMessage(value.reason);
    if (value.error) return getMessage(value.error);

    try {
      return JSON.stringify(value);
    } catch (_error) {
      return String(value);
    }
  }

  function isNextChunkRequest(src) {
    return typeof src === "string" && /\\/_next\\/static\\/chunks\\//.test(src);
  }

  function isChunkLoadFailure(value) {
    var message = getMessage(value);
    return /ChunkLoadError|Failed to load chunk|Loading chunk .* failed|\\/_next\\/static\\/chunks\\/|ERR_ABORTED 502|Bad Gateway/i.test(message);
  }

  function readFallbackState(now) {
    try {
      if (typeof window.name !== "string" || window.name.indexOf(fallbackPrefix) !== 0) {
        return { count: 0, firstSeen: now };
      }

      var parsed = JSON.parse(window.name.slice(fallbackPrefix.length));
      if (!parsed || now - parsed.firstSeen > retryWindowMs) {
        return { count: 0, firstSeen: now };
      }

      return parsed;
    } catch (_error) {
      return { count: 0, firstSeen: now };
    }
  }

  function writeFallbackState(state) {
    try {
      window.name = fallbackPrefix + JSON.stringify(state);
      return true;
    } catch (_error) {
      return false;
    }
  }

  function readState(now) {
    try {
      var parsed = JSON.parse(sessionStorage.getItem(storageKey) || "null");
      if (!parsed || now - parsed.firstSeen > retryWindowMs) {
        return readFallbackState(now);
      }
      return parsed;
    } catch (_error) {
      return readFallbackState(now);
    }
  }

  function writeState(state) {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
      return true;
    } catch (_error) {
      return writeFallbackState(state);
    }
  }

  function scheduleReload() {
    if (scheduled) return;
    scheduled = true;

    var now = Date.now();
    var state = readState(now);

    if (state.count >= maxReloads) return;

    state.count += 1;

    if (!writeState(state)) return;

    setTimeout(function () {
      window.location.reload();
    }, 250);
  }

  window.addEventListener("error", function (event) {
    var target = event && event.target;
    var src = target && (target.src || target.href);

    if (isNextChunkRequest(src) || isChunkLoadFailure(event)) {
      scheduleReload();
    }
  }, true);

  window.addEventListener("unhandledrejection", function (event) {
    if (isChunkLoadFailure(event && event.reason)) {
      scheduleReload();
    }
  });
})();
`;
