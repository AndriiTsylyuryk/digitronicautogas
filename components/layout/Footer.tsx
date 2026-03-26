import Link from 'next/link';
import type { Translation } from '@/lib/translations/types';
import type { Locale } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import styles from './Footer.module.css';

interface Props {
  t: Translation;
  locale: Locale;
}

export function Footer({ t, locale }: Props) {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.brandName}>
            <span className={styles.accent}>Digitronic</span> Gas
          </span>
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>

        <div className={styles.links}>
          <Link href={`/${locale}#about`} className={styles.link}>
            {t.nav.about}
          </Link>
          <Link href={`/${locale}#contact`} className={styles.link}>
            {t.nav.contact}
          </Link>
          {/* TODO: create /privacy page and uncomment */}
          {/* <Link href={`/${locale}/privacy`} className={styles.link}>
            {t.footer.privacy}
          </Link> */}
        </div>

        <LanguageSwitcher currentLocale={locale} />
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
