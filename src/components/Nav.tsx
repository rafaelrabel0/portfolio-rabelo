"use client";

// Navegação dos dois lados do site. No centro, as cenas do lado atual; à
// direita, o interruptor Portfólio ⇄ deciban (os dois "links" do site), tema e
// idioma. A barra de progresso do topo é o --sp do motor de cenas.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { getUi } from "@/dictionaries/ui";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandMark } from "@/components/ui/brand-mark";
import { LocaleToggle } from "@/components/ui/locale-toggle";

export type World = "portfolio" | "services";

export function Nav({ locale, world }: { locale: Locale; world: World }) {
  const ui = getUi(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = `/${locale}`;
  const svc = `/${locale}/servicos`;
  const base = world === "portfolio" ? home : svc;
  const links =
    world === "portfolio"
      ? [
          { id: "sobre", label: ui.nav.about },
          { id: "percurso", label: ui.nav.experience },
          { id: "projetos", label: ui.nav.projects },
          { id: "agentes", label: ui.nav.agents },
          { id: "skills", label: ui.nav.skills },
          { id: "contato", label: ui.nav.contact },
        ]
      : [
          { id: "frentes", label: ui.nav.fronts },
          { id: "deciban", label: ui.nav.company },
          { id: "processo", label: ui.nav.process },
          { id: "em-acao", label: ui.nav.demo },
          { id: "proposta", label: ui.nav.proposal },
          { id: "agenda", label: ui.nav.schedule },
          { id: "perguntas", label: ui.nav.faq },
        ];

  const hrefFor = (target: Locale) => pathname.replace(`/${locale}`, `/${target}`) || `/${target}`;

  return (
    <>
      <div aria-hidden className="top-progress" />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open ? "border-b border-border bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href={home} className="flex shrink-0 items-center transition-opacity hover:opacity-80" aria-label="deciban">
            <span className="hidden sm:inline-flex">
              <BrandMark variante="horizontal" height={20} priority />
            </span>
            <span className="inline-flex sm:hidden">
              <BrandMark variante="simbolo" height={20} priority />
            </span>
          </Link>

          <div className="hidden items-center gap-6 xl:flex">
            {links.map((l) => (
              <a key={l.id} href={`${base}#${l.id}`} className="text-[13px] text-muted transition-colors hover:text-fg">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div
              className="world"
              role="navigation"
              aria-label={ui.world.label}
              style={{ ["--w" as string]: world === "portfolio" ? 0 : 1 }}
            >
              <Link href={home} aria-current={world === "portfolio" ? "page" : undefined}>
                {ui.world.portfolio}
              </Link>
              <Link href={svc} aria-current={world === "services" ? "page" : undefined}>
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {ui.world.services}
              </Link>
            </div>
            <span className="hidden sm:contents">
              <ThemeToggle />
              <LocaleToggle locale={locale} hrefFor={hrefFor} />
            </span>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={ui.nav.menu}
              aria-expanded={open}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-fg xl:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <div data-open={open} className="mobile-menu xl:hidden">
          <div>
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-5 pt-2 sm:px-6">
              {links.map((l, i) => (
                <a
                  key={l.id}
                  href={`${base}#${l.id}`}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline gap-3 rounded-lg px-2 py-2.5 font-display text-xl text-muted transition-colors hover:text-fg"
                >
                  <span className="font-mono text-[10px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex items-center gap-2 border-t border-border px-2 pt-4 sm:hidden">
                <ThemeToggle />
                <LocaleToggle locale={locale} hrefFor={hrefFor} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
