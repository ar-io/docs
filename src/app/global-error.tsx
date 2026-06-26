"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function isChunkLoadError(error: Error): boolean {
  const message = `${error.name || ""} ${error.message || ""}`;

  return /ChunkLoadError|Failed to load chunk|Loading chunk .* failed|\/_next\/static\/chunks\//i.test(
    message,
  );
}

function scheduleReloadForChunkError(error: Error) {
  if (!isChunkLoadError(error)) return;

  const storageKey = "ar-io-docs:chunk-load-recovery";
  const retryWindowMs = 30000;
  const maxReloads = 2;
  const now = Date.now();

  try {
    const parsed = JSON.parse(sessionStorage.getItem(storageKey) || "null") as
      | { count?: number; firstSeen?: number }
      | null;

    const state =
      parsed && parsed.firstSeen && now - parsed.firstSeen <= retryWindowMs
        ? {
            count: parsed.count ?? 0,
            firstSeen: parsed.firstSeen,
          }
        : {
            count: 0,
            firstSeen: now,
          };

    if (state.count >= maxReloads) return;

    sessionStorage.setItem(
      storageKey,
      JSON.stringify({ ...state, count: state.count + 1 }),
    );

    window.setTimeout(() => window.location.reload(), 250);
  } catch {
    window.setTimeout(() => window.location.reload(), 250);
  }
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
    scheduleReloadForChunkError(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            alignItems: "center",
            background: "#ffffff",
            color: "#23232d",
            display: "flex",
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            minHeight: "100vh",
            padding: "24px",
          }}
        >
          <section style={{ maxWidth: "520px" }}>
            <p
              style={{
                color: "#5427c8",
                fontSize: "14px",
                fontWeight: 700,
                margin: "0 0 12px",
              }}
            >
              ar.io Documentation
            </p>
            <h1
              style={{
                fontSize: "28px",
                lineHeight: 1.2,
                margin: "0 0 12px",
              }}
            >
              The docs hit a temporary loading error.
            </h1>
            <p style={{ color: "rgba(35, 35, 45, 0.72)", margin: "0 0 24px" }}>
              This can happen when a gateway returns a transient error while
              loading an app chunk. Reloading usually routes the request through
              a healthy response.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: "#5427c8",
                  border: 0,
                  borderRadius: "6px",
                  color: "#ffffff",
                  cursor: "pointer",
                  font: "inherit",
                  fontWeight: 700,
                  padding: "10px 14px",
                }}
                type="button"
              >
                Reload docs
              </button>
              <button
                onClick={reset}
                style={{
                  background: "#f0f0f0",
                  border: "1px solid rgba(35, 35, 45, 0.2)",
                  borderRadius: "6px",
                  color: "#23232d",
                  cursor: "pointer",
                  font: "inherit",
                  fontWeight: 700,
                  padding: "10px 14px",
                }}
                type="button"
              >
                Try again
              </button>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
