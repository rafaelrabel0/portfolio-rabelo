"use client";

// Rodapé: a assinatura animada da deciban num bloco carvão e, ao lado, os
// contatos aparecendo em sequência enquanto as fitas se encaixam. Fecha com
// navegação, localização, CNPJ e os botões de contato.

import { useState } from "react";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/icons";
import { BrandSignature } from "@/components/ui/brand-signature";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";
import type { World } from "@/components/Nav";

export function Footer({ locale, world }: { locale: Locale; world: World }) {
  const ui = getUi(locale);
  const [play, setPlay] = useState(false);
  const year = new Date().getFullYear();
  const c = profile.contact;
  const wa = `https://wa.me/${c.phone.replace(/\D/g, "")}`;

  const contacts = [
    { href: `mailto:${c.email}`, label: c.email, sub: "e-mail", icon: <Mail className="h-4 w-4" /> },
    { href: wa, label: c.phone, sub: "WhatsApp", icon: <WhatsappIcon className="h-4 w-4" />, ext: true },
    { href: c.linkedin, label: c.linkedinHandle, sub: "LinkedIn", icon: <LinkedinIcon className="h-4 w-4" />, ext: true },
    { href: c.github, label: c.githubHandle, sub: "GitHub", icon: <GithubIcon className="h-4 w-4" />, ext: true },
  ];

  const nav =
    world === "portfolio"
      ? [
          { href: `/${locale}#sobre`, label: ui.nav.about },
          { href: `/${locale}#percurso`, label: ui.nav.experience },
          { href: `/${locale}#projetos`, label: ui.nav.projects },
          { href: `/${locale}/projetos`, label: ui.projects.allTitle },
          { href: `/${locale}/servicos`, label: ui.nav.services },
        ]
      : [
          { href: `/${locale}/servicos#frentes`, label: ui.nav.fronts },
          { href: `/${locale}/servicos#processo`, label: ui.nav.process },
          { href: `/${locale}/servicos#proposta`, label: ui.nav.proposal },
          { href: `/${locale}/servicos#agenda`, label: ui.nav.schedule },
          { href: `/${locale}`, label: ui.world.portfolio },
        ];

  return (
    <footer className="relative mt-10 border-t border-border" data-play={play}>
      <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <BrandSignature
          label="made by"
          onStart={() => setPlay(true)}
          canvasClassName="h-[260px] sm:h-[320px] lg:h-full lg:min-h-[420px]"
          className="relative"
        />

        <div className="flex flex-col justify-between gap-10 px-5 py-12 sm:px-8 lg:px-12">
          <ul className="grid gap-1">
            {contacts.map((k, i) => (
              <li key={k.sub} className="foot-in" style={{ ["--d" as string]: `${2.9 + i * 0.32}s` }}>
                <a
                  href={k.href}
                  {...(k.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center gap-4 border-b border-border py-3.5 transition-colors hover:border-border-strong"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors group-hover:border-accent/50 group-hover:text-accent">
                    {k.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="label block">{k.sub}</span>
                    <span className="block truncate font-display text-lg text-fg sm:text-xl">{k.label}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </a>
              </li>
            ))}
          </ul>

          <div className="foot-in grid gap-8 sm:grid-cols-[1fr_1fr_auto]" style={{ ["--d" as string]: "4.3s" }}>
            <nav aria-label={ui.footer.navigate} className="flex flex-col gap-2">
              <p className="label">{ui.footer.navigate}</p>
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="w-fit text-sm text-muted transition-colors hover:text-fg">
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <p className="label">{ui.footer.company}</p>
              <p className="text-fg">deciban</p>
              <p>{profile.business.city[locale]}</p>
              <p className="text-faint">{profile.business.reach[locale]}</p>
              <p className="font-mono text-xs text-faint">
                {ui.footer.cnpj} {profile.business.cnpj}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
              >
                <ArrowDownToLine className="h-4 w-4" /> {ui.cta.downloadCv}
              </a>
              <Link href={`/${locale}/privacidade`} className="px-1 text-xs text-faint transition-colors hover:text-muted">
                {ui.privacy.footerLink}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border px-5 py-5 font-mono text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>
          © {year} deciban · {profile.name}
        </span>
        <span>{ui.footer.built}</span>
      </div>
    </footer>
  );
}
