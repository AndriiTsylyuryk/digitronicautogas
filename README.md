# Digitronic Gas — Lead Generation Landing Page

Multilingual lead capture site for Digitronic Gas Estonia, an official LPG autogas representative. Visitors submit their vehicle plate, phone, and email to request a conversion consultation. Each submission triggers notifications via email (Resend) and Telegram.

**Live:** [digitronicgas.ee](https://digitronicgas.ee)

## Tech Stack

- **Next.js 15** (App Router, React 19)
- **TypeScript** with strict mode
- **Zod** — server + client validation
- **Resend** — transactional email
- **Telegram Bot API** — real-time lead notifications
- **CSS Modules** — styling
- Deployed on **Vercel**

## Features

- 3 locales: Estonian (`et`), English (`en`), Russian (`ru`) — URL-based routing (`/{locale}/`)
- Estonian vehicle plate validation (modern, legacy, and diplomatic formats)
- Honeypot bot protection
- In-memory rate limiting (configurable)
- Security headers (HSTS, CSP, X-Frame-Options, etc.)
- SEO: Open Graph, JSON-LD, sitemap, robots.txt
- Dual notification channels run in parallel; partial failure is tolerated

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Environment Variables

Create a `.env.local` file:

```env
# Required
RESEND_API_KEY=re_...
LEAD_NOTIFICATION_EMAIL=you@example.com
TELEGRAM_BOT_TOKEN=123456:ABC-...
TELEGRAM_CHAT_ID=-100123456789

# Optional (have defaults)
EMAIL_FROM=noreply@digitronicgas.ee
NEXT_PUBLIC_SITE_URL=https://digitronicgas.ee
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MS=60000
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `RESEND_API_KEY` | Yes | — | API key from [resend.com](https://resend.com) |
| `LEAD_NOTIFICATION_EMAIL` | Yes | — | Recipient for email notifications |
| `TELEGRAM_BOT_TOKEN` | Yes | — | Bot token from [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | Yes | — | Chat/channel ID to receive lead messages |
| `EMAIL_FROM` | No | `noreply@digitronicgas.ee` | Sender address |
| `NEXT_PUBLIC_SITE_URL` | No | `https://digitronicgas.ee` | Used in canonical URLs and OG tags |
| `RATE_LIMIT_MAX` | No | `5` | Max submissions per window |
| `RATE_LIMIT_WINDOW_MS` | No | `60000` | Rate limit window in milliseconds |

## Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run type-check # TypeScript type check
```

## Project Structure

```
app/
  [locale]/        # Per-locale pages and layout
  api/lead/        # POST endpoint — validates, rate-limits, sends notifications
components/
  layout/          # Header, Footer, LanguageSwitcher
  sections/        # Hero, About, LeadForm, Contacts
  ui/              # JsonLd
lib/
  translations/    # en.ts, et.ts, ru.ts
  validation.ts    # Zod schema (plate, phone, email)
  email.ts         # Resend integration
  telegram.ts      # Telegram Bot API integration
  rate-limit.ts    # In-memory rate limiter
```

## Deployment

The project is deployed on Vercel. Set the environment variables in the Vercel dashboard (or via `vercel env add`), then push to `main`.

> **Note:** The rate limiter uses in-memory storage and does not share state across serverless instances. For high-traffic scenarios, replace it with a Redis-backed solution (e.g. Upstash).
