// scripts/generate-wayfinder-docs.ts
import { promises as fs } from "node:fs";
import path from "node:path";

const GITHUB_BASE_URL = "https://raw.githubusercontent.com/ar-io/wayfinder";
const BRANCH = "typedocs";

const PACKAGES: {
  name: string;
  readmeUrl: string;
  dest: string;
  title: string;
  description: string;
}[] = [
  {
    name: "wayfinder-core",
    readmeUrl: `${GITHUB_BASE_URL}/${BRANCH}/packages/wayfinder-core/README.md`,
    dest: path.resolve("content/sdks/wayfinder/wayfinder-core"),
    title: "Wayfinder Core",
    description: "JavaScript/TypeScript SDK for accessing Arweave data with built-in verification and gateway routing"
  },
  {
    name: "wayfinder-react",
    readmeUrl: `${GITHUB_BASE_URL}/${BRANCH}/packages/wayfinder-react/README.md`,
    dest: path.resolve("content/sdks/wayfinder/wayfinder-react"),
    title: "Wayfinder React",
    description: "React hooks and components for integrating Wayfinder into React applications"
  }
];


function sanitizeFilename(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeContent(content: string): string {
  // Simple escaping that only targets placeholder patterns like <tx-id>, <subdomain>
  // while preserving HTML tags and not over-escaping
  return content.replace(/<([\w-]+)>/g, (match, inner) => {
    // Only escape simple placeholder patterns, preserve HTML tags
    const htmlTags = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr'];
    if (htmlTags.includes(inner.toLowerCase())) {
      return match; // Keep HTML tags as-is
    }
    // Escape placeholders like <tx-id>, <subdomain>, etc.
    return `\\<${inner}\\>`;
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
  
  // Clean and create destination directory
  await fs.rm(pkg.dest, { recursive: true, force: true });
  await fs.mkdir(pkg.dest, { recursive: true });
  
  try {
    // Fetch the README.md from GitHub
    console.log(`Fetching README from: ${pkg.readmeUrl}`);
    const content = await fetchReadme(pkg.readmeUrl);
    
    // Extract title from first heading or use default
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const mainTitle = titleMatch ? titleMatch[1] : pkg.title;
    
    // Split content by ## headers
    const sections = content.split(/(?=^## )/m).filter(section => section.trim());
    
    const pages: string[] = [];
    
    // Process intro section (everything before first ##)
    const introSection = sections[0];
    if (introSection && !introSection.startsWith('## ')) {
      const escapedIntro = escapeContent(introSection);
      const indexContent = `---
title: "${mainTitle}"
description: "${pkg.description}"
---

${escapedIntro}`;
      
      await fs.writeFile(path.join(pkg.dest, "index.mdx"), indexContent);
    }
    
    // Process each ## section as a separate page
    for (const section of sections) {
      if (!section.startsWith('## ')) continue;
      
      const lines = section.split('\n');
      const headerLine = lines[0];
      const sectionTitle = headerLine.replace(/^## /, '').trim();
      const sectionContent = lines.slice(1).join('\n').trim();
      
      const filename = sanitizeFilename(sectionTitle);
      const escapedContent = escapeContent(sectionContent);
      
      const pageContent = `---
title: "${sectionTitle}"
description: "${pkg.description}"
---

# ${sectionTitle}

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
        { title: pkg.title, pages, defaultOpen: true },
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

Please refer to the [source code](https://github.com/ar-io/wayfinder/tree/main/packages/${pkg.name}) for SDK details.`
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
  console.log("Generating wayfinder documentation from GitHub...");

  // Process each package
  for (const pkg of PACKAGES) {
    await processPackage(pkg);
  }
  
  console.log("Wayfinder documentation generated successfully!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
