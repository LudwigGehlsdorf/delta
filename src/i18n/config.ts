export const locales = ["sv", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sv";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A string available in every locale. */
export type L = Record<Locale, string>;
