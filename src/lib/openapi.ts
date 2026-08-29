import { compile } from '@fumari/json-schema-to-typescript';
import type { MediaAdapter, MethodInformation, ServerObject } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';
import type { ApiPageProps } from 'fumadocs-openapi/ui';

/**
 * Spec URLs exactly as `scripts/generate-api-docs.ts` bakes them into the
 * `document` prop of every generated `<APIPage>`. The override map below is
 * keyed by this string, so these must stay byte-identical to the URLs in
 * `openApiMap` — a mismatch does not error, it silently renders the spec's own
 * (wrong) servers.
 */
const AR_IO_NODE_SPEC =
  'https://raw.githubusercontent.com/ar-io/ar-io-node/refs/heads/main/docs/openapi.yaml';
const TURBO_UPLOAD_SPEC = 'https://upload.ardrive.io/openapi.json';
const TURBO_PAYMENT_SPEC = 'https://payment.ardrive.io/openapi.json';

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

/**
 * Media types the Turbo specs declare that fumadocs has no built-in adapter
 * for. An unhandled one is a hard build failure — `Media type <x> is not
 * supported (in <path>)` during prerender — so every type used in a request or
 * response body has to be registered here.
 *
 * Binary bodies are passed through untouched, exactly like the built-in
 * `application/octet-stream` adapter; text bodies are stringified. Neither
 * generates a code sample, which is what fumadocs does for opaque bodies.
 *
 * If a future spec revision introduces another media type, the build fails and
 * names it: add it to the matching list below.
 */
const BINARY_MEDIA_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];
const TEXT_MEDIA_TYPES = ['text/plain', 'text/html'];

const mediaAdapters: Record<string, MediaAdapter> = {
  ...Object.fromEntries(
    BINARY_MEDIA_TYPES.map((type) => [
      type,
      {
        encode: (data: { body: unknown }) => data.body as BodyInit,
        generateExample: () => undefined,
      },
    ]),
  ),
  ...Object.fromEntries(
    TEXT_MEDIA_TYPES.map((type) => [
      type,
      {
        encode: (data: { body: unknown }) => String(data.body ?? ''),
        generateExample: () => undefined,
      },
    ]),
  ),
};

/**
 * Generate the TypeScript type for one response.
 *
 * Fumadocs' built-in version is broken: `getTypescriptSchema` compiles
 * `processed.bundled` — the *entire* OpenAPI document — rather than the
 * response schema. On the ar-io-node spec that does not throw, it just emits a
 * meaningless `interface Response { [k: string]: unknown }` on every operation,
 * next to a schema panel showing the real type. On the richer Turbo specs the
 * same call throws, producing ~121 `Failed to generate typescript schema`
 * warnings per build and no type at all.
 *
 * Passing our own implementation also bypasses that default entirely: fumadocs
 * only falls back to it when this option is `undefined`.
 *
 * Returning an empty string is how you say "no type here" — the renderer skips
 * the panel on a falsy value.
 */
async function generateTypeScriptSchema(
  operation: MethodInformation,
  statusCode: string,
): Promise<string> {
  const content = operation.responses?.[statusCode]?.content;
  if (!content) return '';

  // Prefer JSON; otherwise take whichever media type the response declares
  // first, matching how the renderer picks the default tab.
  const media = content['application/json'] ?? Object.values(content)[0];
  const schema = media?.schema;
  if (!schema || typeof schema !== 'object') return '';

  try {
    return await compile(structuredClone(schema) as Parameters<typeof compile>[0], 'Response', {
      $refOptions: false,
      bannerComment: '',
      additionalProperties: false,
      enableConstEnums: false,
    });
  } catch {
    // A schema the compiler cannot express is not worth failing a build over;
    // the schema panel beside it still renders the real shape.
    return '';
  }
}

/**
 * `input` is deliberately left empty so each page resolves its own spec.
 *
 * Registering the specs here would make `getSchemas()` fetch them under a
 * single `Promise.all`, so one unreachable spec fails every API page rather
 * than just its own — an unrelated ar-io-node page would go down because a
 * Turbo spec 404'd. With no registered schemas, `getAPIPageProps` falls back
 * to resolving each `document` on its own, which keeps failures contained to
 * the pages that actually use the broken spec.
 */
const server = createOpenAPI({ mediaAdapters, generateTypeScriptSchema });

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

  // `Object.assign` rather than object spread: `dereferenced` and `bundled`
  // are unions of the OpenAPI 3.0 and 3.1 document types, and spreading a union
  // widens it into something no longer assignable back to `ProcessedDocument`.
  return Promise.resolve(document).then((processed) => ({
    ...processed,
    dereferenced: Object.assign({}, processed.dereferenced, { servers }),
    bundled: Object.assign({}, processed.bundled, { servers }),
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
