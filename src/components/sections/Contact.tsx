import Link from "next/link";
import { ArrowDownToLine, Mail, Phone } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function Contact({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  return (
    <Section id="contact">
      <Reveal>
        <div className="glow relative overflow-hidden rounded-3xl border border-border bg-surface/60 px-6 py-16 text-center md:px-16">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent)" }}
          />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{ui.cta.availableForWork}</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-5xl">
            {ui.sections.contactTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted">{ui.sections.contactSubtitle}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${profile.contact.email}`} className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.02]">
              <Mail className="h-4 w-4" /> {profile.contact.email}
            </a>
            <a href="/cv.pdf" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-border-strong hover:bg-surface">
              <ArrowDownToLine className="h-4 w-4" /> {ui.cta.downloadCv}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
            <Link href={profile.contact.github} target="_blank" className="inline-flex items-center gap-2 hover:text-fg">
              <GithubIcon className="h-4 w-4" /> {profile.contact.githubHandle}
            </Link>
            <a href={`tel:${profile.contact.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-fg">
              <Phone className="h-4 w-4" /> {profile.contact.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
