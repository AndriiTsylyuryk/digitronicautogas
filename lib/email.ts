import { Resend } from 'resend';
import type { LeadData } from '@/lib/validation';

// Lazily instantiated so the build does not fail when RESEND_API_KEY is absent
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY ?? 'missing');
  }
  return _resend;
}

/** Escape user-supplied strings for safe inclusion in an HTML email body. */
function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml(data: LeadData & { submittedAt: string }): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;font-size:12px;color:#64748b;text-transform:uppercase;
                 letter-spacing:.06em;white-space:nowrap;border-bottom:1px solid #f1f5f9;">
        ${label}
      </td>
      <td style="padding:10px 16px;font-size:15px;font-weight:600;color:#0f172a;
                 border-bottom:1px solid #f1f5f9;">
        ${value}
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:32px 16px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;">

    <div style="background:#0f172a;border-radius:10px 10px 0 0;padding:24px 28px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:.12em;color:#f97316;
                  text-transform:uppercase;margin-bottom:6px;">
        digitronicgas.ee
      </div>
      <h1 style="margin:0;font-size:20px;color:#ffffff;font-weight:700;">
        New Lead Inquiry
      </h1>
      <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,.55);">
        ${esc(data.submittedAt)}
      </p>
    </div>

    <div style="background:#ffffff;border-radius:0 0 10px 10px;overflow:hidden;">
      <table style="width:100%;border-collapse:collapse;">
        <tbody>
          ${row('License Plate', `<span style="font-family:monospace;font-size:16px;">${esc(data.plate)}</span>`)}
          ${row('Phone', esc(data.phone))}
          ${row('Email', esc(data.email))}
          ${row('Language', esc(data.locale.toUpperCase()))}
          ${data.source ? row('Source URL', esc(data.source)) : ''}
        </tbody>
      </table>
    </div>

    <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;text-align:center;">
      This notification was sent automatically by the digitronicgas.ee lead form.
    </p>

  </div>
</body>
</html>`;
}

function buildText(data: LeadData & { submittedAt: string }): string {
  return [
    'NEW LEAD — digitronicgas.ee',
    `Date:   ${data.submittedAt}`,
    '',
    `Plate:  ${data.plate}`,
    `Phone:  ${data.phone}`,
    `Email:  ${data.email}`,
    `Lang:   ${data.locale.toUpperCase()}`,
    data.source ? `Source: ${data.source}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Sends a lead notification email via Resend.
 *
 * Requires:
 *  RESEND_API_KEY           — from resend.com
 *  LEAD_NOTIFICATION_EMAIL  — recipient address
 *  EMAIL_FROM               — verified sender address in Resend
 *
 * If LEAD_NOTIFICATION_EMAIL is absent the function logs a warning and
 * returns without throwing.
 */
export async function sendLeadEmail(
  data: LeadData & { submittedAt: string },
): Promise<void> {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!to) {
    console.warn('[email] LEAD_NOTIFICATION_EMAIL not configured — skipping');
    return;
  }

  const from = process.env.EMAIL_FROM ?? 'noreply@digitronicgas.ee';

  const { error } = await getResend().emails.send({
    from,
    to,
    subject: `New Lead: ${data.plate} — digitronicgas.ee`,
    html: buildHtml(data),
    text: buildText(data),
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}
