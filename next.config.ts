import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable Next/Image optimizer and serve modern formats when supported
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },
  // Ensure static assets use correct base path in all environments
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
  // Tip: Next.js 15'te allowedDevOrigins henüz kararlı değil; kaldırıldı
};

export default nextConfig;
