const fs = require("fs");
const path = require("path");
const {
  TurboFactory,
  ArweaveSigner,
  developmentTurboConfiguration,
} = require("@ardrive/turbo-sdk");
const { ANT, AOProcess } = require("@ar.io/sdk");
const axios = require("axios");
const crypto = require("crypto"); // For generating file hashes
const { Readable } = require("stream");
const {connect} = require("@permaweb/aoconnect")

require('dotenv').config()


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
    // Handle "index.html"
    if (key.endsWith("index.html")) {
      const newKey = key.replace(/index\.html$/, ""); // Remove "index.html"
      if (!updatedPaths.hasOwnProperty(newKey)) { // Ensure no duplicates
        updatedPaths[newKey] = manifest.paths[key];
        console.log(`Added manifest key: ${newKey} -> ${key}`);
      }
    } 
    
    // Handle ".html" but not "index.html"
    else if (key.endsWith(".html")) {
      const newKey = key.replace(/\.html$/, ""); // Remove ".html"
      // Prevent overwriting a path already added via "index.html"
      if (!updatedPaths.hasOwnProperty(newKey) && !key.endsWith("/index.html")) {
        updatedPaths[newKey] = manifest.paths[key];
        console.log(`Added manifest key: ${newKey} -> ${key}`);
      }
    }
  });
  
  manifest.paths = updatedPaths;

  // After you've constructed updatedPaths and before uploading the manifest:
const legacyPaths = require('./legacy-paths.json');

Object.keys(legacyPaths).forEach((legacyKey) => {
  const newVersionPath = legacyPaths[legacyKey];
  const dataItem = updatedPaths[newVersionPath];

  if (!dataItem) {
    console.warn(`No matching data item found for ${newVersionPath}, legacy key ${legacyKey} not added.`);
    return;
  }

  // Add the original legacy key
  if (!updatedPaths.hasOwnProperty(legacyKey)) {
    updatedPaths[legacyKey] = dataItem;
    console.log(`Added legacy manifest key: ${legacyKey} -> ${newVersionPath}`);
  }

  // Handle shortened paths:
  // If ends with "index.html", remove "index.html"
  if (legacyKey.endsWith("index.html")) {
    const shortenedKey = legacyKey.replace(/index\.html$/, "");
    if (!updatedPaths.hasOwnProperty(shortenedKey)) {
      updatedPaths[shortenedKey] = dataItem;
      console.log(`Added legacy shortened manifest key: ${shortenedKey} -> ${newVersionPath}`);
    }
  } 
  // Else if ends with ".html" but not "index.html", remove ".html"
  else if (legacyKey.endsWith(".html")) {
    const shortenedKey = legacyKey.replace(/\.html$/, "");
    if (!updatedPaths.hasOwnProperty(shortenedKey)) {
      updatedPaths[shortenedKey] = dataItem;
      console.log(`Added legacy shortened manifest key: ${shortenedKey} -> ${newVersionPath}`);
    }
  }
});

// Now updatedPaths includes both the new shortened URLs and the legacy paths
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
  const ant = ANT.init({ processId: process.env.DEPLOY_ANT_PROCESS_ID, signer,
    process: new AOProcess ({
      processId: process.env.DEPLOY_ANT_PROCESS_ID,
      ao: connect({
        CU_URL: "https://cu.ardrive.io"
      })
    })
   });

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