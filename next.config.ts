import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // すべてのホスト名を許可
      },
      {
        protocol: "http", // HTTPも許可する場合 (必要に応じて)
        hostname: "**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
