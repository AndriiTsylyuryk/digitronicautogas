import { notFound } from 'next/navigation';
import { isValidLocale, getT } from '@/lib/i18n';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { LeadForm } from '@/components/sections/LeadForm';
import { Contacts } from '@/components/sections/Contacts';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const t = getT(locale);

  return (
    <>
      <Hero t={t} locale={locale} />
      <About t={t} />
      <LeadForm t={t} locale={locale} />
      <Contacts t={t} />
    </>
  );
}
