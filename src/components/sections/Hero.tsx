import Link from "next/link";
import Image from "next/image";
import { ArrowDownToLine, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { ScrollHint } from "@/components/ScrollHint";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
      />

      <div className="mx-auto w-full max-w-6xl px-5">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {ui.cta.availableForWork}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Image src="/logo-rc.png" alt="Rabelo Co." width={120} height={50} priority className="logo-adaptive h-10 w-auto md:h-14" />
            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              {profile.shortName.split(" ")[0]}{" "}
              <span className="text-gradient">{profile.shortName.split(" ").slice(1).join(" ")}</span>
            </h1>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg text-muted md:text-xl">{profile.role[locale]}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-3 font-mono text-sm text-faint">
            <span className="text-accent">&gt;</span> {profile.headline[locale]}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="/cv.pdf"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
            >
              <ArrowDownToLine className="h-4 w-4" />
              {ui.cta.downloadCv}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface"
            >
              <Mail className="h-4 w-4" />
              {ui.cta.contact}
            </a>
            <Link
              href={profile.contact.github}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-fg"
            >
              <GithubIcon className="h-4 w-4" />
              {profile.contact.githubHandle}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {profile.stats.map((s) => (
              <div key={s.value} className="bg-surface p-5">
                <dt className="font-display text-3xl font-bold text-gradient">{s.value}</dt>
                <dd className="mt-1 text-xs text-muted">{s.label[locale]}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <ScrollHint label={ui.labels.scrollToExplore} />
    </section>
  );
}
