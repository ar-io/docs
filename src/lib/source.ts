import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { transformerOpenAPI } from 'fumadocs-openapi/server';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import Image from 'next/image';
import { ThemeIcon } from '@/components/theme-icon';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
  pageTree: {
    transformers: [transformerOpenAPI()],
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
