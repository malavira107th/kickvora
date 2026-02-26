import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone for Vercel — Vercel handles this automatically,
  // but standalone is also useful for Docker/self-hosted setups.
  // For Vercel, the default output is fine; we just ensure no CDN rewrites.
  images: {
    // No external image domains — all assets are local
    unoptimized: false,
  },
  // Ensure environment variables are available at build time
  env: {
    NEXT_PUBLIC_APP_NAME: "Kickvora",
  },
};

export default nextConfig;
