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

const undername = process.env.UNDERNAME || '@';
async function main() {
  const distFolderPath = path.resolve(__dirname, '../../../out');

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

  // Modify manifest to add keys without "index.html"
  const updatedPaths = { ...manifest.paths };
  Object.keys(manifest.paths).forEach((key) => {
    if (key.endsWith("index.html")) {
      const newKey = key.replace(/index\.html$/, ""); // No trailing slash
      updatedPaths[newKey] = manifest.paths[key];
      console.log(`Added manifest key: ${newKey} -> ${key}`);
    }
  });
  manifest.paths = updatedPaths;

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

  const manifestId = await uploadManifest(manifest);

  console.log(manifestId);

  const signer = new ArweaveSigner(jwk);
  const ant = ANT.init({ processId: process.env.DEPLOY_ANT_PROCESS_ID, signer });

  const response = await ant.setRecord({
    undername: undername,
    transactionId: manifestId,
    ttlSeconds: 900
  });
  console.log(response);
}

main().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});