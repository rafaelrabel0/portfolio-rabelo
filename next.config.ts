import type { NextConfig } from "next";

// CSP: 'unsafe-inline' em script-src é exigido pelos inline scripts do Next
// (tema, JSON-LD) sem infra de nonce; cal.com liberado para o embed da agenda;
// blob:/data: para previews de imagem e gravação de áudio do chat.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://app.cal.com https://cal.com",
  "style-src 'self' 'unsafe-inline' https://app.cal.com https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://*.cal.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.cal.com wss://*.cal.com",
  "frame-src https://app.cal.com https://cal.com",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=(), payment=(), usb=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
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
