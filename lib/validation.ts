import { z } from 'zod';

/**
 * Estonian vehicle license plate validator
 *
 * Supported formats (in order of real-world frequency):
 *
 *  1. Standard modern   — 3 digits + 3 letters: "123 ABC" or "123ABC"
 *  2. Older series      — 4 digits + 2 letters: "1234 AB" or "1234AB"
 *  3. Diplomatic/CD     — CD prefix + digits:   "CD 001"
 *
 * Rules applied:
 *  - Letters are A-Z only (Estonian plates use standard Latin alphabet)
 *  - An optional single space or hyphen between the digit and letter groups is accepted
 *  - Input is normalised to UPPER CASE before validation
 *  - Leading/trailing whitespace is stripped
 *
 * Adjust this regex if new official formats are introduced.
 * Live-test the regex at: https://regex101.com/
 */
const ESTONIAN_PLATE_REGEX = /^(?:CD[\s-]?\d{1,4}|[0-9]{2,4}[\s-]?[A-Z]{2,3})$/;

/**
 * Normalises a raw plate string:
 *  - strips surrounding whitespace
 *  - converts to upper case
 *  - collapses internal whitespace / hyphens to a single space
 */
function normalizePlate(raw: string): string {
  return raw.trim().toUpperCase().replace(/[\s-]+/, ' ');
}

/**
 * International phone number — permissive but not trivially fake.
 *
 * Accepts:
 *  +372 5XXX XXXX   (Estonian mobile, international format)
 *  +1 555 000 0000  (US format)
 *  Digits, spaces, hyphens, parentheses, leading +
 *  7–20 characters of actual digits
 */
const PHONE_REGEX = /^\+?[\d\s\-().]{7,25}$/;

export const leadSchema = z.object({
  plate: z
    .string()
    .min(1, 'plateRequired')
    .transform(normalizePlate)
    .refine((val) => ESTONIAN_PLATE_REGEX.test(val), 'plateInvalid'),

  phone: z
    .string()
    .min(1, 'phoneRequired')
    .transform((v) => v.trim())
    .refine((val) => PHONE_REGEX.test(val) && val.replace(/\D/g, '').length >= 7, 'phoneInvalid'),

  email: z
    .string()
    .min(1, 'emailRequired')
    .email('emailInvalid')
    .transform((v) => v.trim().toLowerCase()),

  /**
   * Honeypot field — bots often fill every visible (and hidden) field.
   * If this field is non-empty the submission is silently discarded.
   * Never display this field to real users.
   */
  website: z.string().max(0, 'bot').optional(),

  locale: z.enum(['en', 'ru', 'et']).default('et'),

  /** Originating page URL for the notification message. */
  source: z.string().max(500).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;
