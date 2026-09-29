import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon, WhatsappIcon } from "@/components/icons";
import { BrandSignature } from "@/components/ui/brand-signature";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

// Rodapé com a marca em display grande e um brilho que atravessa o gradiente
// (.footer-wordmark, CSS). Antes era uma linha só de crédito; agora fecha a
// página com contato e navegação, que é o que alguém procura ao chegar no fim.

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const ui = getUi(locale);

  const waHref = `https://wa.me/${profile.contact.phone.replace(/\D/g, "")}`;

  const sections = [
    { href: `/${locale}#about`, label: ui.nav.about },
    { href: `/${locale}#experience`, label: ui.nav.experience },
    { href: `/${locale}#projects`, label: ui.nav.projects },
    { href: `/${locale}/projetos`, label: ui.sections.allProjectsTitle },
    { href: `/${locale}/servicos`, label: ui.nav.services },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">{profile.headline[locale]}</p>
            <p className="mt-4 font-mono text-xs text-faint">{profile.location[locale]}</p>
          </div>

          <nav aria-label={ui.nav.about} className="flex flex-col gap-2.5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {locale === "pt" ? "Navegar" : "Navigate"}
            </p>
            {sections.map((s) => (
              <Link key={s.href} href={s.href} className="text-sm text-muted transition-colors hover:text-fg">
                {s.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{ui.nav.contact}</p>
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              {profile.contact.email}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              <WhatsappIcon className="h-3.5 w-3.5" />
              {profile.contact.phone}
            </a>
            <Link
              href={profile.contact.github}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              {profile.contact.githubHandle}
            </Link>
            <a
              href="/cv.pdf"
              className="inline-flex items-center gap-1 text-sm text-cyan transition-colors hover:text-fg"
            >
              {ui.cta.downloadCv} <ArrowUpRight className="h-3 w-3" />
            </a>
            <Link
              href={`/${locale}/privacidade`}
              className="mt-1 text-xs text-faint transition-colors hover:text-muted"
            >
              {ui.privacy.footerLink}
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[11px] text-faint md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {profile.name}
          </span>
          <span>{locale === "pt" ? "Construído com Next.js + Tailwind" : "Built with Next.js + Tailwind"}</span>
        </div>
      </div>

      {/* Assinatura animada da marca (manual §6.7): faixa carvão nos dois temas,
          toca uma vez ao aparecer e para no quadro final. */}
      <BrandSignature className="border-t border-border" />
    </footer>
  );
}
