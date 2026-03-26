import type { Locale } from '@/lib/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitronicgas.ee';

interface Props {
  locale: Locale;
}

/**
 * Renders JSON-LD structured data:
 *  - Organization
 *  - WebSite
 *  - LocalBusiness
 *
 * Place in the <head> via layout metadata or directly in the page/layout body.
 */
export function JsonLd({ locale }: Props) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Digitronic Gas Estonia',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+372-5XXX-XXXX', // TODO: update with real number
      contactType: 'customer service',
      areaServed: 'EE',
      availableLanguage: ['en', 'ru', 'et'],
    },
    sameAs: [
      // Add official social / directory profiles here
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Digitronic Gas Estonia',
    url: siteUrl,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/${locale}`,
    },
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Digitronic Gas Estonia',
    description:
      'Official Digitronic LPG autogas representative in Estonia. Expert consultation and certified equipment.',
    url: siteUrl,
    telephone: '+372-5XXX-XXXX', // TODO: update with real number
    email: 'info@digitronicgas.ee',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tallinn',
      addressCountry: 'EE',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Estonia',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  );
}
