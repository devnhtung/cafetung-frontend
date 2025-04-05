import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["localhost", "quanly.cafetung.vn", "graph.facebook.com"],
  },
};

export default nextConfig;
