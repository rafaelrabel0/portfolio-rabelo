import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BrandIntro } from "@/components/motion/BrandIntro";
import { SceneHud } from "@/components/motion/SceneHud";
import { AgentSection } from "@/components/agent/AgentSection";
import { ServicesHero } from "@/components/services/Hero";
import { Fronts } from "@/components/services/Fronts";
import { NameScene } from "@/components/services/NameScene";
import { Process } from "@/components/services/Process";
import { Proposal } from "@/components/services/Proposal";
import { Schedule } from "@/components/services/Schedule";
import { Faq } from "@/components/services/Faq";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { getUi } from "@/dictionaries/ui";
import { isLocale, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

// Serviços — a apresentação da deciban, em cenas:
// abertura da marca → o que construímos → o nome e os valores → como
// funciona → um agente em ação → proposta → agenda → perguntas → rodapé.

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/servicos">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "pt";
  const title = locale === "pt" ? "deciban — automações e sistemas com IA" : "deciban — AI automations and systems";
  const description = services.hero.sub[locale];
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/servicos`, languages: { "pt-BR": "/pt/servicos", en: "/en/servicos" } },
    openGraph: { title, description, type: "website", url: `/${locale}/servicos`, siteName: "deciban", images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  };
}

const LIVE_CHAT = !!process.env.CHAT_WEBHOOK_URL;

export default async function ServicosPage({ params }: PageProps<"/[lang]/servicos">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const ui = getUi(lang);

  // JSON-LD (Processo Mestre 7.2): a empresa e as perguntas frequentes, com os
  // mesmos dados que aparecem na tela.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "deciban",
      description: services.hero.sub[lang],
      url: `${SITE_URL}/${lang}/servicos`,
      logo: `${SITE_URL}/brand/icon-512-carvao.png`,
      email: profile.contact.email,
      telephone: profile.contact.phone,
      founder: { "@type": "Person", name: profile.name },
      address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
      areaServed: ["BR", "Worldwide"],
      sameAs: [profile.contact.linkedin, profile.contact.github],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: services.faq.map((f) => ({
        "@type": "Question",
        name: f.q[lang],
        acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BrandIntro id="servicos" label={ui.intro.services} skipLabel={ui.intro.skip} />
      <Nav locale={lang} world="services" />
      <main>
        <ServicesHero locale={lang} />
        <Fronts locale={lang} />
        <NameScene locale={lang} />
        <Process locale={lang} />
        <AgentSection locale={lang} id="em-acao" index="04" variant="services" />
        <Proposal locale={lang} live={LIVE_CHAT} />

        <section id="agenda" data-chapter="agenda" className="relative scroll-mt-16 px-4 py-28 sm:px-6 md:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-r>
              <div>
                <p className="label mb-3 flex items-center gap-3">
                  <span className="text-accent">06</span> {ui.services.scheduleLabel}
                </p>
                <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">{ui.services.scheduleTitle}</h2>
                <p className="mt-4 max-w-xl text-base text-muted md:text-lg">{ui.services.scheduleSub}</p>
              </div>
              <a href={`mailto:${profile.contact.email}`} className="btn btn-line">
                <Mail className="h-4 w-4" /> {ui.services.emailInstead}
              </a>
            </div>
            <div data-r>
              <Schedule locale={lang} />
            </div>
          </div>
        </section>

        <Faq locale={lang} />
      </main>
      <Footer locale={lang} world="services" />
      <SceneHud
        chapters={[
          { id: "frentes", label: ui.nav.fronts },
          { id: "deciban", label: ui.nav.company },
          { id: "processo", label: ui.nav.process },
          { id: "em-acao", label: ui.nav.demo },
          { id: "proposta", label: ui.nav.proposal },
          { id: "agenda", label: ui.nav.schedule },
          { id: "perguntas", label: ui.nav.faq },
        ]}
      />
    </>
  );
}
