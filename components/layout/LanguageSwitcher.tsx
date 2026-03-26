'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_LABELS, LOCALE_NAMES, type Locale } from '@/lib/i18n';
import styles from './LanguageSwitcher.module.css';

interface Props {
  currentLocale: Locale;
}

/**
 * Renders locale toggle buttons. Clicking a button navigates to the same
 * path with the new locale prefix substituted.
 *
 * Works for single-page sites (all content on /) and for multi-page sites
 * (e.g. /en/about → /ru/about) because it replaces only the first segment.
 */
export function LanguageSwitcher({ currentLocale }: Props) {
  const pathname = usePathname();

  function hrefForLocale(locale: Locale): string {
    // Replace /currentLocale with /locale at the start of the path
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/') || `/${locale}`;
  }

  return (
    <nav aria-label="Language selection" className={styles.switcher}>
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={hrefForLocale(locale)}
          aria-label={`Switch to ${LOCALE_NAMES[locale]}`}
          aria-current={locale === currentLocale ? 'true' : undefined}
          className={`${styles.btn} ${locale === currentLocale ? styles.active : ''}`}
        >
          {LOCALE_LABELS[locale]}
        </Link>
      ))}
    </nav>
  );
}
