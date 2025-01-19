import nextMDX from '@next/mdx'

import { recmaPlugins } from './src/mdx/recma.mjs'
import { rehypePlugins } from './src/mdx/rehype.mjs'
import { remarkPlugins } from './src/mdx/remark.mjs'
import withSearch from './src/mdx/search.mjs'

import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.BASE_PATH || "",
  trailingSlash: false,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
   outputFileTracingIncludes: {
      '**/*': ['./src/app/**/*.mdx'],
  },
  // experimental: {
  //   disableRuntimeJS: true
  // },
  webpack: (config) => {
    config.plugins.push(new NodePolyfillPlugin());
    return config;
  },
}

export default withSearch(withMDX(nextConfig))
