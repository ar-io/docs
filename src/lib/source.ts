import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import type { PageTree } from "fumadocs-core/server";
import { transformerOpenAPI } from 'fumadocs-openapi/server';
import { icons } from 'lucide-react';
import { createElement } from 'react';
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
    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons], { key: String(icon) });
    }
  },
});

/**
 * Drop `$ref` (each node's source-file path) from a page-tree node.
 *
 * `$ref` is build-time bookkeeping for `source.getNodePage()`/`getNodeMeta()`;
 * the UI never reads it. But the layout serializes the whole tree into every
 * exported page, so these paths cost ~22 KB per page across ~2,700 files, and
 * every Arweave deploy pays to upload whatever changes there.
 */
function withoutRefs<T extends PageTree.Node | PageTree.Root>(node: T): T {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { $ref, ...rest } = node as T & { $ref?: unknown };
  const out = { ...rest } as T;
  if ("children" in out) {
    (out as PageTree.Folder).children = out.children.map(withoutRefs);
  }
  if ("index" in out && out.index) {
    (out as PageTree.Folder).index = withoutRefs(out.index);
  }
  if ("fallback" in out && out.fallback) {
    (out as PageTree.Root).fallback = withoutRefs(out.fallback);
  }
  return out;
}

const sidebarTree = withoutRefs(source.pageTree);

/** First URL of a folder, in the order Fumadocs uses for a sidebar tab's link. */
function firstPage(folder: PageTree.Folder): PageTree.Item | undefined {
  if (folder.index) return folder.index;
  for (const child of folder.children) {
    if (child.type === "page" && !child.external) return child;
    if (child.type === "folder") {
      const page = firstPage(child);
      if (page) return page;
    }
  }
}

function containsUrl(
  folder: Pick<PageTree.Folder, "index" | "children">,
  url: string,
): boolean {
  if (folder.index?.url === url) return true;
  return folder.children.some((child) =>
    child.type === "page"
      ? child.url === url
      : child.type === "folder" && containsUrl(child, url),
  );
}

/**
 * A section reduced to what its sidebar tab needs: name, icon, description
 * and first URL (Fumadocs links the tab to its first page).
 */
function tabStub(folder: PageTree.Folder): PageTree.Folder {
  const first = firstPage(folder);
  return {
    ...folder,
    $id: `${folder.$id}:stub`,
    index: first === folder.index ? folder.index : undefined,
    children: first && first !== folder.index ? [first] : [],
  };
}

/**
 * The page tree for the sidebar of the page at `pathname`: its own section
 * (Learn, Build, SDKs, ...) in full, every other section as a tab stub.
 *
 * The sidebar only ever shows the active section, but the layout serializes
 * whatever tree it is given into every exported page. Handing it the whole
 * site meant ~100 KB of navigation in each of ~2,700 files, and any nav
 * change anywhere -- a new page, a renamed title -- rewrote every page and
 * re-uploaded the whole site to Arweave. Scoped like this, a nav change only
 * touches its own section.
 *
 * `fallback` (pages no `meta.json` lists) is dropped too: Fumadocs only
 * consults it for pages that are in it, and those get the whole tree.
 *
 * Each result gets its own `$id`: Fumadocs' TreeContextProvider memoizes on
 * `tree.$id`, so a shared id would keep the previous section's sidebar after
 * client-side navigation into another section.
 */
export function sidebarTreeFor(pathname: string): PageTree.Root {
  const active = sidebarTree.children.find(
    (node): node is PageTree.Folder =>
      node.type === "folder" && !!node.root && containsUrl(node, pathname),
  );
  if (!active) return sidebarTree;

  return {
    ...sidebarTree,
    $id: `${sidebarTree.$id}:${active.$id}`,
    children: sidebarTree.children.map((node) =>
      node === active || node.type !== "folder" || !node.root
        ? node
        : tabStub(node),
    ),
    fallback: undefined,
  };
}
