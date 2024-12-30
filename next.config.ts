import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "maps.googleapis.com",
        protocol: "https",
      },
      {
        hostname: "fonts.googleapis.com",
        protocol: "https",
      },
      {
        hostname: "timphongtro.s3.ap-southeast-1.amazonaws.com",
        protocol: "https",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
}

export default nextConfig
