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
function generateUrl(filePath) {
  const relativePath = path.relative("content", filePath);
  const url =
    "/" +
    relativePath
      .replace(/\.mdx$/, "")
      .replace(/\/index$/, "")
      .replace(/\\/g, "/");

  return url === "/" ? "/learn" : url;
}

// Main function
function generateLLMText() {
  console.log("Generating LLM text file...");

  const contentDir = "content";
  const mdxFiles = findMdxFiles(contentDir);

  const sections = [];

  mdxFiles.forEach((filePath) => {
    try {
      const { frontmatter, body } = parseMdxFile(filePath);
      const url = generateUrl(filePath);
      const title = frontmatter.title || "Untitled";

      // Clean up the body content
      const cleanBody = body
        .replace(/import\s+.*?from\s+['"][^'"]*['"];?\n/g, "") // Remove imports
        .replace(/export\s+.*?;?\n/g, "") // Remove exports
        .replace(/<[^>]*>/g, "") // Remove JSX tags
        .replace(/\n\s*\n\s*\n/g, "\n\n") // Clean up multiple newlines
        .trim();

      sections.push(`# ${title} (${url})

${cleanBody}`);

      console.log(`Processed: ${filePath} -> ${url}`);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  });

  // Write the combined content
  const outputPath = "public/llms-full.txt";
  const outputContent = sections.join("\n\n");

  fs.writeFileSync(outputPath, outputContent);
  console.log(`Generated ${outputPath} with ${sections.length} sections`);
}

// Run the script
generateLLMText();
