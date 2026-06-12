import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/Section";
import { profile } from "@/content/profile";
import { getUi } from "@/dictionaries/ui";
import type { Locale } from "@/lib/i18n";

export function About({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  return (
    <Section id="about">
      <SectionHeader eyebrow="01" title={ui.sections.aboutTitle} />
      <div className="grid gap-10 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <p className="text-lg leading-relaxed text-fg/90">{profile.summary[locale]}</p>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5">
          <Field label={locale === "pt" ? "Local" : "Location"} value={profile.location[locale]} />
          <Field label={locale === "pt" ? "Idiomas" : "Languages"} value={profile.languages.map((l) => `${l.name[locale]} (${l.level[locale]})`).join(" · ")} />
          <Field label={locale === "pt" ? "Formação" : "Education"} value={`${profile.education[0].degree[locale]} — ${profile.education[0].status[locale]} (${profile.education[0].period})`} />
          <Field label={locale === "pt" ? "Certificações" : "Certifications"} value={profile.certifications.map((c) => c[locale]).join(" · ")} />
        </Reveal>
      </div>
    </Section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-border pl-4">
      <p className="font-mono text-xs uppercase tracking-wider text-faint">{label}</p>
      <p className="mt-1 text-sm text-muted">{value}</p>
    </div>
  );
}
