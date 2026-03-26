import { NextRequest, NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation';
import { sendLeadEmail } from '@/lib/email';
import { sendTelegramLead } from '@/lib/telegram';
import { checkRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

/** Derive the best available client IP from Vercel/proxy headers. */
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ──────────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);

  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'rateLimit' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  // ── Parse body ─────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // ── Validate & sanitise ────────────────────────────────────────────────
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation', issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot — silently accept without processing (don't tip off bots)
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const submittedAt =
    new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

  const payload = { ...data, submittedAt };

  // ── Send notifications (parallel, tolerate partial failure) ────────────
  const [emailResult, telegramResult] = await Promise.allSettled([
    sendLeadEmail(payload),
    sendTelegramLead(payload),
  ]);

  if (emailResult.status === 'rejected') {
    console.error('[lead/api] Email send failed:', emailResult.reason);
  }
  if (telegramResult.status === 'rejected') {
    console.error('[lead/api] Telegram send failed:', telegramResult.reason);
  }

  // If BOTH channels fail, something is seriously wrong — return 500
  if (emailResult.status === 'rejected' && telegramResult.status === 'rejected') {
    return NextResponse.json({ error: 'notification_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// Reject all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'method_not_allowed' }, { status: 405 });
}
