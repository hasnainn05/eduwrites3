import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-slot",
      "framer-motion",
      "recharts",
    ],
  },
  webpack: (config, { isServer }) => {
    // Optimize webpack build
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              filename: "vendor.js",
              test: /node_modules/,
              priority: 10,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
