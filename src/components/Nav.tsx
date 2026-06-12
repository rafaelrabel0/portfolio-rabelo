"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { otherLocale, type Locale } from "@/lib/i18n";
import { getUi } from "@/dictionaries/ui";

export function Nav({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: ui.nav.about },
    { href: "#experience", label: ui.nav.experience },
    { href: "#projects", label: ui.nav.projects },
    { href: "#showcase", label: ui.nav.showcase },
    { href: "#companies", label: ui.nav.companies },
    { href: "#skills", label: ui.nav.skills },
    { href: "#contact", label: ui.nav.contact },
  ];

  const swapLocale = otherLocale(locale);
  const targetPath = pathname.replace(`/${locale}`, `/${swapLocale}`) || `/${swapLocale}`;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href={`/${locale}`} className="font-display text-sm font-bold tracking-tight">
          <span className="text-gradient">Rabelo</span>
          <span className="text-muted"> Co.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </div>

        <Link
          href={targetPath}
          className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-fg"
        >
          {locale === "pt" ? "EN" : "PT"}
        </Link>
      </nav>
    </header>
  );
}
