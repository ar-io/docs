import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // Enable static export only for production builds
  output: process.env.NODE_ENV === "production" ? "export" : "standalone",
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, // required for static export + <Image>
  trailingSlash: false, // remove trailing slashes from URLs
};

export default withMDX(config);
