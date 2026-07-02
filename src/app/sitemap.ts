import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const base = "https://rabelo.company";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...locales.map((lang) => ({
      url: `${base}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: { "pt-BR": `${base}/pt`, en: `${base}/en` },
      },
    })),
    ...locales.map((lang) => ({
      url: `${base}/${lang}/servicos`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: {
        languages: { "pt-BR": `${base}/pt/servicos`, en: `${base}/en/servicos` },
      },
    })),
  ];
}
