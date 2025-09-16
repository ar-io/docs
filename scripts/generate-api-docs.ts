// scripts/generate-api-docs.ts

const openApiMap: Record<string, string | Record<string, string>> = {
  'ar-io-node': 'https://raw.githubusercontent.com/ar-io/ar-io-node/refs/heads/main/docs/openapi.yaml',
  // 'turbo': {
  //   'upload-service': 'https://raw.githubusercontent.com/ardriveapp/upload-service/refs/heads/main/docs/openapi.yaml',
  //   'payment-service': 'https://raw.githubusercontent.com/ardriveapp/payment-service/refs/heads/main/docs/openapi.yaml',
  // },
};

(async () => {
const { generateFiles } = await import('fumadocs-openapi');
const { createOpenAPI } = await import('fumadocs-openapi/server');

  for (const [key, openapi] of Object.entries(openApiMap)) {
    // if open api map is a string, use it as the input, if it's nested then the key is the top level path and the nested key is the subpath
    if (typeof openapi === 'string') {
    await generateFiles({
      input: createOpenAPI({ 
        input: [openapi],
      }),
      output: `./content/api/${key}/`,
      includeDescription: true,
      per: 'tag',
    });
    } else {
      for (const [nestedKey, nestedOpenapi] of Object.entries(openapi)) {
        const openApi = createOpenAPI({ 
          input: [nestedOpenapi],
        });
        await generateFiles({
          input: openApi,
          output: `./content/api/${key}/${nestedKey}/`,
          includeDescription: true,
          per: 'tag',
        });
      }
    }
  }
})();
