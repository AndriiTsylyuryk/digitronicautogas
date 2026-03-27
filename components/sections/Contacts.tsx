import type { Translation } from '@/lib/translations/types';
import styles from './Contacts.module.css';

interface Props {
  t: Translation;
}

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.itemIcon} aria-hidden="true">{icon}</div>
      <div className={styles.itemBody}>
        <dt className={styles.itemLabel}>{label}</dt>
        <dd className={styles.itemValue}>
          {href ? (
            <a href={href} className={styles.itemLink} target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          ) : (
            value
          )}
        </dd>
      </div>
    </div>
  );
}

const icons = {
  email: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  phone: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 4a1 1 0 011-1h2.5a1 1 0 011 .75l.75 3a1 1 0 01-.29.96l-1.04 1.04a9 9 0 004.29 4.29l1.04-1.04a1 1 0 01.96-.29l3 .75a1 1 0 01.75 1V16a1 1 0 01-1 1H16C8.82 17 3 11.18 3 4z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  telegram: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2.5 9.5l14-6-4 13-3.5-5L13 7.5 7 10.5l-1 5-3.5-6z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  address: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z"
        stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  hours: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function Contacts({ t }: Props) {
  const { contact } = t;
  const { items } = contact;

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="contact-heading" className={styles.title}>{contact.title}</h2>
          <p className={styles.subtitle}>{contact.subtitle}</p>
        </header>

        <dl className={styles.grid}>
          <ContactItem
            icon={icons.email}
            label={items.email.label}
            value={items.email.value}
            href={`mailto:${items.email.value}`}
          />
          <ContactItem
            icon={icons.phone}
            label={items.phone.label}
            value={items.phone.value}
            href={`tel:${items.phone.value.replace(/\s/g, '')}`}
          />
          <ContactItem
            icon={icons.telegram}
            label={items.telegram.label}
            value={items.telegram.value}
            href={`https://t.me/${items.telegram.value.replace('@', '')}`}
          />
          <ContactItem
            icon={icons.address}
            label={items.address.label}
            value={items.address.value}
            href="https://maps.google.com/?q=Vana-Rannam%C3%B5isa+tee+1d%2F5%2C+13516+Tallinn"
          />
          <ContactItem
            icon={icons.hours}
            label={items.hours.label}
            value={items.hours.value}
          />
        </dl>
      </div>
    </section>
  );
}
