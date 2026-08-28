import { createOpenAPI } from 'fumadocs-openapi/server';
import type { ApiPageProps } from 'fumadocs-openapi/ui';

/**
 * The OpenAPI `Server Object` shape, declared locally on purpose: fumadocs
 * re-exports a `ServerObject` type, but it is built on `openapi-types`, which
 * is not installed here (it is an unshipped transitive type-only dependency),
 * so the re-export collapses to `never[]` and cannot be used.
 */
type ServerObject = { url: string; description?: string };

/**
 * Spec URLs exactly as `scripts/generate-api-docs.ts` bakes them into the
 * `document` prop of every generated `<APIPage>`. `getAPIPageProps` looks the
 * incoming `document` string up in the schema map by strict equality, so these
 * must stay byte-identical to the URLs in `openApiMap` — a mismatch silently
 * falls back to fetching the spec unpatched.
 */
const AR_IO_NODE_SPEC =
  'https://raw.githubusercontent.com/ar-io/ar-io-node/refs/heads/openapi-update/docs/openapi.yaml';
const TURBO_UPLOAD_SPEC =
  'https://raw.githubusercontent.com/ardriveapp/turbo-upload-service/refs/heads/main/docs/openapi.yaml';
const TURBO_PAYMENT_SPEC =
  'https://raw.githubusercontent.com/ardriveapp/turbo-payment-service/refs/heads/main/docs/openapi.yaml';

/**
 * Base URLs shown in the request examples and used by the API playground.
 *
 * Fumadocs reads these from each spec's own `servers` block, falling back to
 * `[{ url: '/' }]` when it is missing, and the browser then resolves a relative
 * entry against `window.location.origin` (see `withBase(...)` in
 * fumadocs-openapi's `server-select`). On a docs site that turns every example
 * into a request to `https://docs.ar.io/...`, which is not an API host.
 *
 * All three upstream specs point somewhere we do not want:
 *
 * - turbo-upload-service declares relative servers (`/v1` and `/`), so its
 *   examples resolved to docs.ar.io.
 * - turbo-payment-service declares `https://payment.ardrive.io/v1` — absolute
 *   and working, but only half of Turbo.
 * - ar-io-node declares `https://ardrive.net`, a live gateway but not the one
 *   these docs use — `turbo-gateway.com` is the host used throughout
 *   `content/`.
 *
 * Both Turbo services are served together from `turbo.ardrive.io`, which
 * consolidates `upload.ardrive.io` (mounted at the root) and
 * `payment.ardrive.io` (mounted under `/v1`). Pointing both specs at it keeps
 * every Turbo example on one host and matches what the service actually
 * serves: `upload.ardrive.io/price/arweave/1000` answers `0.0000000000000`
 * where `turbo.ardrive.io/price/arweave/1000` answers a real winc price.
 *
 * Note the asymmetric prefixes — upload routes have no `/v1` (`/info`,
 * `/price/:token/:byteCount` and `/account/balance/:id` all 404 when prefixed
 * with it) while payment routes require it.
 *
 * These are overrides of upstream data. The durable fix for each is a `servers`
 * block correction in the source repository; until then this keeps the rendered
 * examples accurate.
 */
const SERVER_OVERRIDES: Record<string, ServerObject[]> = {
  [AR_IO_NODE_SPEC]: [
    { url: 'https://turbo-gateway.com', description: 'ar.io gateway' },
  ],
  [TURBO_UPLOAD_SPEC]: [
    { url: 'https://turbo.ardrive.io', description: 'Production server' },
  ],
  [TURBO_PAYMENT_SPEC]: [
    { url: 'https://turbo.ardrive.io/v1', description: 'Production server' },
    { url: 'http://localhost:4000/v1', description: 'Local development server' },
  ],
};

const server = createOpenAPI({
  input: [AR_IO_NODE_SPEC, TURBO_UPLOAD_SPEC, TURBO_PAYMENT_SPEC],
});

/**
 * Swap in the corrected `servers` without touching the cached schema map:
 * `getContext` reads `servers` off the dereferenced document, so both copies
 * are replaced on a shallow clone rather than mutated in place.
 */
function withServers(
  document: ApiPageProps['document'],
  servers: ServerObject[],
): ApiPageProps['document'] {
  // `getAPIPageProps` always hands back a promise for a string `document`, so
  // this guard is only here to narrow the union it is typed with.
  if (typeof document === 'string') return document;

  return Promise.resolve(document).then((processed) => ({
    ...processed,
    dereferenced: { ...processed.dereferenced, servers },
    bundled: { ...processed.bundled, servers },
  }));
}

export const openapi = {
  ...server,
  getAPIPageProps(props: ApiPageProps): ApiPageProps {
    const resolved = server.getAPIPageProps(props);
    const servers =
      typeof props.document === 'string'
        ? SERVER_OVERRIDES[props.document]
        : undefined;

    if (!servers) return resolved;

    return { ...resolved, document: withServers(resolved.document, servers) };
  },
};
