import path from "node:path";
import type { NextConfig } from "next";

// CSP: 'unsafe-inline' em script-src é exigido pelos inline scripts do Next
// (tema, abertura, JSON-LD) sem infra de nonce. Sem terceiros desde 01/10/2026:
// a agenda é própria (o Cal.com saiu). blob:/data: para previews de imagem e
// gravação de áudio do chat.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self'",
  "frame-src 'none'",
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
  // Isola o browsing context de janelas abertas por terceiros. allow-popups
  // porque links externos (Google Agenda, projetos) abrem em nova aba.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig: NextConfig = {
  // Turbopack inferia a raiz no diretorio do usuario por causa de outro lockfile.
  turbopack: { root: path.join(__dirname) },
  images: {
    // AVIF primeiro, WebP como fallback; o header Accept do browser decide.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    minimumCacheTTL: 2678400, // 31 dias - assets locais versionados por deploy
  },
  experimental: {
    // 404 propria: o layout raiz e dinamico ([lang]), entao a pagina de nao
    // encontrado precisa ser global (app/global-not-found.tsx).
    globalNotFound: true,
    // Tailwind e atomico: inlinar o CSS no <head> corta um round-trip render-blocking.
    inlineCss: true,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    // deciban.com.br é o endereço do site desde 02/10/2026. O domínio antigo e
    // o www redirecionam com o caminho junto; proposta.rabelo.company não entra
    // aqui (outro host, continua servindo as propostas). A raiz tem regra
    // própria: "/:path*" vazio gerava "https://deciban.com.br//".
    const hosts = ["rabelo.company", "www.rabelo.company", "www.deciban.com.br"];
    return hosts.flatMap((host) => [
      { source: "/", has: [{ type: "host" as const, value: host }], destination: "https://deciban.com.br/", permanent: true },
      { source: "/:path+", has: [{ type: "host" as const, value: host }], destination: "https://deciban.com.br/:path+", permanent: true },
    ]);
  },
  async rewrites() {
    return [
      // proposta.rabelo.company → proposta ativa (VetLíderes)
      {
        source: "/",
        destination: "/proposta/vetlideres/index.html",
        has: [{ type: "host", value: "proposta.rabelo.company" }],
      },
      // Propostas comerciais estáticas em public/proposta/<cliente>/index.html.
      // Genérico: cada nova proposta só precisa da pasta em public/, sem mexer aqui.
      { source: "/proposta/:cliente", destination: "/proposta/:cliente/index.html" },
      { source: "/proposta/:cliente/", destination: "/proposta/:cliente/index.html" },
    ];
  },
};

export default nextConfig;
