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
    ...locales.map((lang) => ({
      url: `${base}/${lang}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: {
        languages: { "pt-BR": `${base}/pt/privacidade`, en: `${base}/en/privacidade` },
      },
    })),
  ];
}
