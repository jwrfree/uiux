import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["https://*.cloudworkstations.dev"],
  images: {
    remotePatterns: [
      // Restaurant competitor logos used on the Metta case study.
      { protocol: "https", hostname: "logo.clearbit.com" },
      // Project card placeholder photos. Remove once real assets are in place.
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
