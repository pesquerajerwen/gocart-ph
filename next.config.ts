import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/**"),
      new URL(
        "https://eczxcsyefookjsrvpmcv.supabase.co/storage/v1/object/public/store_avatars/*"
      ),
      new URL(
        "https://eczxcsyefookjsrvpmcv.supabase.co/storage/v1/object/public/product_images/*"
      ),
      new URL(
        "https://eczxcsyefookjsrvpmcv.supabase.co/storage/v1/object/public/review_images/*"
      ),
    ],
  },
};

export default nextConfig;
