import nextMDX from '@next/mdx'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.BASE_PATH || '',
  // Only set assetPrefix for GitHub Pages builds to fix chunk loading
  assetPrefix: process.env.BASE_PATH || '',
  trailingSlash: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '**/*': ['./src/app/**/*.mdx'],
  },
  // experimental: {
  //   disableRuntimeJS: true
  // },
  webpack: (config, { isServer }) => {
    config.plugins.push(new NodePolyfillPlugin())

    // Fix chunk loading for GitHub Pages with basePath
    if (
      !isServer &&
      process.env.BASE_PATH &&
      process.env.NODE_ENV === 'production'
    ) {
      config.output.publicPath = `${process.env.BASE_PATH}/_next/`

      // Additional optimizations for GitHub Pages
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      }
    }

    return config
  },
}

export default withSearch(withMDX(nextConfig))
