// scripts/generate-api-docs.ts
const openApiMap: Record<string, {
  openapi: string;
  name: string;
}> = {
  'ar-io-node': {
    name: 'AR.IO Node',
    openapi: 'https://raw.githubusercontent.com/ar-io/ar-io-node/refs/heads/openapi-update/docs/openapi.yaml',
  },
  // 'turbo/upload-service': {
  //   name: 'Turbo Upload Service',
  //   openapi: 'https://raw.githubusercontent.com/ardriveapp/upload-service/refs/heads/main/docs/openapi.yaml',
  //   proxyUrl: 'https://ardrive.net',
  // },
  // 'turbo/payment-service': {
  //   name: 'Turbo Payment Service',
  //   openapi: 'https://raw.githubusercontent.com/ardriveapp/payment-service/refs/heads/main/docs/openapi.yaml',
  //   proxyUrl: 'https://ardrive.net',
  // },
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
      output: `./content/api/${key}/`,
      includeDescription: true,
      per: 'tag',
      frontmatter: (title) => {
        // Fix title capitalization
        if (title.toLowerCase() === 'ar n s') return { title: 'ArNS' };
        if (title.toLowerCase() === 'ar io') return { title: 'AR.IO' };
        if (title.toLowerCase() === 'ar io node') return { title: 'AR.IO Node' };
        return { title };
      },
    });
  }
})();
