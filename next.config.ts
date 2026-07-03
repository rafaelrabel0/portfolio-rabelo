import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // proposta.rabelo.company → proposta ativa (VetLíderes)
      {
        source: "/",
        destination: "/proposta/vetlideres/index.html",
        has: [{ type: "host", value: "proposta.rabelo.company" }],
      },
      // Propostas comerciais estáticas em public/proposta/<cliente>/index.html
      { source: "/proposta/vetlideres", destination: "/proposta/vetlideres/index.html" },
      { source: "/proposta/vetlideres/", destination: "/proposta/vetlideres/index.html" },
    ];
  },
};

export default nextConfig;
