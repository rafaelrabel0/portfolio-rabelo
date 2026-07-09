import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const ui = getUi(locale);
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-faint md:flex-row">
        <p className="flex items-center gap-2">
          <Image src="/logo-rc.png" alt="Rabelo Co." width={29} height={12} className="logo-adaptive h-3 w-auto opacity-70" />
          <span className="text-gradient font-display font-bold">Rabelo Co.</span> · {profile.name}
        </p>
        <p className="flex items-center gap-4 font-mono">
          <Link href={`/${locale}/privacidade`} className="transition-colors hover:text-fg">
            {ui.privacy.footerLink}
          </Link>
          <span>
            © {year} · {locale === "pt" ? "Construído com Next.js + Tailwind" : "Built with Next.js + Tailwind"}
          </span>
        </p>
      </div>
    </footer>
  );
}
