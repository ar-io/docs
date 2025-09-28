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
    // AR.IO SDK
  {
    name: "ar-io-sdk",
    readmeUrl: "https://raw.githubusercontent.com/ar-io/ar-io-sdk/main/README.md",
    dest: path.resolve("content/sdks/ar-io-sdk"),
    title: "AR.IO SDK",
    description: "TypeScript/JavaScript SDK for interacting with the AR.IO ecosystem",
    sourceUrl: "https://github.com/ar-io/ar-io-sdk",
    icon: "/ario.svg"
  },
    // Turbo SDK
  {
    name: "turbo-sdk",
    readmeUrl: "https://raw.githubusercontent.com/ardriveapp/turbo-sdk/main/README.md",
    dest: path.resolve("content/sdks/turbo-sdk"),
    title: "Turbo SDK",
    description: "SDK for interacting with Turbo, a fast and efficient data upload service for Arweave",
    sourceUrl: "https://github.com/ardriveapp/turbo-sdk",
    icon: "/turbo.svg"
  },
  // Wayfinder SDK packages
  {
    name: "wayfinder-core",
    readmeUrl: "https://raw.githubusercontent.com/ar-io/wayfinder/typedocs/packages/wayfinder-core/README.md",
    dest: path.resolve("content/sdks/wayfinder/wayfinder-core"),
    title: "Wayfinder Core",
    description: "JavaScript/TypeScript SDK for accessing Arweave data with built-in verification and gateway routing",
    sourceUrl: "https://github.com/ar-io/wayfinder/tree/main/packages/wayfinder-core",
    icon: "/wayfinder.svg"
  },
  {
    name: "wayfinder-react",
    readmeUrl: "https://raw.githubusercontent.com/ar-io/wayfinder/typedocs/packages/wayfinder-react/README.md",
    dest: path.resolve("content/sdks/wayfinder/wayfinder-react"),
    title: "Wayfinder React",
    description: "React hooks and components for integrating Wayfinder into React applications",
    sourceUrl: "https://github.com/ar-io/wayfinder/tree/main/packages/wayfinder-react",
    icon: "/wayfinder.svg"
  },
];


function sanitizeFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeContent(content: string): string {
  // Escape content that might be interpreted as JSX
  return content
    // Remove h1 headers (# title)
    .replace(/^#\s+[^\n]+\n/gm, '')
    // Convert <details> blocks to normal code blocks
    .replace(/<details>\s*<summary>[^<]*<\/summary>\s*(```[\s\S]*?```)\s*<\/details>/g, '$1')
    // Convert GitHub-style alerts to Fumadocs Callout components
    .replace(/>\s*\[!(WARNING|CAUTION|IMPORTANT)\]\s*\n((?:>.*\n?)*)/gm, (match, type, content) => {
      const cleanContent = content.replace(/^>\s?/gm, '').trim();
      return `<Callout type="warn">\n${cleanContent}\n</Callout>\n`;
    })
    .replace(/>\s*\[!(INFO|NOTE|TIP)\]\s*\n((?:>.*\n?)*)/gm, (match, type, content) => {
      const cleanContent = content.replace(/^>\s?/gm, '').trim();
      return `<Callout type="info">\n${cleanContent}\n</Callout>\n`;
    })
    // Remove backticks from any header and simplify function signatures
    .replace(/(#{1,6}\s*)`?([^`\n]+)`?/g, (match, headerPrefix, headerContent) => {
      // Remove backticks and simplify function signatures (remove parameters, keep just function name with ())
      let cleanHeader = headerContent.replace(/`/g, '');
      cleanHeader = cleanHeader.replace(/(\w+)\([^)]*\)(\([^)]*\))*/g, '$1()');
      return `${headerPrefix}${cleanHeader}`;
    })
    // Handle angle brackets for placeholders like <tx-id>, <subdomain>
    .replace(/<(\/?[\w-]+)(\s[^>]*)?>/g, (match, tagName, attributes) => {
      // Clean the tag name (remove leading slash for closing tags)
      const cleanTagName = tagName.replace(/^\//, '').toLowerCase();
      
      // List of valid HTML tags that should be preserved
      const htmlTags = [
        'br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr',
        'div', 'span', 'p', 'a', 'strong', 'em', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot',
        'details', 'summary', 'blockquote', 'cite', 'abbr', 'time', 'mark', 'del', 'ins',
        'sup', 'sub', 'small', 'big', 'b', 'i', 'u', 's', 'strike', 'script', 'callout'
      ];
      
      if (htmlTags.includes(cleanTagName)) {
        return match; // Keep HTML tags as-is
      }
      
      // Escape placeholders like <tx-id>, <subdomain>, etc.
      return `\\<${tagName}${attributes || ''}\\>`;
    })
    // Keep code blocks with curly braces as-is since they're in backticks (but not in headers)
    .replace(/(`[^`]*\{[^}]*\}[^`]*`)/g, (match) => {
      return match;
    })
    // Escape standalone curly braces that aren't in code blocks
    .replace(/(?<!`[^`]*)\{([^}]*)\}(?![^`]*`)/g, (match, content) => {
      // Skip if this looks like JSX (contains JSX-like syntax)
      if (content.includes('<') || content.includes('>') || content.includes('React') || content.includes('jsx')) {
        return match;
      }
      // Escape the braces
      return `\\{${content}\\}`;
    });
}

async function fetchReadme(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

async function processPackage(pkg: typeof PACKAGES[0]) {
  console.log(`Processing ${pkg.name}...`);
  
  // Check if index.mdx exists before cleaning
  let indexContent: string | null = null;
  const indexPath = path.join(pkg.dest, 'index.mdx');
  try {
    indexContent = await fs.readFile(indexPath, 'utf-8');
  } catch (e) {
    // index.mdx doesn't exist, that's fine
  }
  
  // Clean and create destination directory
  await fs.rm(pkg.dest, { recursive: true, force: true });
  await fs.mkdir(pkg.dest, { recursive: true });
  
  // Restore index.mdx if it existed
  if (indexContent) {
    await fs.writeFile(indexPath, indexContent);
    console.log(`Preserved existing index.mdx for ${pkg.name}`);
  }
  
  try {
    // Fetch the README.md from GitHub
    console.log(`Fetching README from: ${pkg.readmeUrl}`);
    const content = await fetchReadme(pkg.readmeUrl);
    
    // Split content by ## headers
    const sections = content.split(/(?=^## )/m).filter(section => section.trim());


    // we skip the intro section as index.mdx is curated with mdx specific content

    const pages: string[] = [];
  
    // Process each ## section as a separate page
    for (const section of sections) {
      if (!section.startsWith('## ')) continue;
      
      const lines = section.split('\n');
      const headerLine = lines[0];
      const sectionTitle = headerLine.replace(/^## /, '').trim();
      
      // Skip table of contents, developers, cli, installation, usage, and quick start sections
      if (sectionTitle.toLowerCase().includes('table of contents') || 
          sectionTitle.toLowerCase().includes('toc') ||
          sectionTitle.toLowerCase() === 'contents' ||
          sectionTitle.toLowerCase() === 'developers' ||
          sectionTitle.toLowerCase() === 'cli' ||
          sectionTitle.toLowerCase() === 'installation' ||
          sectionTitle.toLowerCase() === 'usage' ||
          sectionTitle.toLowerCase().includes('quick start')) {
        console.log(`Skipping section: ${sectionTitle}`);
        continue;
      }
      
      // Remove backticks and simplify function signatures for cleaner page names
      let cleanSectionTitle = sectionTitle.replace(/`/g, '');
      
      // Simplify function signatures: remove parameters, keep just function name with ()
      cleanSectionTitle = cleanSectionTitle.replace(/(\w+)\([^)]*\)(\([^)]*\))*/g, '$1()');
      
      const sectionContent = lines.slice(1).join('\n').trim();
      
      const filename = sanitizeFilename(cleanSectionTitle);
      const escapedContent = escapeContent(sectionContent);
      
      const pageContent = `---
title: "${cleanSectionTitle}"
description: "${pkg.description}"
---

${escapedContent}`;
      
      await fs.writeFile(path.join(pkg.dest, `${filename}.mdx`), pageContent);
      pages.push(filename);
      console.log(`Created page: ${filename}.mdx`);
    }
    
    // Create sidebar meta with all pages
    const metaPath = path.join(pkg.dest, "meta.json");
    await fs.writeFile(
      metaPath,
      JSON.stringify(
        { title: pkg.title, icon: pkg.icon, pages, defaultOpen: false },
        null,
        2
      )
    );
    
    console.log(`${pkg.name} README.md successfully split into ${pages.length} pages`);
  } catch (error) {
    console.error(`Error converting ${pkg.name} README:`, error);
    // Create fallback if README doesn't exist
    await fs.writeFile(
      path.join(pkg.dest, "index.mdx"),
      `---
title: "${pkg.title}"
description: "${pkg.description}"
---

# ${pkg.title}

Please refer to the [source code](${pkg.sourceUrl}) for SDK details.`
    );
    
    // Create basic meta
    const metaPath = path.join(pkg.dest, "meta.json");
    await fs.writeFile(
      metaPath,
      JSON.stringify(
        { title: pkg.title, pages: ["..."], defaultOpen: true },
        null,
        2
      )
    );
  }
}

async function main() {
  console.log("Generating SDK documentation from GitHub...");

  // Process each package
  for (const pkg of PACKAGES) {
    await processPackage(pkg);
  }
  
  // Create top-level SDKs meta.json
  const sdksMetaPath = path.resolve("content/sdks/meta.json");
  const sdksMeta = {
    title: "SDKs",
    icon: "Package",
    pages: [
      "...",
      "ar-io-sdk",
      "turbo-sdk",
      "wayfinder",
    ],
    root: true,
    defaultOpen: false
  };
  
  await fs.writeFile(sdksMetaPath, JSON.stringify(sdksMeta, null, 2));
  console.log("Created top-level SDKs meta.json");
  
  console.log("SDK documentation generated successfully!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
