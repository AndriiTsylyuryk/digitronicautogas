import { NextResponse } from 'next/server';
import { DEFAULT_LOCALE } from '@/lib/i18n';

export async function GET() {
  return NextResponse.redirect(`/${DEFAULT_LOCALE}`);
}
