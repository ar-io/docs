import { type Metadata } from 'next'
import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: 'ar.io Network Docs - %s',
    default: 'ar.io Network Docs',
  },
  icons: {
    icon: "https://arweave.net/IXl1JBlE_gsOaXGa6yE1eifPu7ekH-qSaGR9b5GU88Y"
  },
  description: "Documentation, guides, and other resources for ar.io developers and gateway operators.",
  openGraph: {
    title: {
      template: 'ar.io Network Docs - %s',
      default: 'ar.io Network Docs',
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
      template: 'ar.io Network Docs - %s',
      default: 'ar.io Network Docs',
    },
    site: '@ar_io_network',
    images: [
      {
        url: 'https://res.cloudinary.com/dopbvlqgc/image/upload/v1706802732/ario_v2nv53.png',
      },
    ],
  },
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
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
