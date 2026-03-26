import type { Translation } from '@/lib/translations/types';
import styles from './About.module.css';

interface Props {
  t: Translation;
}

// Simple inline SVG icons — no icon library required
const icons: Record<number, React.ReactNode> = {
  0: (
    // Shield / official representative
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z"
        stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  1: (
    // Star / quality
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  ),
  2: (
    // Chat bubble / consultation
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
        stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  ),
  3: (
    // Lightning / fast response
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  ),
};

export function About({ t }: Props) {
  const { about } = t;

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h2 id="about-heading" className={styles.title}>{about.title}</h2>
          <p className={styles.subtitle}>{about.subtitle}</p>
        </header>

        {/* Feature cards */}
        <ul className={styles.grid} role="list">
          {about.features.map((feature, i) => (
            <li key={feature.title} className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                {icons[i]}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
