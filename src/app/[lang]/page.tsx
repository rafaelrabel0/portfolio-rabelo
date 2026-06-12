import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Showcase } from "@/components/sections/Showcase";
import { Companies } from "@/components/sections/Companies";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <Nav locale={lang} />
      <main>
        <Hero locale={lang} />
        <About locale={lang} />
        <Experience locale={lang} />
        <Projects locale={lang} />
        <Showcase locale={lang} />
        <Companies locale={lang} />
        <Skills locale={lang} />
        <Contact locale={lang} />
      </main>
      <Footer locale={lang} />
    </>
  );
}
