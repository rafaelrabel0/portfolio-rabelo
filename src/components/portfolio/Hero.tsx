// Cena 1 — o nome. Duas fitas perfuradas atravessam a tela atrás do nome e,
// conforme o scroll, deslizam até encaixar: os furos coincidentes acendem em
// ember. O nome recua, a frase de posicionamento sobe. Tudo dirigido pelo --p
// do motor de cenas; sem JS o quadro inicial já é a página completa.

import Link from "next/link";
import { ArrowDownToLine, ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { TapePair } from "@/components/ui/tape-pair";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

function Letters({ word, from }: { word: string; from: number }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {word.split("").map((ch, i) => (
        <span key={i} className="enter inline-block" style={{ ["--d" as string]: `${(from + i * 0.045).toFixed(3)}s` }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const [first, last] = profile.shortName.split(" ");

  return (
    <section data-scene className="hero-scene relative" aria-label={profile.shortName}>
      <div className="stage">
        <div className="hero-tapes">
          <TapePair n={41} />
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-4 pb-8 pt-24 sm:px-6 md:pb-10">
          <div className="enter flex flex-wrap items-center gap-x-4 gap-y-2" style={{ ["--d" as string]: "0.05s" }}>
            <span className="label">{ui.hero.eyebrow}</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {ui.cta.availableForWork}
            </span>
          </div>

          <div className="hero-name">
            <h1 className="font-display font-semibold leading-[0.86] tracking-[-0.045em] text-[clamp(4.2rem,15.5vw,14.5rem)]">
              <Letters word={first} from={0.15} />
              <br />
              <Letters word={last} from={0.42} />
              <span className="enter inline-block text-accent" style={{ ["--d" as string]: "0.8s" }}>
                .
              </span>
            </h1>
            <p
              className="enter mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-lg text-muted md:text-2xl"
              style={{ ["--d" as string]: "0.9s" }}
            >
              <span className="text-fg">{ui.hero.role}</span>
              <span className="text-faint">·</span>
              <span>{ui.hero.founder}</span>
              <Link href={`/${locale}/servicos`} className="inline-flex translate-y-[2px] items-center transition-opacity hover:opacity-80">
                <BrandMark variante="horizontal" height={22} />
              </Link>
            </p>
          </div>

          <div className="hero-foot grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div className="enter" style={{ ["--d" as string]: "1.05s" }}>
              <p className="hero-line max-w-xl font-display text-2xl leading-snug tracking-tight md:text-3xl">
                {ui.hero.line}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a href="#projetos" className="btn btn-solid">
                  {ui.cta.seeProjects} <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/cv.pdf" className="btn btn-line">
                  <ArrowDownToLine className="h-4 w-4" /> {ui.cta.downloadCv}
                </a>
                <Link href={`/${locale}/servicos`} className="btn btn-ghost">
                  {ui.cta.workWithDeciban} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <dl className="enter grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 md:gap-x-10" style={{ ["--d" as string]: "1.2s" }}>
              {profile.stats.map((s) => (
                <div key={s.value} className="min-w-0">
                  <dt className="font-mono text-2xl font-medium tabular-nums text-fg md:text-3xl">{s.value}</dt>
                  <dd className="mt-1 max-w-[9rem] text-xs leading-snug text-faint">{s.label[locale]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <span aria-hidden className="hero-scroll label">
          {ui.hero.scroll}
          <i />
        </span>
      </div>
    </section>
  );
}
