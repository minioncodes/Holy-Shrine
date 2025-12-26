import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep images open during build; tighten later.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
