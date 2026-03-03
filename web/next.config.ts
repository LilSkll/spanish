import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: process.env.GITHUB_PAGES ? false : true,
  output: "export",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_PAGES ? "/spanish" : "",
  assetPrefix: process.env.GITHUB_PAGES ? "/spanish/" : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.GITHUB_PAGES ? "/spanish" : "",
  },
};

export default nextConfig;
