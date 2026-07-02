"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { otherLocale, type Locale } from "@/lib/i18n";
import { getUi } from "@/dictionaries/ui";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav({ locale }: { locale: Locale }) {
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
        scrolled || open ? "border-b border-border bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href={`/${locale}`} className="flex items-center gap-2.5 font-display text-sm font-bold tracking-tight">
          <Image src="/logo-rc.png" alt="Rabelo Co." width={38} height={16} priority className="logo-adaptive h-4 w-auto transition-transform duration-300 hover:scale-105" />
          <span className="hidden sm:inline">
            <span className="text-gradient">Rabelo</span>
            <span className="text-muted"> Co.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href={targetPath}
            className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            {locale === "pt" ? "EN" : "PT"}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-fg md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
