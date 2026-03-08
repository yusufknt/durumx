import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable Next/Image optimizer and serve modern formats when supported
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    // Next.js 16 için gerekli: quality prop'ta kullanılan değerler
    qualities: [50, 75, 100],
  },
  // Ensure static assets use correct base path in all environments
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
  // LAN'dan erişim için (mobil cihaz, başka bilgisayar vb.)
  allowedDevOrigins: ["192.168.1.136"],
};

export default nextConfig;
