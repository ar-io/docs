// scripts/deploy-to-arweave.js
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");
require("dotenv").config();

async function main() {
  // Configuration - can be overridden by environment variables or command line args
  const config = {
    deployKey: process.env.DEPLOY_KEY || "",
    arnsName: process.env.ARNS_NAME || "",
    undername: process.env.UNDERNAME || "@",
    distFolderPath:
      process.env.DIST_FOLDER_PATH || path.resolve(__dirname, "../out"),
  };

  // Validate required configuration
  if (!config.deployKey) {
    throw new Error("DEPLOY_KEY environment variable is required");
  }
  if (!config.arnsName) {
    throw new Error("ARNS_NAME environment variable is required");
  }

  console.log("Starting deployment to Arweave...");
  console.log(`ArNS Name: ${config.arnsName}`);
  console.log(`Undername: ${config.undername}`);
  console.log(`Dist Folder: ${config.distFolderPath}`);

  // Check if dist folder exists
  if (!fs.existsSync(config.distFolderPath)) {
    throw new Error(`Dist folder does not exist: ${config.distFolderPath}`);
  }

  // Parse the deploy key (base64 encoded JSON)
  let jwk;
  try {
    jwk = JSON.parse(Buffer.from(config.deployKey, "base64").toString("utf-8"));
  } catch {
    throw new Error(
      "Invalid DEPLOY_KEY format. Must be base64 encoded JSON wallet."
    );
  }

  // Dynamically import the required modules
  const { TurboFactory, ArweaveSigner } = require("@ardrive/turbo-sdk");
  const { ANT, AOProcess, ARIO } = require("@ar.io/sdk");
  const { connect } = require("@permaweb/aoconnect");

  // Initialize Turbo
  const turbo = TurboFactory.authenticated({ privateKey: jwk });

  // Upload the folder
  console.log("Uploading folder to Turbo...");
  const { manifest, manifestResponse } = await turbo.uploadFolder({
    folderPath: config.distFolderPath,
    dataItemOpts: {
      tags: [{ name: "App-Name", value: "ar.io docs deploy" }],
    },
    manifestOptions: {
      fallbackFile: "index.html",
    }
  });

  console.log("Folder uploaded successfully");
  console.log(`Manifest ID: ${manifestResponse.id}`);

  // Modify manifest to add paths without /index.html and .html extensions
  console.log("Modifying manifest paths...");
  const updatedPaths = { ...manifest.paths };

  Object.keys(manifest.paths).forEach((key) => {
    // Handle "index.html" - remove "index.html" to create clean paths
    if (key.endsWith("index.html")) {
      const newKey = key.replace(/index\.html$/, "");
      if (!updatedPaths.hasOwnProperty(newKey)) {
        updatedPaths[newKey] = manifest.paths[key];
        console.log(`Added manifest key: ${newKey} -> ${key}`);
      }
    }
    // Handle ".html" but not "index.html" - remove ".html" extension
    else if (key.endsWith(".html")) {
      const newKey = key.replace(/\.html$/, "");
      // Prevent overwriting a path already added via "index.html"
      if (
        !updatedPaths.hasOwnProperty(newKey) &&
        !key.endsWith("/index.html")
      ) {
        updatedPaths[newKey] = manifest.paths[key];
        console.log(`Added manifest key: ${newKey} -> ${key}`);
      }
    }
  });

  // Update the manifest with modified paths
  manifest.paths = updatedPaths;

  // Upload the modified manifest
  console.log("Uploading modified manifest...");
  const manifestId = await uploadManifest(turbo, manifest);

  if (!manifestId) {
    throw new Error("Failed to upload manifest");
  }

  console.log(`Manifest uploaded successfully: ${manifestId}`);

  // Update ArNS record
  console.log("Updating ArNS record...");
  await updateArNSRecord(jwk, config.arnsName, manifestId, config.undername);

  console.log("Deployment completed successfully!");
  console.log(
    `Your docs are now available at: https://${config.arnsName}.ar-io.dev${config.undername === "@" ? "" : `/${config.undername}`}`
  );
}

async function uploadManifest(turbo, manifest) {
  try {
    const manifestString = JSON.stringify(manifest);
    const uploadResult = await turbo.uploadFile({
      fileStreamFactory: () => Readable.from(Buffer.from(manifestString)),
      fileSizeFactory: () => Buffer.byteLength(manifestString),
      signal: AbortSignal.timeout(30_000), // 30 second timeout
      dataItemOpts: {
        tags: [
          {
            name: "Content-Type",
            value: "application/x.arweave-manifest+json",
          },
          { name: "App-Name", value: "ar.io docs deploy" },
        ],
      },
    });
    return uploadResult.id;
  } catch (error) {
    console.error("Error uploading manifest:", error);
    return null;
  }
}

async function updateArNSRecord(jwk, arnsName, manifestId, undername) {
  try {
    const { ARIO, ANT } = require("@ar.io/sdk");
    const { ArweaveSigner } = require("@ardrive/turbo-sdk");

    console.log("Debug - Starting ArNS record update...");
    console.log("Debug - arnsName:", arnsName);
    console.log("Debug - manifestId:", manifestId);
    console.log("Debug - undername:", undername);
    console.log("Debug - jwk type:", typeof jwk);

    const ario = ARIO.init();
    const pid = await ario.getArNSRecord({ name: arnsName });

    if (!pid) {
      throw new Error(`ArNS name '${arnsName}' not found`);
    }

    console.log("Debug - Found ArNS record:", pid);

    const signer = new ArweaveSigner(jwk);
    console.log("Debug - Created ArweaveSigner:", typeof signer);

    const ant = ANT.init({
      processId: pid.processId,
      signer,
    });

    console.log("Debug - Created ANT instance");

    let response;
    if (undername === "@") {
      // Use setBaseNameRecord for the base name
      console.log("Debug - Calling setBaseNameRecord with:", {
        transactionId: manifestId,
        ttlSeconds: 900,
      });
      response = await ant.setBaseNameRecord({
        transactionId: manifestId,
        ttlSeconds: 900, // 15 minutes TTL
      });
    } else {
      // Use setUndernameRecord for undernames
      console.log("Debug - Calling setUndernameRecord with:", {
        undername: undername,
        transactionId: manifestId,
        ttlSeconds: 900,
      });
      response = await ant.setUndernameRecord({
        undername: undername,
        transactionId: manifestId,
        ttlSeconds: 900, // 15 minutes TTL
      });
    }

    console.log("ArNS record updated:", response);
    return response;
  } catch (error) {
    console.error("Error updating ArNS record:", error);
    throw error;
  }
}

// Handle command line arguments for testing
if (process.argv.length > 2) {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];

    switch (key) {
      case "--deploy-key":
        process.env.DEPLOY_KEY = value;
        break;
      case "--arns-name":
        process.env.ARNS_NAME = value;
        break;
      case "--undername":
        process.env.UNDERNAME = value;
        break;
      case "--dist-folder":
        process.env.DIST_FOLDER_PATH = value;
        break;
    }
  }
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});
