import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/ai-assistant',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
