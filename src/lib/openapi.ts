import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  // the OpenAPI schema, you can also give it an external URL.
  input: ['https://raw.githubusercontent.com/ar-io/ar-io-node/refs/heads/main/docs/openapi.yaml'],
});
