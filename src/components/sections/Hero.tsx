import Link from "next/link";
import Image from "next/image";
import { ArrowDownToLine, Handshake } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { ScrollHint } from "@/components/ScrollHint";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { RotatingWords } from "@/components/ui/rotating-words";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Hero({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-16 md:pb-0">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
      />

      <div className="mx-auto w-full max-w-6xl px-5">
        <Reveal immediate>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {ui.cta.availableForWork}
          </div>
        </Reveal>

        <Reveal immediate delay={0.05}>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Image src="/logo-rc.png" alt="Rabelo Co." width={120} height={50} loading="eager" fetchPriority="high" className="logo-adaptive h-10 w-auto md:h-14" />
            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              {profile.shortName.split(" ")[0]}{" "}
              <span className="text-gradient">{profile.shortName.split(" ").slice(1).join(" ")}</span>
            </h1>
          </div>
        </Reveal>

        {/* O que eu construo — linha rotativa, o peso visual do hero depois do nome */}
        <Reveal immediate delay={0.1}>
          <p className="mt-6 flex max-w-3xl flex-wrap items-baseline gap-x-3 font-display text-3xl font-semibold leading-tight tracking-tight text-muted md:text-5xl">
            <span>{ui.cta.iBuild}</span>
            <RotatingWords words={profile.builds.map((b) => b[locale])} wordClassName="text-gradient" />
            <span>{ui.cta.inProduction}</span>
          </p>
        </Reveal>

        <Reveal immediate delay={0.15}>
          <p className="mt-5 max-w-2xl text-base text-muted md:text-lg">{profile.role[locale]}</p>
        </Reveal>

        <Reveal immediate delay={0.2}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href={`/${locale}/servicos`}>
              <InteractiveHoverButton icon={<Handshake className="h-4 w-4" />}>
                {ui.cta.workTogether}
              </InteractiveHoverButton>
            </Link>
            <a href="/cv.pdf">
              <InteractiveHoverButton variant="outline" icon={<ArrowDownToLine className="h-4 w-4" />}>
                {ui.cta.recruiterCv}
              </InteractiveHoverButton>
            </a>
            <Link href={profile.contact.github} target="_blank">
              <InteractiveHoverButton variant="outline" icon={<GithubIcon className="h-4 w-4" />}>
                {profile.contact.githubHandle}
              </InteractiveHoverButton>
            </Link>
          </div>
        </Reveal>

        <Reveal immediate delay={0.28}>
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
