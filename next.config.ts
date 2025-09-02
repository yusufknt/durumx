import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve images from public/ as-is; avoids optimizer/caching issues on Vercel
    unoptimized: true,
  },
  // Ensure static assets use correct base path in all environments
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined,
  // Tip: Next.js 15'te allowedDevOrigins henüz kararlı değil; kaldırıldı
};

export default nextConfig;
