// scripts/generate-api-docs.ts
//
// The Turbo specs are read from the running services rather than from GitHub:
// ardriveapp/turbo-upload-service and turbo-payment-service were made private
// on 2026-08-28, so the raw.githubusercontent.com URLs 404 for anonymous
// fetches and broke `yarn build`. Each service publishes its own spec at
// /openapi.json (the same document its /api-docs Swagger UI loads), which is
// public, needs no auth, and tracks the deployed version -- these are 1.5.0
// where the last public GitHub copy was 0.1.0.
//
// Note this is the spec *source*, not the base URL shown in examples: both
// services are documented as turbo.ardrive.io, which is applied as a `servers`
// override in src/lib/openapi.ts.
const openApiMap: Record<string, {
  openapi: string;
  name: string;
}> = {
  'ar-io-node': {
    name: 'ar.io Node',
    openapi: 'https://raw.githubusercontent.com/ar-io/ar-io-node/refs/heads/openapi-update/docs/openapi.yaml',
  },
  'turbo/upload-service': {
    name: 'Upload Service',
    openapi: 'https://upload.ardrive.io/openapi.json',
  },
  'turbo/payment-service': {
    name: 'Payment Service',
    openapi: 'https://payment.ardrive.io/openapi.json',
  },
};

(async () => {
const { generateFiles } = await import('fumadocs-openapi');
const { createOpenAPI } = await import('fumadocs-openapi/server');

  for (const [key, openapi] of Object.entries(openApiMap)) {
    // if open api map is a string, use it as the input, if it's nested then the key is the top level path and the nested key is the subpath
    const openApi = createOpenAPI({
      input: [openapi.openapi],
      disableCache: true,
    });
    await generateFiles({
      input: openApi,
      output: `./content/apis/${key}/`,
      includeDescription: true,
      per: 'tag',
      frontmatter: (title: string) => {
        // Fix title capitalization
        if (title.toLowerCase() === 'ar n s') return { title: 'ArNS' };
        if (title.toLowerCase() === 'ar io') return { title: 'ar.io' };
        if (title.toLowerCase() === 'ar io node') return { title: 'ar.io Node' };
        // the x402 payment standard is always lowercase
        if (title.toLowerCase() === 'x402') return { title: 'x402' };
        return { title };
      },
    });
  }
})();
