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

    // Add runtime chunk retry logic for production
    if (!isServer && process.env.NODE_ENV === 'production') {
      // Improve chunk loading resilience
      config.output = {
        ...config.output,
        crossOriginLoading: 'anonymous',
        // Add retry logic for failed chunk loads
        chunkLoadingGlobal: 'webpackChunkLoad',
      }

      // Add chunk loading retry plugin
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.CHUNK_RETRY_COUNT': JSON.stringify('3'),
        }),
      )
    }

    // Fix chunk loading for GitHub Pages with basePath
    if (
      !isServer &&
      process.env.BASE_PATH &&
      process.env.NODE_ENV === 'production'
    ) {
      config.output.publicPath = `${process.env.BASE_PATH}/_next/`

      // Improved chunk strategy for better reliability
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        sideEffects: false,
        usedExports: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 200000,
          minChunks: 1,
          maxAsyncRequests: 25,
          maxInitialRequests: 25,
          cacheGroups: {
            // Separate AR.IO SDK into its own chunk for better isolation
            arioSdk: {
              test: /[\\/]node_modules[\\/]@ar\.io[\\/]/,
              name: 'ario-sdk',
              chunks: 'async',
              priority: 20,
              reuseExistingChunk: true,
            },
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
              minSize: 20000,
              maxSize: 150000,
              reuseExistingChunk: true,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              maxSize: 150000,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    return config
  },
}

export default withSearch(withMDX(nextConfig))
