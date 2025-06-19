import { type Metadata, type Viewport } from 'next'
import glob from 'fast-glob'
import Script from 'next/script'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'

import '@/styles/tailwind.css'
import '@/styles/custom.css'

export const metadata: Metadata = {
  title: {
    template: 'AR.IO Network Docs - %s',
    default: 'AR.IO Network Docs',
  },
  icons: {
    icon: 'https://arweave.net/IXl1JBlE_gsOaXGa6yE1eifPu7ekH-qSaGR9b5GU88Y',
  },
  description:
    'Documentation, guides, and other resources for AR.IO developers and gateway operators.',
  openGraph: {
    title: {
      template: 'AR.IO Network Docs - %s',
      default: 'AR.IO Network Docs',
    },
    images: [
      {
        url: 'https://res.cloudinary.com/dopbvlqgc/image/upload/v1706802732/ario_v2nv53.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: 'AR.IO Network Docs - %s',
      default: 'AR.IO Network Docs',
    },
    site: '@ar_io_network',
    images: [
      {
        url: 'https://res.cloudinary.com/dopbvlqgc/image/upload/v1706802732/ario_v2nv53.png',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        {/* Add chunk loading retry logic for production */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            id="chunk-retry"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                // Chunk loading retry logic
                (function() {
                  const originalOnload = window.onload;
                  const retryCount = 3;
                  const retryDelay = 1000;
                  
                  // Handle chunk loading errors
                  window.addEventListener('error', function(e) {
                    const target = e.target || e.srcElement;
                    const isChunkLoadError = target && (
                      (target.tagName === 'SCRIPT' && target.src) ||
                      (target.tagName === 'LINK' && target.href && target.rel === 'stylesheet')
                    );
                    
                    if (isChunkLoadError) {
                      console.warn('Chunk load error detected:', target.src || target.href);
                      
                      // Retry loading the chunk
                      let attempts = parseInt(sessionStorage.getItem('chunk-retry-' + (target.src || target.href)) || '0');
                      
                      if (attempts < retryCount) {
                        attempts++;
                        sessionStorage.setItem('chunk-retry-' + (target.src || target.href), attempts.toString());
                        
                        setTimeout(() => {
                          if (target.tagName === 'SCRIPT') {
                            const newScript = document.createElement('script');
                            newScript.src = target.src;
                            newScript.async = target.async;
                            newScript.defer = target.defer;
                            target.parentNode.replaceChild(newScript, target);
                          } else if (target.tagName === 'LINK') {
                            const newLink = document.createElement('link');
                            newLink.href = target.href;
                            newLink.rel = target.rel;
                            newLink.type = target.type;
                            target.parentNode.replaceChild(newLink, target);
                          }
                        }, retryDelay * attempts);
                      } else {
                        console.error('Failed to load chunk after', retryCount, 'attempts:', target.src || target.href);
                      }
                    }
                  }, true);
                })();
              `,
            }}
          />
        )}
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
