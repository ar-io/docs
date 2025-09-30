#!/usr/bin/env node

import {
  printErrors,
  scanURLs,
  validateFiles,
} from 'next-validate-link';
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

// Function to extract headings from MDX content
function getHeadingsFromContent(content) {
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const heading = match[1].trim();
    // Convert heading to URL fragment
    const fragment = heading
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    headings.push(fragment);
  }
  
  return headings;
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
