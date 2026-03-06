import type { NextConfig } from "next";

const isGithubPages = !!process.env.GITHUB_PAGES;

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  ...(isGithubPages && {
    output: "export",
    trailingSlash: true,
    basePath: "/spanish",
    assetPrefix: "/spanish/",
    env: {
      NEXT_PUBLIC_BASE_PATH: "/spanish",
    },
  }),
};

export default nextConfig;
