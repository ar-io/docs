// scripts/delete-arns-undername.mjs
import { ArweaveSigner } from "@ardrive/turbo-sdk";
import { ANT, ARIO } from "@ar.io/sdk";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  // Configuration
  const config = {
    deployKey: process.env.DEPLOY_KEY || "",
    arnsName: process.env.ARNS_NAME || "",
    undername: process.env.UNDERNAME || "",
  };

  // Validate required configuration
  if (!config.deployKey) {
    throw new Error("DEPLOY_KEY environment variable is required");
  }
  if (!config.arnsName) {
    throw new Error("ARNS_NAME environment variable is required");
  }
  if (!config.undername || config.undername === "@") {
    throw new Error("UNDERNAME environment variable is required and cannot be '@'");
  }

  console.log("Starting ArNS undername deletion...");
  console.log(`ArNS Name: ${config.arnsName}`);
  console.log(`Undername to delete: ${config.undername}`);

  // Parse the deploy key (base64 encoded JSON)
  let jwk;
  try {
    jwk = JSON.parse(Buffer.from(config.deployKey, "base64").toString("utf-8"));
  } catch {
    throw new Error(
      "Invalid DEPLOY_KEY format. Must be base64 encoded JSON wallet."
    );
  }

  // Delete the ArNS undername record
  console.log("Deleting ArNS undername record...");
  await deleteArNSUndername(jwk, config.arnsName, config.undername);

  console.log("Undername deletion completed successfully!");
}

async function deleteArNSUndername(jwk, arnsName, undername) {
  try {
    console.log("Debug - Starting ArNS undername deletion...");
    console.log("Debug - arnsName:", arnsName);
    console.log("Debug - undername:", undername);

    const ario = ARIO.mainnet();
    const pid = await ario.getArNSRecord({ name: arnsName });

    if (!pid) {
      throw new Error(`ArNS name '${arnsName}' not found`);
    }

    console.log("Debug - Found ArNS record:", pid);

    const signer = new ArweaveSigner(jwk);
    console.log("Debug - Created ArweaveSigner");

    const ant = ANT.init({
      processId: pid.processId,
      signer,
    });

    console.log("Debug - Created ANT instance");

    // Delete the undername by removing it from the ANT
    console.log("Debug - Calling removeUndername with:", {
      undername: undername,
    });

    const response = await ant.removeUndernameRecord({
      undername: undername,
    });

    console.log("ArNS undername deleted:", response);
    return response;
  } catch (error) {
    console.error("Error deleting ArNS undername:", error);
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
    }
  }
}

main().catch((error) => {
  console.error("Undername deletion failed:", error);
  process.exit(1);
});