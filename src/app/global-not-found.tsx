// 404 própria (Processo Mestre 7.1). O layout raiz mora em [lang], então a
// página de "não encontrado" global não passa por ele: importa estilo e
// fontes por conta própria. Bilíngue porque não dá para saber o idioma de uma
// URL que não existe.

import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Geist, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Página não encontrada — deciban",
  description: "Esta página não existe. / This page does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        <div aria-hidden className="field" />
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-5">
          <p className="label">404 · deslocamento sem coincidência</p>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
            Nada encontrado aqui<span className="text-accent">.</span>
          </h1>
          <p className="mt-4 text-lg text-muted">
            As fitas não encaixaram: esta página não existe ou mudou de lugar.
            <br />
            <span className="text-faint">The tapes didn&apos;t line up: this page doesn&apos;t exist or has moved.</span>
          </p>
          <div className="mt-9 flex flex-wrap gap-2.5">
            <Link href="/pt" className="btn btn-solid">
              Portfólio
            </Link>
            <Link href="/pt/servicos" className="btn btn-line">
              deciban
            </Link>
            <Link href="/en" className="btn btn-ghost">
              English
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
