import type { LeadData } from '@/lib/validation';

/** Escape text for Telegram HTML parse mode */
function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildMessage(data: LeadData & { submittedAt: string }): string {
  const lines = [
    '🚗 <b>New Lead — digitronicgas.ee</b>',
    '',
    `📅 <b>Date:</b> ${esc(data.submittedAt)}`,
    `🔑 <b>Plate:</b> <code>${esc(data.plate)}</code>`,
    `📞 <b>Phone:</b> ${esc(data.phone)}`,
    `✉️ <b>Email:</b> ${esc(data.email)}`,
    `🌐 <b>Language:</b> ${esc(data.locale.toUpperCase())}`,
  ];

  if (data.source) {
    lines.push(`🔗 <b>Source:</b> ${esc(data.source)}`);
  }

  return lines.join('\n');
}

/**
 * Sends a lead notification to a Telegram chat via the Bot API.
 *
 * Requires:
 *  TELEGRAM_BOT_TOKEN — from @BotFather
 *  TELEGRAM_CHAT_ID   — personal chat, group, or channel ID
 *
 * If either env var is missing the function logs a warning and returns
 * without throwing, so a missing Telegram config never blocks email delivery.
 */
export async function sendTelegramLead(
  data: LeadData & { submittedAt: string },
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      '[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured — skipping',
    );
    return;
  }

  const text = buildMessage(data);
  const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API error ${response.status}: ${body}`);
  }
}
