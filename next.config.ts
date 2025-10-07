import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://lh3.googleusercontent.com/**"),
      new URL(
        "https://eczxcsyefookjsrvpmcv.supabase.co/storage/v1/object/public/store_avatars/*"
      ),
    ],
  },
};

export default nextConfig;
