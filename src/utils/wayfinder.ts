import { ARIO, AOProcess } from '@ar.io/sdk/web';
const { connect } = require("@permaweb/aoconnect");

async function wayfinder(input: string, defaultGateway: string = 'arweave.net'): Promise<string> {
  const txIdRegex = /^[a-zA-Z0-9-_]{43}$/; // Matches Arweave transaction IDs
  const arnsNameRegex = /^[^.\s]+$/; // Matches ArNS names (no dots)
  const urlRegex = /^(https?:\/\/)[\w.-]+(\/.*)?$/; // Matches URLs with protocol

  let resultUrl = input;

  try {
    // Check if the input is a transaction ID
    if (txIdRegex.test(input)) {
      resultUrl = getProcessedUrl(input);
    }
    // Check if the input is an ArNS name
    else if (arnsNameRegex.test(input)) {
      resultUrl = getProcessedUrl(input);
    }
    // Check if the input is a URL
    else if (urlRegex.test(input)) {
      const urlMatch = input.match(urlRegex);
      const domain = urlMatch?.[0];
      const path = urlMatch?.[2] || '';

      if (domain?.includes('arweave.net')) {
        const pathParts = path.split('/').filter(Boolean);
        const firstPathSegment = pathParts[0];

        if (txIdRegex.test(firstPathSegment)) {
          resultUrl = getProcessedUrl(firstPathSegment, pathParts.slice(1).join('/'));
        } else if (arnsNameRegex.test(domain.split('.')[0])) {
          const arnsName = domain.split('.')[0];
          resultUrl = getProcessedUrl(arnsName, path);
        }
      }
    }
  } catch (error) {
    console.error('Error processing string:', error);
    resultUrl = `https://${defaultGateway}/${input}`;
  }

  return resultUrl;

  function getProcessedUrl(identifier: string, additionalPath: string = ''): string {
    if (txIdRegex.test(identifier)) {
      return `https://${defaultGateway}/${identifier}/${additionalPath}`;
    } else if (arnsNameRegex.test(identifier)) {
      return `https://${identifier}.${defaultGateway}/${additionalPath}`;
    }
    return `https://${defaultGateway}/${identifier}`;
  }
}

export default wayfinder;
