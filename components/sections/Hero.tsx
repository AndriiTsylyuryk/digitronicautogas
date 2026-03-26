import Link from 'next/link';
import type { Translation } from '@/lib/translations/types';
import type { Locale } from '@/lib/i18n';
import styles from './Hero.module.css';

interface Props {
  t: Translation;
  locale: Locale;
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="7" fill="rgba(249,115,22,0.2)" />
    <path d="M4 7l2 2 4-4" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Hero({ t, locale }: Props) {
  const { hero } = t;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* Decorative radial glow */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Badge */}
        <div className={styles.badge} role="note">
          <span className={styles.badgeDot} aria-hidden="true" />
          {hero.badge}
        </div>

        {/* Heading */}
        <h1 id="hero-heading" className={styles.title}>
          {hero.title}
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>{hero.subtitle}</p>

        {/* CTA */}
        <Link href={`/${locale}#consultation`} className={styles.cta}>
          {hero.cta}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* Trust items */}
        <ul className={styles.trustList} aria-label="Trust indicators">
          {hero.trustItems.map((item) => (
            <li key={item} className={styles.trustItem}>
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
