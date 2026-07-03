import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Propostas comerciais estáticas em public/proposta/<cliente>/index.html
      { source: "/proposta/vetlideres", destination: "/proposta/vetlideres/index.html" },
      { source: "/proposta/vetlideres/", destination: "/proposta/vetlideres/index.html" },
    ];
  },
};

export default nextConfig;
