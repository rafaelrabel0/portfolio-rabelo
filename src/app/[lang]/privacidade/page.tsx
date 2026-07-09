import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { privacy } from "@/content/privacy";
import { getUi } from "@/dictionaries/ui";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/privacidade">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "pt";
  const title = locale === "pt" ? "Política de Privacidade — Rabelo Co." : "Privacy Policy — Rabelo Co.";
  const description = privacy.intro[locale].slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/privacidade`, languages: { "pt-BR": "/pt/privacidade", en: "/en/privacidade" } },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacidadePage({ params }: PageProps<"/[lang]/privacidade">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const ui = getUi(lang);
  const fmt = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", { dateStyle: "long", timeZone: "UTC" });

  return (
    <>
      <Nav locale={lang} />
      <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-32">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          <ShieldCheck className="h-4 w-4" /> {ui.privacy.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">{ui.privacy.title}</h1>
        <p className="mt-3 font-mono text-xs text-faint">
          {ui.privacy.updatedLabel}: {fmt.format(new Date(`${privacy.updated}T00:00:00Z`))}
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted">{privacy.intro[lang]}</p>

        <div className="mt-12 space-y-10">
          {privacy.sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display text-lg font-semibold tracking-tight">{s.title[lang]}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="mt-3 text-sm leading-relaxed text-muted">
                  {p[lang]}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-border pt-8">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" /> {ui.privacy.backHome}
          </Link>
          <a href="mailto:rafael@rabelo.company?subject=LGPD" className="text-sm text-cyan transition-colors hover:text-fg">
            rafael@rabelo.company
          </a>
        </div>
      </main>
      <Footer locale={lang} />
    </>
  );
}
