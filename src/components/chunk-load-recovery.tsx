import Script from "next/script";

const chunkLoadRecoveryScript = `
(function () {
  var storageKey = "ar-io-docs:chunk-load-recovery";
  var retryWindowMs = 30000;
  var maxReloads = 2;
  var scheduled = false;

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
    return typeof src === "string" && /\\/_next\\/static\\/chunks\\/.test(src);
  }

  function isChunkLoadFailure(value) {
    var message = getMessage(value);
    return /ChunkLoadError|Failed to load chunk|Loading chunk .* failed|\\/_next\\/static\\/chunks\\/|ERR_ABORTED 502|Bad Gateway/i.test(message);
  }

  function readState(now) {
    try {
      var parsed = JSON.parse(sessionStorage.getItem(storageKey) || "null");
      if (!parsed || now - parsed.firstSeen > retryWindowMs) {
        return { count: 0, firstSeen: now };
      }
      return parsed;
    } catch (_error) {
      return { count: 0, firstSeen: now };
    }
  }

  function scheduleReload() {
    if (scheduled) return;
    scheduled = true;

    var now = Date.now();
    var state = readState(now);

    if (state.count >= maxReloads) return;

    state.count += 1;

    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch (_error) {}

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

export function ChunkLoadRecoveryScript() {
  return (
    // The chunk loader can fail before React is ready, so this recovery hook
    // must be installed before the app chunks execute.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="chunk-load-recovery"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: chunkLoadRecoveryScript }}
    />
  );
}
