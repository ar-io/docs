import { ARIO, AOProcess } from '@ar.io/sdk/web';
const { connect } = require("@permaweb/aoconnect");

async function wayfinder(input: string): Promise<string> {
  const defaultDomain = 'arweave.net';
  const txIdRegex = /^[a-zA-Z0-9-_]{43}$/; // Matches Arweave transaction IDs
  const arnsNameRegex = /^[^.\s]+$/; // Matches ArNS names (no dots)
  const urlRegex = /^(https?:\/\/)[\w.-]+(\/.*)?$/; // Matches URLs with protocol

  let resultUrl = input;

  try {
    console.log("wayfinder is running");
    console.log("Input:", input);

    // Check if the input is a transaction ID
    if (txIdRegex.test(input)) {
      console.log("Transaction ID detected");
      resultUrl = await getProcessedUrl(input);
    }
    // Check if the input is an ArNS name
    else if (arnsNameRegex.test(input)) {
      console.log("ArNS name detected");
      resultUrl = await getProcessedUrl(input);
    }
    // Check if the input is a URL
    else if (urlRegex.test(input)) {
      console.log("URL detected");
      const urlMatch = input.match(urlRegex);
      const domain = urlMatch?.[0];
      const path = urlMatch?.[2] || '';

      if (domain?.includes(defaultDomain)) {
        console.log("arweave.net URL detected");
        const pathParts = path.split('/').filter(Boolean);
        const firstPathSegment = pathParts[0];

        if (txIdRegex.test(firstPathSegment)) {
          resultUrl = await getProcessedUrl(firstPathSegment, pathParts.slice(1).join('/'));
        } else if (arnsNameRegex.test(domain.split('.')[0])) {
          const arnsName = domain.split('.')[0];
          resultUrl = await getProcessedUrl(arnsName, path);
        }
      }
    } else {
      console.log("Input did not match any known category");
    }
  } catch (error) {
    console.error('Error processing string:', error);
    resultUrl = `https://${defaultDomain}/${input}`;
  }

  return resultUrl;

  async function getProcessedUrl(identifier: string, additionalPath: string = ''): Promise<string> {
    try {
      console.log("Fetching gateways");
      const ario = ARIO.init({
        process: new AOProcess({
          processId: "agYcCFJtrMG6cqMuZfskIkFTGvUPddICmtQSBIoPdiA",
          ao: connect({
            CU_URL: 'https://cu.ar-io.dev',
          }),
        }),
      });

      const gateways = await ario.getGateways({
        limit: 10,
        //@ts-expect-error
        sortBy: 'weights.compositeWeight',
        sortOrder: 'desc',
      });

      if (gateways.items.length > 0) {
        console.log("Gateways found");
        const selectedGateway = gateways.items[Math.floor(Math.random() * gateways.items.length)];
        const fqdn = selectedGateway.settings?.fqdn || defaultDomain;

        if (txIdRegex.test(identifier)) {
          return `https://${fqdn}/${identifier}/${additionalPath}`;
        } else if (arnsNameRegex.test(identifier)) {
          return `https://${identifier}.${fqdn}/${additionalPath}`;
        }
      } else {
        console.error("No gateways found");
      }
    } catch (error) {
      console.error("Error fetching gateways:", error);
    }

    // Default fallback
    if (arnsNameRegex.test(identifier)) {
      return `https://${defaultDomain}`;
    }
    return `https://${defaultDomain}/${identifier}/${additionalPath}`;
  }
}

export default wayfinder;
