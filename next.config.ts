import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /about renamed to /om-oss (Swedish-slugged site). Permanent 308.
      { source: "/about", destination: "/om-oss", permanent: true },
    ];
  },
};

export default nextConfig;
