import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/work',
  assetPrefix: '/work/',
  trailingSlash: true,
};

export default nextConfig;
