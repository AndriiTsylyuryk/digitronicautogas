import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, LOCALE_NAMES, isValidLocale, getT } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitronicgas.ee';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) return {};

  const t = getT(locale);
  const { meta } = t;
  const canonical = `${siteUrl}/${locale}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${siteUrl}/${l}`]),
      ),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: meta.title,
      description: meta.description,
      siteName: 'Digitronic Gas Estonia',
      locale: locale === 'ru' ? 'ru_RU' : locale === 'et' ? 'et_EE' : 'en_US',
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Digitronic Gas Estonia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${siteUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const t = getT(locale);

  return (
    <>
      {/*
        Sets the HTML lang attribute for screen readers and SEO.
        Using an inline script is safe here: locale is validated against
        a static whitelist, never user-supplied free text.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}"`,
        }}
      />

      {/* JSON-LD structured data */}
      <JsonLd locale={locale} />

      {/* Accessibility skip link */}
      <a href="#main-content" className="skip-link">
        {locale === 'et' ? 'Liigu põhisisu juurde' : locale === 'ru' ? 'Перейти к основному содержимому' : 'Skip to main content'}
      </a>

      <Header t={t} locale={locale} />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer t={t} locale={locale} />
    </>
  );
}
