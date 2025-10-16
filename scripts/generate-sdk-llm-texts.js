const fs = require("fs");
const path = require("path");

// Function to recursively find all .mdx files
function findMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findMdxFiles(filePath, fileList);
    } else if (file.endsWith(".mdx")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to extract frontmatter and content
function parseMdxFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  let frontmatter = {};
  let body = content;

  if (frontmatterMatch) {
    body = content.replace(frontmatterMatch[0], "");

    // Parse frontmatter (simple YAML parsing)
    const frontmatterText = frontmatterMatch[1];
    frontmatterText.split("\n").forEach((line) => {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) {
        const [, key, value] = match;
        frontmatter[key] = value.replace(/^["']|["']$/g, ""); // Remove quotes
      }
    });
  }

  return { frontmatter, body };
}

// Function to generate URL from file path
function generateUrl(filePath, sdkDir) {
  const relativePath = path.relative(sdkDir, filePath);
  const url =
    "/" +
    relativePath
      .replace(/\.mdx$/, "")
      .replace(/\/index$/, "")
      .replace(/\\/g, "/");

  return url === "/" ? "" : url;
}

// Function to clean up content
function cleanContent(body) {
  return body
    .replace(/import\s+.*?from\s+['"][^'"]*['"];?\n/g, "") // Remove imports
    .replace(/export\s+.*?;?\n/g, "") // Remove exports
    .replace(/<[^>]*>/g, "") // Remove JSX tags
    .replace(/\n\s*\n\s*\n/g, "\n\n") // Clean up multiple newlines
    .trim();
}

// Function to process a single SDK directory
function processSdkDirectory(sdkPath) {
  console.log(`\nProcessing SDK: ${path.basename(sdkPath)}`);

  const mdxFiles = findMdxFiles(sdkPath);
  const sections = [];

  mdxFiles.forEach((filePath) => {
    try {
      const { frontmatter, body } = parseMdxFile(filePath);
      const url = generateUrl(filePath, sdkPath);
      const title = frontmatter.title || "Untitled";
      const cleanBody = cleanContent(body);

      // Skip empty content
      if (!cleanBody) {
        return;
      }

      const sectionTitle = url ? `# ${title} (${url})` : `# ${title}`;
      sections.push(`${sectionTitle}\n\n${cleanBody}`);

      console.log(
        `  Processed: ${path.relative(sdkPath, filePath)} -> ${url || "/"}`
      );
    } catch (error) {
      console.error(`  Error processing ${filePath}:`, error.message);
    }
  });

  // Write the combined content
  const outputPath = path.join(sdkPath, "llm.txt");
  const outputContent = sections.join("\n\n");

  fs.writeFileSync(outputPath, outputContent);
  console.log(`  Generated ${outputPath} with ${sections.length} sections`);

  // Also copy to public directory for web access
  const sdkName = path.basename(sdkPath);
  const publicPath = path.join("public", "sdks", sdkName, "llm.txt");

  // Ensure the directory exists
  const publicDir = path.dirname(publicPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(publicPath, outputContent);
  console.log(`  Copied to ${publicPath} for web access`);

  return sections.length;
}

// Main function
function generateSdkLLMTexts() {
  console.log("Generating SDK-specific LLM text files...");

  const sdksDir = "content/sdks";
  const entries = fs.readdirSync(sdksDir, { withFileTypes: true });

  // Find all SDK directories (excluding the (clis) wrapper)
  const sdkDirs = entries
    .filter((entry) => {
      if (!entry.isDirectory()) return false;

      // Skip the (clis) wrapper directory
      if (entry.name === "(clis)") {
        // Process directories inside (clis)
        const clisPath = path.join(sdksDir, entry.name);
        const clisEntries = fs.readdirSync(clisPath, { withFileTypes: true });
        return clisEntries
          .filter((clisEntry) => clisEntry.isDirectory())
          .map((clisEntry) => path.join(clisPath, clisEntry.name));
      }

      return true;
    })
    .map((entry) => path.join(sdksDir, entry.name));

  // Flatten the array in case we have nested directories from (clis)
  const allSdkDirs = sdkDirs.flat();

  let totalSections = 0;
  let processedDirs = 0;

  allSdkDirs.forEach((sdkDir) => {
    try {
      const sectionCount = processSdkDirectory(sdkDir);
      totalSections += sectionCount;
      processedDirs++;
    } catch (error) {
      console.error(`Error processing ${sdkDir}:`, error.message);
    }
  });

  console.log(
    `\nCompleted! Generated LLM text files for ${processedDirs} SDK directories with ${totalSections} total sections.`
  );
}

// Run the script
generateSdkLLMTexts();
