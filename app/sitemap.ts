import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitronicgas.ee';

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === 'et' ? 1.0 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${siteUrl}/${l}`]),
      ),
    },
  }));
}
