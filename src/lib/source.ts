import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import type { PageTree } from "fumadocs-core/server";
import { transformerOpenAPI } from 'fumadocs-openapi/server';
import { icons } from 'lucide-react';
import { createElement, type ReactElement } from 'react';
import Image from 'next/image';
import { ThemeIcon } from '@/components/theme-icon';

/**
 * Extract text content from a React node for sorting purposes
 */
function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (node === null || node === undefined) return '';
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    return getNodeText(element.props.children);
  }
  return '';
}

/**
 * Sort page tree children alphabetically by name
 */
function sortChildrenAlphabetically(children: PageTree.Node[]): PageTree.Node[] {
  return [...children].sort((a, b) => {
    const nameA = getNodeText(a.name).toLowerCase();
    const nameB = getNodeText(b.name).toLowerCase();
    return nameA.localeCompare(nameB);
  });
}

/**
 * Folders that should have their children sorted alphabetically
 */
const ALPHABETICALLY_SORTED_FOLDERS = [
  'build/guides',
];

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  pageTree: {
    transformers: [
      transformerOpenAPI(),
      {
        // Sort children alphabetically for specific folders
        folder(node: PageTree.Folder, folderPath: string): PageTree.Folder {
          if (ALPHABETICALLY_SORTED_FOLDERS.includes(folderPath)) {
            return {
              ...node,
              children: sortChildrenAlphabetically(node.children),
            };
          }
          return node;
        },
      },
    ],
  },
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return;
    }
    
    // Handle custom SVG/PNG icons
    if (typeof icon === 'string' && (icon.endsWith('.svg') || icon.endsWith('.png'))) {
      // Special handling for ar.io SDK icon - use theme-aware component
      if (icon === '/brand/ario-white.svg') {
        // Wrap in a span to provide a stable container that can help with key warnings
        return createElement('span', { 
          key: icon,
          style: { display: 'inline-flex', alignItems: 'center' }
        }, createElement(ThemeIcon, {
          lightSrc: '/brand/ario-black.svg',
          darkSrc: '/brand/ario-white.svg',
          alt: '',
          width: 16,
          height: 16,
          className: 'size-4'
        }));
      }
      
      // For other icons, use Image component directly
      // Wrap in a span to provide a stable container that can help with key warnings
      return createElement('span', { 
        key: icon,
        style: { display: 'inline-flex', alignItems: 'center' }
      }, createElement(Image, {
        src: icon,
        alt: '',
        width: 16,
        height: 16,
        className: 'size-4'
      }));
    }
    
    // Handle lucide-react icons
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});
