import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getUi } from "@/dictionaries/ui";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BrandIntro } from "@/components/motion/BrandIntro";
import { SceneHud } from "@/components/motion/SceneHud";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { AgentSection } from "@/components/agent/AgentSection";

// Portfólio — a apresentação de Rafael Rabelo, em cenas:
// abertura da marca → nome → sobre → percurso → projetos → agente → skills →
// convite → rodapé com a assinatura animada.

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const ui = getUi(lang);

  return (
    <>
      <BrandIntro id="portfolio" label={`${ui.intro.portfolio} · rafael rabelo`} skipLabel={ui.intro.skip} />
      <Nav locale={lang} world="portfolio" />
      <main>
        <Hero locale={lang} />
        <About locale={lang} />
        <Experience locale={lang} />
        <Projects locale={lang} />
        <AgentSection locale={lang} id="agentes" index="05" variant="portfolio" />
        <Skills locale={lang} />
        <Contact locale={lang} />
      </main>
      <Footer locale={lang} world="portfolio" />
      <SceneHud
        chapters={[
          { id: "sobre", label: ui.nav.about },
          { id: "percurso", label: ui.nav.experience },
          { id: "projetos", label: ui.nav.projects },
          { id: "agentes", label: ui.nav.agents },
          { id: "skills", label: ui.nav.skills },
          { id: "contato", label: ui.nav.contact },
        ]}
      />
    </>
  );
}
