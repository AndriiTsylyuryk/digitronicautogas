import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/lib/i18n';

export default function RootPage() {
  // Redirect anonymous root users to the default locale path.
  redirect(`/${DEFAULT_LOCALE}`);
}
