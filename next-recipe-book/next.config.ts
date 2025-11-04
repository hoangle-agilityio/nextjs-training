import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_VERCEL_BLOB_HOSTNAME || "",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
