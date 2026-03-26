import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  // Minimal fallback — each locale layout overrides these
  title: 'Digitronic Gas Estonia',
  description: 'Official Digitronic LPG autogas representative in Estonia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the [locale] layout sets lang via an inline script
    <html suppressHydrationWarning className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
