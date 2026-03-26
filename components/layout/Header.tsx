import Link from 'next/link';
import Image from 'next/image';
import type { Translation } from '@/lib/translations/types';
import type { Locale } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import styles from './Header.module.css';

interface Props {
  t: Translation;
  locale: Locale;
}

export function Header({ t, locale }: Props) {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        {/* Logo — displays the image at natural aspect ratio */}
        <Link href={`/${locale}`} className={styles.logo} aria-label="Digitronic Gas — go to homepage">
          <Image
            src="/logo.png"
            alt="Digitronic Gas"
            width={160}
            height={40}
            className={styles.logoImg}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav aria-label="Main navigation" className={styles.nav}>
          <Link href={`/${locale}#about`} className={styles.navLink}>
            {t.nav.about}
          </Link>
          <Link href={`/${locale}#contact`} className={styles.navLink}>
            {t.nav.contact}
          </Link>
          <Link href={`/${locale}#consultation`} className={styles.navCta}>
            {t.nav.consultation}
          </Link>
        </nav>

        {/* Language switcher */}
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </header>
  );
}
