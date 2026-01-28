// scripts/generate-sdk-docs.ts
import { promises as fs } from "node:fs";
import path from "node:path";

const PACKAGES: {
  name: string;
  readmeUrl: string;
  dest: string;
  title: string;
  description: string;
  sourceUrl: string;
  icon?: string;
}[] = [
  // ar.io SDK
  {
    name: "ar-io-sdk",
    readmeUrl:
      "https://raw.githubusercontent.com/ar-io/ar-io-sdk/alpha/README.md",
    dest: path.resolve("content/sdks/ar-io-sdk"),
    title: "Ar.ioSDK",
    description:
      "TypeScript/JavaScript SDK for interacting with the ar.io ecosystem",
    sourceUrl: "https://github.com/ar-io/ar-io-sdk",
    icon: "/brand/ario-white.svg",
  },
  // Turbo SDK
  {
    name: "turbo-sdk",
    readmeUrl:
      "https://raw.githubusercontent.com/ardriveapp/turbo-sdk/alpha/README.md",
    dest: path.resolve("content/sdks/turbo-sdk"),
    title: "Turbo SDK",
    description:
      "SDK for interacting with Turbo, a fast and efficient data upload service for Arweave",
    sourceUrl: "https://github.com/ardriveapp/turbo-sdk",
    icon: "/turbo.svg",
  },
  // Wayfinder SDK packages
  {
    name: "wayfinder-core",
    readmeUrl:
      "https://raw.githubusercontent.com/ar-io/wayfinder/alpha/packages/wayfinder-core/README.md",
    dest: path.resolve("content/sdks/wayfinder/wayfinder-core"),
    title: "Wayfinder Core",
    description:
      "JavaScript/TypeScript SDK for accessing Arweave data with built-in verification and gateway routing",
    sourceUrl:
      "https://github.com/ar-io/wayfinder/tree/main/packages/wayfinder-core",
    icon: "/wayfinder.svg",
  },
  {
    name: "wayfinder-react",
    readmeUrl:
      "https://raw.githubusercontent.com/ar-io/wayfinder/alpha/packages/wayfinder-react/README.md",
    dest: path.resolve("content/sdks/wayfinder/wayfinder-react"),
    title: "Wayfinder React",
    description:
      "React hooks and components for integrating Wayfinder into React applications",
    sourceUrl:
      "https://github.com/ar-io/wayfinder/tree/main/packages/wayfinder-react",
    icon: "/wayfinder.svg",
  },
  // ArDrive-Core-Js SDK
  {
    name: "ardrive-core-js",
    readmeUrl:
      "https://raw.githubusercontent.com/ardriveapp/ardrive-core-js/refs/heads/master/README.md",
    dest: path.resolve("content/sdks/ardrive-core-js"),
    title: "ArDrive Core JS",
    description: "JavaScript/TypeScript SDK for interacting with ArDrive",
    sourceUrl: "https://github.com/ardriveapp/ardrive-core-js",
    icon: "/ardrive.svg",
  },

  {
    name: "ardrive-cli",
    readmeUrl:
      "https://raw.githubusercontent.com/ardriveapp/ardrive-cli/refs/heads/master/README.md",
    dest: path.resolve("content/sdks/(clis)/ardrive-cli"),
    title: "ArDrive CLI",
    description: "Command line interface for ArDrive",
    sourceUrl: "https://github.com/ardriveapp/ardrive-cli",
    icon: "/ardrive.svg",
  },
];

function sanitizeFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeContent(content: string): string {
  // Escape content that might be interpreted as JSX
  return (
    content
      // Remove h1 headers (# title)
      .replace(/^#\s+[^\n]+\n/gm, "")
      // Convert <details> blocks to normal output blocks with "Output:" prefix
      .replace(
        /<details>\s*<summary>[^<]*<\/summary>\s*(```[\s\S]*?```)\s*<\/details>/g,
        (match, codeBlock) => {
          return `**Output:**\n\n${codeBlock}`;
        }
      )
      // Escape emoji checkmarks and crosses that might be interpreted as JSX
      .replace(/^(\s*-)(\s*)(✅|❌)/gm, "$1$2{'$3'}")
      // Convert GitHub-style alerts to Fumadocs Callout components
      .replace(
        />\s*\[!(WARNING|CAUTION|IMPORTANT)\]\s*\n((?:>.*\n?)*)/gm,
        (match, type, content) => {
          const cleanContent = content.replace(/^>\s?/gm, "").trim();
          return `<Callout type="warn">\n${cleanContent}\n</Callout>\n`;
        }
      )
      .replace(
        />\s*\[!(INFO|NOTE|TIP)\]\s*\n((?:>.*\n?)*)/gm,
        (match, type, content) => {
          const cleanContent = content.replace(/^>\s?/gm, "").trim();
          return `<Callout type="info">\n${cleanContent}\n</Callout>\n`;
        }
      )
      // Remove backticks from any header and simplify function signatures
      .replace(
        /(#{1,6}\s*)`?([^`\n]+)`?/g,
        (match, headerPrefix, headerContent) => {
          // Remove backticks and simplify function signatures (remove parameters, keep just function name with ())
          let cleanHeader = headerContent.replace(/`/g, "");
          cleanHeader = cleanHeader.replace(
            /(\w+)\([^)]*\)(\([^)]*\))*/g,
            "$1()"
          );
          return `${headerPrefix}${cleanHeader}`;
        }
      )
      // Handle angle brackets for placeholders like <tx-id>, <subdomain>
      .replace(/<(\/?[\w-]+)(\s[^>]*)?>/g, (match, tagName, attributes) => {
        // Clean the tag name (remove leading slash for closing tags)
        const cleanTagName = tagName.replace(/^\//, "").toLowerCase();

        // List of valid HTML tags that should be preserved
        const htmlTags = [
          "br",
          "hr",
          "img",
          "input",
          "meta",
          "link",
          "area",
          "base",
          "col",
          "embed",
          "source",
          "track",
          "wbr",
          "div",
          "span",
          "p",
          "a",
          "strong",
          "em",
          "code",
          "pre",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "table",
          "tr",
          "td",
          "th",
          "thead",
          "tbody",
          "tfoot",
          "details",
          "summary",
          "blockquote",
          "cite",
          "abbr",
          "time",
          "mark",
          "del",
          "ins",
          "sup",
          "sub",
          "small",
          "big",
          "b",
          "i",
          "u",
          "s",
          "strike",
          "script",
          "callout",
        ];

        if (htmlTags.includes(cleanTagName)) {
          return match; // Keep HTML tags as-is
        }

        // Escape placeholders like <tx-id>, <subdomain>, etc.
        return `\\<${tagName}${attributes || ""}\\>`;
      })
      // Keep code blocks with curly braces as-is since they're in backticks (but not in headers)
      .replace(/(`[^`]*\{[^}]*\}[^`]*`)/g, (match) => {
        return match;
      })
      // Escape standalone curly braces that aren't in code blocks
      .replace(/(?<!`[^`]*)\{([^}]*)\}(?![^`]*`)/g, (match, content) => {
        // Skip if this looks like JSX (contains JSX-like syntax)
        if (
          content.includes("<") ||
          content.includes(">") ||
          content.includes("React") ||
          content.includes("jsx")
        ) {
          return match;
        }
        // Escape the braces
        return `\\{${content}\\}`;
      })
      // Fix literal <> patterns that should be < - >
      .replace(/(?<!<)<>/g, "< - >")
  );
}

async function fetchReadme(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`
    );
  }
  return response.text();
}

async function processPackage(pkg: (typeof PACKAGES)[0]) {
  console.log(`Processing ${pkg.name}...`);

  // Clean destination directory but preserve index.mdx
  let indexContent = '';
  const indexPath = path.join(pkg.dest, 'index.mdx');
  
  try {
    indexContent = await fs.readFile(indexPath, 'utf-8');
  } catch (error) {
    // index.mdx doesn't exist, that's fine
  }

  await fs.rm(pkg.dest, { recursive: true, force: true });
  await fs.mkdir(pkg.dest, { recursive: true });

  // Restore index.mdx if it existed
  if (indexContent) {
    await fs.writeFile(indexPath, indexContent);
  }

  try {
    // Fetch the README.md from GitHub
    console.log(`Fetching README from: ${pkg.readmeUrl}`);
    const content = await fetchReadme(pkg.readmeUrl);

    // First split by H2 headers to create folder structure
    const h2Sections = content
      .split(/(?=^## )/m)
      .filter((section) => section.trim());

    // Structure to hold our pages/folders
    const rootPages: string[] = [];
    const folders: Record<string, string[]> = {};

    for (const h2Section of h2Sections) {
      if (!h2Section.startsWith("## ")) continue;

      const h2Lines = h2Section.split("\n");
      const h2HeaderLine = h2Lines[0];
      const h2Title = h2HeaderLine.replace(/^## /, "").trim();

      // Skip certain H2 sections
      if (
        h2Title.toLowerCase().includes("table of contents") ||
        h2Title.toLowerCase().includes("toc") ||
        h2Title.toLowerCase() === "contents" ||
        h2Title.toLowerCase() === "developers" ||
        h2Title.toLowerCase() === "development" ||
        h2Title.toLowerCase() === "contributing" ||
        h2Title.toLowerCase() === "support" ||
        h2Title.toLowerCase() === "license" ||
        h2Title.toLowerCase() === "credits" ||
        h2Title.toLowerCase() === "core-concepts" ||
        h2Title.toLowerCase() === "testing" ||
        h2Title.toLowerCase() === "cli" ||
        h2Title.toLowerCase() === "installation" ||
        h2Title.toLowerCase() === "configuration" ||
        h2Title.toLowerCase() === "resources" ||
        h2Title.toLowerCase() === "usage" ||
        h2Title.toLowerCase().includes("quick start")
      ) {
        console.log(`Skipping H2 section: ${h2Title}`);
        continue;
      }

      // Clean up the H2 title
      let cleanH2Title = h2Title.replace(/`/g, "");
      cleanH2Title = cleanH2Title.replace(
        /(\w+)\([^)]*\)(\([^)]*\))*/g,
        "$1()"
      );
      const h2FolderName = sanitizeFilename(cleanH2Title);

      // Split this H2 section by H3 headers
      const h3Sections = h2Section
        .split(/(?=^### )/m)
        .filter((section) => section.trim());

      // Process the H2 content (before first H3)
      const h2Content = h3Sections[0];
      const h2ContentLines = h2Content.split("\n");
      const h2ContentBody = h2ContentLines.slice(1).join("\n").trim();

      if (h3Sections.length > 1) {
        // Has H3 subsections - create a folder with parentheses
        const folderName = `(${h2FolderName})`;
        const folderPath = path.join(pkg.dest, folderName);
        await fs.mkdir(folderPath, { recursive: true });
        folders[folderName] = [];

        // Process each H3 section
        for (let i = 1; i < h3Sections.length; i++) {
          const h3Section = h3Sections[i];
          if (!h3Section.startsWith("### ")) continue;

          const h3Lines = h3Section.split("\n");
          const h3HeaderLine = h3Lines[0];
          const h3Title = h3HeaderLine.replace(/^### /, "").trim();

          // Clean up the H3 title
          let cleanH3Title = h3Title.replace(/`/g, "");
          cleanH3Title = cleanH3Title.replace(
            /(\w+)\([^)]*\)(\([^)]*\))*/g,
            "$1()"
          );

          const h3Content = h3Lines.slice(1).join("\n").trim();
          const h3Filename = sanitizeFilename(cleanH3Title);
          const escapedContent = escapeContent(h3Content);

          const pageContent = `---
title: "${cleanH3Title}"
description: "${pkg.description}"
---

${escapedContent}`;

          await fs.writeFile(
            path.join(folderPath, `${h3Filename}.mdx`),
            pageContent
          );
          folders[folderName].push(h3Filename);
          console.log(`Created page: ${folderName}/${h3Filename}.mdx`);
        }

        // Create meta.json for the folder
        const folderMetaPath = path.join(folderPath, "meta.json");
        await fs.writeFile(
          folderMetaPath,
          JSON.stringify(
            {
              title: cleanH2Title,
              pages: folders[folderName],
              defaultOpen: false,
            },
            null,
            2
          )
        );

        rootPages.push(folderName);
      } else {
        // No H3 subsections - create a single page
        const filename = h2FolderName;
        const escapedContent = escapeContent(h2ContentBody);

        const pageContent = `---
title: "${cleanH2Title}"
description: "${pkg.description}"
---

${escapedContent}`;

        await fs.writeFile(path.join(pkg.dest, `${filename}.mdx`), pageContent);
        rootPages.push(filename);
        console.log(`Created page: ${filename}.mdx`);
      }
    }

    // LLM pages are no longer needed - users can access llm.txt directly

    // Create top-level meta for the package
    const metaPath = path.join(pkg.dest, "meta.json");
    await fs.writeFile(
      metaPath,
      JSON.stringify(
        {
          title: pkg.title,
          icon: pkg.icon,
          pages: rootPages,
          defaultOpen: false,
        },
        null,
        2
      )
    );

    console.log(`${pkg.name} README.md successfully processed`);
  } catch (error) {
    console.error(`Error converting ${pkg.name} README:`, error);

    // Create basic meta
    const metaPath = path.join(pkg.dest, "meta.json");
    await fs.writeFile(
      metaPath,
      JSON.stringify(
        { title: pkg.title, pages: ["..."], defaultOpen: false },
        null,
        2
      )
    );
  }
}

async function main() {
  console.log("Generating SDK documentation from GitHub...");

  const pkg = process.argv[2];
  const packageToProcess = PACKAGES.find((p) => p.name === pkg);
  if (packageToProcess) {
    await processPackage(packageToProcess);
    console.log("SDK documentation generated successfully!");
    return;
  }

  // Create top-level SDKs meta.json
  const sdksMetaPath = path.resolve("content/sdks/meta.json");
  const sdksMeta = {
    title: "SDKs and CLIs",
    icon: "Package",
    pages: [
      "---SDKs---",
      "ardrive-core-js",
      "ar-io-sdk",
      "turbo-sdk",
      "wayfinder",
      "---CLIs---",
      "...(clis)",
    ],
    root: true,
    defaultOpen: false,
  };

  await fs.writeFile(sdksMetaPath, JSON.stringify(sdksMeta, null, 2));
  console.log("Created top-level SDKs meta.json");
  console.log("SDK documentation generated successfully!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
