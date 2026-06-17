import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScrollProgress } from "@/components/ScrollProgress";

const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "pt";
  const title = `${profile.shortName} — ${profile.role[locale]}`;
  const description = profile.summary[locale];
  return {
    metadataBase: new URL("https://rabelo.company"),
    alternates: { canonical: `/${locale}`, languages: { "pt-BR": "/pt", en: "/en" } },
    title,
    description,
    keywords: [
      "Rafael Rabelo", "Rabelo Co", "AI Automation Engineer", "Engenheiro de IA",
      "AI Agents", "n8n", "RAG", "Supabase pgvector", "LLM", "Next.js",
      "automação de workflows", "prompt engineering", "AI engineer Brazil",
    ],
    authors: [{ name: profile.name }],
    openGraph: { title, description, type: "website", locale: locale === "pt" ? "pt_BR" : "en_US", url: `/${locale}`, siteName: "Rabelo Co.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rabelo Co. — AI agents & automation that turn into revenue" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang === "pt" ? "pt-BR" : "en"} className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.dataset.theme="light"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <AnimatedBackground />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
