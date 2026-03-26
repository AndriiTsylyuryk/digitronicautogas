import type { Translation } from '@/lib/translations/types';
import { en } from '@/lib/translations/en';
import { ru } from '@/lib/translations/ru';
import { et } from '@/lib/translations/et';

export const LOCALES = ['en', 'ru', 'et'] as const;
export type Locale = (typeof LOCALES)[number];

// Default locale for the .ee domain — Estonian
export const DEFAULT_LOCALE: Locale = 'et';

const translations: Record<Locale, Translation> = { en, ru, et };

/** Returns the translation dictionary for the given locale. */
export function getT(locale: Locale): Translation {
  return translations[locale] ?? translations[DEFAULT_LOCALE];
}

/** Human-readable locale labels for the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  et: 'ET',
};

/** Full language names for aria-labels and SEO. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  et: 'Eesti',
};

/** Validates that a string is a supported locale. */
export function isValidLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale);
}
