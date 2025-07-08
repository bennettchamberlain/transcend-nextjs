import type { NextConfig } from "next";

export default {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "checkout.transcendcollective.la",
      },
    ],
  },
} satisfies NextConfig;
