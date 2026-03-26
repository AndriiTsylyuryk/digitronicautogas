/**
 * Simple in-memory rate limiter.
 *
 * ⚠️  PRODUCTION NOTE
 * This implementation uses a module-level Map which:
 *  - Works correctly in development and single-instance deployments
 *  - Is NOT shared across Vercel serverless function instances
 *  - Resets when the container is recycled (cold start)
 *
 * For production at scale, replace with Upstash Redis:
 *   npm install @upstash/ratelimit @upstash/redis
 *   https://github.com/upstash/ratelimit
 *
 * For a low-traffic site (< a few hundred submissions/day) this
 * implementation still provides meaningful protection against
 * burst abuse from a single client on the same container.
 */

interface Entry {
  count: number;
  resetAt: number;
}

// Module-level store — persists across requests within the same container
const store = new Map<string, Entry>();

// Prune expired entries every 5 minutes to prevent memory growth
setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) store.delete(key);
    }
  },
  5 * 60 * 1_000,
);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number; // Unix ms timestamp when the window resets
}

/**
 * @param identifier  Unique key per client — typically the IP address.
 * @param max         Maximum requests per window. Defaults to RATE_LIMIT_MAX env var or 5.
 * @param windowMs    Window duration in ms. Defaults to RATE_LIMIT_WINDOW_MS env var or 60 000.
 */
export function checkRateLimit(
  identifier: string,
  max = parseInt(process.env.RATE_LIMIT_MAX ?? '5', 10),
  windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '60000', 10),
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(identifier);

  if (!existing || existing.resetAt <= now) {
    // First request in a new window
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }

  if (existing.count >= max) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: max - existing.count, resetAt: existing.resetAt };
}
