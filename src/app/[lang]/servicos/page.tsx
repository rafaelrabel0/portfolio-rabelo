import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CalendarClock, Check, FileText } from "lucide-react";
import { WhatsappIcon } from "@/components/icons";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ShowcaseStage } from "@/components/showcase/ShowcaseStage";
import { ProposalForm } from "@/components/services/ProposalForm";
import { CalEmbed } from "@/components/services/CalEmbed";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { getUi } from "@/dictionaries/ui";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/servicos">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "pt";
  const title = locale === "pt" ? "Serviços — Rabelo Co." : "Services — Rabelo Co.";
  const description = services.hero.subtitle[locale];
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/servicos`, languages: { "pt-BR": "/pt/servicos", en: "/en/servicos" } },
    openGraph: { title, description, type: "website", url: `/${locale}/servicos`, siteName: "Rabelo Co.", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  };
}

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK;

export default async function ServicosPage({ params }: PageProps<"/[lang]/servicos">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const ui = getUi(lang);
  const waHref = `https://wa.me/${profile.contact.phone.replace(/\D/g, "")}`;

  return (
    <>
      <Nav locale={lang} />
      <main>
        {/* Hero comercial */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-24">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
            style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
          />
          <div className="mx-auto w-full max-w-6xl px-5 py-12">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{ui.services.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
                {services.hero.title[lang]}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-lg text-muted">{services.hero.subtitle[lang]}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#proposta"
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
                >
                  <FileText className="h-4 w-4" /> {ui.cta.requestProposal}
                </a>
                <a
                  href="#agenda"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface"
                >
                  <CalendarClock className="h-4 w-4" /> {ui.cta.scheduleCall}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-fg"
                >
                  <WhatsappIcon className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-10 text-sm text-faint">
                {ui.services.recruiterNote}{" "}
                <Link href={`/${lang}`} className="inline-flex items-center gap-1 text-cyan transition-colors hover:text-fg">
                  {ui.services.recruiterLink} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pacotes */}
        <Section id="pacotes">
          <SectionHeader eyebrow="01" title={ui.services.packagesTitle} subtitle={ui.services.packagesSubtitle} />
          <div className="grid gap-5 md:grid-cols-3">
            {services.packages.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <article
                  className={`flex h-full flex-col rounded-2xl border p-6 transition-all hover:border-border-strong ${
                    p.featured ? "glow border-accent/30 bg-surface/80" : "border-border bg-surface/50"
                  }`}
                >
                  <h3 className="font-display text-lg font-semibold">{p.name[lang]}</h3>
                  <p className="mt-2 text-sm text-muted">{p.tagline[lang]}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {p.items.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm text-fg/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {item[lang]}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted">{s}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Processo */}
        <Section id="processo">
          <SectionHeader eyebrow="02" title={ui.services.processTitle} subtitle={ui.services.processSubtitle} />
          <div className="grid gap-5 md:grid-cols-4">
            {services.process.map((step, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-surface/50 p-6">
                  <span className="font-display text-3xl font-bold text-gradient">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-base font-semibold">{step.title[lang]}</h3>
                  <p className="mt-2 text-sm text-muted">{step.desc[lang]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Demo interativa */}
        <Section id="demo">
          <SectionHeader eyebrow="03" title={ui.services.demoTitle} subtitle={ui.services.demoSubtitle} />
          <Reveal>
            <ShowcaseStage locale={lang} ctaHref="#proposta" />
          </Reveal>
        </Section>

        {/* Solicitar proposta */}
        <Section id="proposta">
          <SectionHeader eyebrow="04" title={ui.services.proposalTitle} subtitle={ui.services.proposalSubtitle} />
          <div className="max-w-2xl">
            <ProposalForm locale={lang} />
          </div>
        </Section>

        {/* Agenda */}
        <Section id="agenda">
          <SectionHeader eyebrow="05" title={ui.services.agendaTitle} subtitle={ui.services.agendaSubtitle} />
          {CAL_LINK ? (
            <Reveal>
              <CalEmbed calLink={CAL_LINK} />
            </Reveal>
          ) : (
            <Reveal>
              <div className="glow flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface/60 p-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm text-muted">{ui.services.agendaFallback}</p>
                <a
                  href={waHref}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
                >
                  <WhatsappIcon className="h-4 w-4" /> {ui.proposal.whatsappCta}
                </a>
              </div>
            </Reveal>
          )}
        </Section>

        {/* FAQ */}
        <Section id="faq">
          <SectionHeader eyebrow="06" title={ui.services.faqTitle} />
          <div className="max-w-3xl space-y-3">
            {services.faq.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group rounded-2xl border border-border bg-surface/50 px-5 py-4 transition-colors hover:border-border-strong">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q[lang]}
                    <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-muted">{f.a[lang]}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Section>
      </main>
      <Footer locale={lang} />
    </>
  );
}
