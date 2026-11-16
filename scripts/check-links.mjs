#!/usr/bin/env node

import {
  printErrors,
  scanURLs,
  validateFiles,
} from 'next-validate-link';
import GithubSlugger from 'github-slugger';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read all MDX files from content directory
async function getAllMdxFiles(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await getAllMdxFiles(fullPath, files);
    } else if (entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to extract URL from file path
function getUrlFromPath(filePath, contentDir) {
  const relativePath = path.relative(contentDir, filePath);
  const pathWithoutExt = relativePath.replace(/\.mdx$/, '');
  const segments = pathWithoutExt.split(path.sep);
  
  // Remove route groups (directories wrapped in parentheses)
  const filteredSegments = segments.filter(segment => !segment.match(/^\(.+\)$/));
  
  // Remove index from the end if present
  if (filteredSegments[filteredSegments.length - 1] === 'index') {
    filteredSegments.pop();
  }
  
  // Convert to URL
  return '/' + filteredSegments.join('/');
}

// Strip fenced code so `# comment` lines in shell samples are not read as
// headings or links.
function stripCodeFences(content) {
  return content.replace(/^(\s*)(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\2\s*$/gm, (block) =>
    block.replace(/[^\n]/g, ' '),
  );
}

// Heading ids, built the way Fumadocs builds them: github-slugger over the
// heading's plain text, deduplicated per page (a second "Usage" is "usage-1"),
// or an explicit `[#custom-id]` suffix.
function getHeadingsFromContent(content) {
  const slugger = new GithubSlugger();
  const ids = [];
  for (const match of stripCodeFences(content).matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)) {
    let text = match[1];
    const custom = /\s*\[#([^\]]+)\]$/.exec(text);
    if (custom) {
      ids.push(custom[1]);
      continue;
    }
    text = text
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links and images -> label
      .replace(/<[^>]+>/g, '') // inline JSX/HTML tags
      .replace(/[`*_~]/g, ''); // code and emphasis markers
    ids.push(slugger.slug(text.trim()));
  }
  // Explicit anchors: <a id="x">, <div id="x">
  for (const match of content.matchAll(/\bid=["']([^"']+)["']/g)) ids.push(match[1]);
  return ids;
}

// next-validate-link skips links that are only a fragment (`#section`), so
// check those against the page's own headings here.
function findBrokenSamePageAnchors(relativePath, content) {
  const ids = new Set(getHeadingsFromContent(content));
  const prose = stripCodeFences(content);
  const errors = [];
  const patterns = [/\]\(#([^)\s]+)\)/g, /\bhref=["']#([^"']+)["']/g];
  for (const pattern of patterns) {
    for (const match of prose.matchAll(pattern)) {
      const fragment = decodeURIComponent(match[1]);
      if (ids.has(fragment)) continue;
      const line = prose.slice(0, match.index).split('\n').length;
      errors.push(`${relativePath}:${line}: #${fragment} is not a heading on this page`);
    }
  }
  return errors;
}

async function checkLinks() {
  const contentDir = path.join(path.dirname(__dirname), 'content');
  const mdxFiles = await getAllMdxFiles(contentDir);
  
  console.log(`Found ${mdxFiles.length} MDX files to check`);
  
  // Create populate data for scanURLs
  const populateData = {};
  
  for (const filePath of mdxFiles) {
    const content = await fs.readFile(filePath, 'utf-8');
    const url = getUrlFromPath(filePath, contentDir);
    const slugs = url.split('/').filter(Boolean);
    const headings = getHeadingsFromContent(content);
    
    // Add to populate data
    if (!populateData['[[...slug]]']) {
      populateData['[[...slug]]'] = [];
    }
    
    populateData['[[...slug]]'].push({
      value: { slug: slugs },
      hashes: headings,
    });
    
    // For directory index pages, also add with trailing slash
    if (filePath.endsWith('index.mdx') && slugs.length > 0) {
      populateData['[[...slug]]'].push({
        value: { slug: [...slugs, ''] }, // Empty string at end creates trailing slash
        hashes: headings,
      });
    }
  }
  
  // Scan URLs
  const scanned = await scanURLs({
    preset: 'next',
    populate: populateData,
    trailingSlash: true,
  });
  
  // Prepare files for validation
  const files = await Promise.all(
    mdxFiles.map(async (filePath) => {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const url = getUrlFromPath(filePath, contentDir);
        const relativePath = path.relative(path.dirname(__dirname), filePath);
        
        return {
          path: relativePath,
          content: content,
          url: url,
        };
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return null;
      }
    })
  );
  
  const validFiles = files.filter((file) => file !== null);
  
  console.log(`Validating ${validFiles.length} files...`);
  
  // Validate files
  try {
    const results = await validateFiles(validFiles, {
      scanned,
      markdown: {
        components: {
          Card: { attributes: ['href'] },
        },
      },
      checkRelativePaths: 'as-url',
      validate: (url, context) => {
        // Normalize trailing slashes
        const normalizedUrl = url.endsWith('/') && url.length > 1 ? url.slice(0, -1) : url;
        
        // Check if the normalized URL exists in scanned URLs
        if (normalizedUrl !== url && scanned.urls.has(normalizedUrl)) {
          return { valid: true };
        }
        
        // Use default validation
        return null;
      }
    });
    
    // Pages under content/sdks/<pkg>/ (except index.mdx) are generated from
    // upstream READMEs. Their anchors break when the generator splits one
    // README into several pages, so they are reported as warnings to fix in
    // scripts/generate-sdk-docs.ts rather than failing the check.
    const isGenerated = (p) =>
      /^content\/sdks\/(\(clis\)\/)?[^/]+\/.+\.mdx$/.test(p.split(path.sep).join('/')) &&
      !p.endsWith('index.mdx');
    const anchorErrors = validFiles.flatMap((file) => findBrokenSamePageAnchors(file.path, file.content));
    const generated = anchorErrors.filter((e) => isGenerated(e.split(':')[0]));
    const handWritten = anchorErrors.filter((e) => !isGenerated(e.split(':')[0]));
    for (const error of handWritten) console.error(error);
    for (const error of generated) console.warn(`warning (generated page): ${error}`);
    console.log(
      `${handWritten.length} broken same-page anchors, ` +
        `${generated.length} more in generated SDK pages (fix in scripts/generate-sdk-docs.ts)`,
    );
    if (handWritten.length > 0 && results.length === 0) process.exitCode = 1;

    printErrors(results, true);
  } catch (error) {
    console.error('Validation error:', error);
    
    // Try to validate files one by one to find the problematic file
    console.log('Checking files individually to find the issue...');
    for (const file of validFiles) {
      try {
        await validateFiles([file], {
          scanned,
          markdown: {
            components: {
              Card: { attributes: ['href'] },
            },
          },
          checkRelativePaths: 'as-url',
        });
        console.log(`✓ ${file.path}`);
      } catch (fileError) {
        console.error(`✗ Error in file ${file.path}:`, fileError.message);
        console.error('File content preview:');
        console.error(file.content.split('\n').slice(0, 10).map((line, i) => `${i + 1}: ${line}`).join('\n'));
        break;
      }
    }
  }
}

checkLinks().catch(console.error);
