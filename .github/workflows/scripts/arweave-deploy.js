const fs = require("fs");
const path = require("path");
const {
  TurboFactory,
  ArweaveSigner,
  developmentTurboConfiguration,
} = require("@ardrive/turbo-sdk");
const { ANT } = require("@ar.io/sdk");
const axios = require("axios");
const crypto = require("crypto"); // For generating file hashes
const { Readable } = require("stream");


const undername = process.env.UNDERNAME || '@'
async function main() {
  const distFolderPath = path.resolve(__dirname, '../../out');

  // Load the contents of permalinks.json
//   const permalinksPath = path.join(distFolderPath, 'permalinks.json');
//   let permalinks;
//   try {
//     const permalinksData = fs.readFileSync(permalinksPath, 'utf-8');
//     permalinks = JSON.parse(permalinksData);
//   } catch (error) {
//     console.error('Failed to load permalinks.json:', error);
//     process.exit(1);
//   }

  let jwk = JSON.parse(Buffer.from(process.env.DEPLOY_KEY, 'base64').toString('utf-8'));
  const turbo = TurboFactory.authenticated({ privateKey: jwk });

  let { manifest, manifestResponse } = await turbo.uploadFolder({
    folderPath: distFolderPath,
    dataItemOpts: {
      tags: [
        { name: "App-Name", value: "ar.io docs deploy" }
      ]
    }
  });

  // Iterate over manifest.paths and update based on permalinks
//   for (const key of Object.keys(manifest.paths)) {
//     const matchingPermalink = permalinks.find(p => p.buildFilePath.replace(/^\//, '') === key);
//     if (matchingPermalink) {
//       const permalinkKey = matchingPermalink.permalink.replace(/^\//, '').replace(/\/$/, '');
//       manifest.paths[permalinkKey] = manifest.paths[key];
//       console.log(`Match found and added: ${permalinkKey} -> ${key}`);
//     }
//   }

  // console.log(manifest);
  // console.log(manifestResponse)

  async function uploadManifest(manifest) {
		try {
			const manifestString = JSON.stringify(manifest);
			const uploadResult = await turbo.uploadFile({
				fileStreamFactory: () => Readable.from(Buffer.from(manifestString)),
				fileSizeFactory: () => Buffer.byteLength(manifestString),
				signal: AbortSignal.timeout(10_000),
				dataItemOpts: {
					tags: [
						{
							name: 'Content-Type',
							value: 'application/x.arweave-manifest+json',
						},
						{
							name: 'App-Name',
							value: 'ar.io docs deploy',
						},
					],
				},
			});
			return uploadResult.id;
		} catch (error) {
			console.error('Error uploading manifest:', error);
			return null;
		}
	}

  const manifestId = await uploadManifest(manifest)

  console.log(manifestId)

  const signer = new ArweaveSigner(jwk)
  const ant = ANT.init({processId: process.env.DEPLOY_ANT_PROCESS_ID, signer})

  const response = await ant.setRecord({
    undername: undername,
    transactionId: manifestId,
    ttlSeconds: 900
  })
  console.log(response)
}

main().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});