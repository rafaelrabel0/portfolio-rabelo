import type { Localized } from "@/content/profile";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Resolve a { pt, en } field (or plain string) for the active locale. */
export function t(value: Localized | string, locale: Locale): string {
  if (typeof value === "string") return value;
  return value[locale] ?? value.pt;
}

export const otherLocale = (locale: Locale): Locale => (locale === "pt" ? "en" : "pt");
