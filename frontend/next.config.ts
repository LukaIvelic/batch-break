import { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://batch-break-production.up.railway.app/:path*",
      },
    ];
  },
};

export default nextConfig;
