import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarClock, Handshake, Sparkles } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { ClientCard } from "@/components/ui/client-card";
import { CopyButton } from "@/components/ui/copy-button";
import { Faq } from "@/components/ui/faq";
import { HoverPreviewLink } from "@/components/ui/hover-preview";
import { HowItWorks } from "@/components/ui/how-it-works";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Marquee } from "@/components/ui/marquee";
import { Popover } from "@/components/ui/popover";
import { RotatingWords } from "@/components/ui/rotating-words";
import { Timeline } from "@/components/ui/timeline";
import { getUi } from "@/dictionaries/ui";
import { isLocale, type Locale } from "@/lib/i18n";

// Catálogo do kit: o mesmo modelo do brainless — os componentes viram itens de
// registry servidos em /r/*.json, e esta página é a vitrine. Cada item mostra o
// componente rodando de verdade (não print) e o comando de instalação.

type Item = {
  name: string;
  title: string;
  description: string;
  files: number;
  dependsOn: string[];
};

function readRegistry(): { items: Item[] } {
  // Lido em build time do arquivo que o registry:build gera.
  const path = join(process.cwd(), "public", "r", "index.json");
  return JSON.parse(readFileSync(path, "utf8"));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/kit">): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "pt";
  const t = copy[locale];

  return {
    metadataBase: new URL("https://rabelo.company"),
    alternates: { canonical: `/${locale}/kit`, languages: { "pt-BR": "/pt/kit", en: "/en/kit" } },
    title: `${t.title} — Rabelo Co.`,
    description: t.subtitle,
    openGraph: {
      title: `${t.title} — Rabelo Co.`,
      description: t.subtitle,
      type: "website",
      url: `/${locale}/kit`,
      siteName: "Rabelo Co.",
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
  };
}

const copy = {
  pt: {
    eyebrow: "Kit",
    title: "Kit Rabelo Co.",
    subtitle:
      "Os componentes que assinam a identidade, publicados como registry. Instale num projeto novo e a interface já nasce com a marca — tokens, CSS e comportamento junto.",
    installTitle: "Instalar",
    installLead: "Registre o namespace uma vez e depois adicione o que precisar:",
    itemLead: "Ou item a item:",
    previewLabel: "Rodando de verdade nesta página",
    depsLabel: "Depende de",
    filesLabel: "arquivo(s)",
    back: "Voltar ao início",
    note: "Registry é copy-paste: o código entra no seu repositório e passa a ser seu. Nada aqui vira dependência de runtime.",
  },
  en: {
    eyebrow: "Kit",
    title: "Rabelo Co. Kit",
    subtitle:
      "The components that carry the identity, published as a registry. Install on a new project and the interface is already on brand — tokens, CSS and behavior included.",
    installTitle: "Install",
    installLead: "Register the namespace once, then add whatever you need:",
    itemLead: "Or one by one:",
    previewLabel: "Actually running on this page",
    depsLabel: "Depends on",
    filesLabel: "file(s)",
    back: "Back to home",
    note: "A registry is copy-paste: the code lands in your repository and becomes yours. Nothing here becomes a runtime dependency.",
  },
} as const;

export default async function KitPage({ params }: PageProps<"/[lang]/kit">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = copy[lang];
  const ui = getUi(lang);
  const { items } = readRegistry();

  return (
    <>
      <Nav locale={lang} />
      <main className="pt-16">
        <Section>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

          <Reveal>
            <div className="max-w-3xl rounded-2xl border border-border bg-surface/40 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{t.installTitle}</p>
              <p className="mt-3 text-sm text-muted">{t.installLead}</p>
              <Command value='npx shadcn@latest registry add @rabelo=https://rabelo.company/r/{name}.json' />
              <Command value="npx shadcn@latest add @rabelo/interactive-hover-button" />
              <p className="mt-5 text-xs text-faint">{t.note}</p>
            </div>
          </Reveal>

          <div className="mt-12 space-y-5">
            {items.map((item, i) => (
              <Reveal key={item.name} delay={(i % 3) * 0.05}>
                <article className="overflow-hidden rounded-2xl border border-border bg-surface/40">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5 md:p-6">
                    <div className="min-w-0 max-w-2xl">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h2 className="font-display text-lg font-bold tracking-tight">{item.title}</h2>
                        <code className="font-mono text-xs text-accent">@rabelo/{item.name}</code>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                        {item.files} {t.filesLabel}
                        {item.dependsOn.length > 0 && ` · ${t.depsLabel} ${item.dependsOn.join(", ")}`}
                      </p>
                    </div>
                    <CopyButton
                      value={`npx shadcn@latest add @rabelo/${item.name}`}
                      label={`Copiar comando de ${item.name}`}
                    />
                  </div>

                  <div className="relative overflow-hidden bg-bg/40 px-5 py-8 md:px-6">
                    <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                      {t.previewLabel}
                    </p>
                    <Preview name={item.name} locale={lang} ui={ui} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" /> {t.back}
            </Link>
          </div>
        </Section>
      </main>
      <Footer locale={lang} />
    </>
  );
}

function Command({ value }: { value: string }) {
  return (
    <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-bg/60 px-3 py-2.5">
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-pre font-mono text-xs text-fg/90">{value}</code>
      <CopyButton value={value} label="Copiar comando" />
    </div>
  );
}

/** Cada item rodando com um exemplo mínimo. */
function Preview({
  name,
  locale,
  ui,
}: {
  name: string;
  locale: Locale;
  ui: ReturnType<typeof getUi>;
}) {
  switch (name) {
    case "ember-theme":
      return (
        <div className="flex flex-wrap gap-3">
          {[
            ["bg", "--color-bg"],
            ["surface", "--color-surface"],
            ["border", "--color-border"],
            ["fg", "--color-fg"],
            ["muted", "--color-muted"],
            ["accent", "--color-accent"],
            ["accent-2", "--color-accent-2"],
          ].map(([label, token]) => (
            <div key={token} className="w-24">
              <div
                className="h-14 w-full rounded-xl border border-border"
                style={{ background: `var(${token})` }}
              />
              <p className="mt-1.5 font-mono text-[10px] text-faint">{label}</p>
            </div>
          ))}
        </div>
      );

    case "interactive-hover-button":
      return (
        <div className="flex flex-wrap gap-3">
          <InteractiveHoverButton icon={<Handshake className="h-4 w-4" />}>
            {ui.cta.workTogether}
          </InteractiveHoverButton>
          <InteractiveHoverButton variant="outline" icon={<CalendarClock className="h-4 w-4" />}>
            {ui.cta.scheduleCall}
          </InteractiveHoverButton>
        </div>
      );

    case "marquee":
      return (
        <div className="-mx-5 md:-mx-6">
          <Marquee duration={30} gap={12} repeat={3}>
            {["n8n", "Claude", "OpenAI", "Supabase", "Next.js", "React", "TypeScript", "Python"].map((tool) => (
              <span
                key={tool}
                className="whitespace-nowrap rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-sm text-muted"
              >
                {tool}
              </span>
            ))}
          </Marquee>
        </div>
      );

    case "hover-preview":
      // <div>, não <p>: o HoverPreviewLink renderiza o card como <div>, e um
      // <div> dentro de <p> faz o parser fechar o parágrafo — a árvore do
      // cliente sai diferente da do servidor e a hidratação falha.
      return (
        <div className="max-w-xl text-base text-muted">
          {locale === "pt" ? "Aponte para " : "Point at "}
          <HoverPreviewLink
            preview={{
              image: "/projects/face-finder.webp",
              title: "Face Finder",
              subtitle:
                locale === "pt"
                  ? "Uma selfie devolve todas as suas fotos do evento"
                  : "One selfie returns every photo you appear in",
            }}
          >
            Face Finder
          </HoverPreviewLink>
          {locale === "pt" ? " e o print aparece seguindo o cursor." : " and the screenshot follows your cursor."}
        </div>
      );

    case "rotating-words":
      return (
        <p className="flex flex-wrap items-baseline gap-x-3 font-display text-2xl font-semibold tracking-tight text-muted md:text-4xl">
          <span>{ui.cta.iBuild}</span>
          <RotatingWords
            words={
              locale === "pt"
                ? ["agentes de IA", "automação de CRM", "web apps de IA"]
                : ["AI agents", "CRM automation", "AI web apps"]
            }
            wordClassName="text-gradient"
          />
        </p>
      );

    case "popover":
      return (
        <div className="relative flex min-h-[150px] items-end justify-center pb-2">
          <Popover open title={locale === "pt" ? "Mudança de contexto" : "Context change"}>
            {locale === "pt"
              ? "Fica preso ao elemento, avisa e some. Não é modal: dá para continuar usando o que está embaixo."
              : "Anchored to the element, it warns and leaves. Not a modal: you keep using what's underneath."}
          </Popover>
          <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
            {locale === "pt" ? "elemento âncora" : "anchor element"}
          </span>
        </div>
      );

    case "faq":
      return (
        <div className="max-w-2xl">
          <Faq
            entries={
              locale === "pt"
                ? [
                    { q: "Abre sem JavaScript?", a: "Abre. É details/summary nativo com a altura animada em CSS." },
                    { q: "E no teclado?", a: "Funciona de graça: o summary já é focável e responde a Enter e Espaço." },
                  ]
                : [
                    { q: "Does it open without JavaScript?", a: "It does. Native details/summary with the height animated in CSS." },
                    { q: "What about the keyboard?", a: "Free of charge: summary is focusable and answers Enter and Space." },
                  ]
            }
          />
        </div>
      );

    case "how-it-works":
      return (
        <HowItWorks
          steps={
            locale === "pt"
              ? [
                  { title: "Diagnóstico", desc: "Onde o processo vaza hoje e quanto isso custa por mês." },
                  { title: "Desenho", desc: "O fluxo desenhado antes de qualquer nó no n8n." },
                  { title: "Produção", desc: "Sobe com monitoramento e handoff humano desde o primeiro dia." },
                ]
              : [
                  { title: "Diagnosis", desc: "Where the process leaks today and what that costs per month." },
                  { title: "Design", desc: "The flow drawn before a single n8n node exists." },
                  { title: "Production", desc: "Ships with monitoring and human handoff from day one." },
                ]
          }
        />
      );

    case "timeline":
      return (
        <Timeline
          entries={
            locale === "pt"
              ? [
                  {
                    label: "Abr 2025",
                    title: "Primeiros agentes em produção",
                    content: <p className="text-sm text-muted">Claude e GPT ligados ao WhatsApp, com handoff humano.</p>,
                  },
                  {
                    label: "2026",
                    title: "Plataformas SaaS",
                    content: <p className="text-sm text-muted">Aprovação e publicação de conteúdo, CRM multi-tenant.</p>,
                  },
                ]
              : [
                  {
                    label: "Apr 2025",
                    title: "First agents in production",
                    content: <p className="text-sm text-muted">Claude and GPT wired into WhatsApp, with human handoff.</p>,
                  },
                  {
                    label: "2026",
                    title: "SaaS platforms",
                    content: <p className="text-sm text-muted">Content approval and publishing, multi-tenant CRM.</p>,
                  },
                ]
          }
        />
      );

    case "client-card":
      return (
        <div className="max-w-sm">
          <ClientCard
            name="Ativos Digitais"
            focus={locale === "pt" ? "Marketing digital e IA para PMEs" : "Digital marketing and AI for SMBs"}
            meta={locale === "pt" ? "3× agente de IA · 1× dashboard" : "3× AI agent · 1× dashboard"}
            overlayTitle={
              <>
                <Sparkles className="h-3 w-3" />
                {ui.labels.improved}
              </>
            }
            overlay={
              <p className="text-sm leading-relaxed text-fg/85">
                {locale === "pt"
                  ? "Lead que chegava de madrugada passou a ser atendido na hora, já registrado no CRM."
                  : "Leads arriving at 3 a.m. started getting answered on the spot, already logged in the CRM."}
              </p>
            }
          >
            <div className="flex flex-wrap gap-1.5">
              {["n8n", "Kommo", "Evolution API"].map((s) => (
                <span key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-faint">
                  {s}
                </span>
              ))}
            </div>
          </ClientCard>
        </div>
      );

    default:
      return null;
  }
}
