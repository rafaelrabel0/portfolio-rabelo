import type { MetadataRoute } from "next";

// Manifest para o ícone instalado (Processo Mestre 7.1): nome curto cabe nos
// ~12 caracteres embaixo do ícone; fundo carvão, como a marca.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "deciban — Rafael Rabelo",
    short_name: "deciban",
    description: "Automações e sistemas com IA. Portfólio de Rafael Rabelo e serviços da deciban.",
    start_url: "/pt",
    display: "standalone",
    background_color: "#0B0908",
    theme_color: "#0B0908",
    icons: [
      { src: "/brand/icon-512-carvao.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
