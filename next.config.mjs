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
  webpack: (config, { isServer, webpack }) => {
    config.plugins.push(new NodePolyfillPlugin())

    // AR.IO SDK specific configurations for client-side usage
    if (!isServer) {
      config.externals = config.externals || []

      // Add AR.IO SDK specific polyfills
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        path: 'path-browserify',
        os: 'os-browserify/browser',
        fs: false,
        net: false,
        tls: false,
      }

      // Configure webpack to handle AR.IO SDK properly
      config.module.rules.push({
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      })
    }

    // Fix chunk loading for GitHub Pages with basePath
    if (
      !isServer &&
      process.env.BASE_PATH &&
      process.env.NODE_ENV === 'production'
    ) {
      config.output.publicPath = `${process.env.BASE_PATH}/_next/`

      // More aggressive chunk separation for GitHub Pages
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        // Disable some optimizations that might cause conflicts
        sideEffects: false,
        usedExports: true,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 200000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            // Isolate AR.IO SDK into its own chunk
            arioSdk: {
              test: /[\\/]node_modules[\\/]@ar\.io[\\/]/,
              name: 'ario-sdk',
              chunks: 'async',
              priority: 20,
              minSize: 0,
              maxSize: 300000,
              reuseExistingChunk: false,
            },
            // Keep other vendor chunks small and separate
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // Generate chunk name based on package name
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                )?.[1]
                return `vendor-${packageName?.replace('@', '').replace('/', '-')}`
              },
              chunks: 'all',
              priority: 10,
              minSize: 10000,
              maxSize: 150000,
              reuseExistingChunk: false,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              maxSize: 150000,
              reuseExistingChunk: false,
            },
          },
        },
      }
    }

    return config
  },
}

export default withSearch(withMDX(nextConfig))
