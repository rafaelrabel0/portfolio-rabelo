import Image from "next/image";
import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-faint md:flex-row">
        <p className="flex items-center gap-2">
          <Image src="/logo-rc.png" alt="Rabelo Co." width={29} height={12} className="h-3 w-auto opacity-70" />
          <span className="text-gradient font-display font-bold">Rabelo Co.</span> · {profile.name}
        </p>
        <p className="font-mono">
          © {year} · {locale === "pt" ? "Construído com Next.js + Tailwind" : "Built with Next.js + Tailwind"}
        </p>
      </div>
    </footer>
  );
}
