import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hcucvqwowppjxhjyaukg.supabase.co',
        pathname: '/storage/v1/object/public/blog-images/**',
      },
    ],
  },
};

export default nextConfig;
