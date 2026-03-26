'use client';

import { useState, useId } from 'react';
import type { Translation } from '@/lib/translations/types';
import type { Locale } from '@/lib/i18n';
import styles from './LeadForm.module.css';

interface Props {
  t: Translation;
  locale: Locale;
}

interface FieldErrors {
  plate?: string;
  phone?: string;
  email?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'rateLimit';

// ── Client-side validators (mirrors server-side rules in lib/validation.ts) ──
const PLATE_RE = /^[A-Z]{2,3}[\s-]?[0-9]{2,4}$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,25}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePlate(raw: string) {
  return raw.trim().toUpperCase().replace(/[\s-]+/, ' ');
}

export function LeadForm({ t, locale }: Props) {
  const { form } = t;
  const id = useId();

  const [plate, setPlate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  // ── Client-side validation ──────────────────────────────────────────
  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    const normalized = normalizePlate(plate);

    if (!normalized) {
      errs.plate = form.validation.plateRequired;
    } else if (!PLATE_RE.test(normalized)) {
      errs.plate = form.validation.plateInvalid;
    }

    if (!phone.trim()) {
      errs.phone = form.validation.phoneRequired;
    } else if (!PHONE_RE.test(phone.trim()) || phone.replace(/\D/g, '').length < 7) {
      errs.phone = form.validation.phoneInvalid;
    }

    if (!email.trim()) {
      errs.email = form.validation.emailRequired;
    } else if (!EMAIL_RE.test(email.trim())) {
      errs.email = form.validation.emailInvalid;
    }

    return errs;
  }

  // ── Field blur handler (inline validation) ─────────────────────────
  function handleBlur(field: keyof FieldErrors) {
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  }

  // ── Submit ─────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Focus the first invalid field
      const firstErrField = Object.keys(errs)[0];
      (e.currentTarget.elements.namedItem(firstErrField) as HTMLElement)?.focus();
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plate: normalizePlate(plate),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          locale,
          source: window.location.href,
          website: '', // honeypot — always empty from real users
        }),
      });

      if (res.status === 429) {
        setStatus('rateLimit');
        return;
      }

      if (!res.ok) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setPlate('');
      setPhone('');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  // ── Success state ──────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <section id="consultation" className={styles.section} aria-labelledby="form-heading">
        <div className={styles.container}>
          <div className={styles.successCard} role="alert" aria-live="polite">
            <div className={styles.successIcon} aria-hidden="true">✓</div>
            <h2 className={styles.successTitle}>{form.success.title}</h2>
            <p className={styles.successMsg}>{form.success.message}</p>
          </div>
        </div>
      </section>
    );
  }

  const isSubmitting = status === 'submitting';

  return (
    <section id="consultation" className={styles.section} aria-labelledby="form-heading">
      <div className={styles.container}>
        {/* Section header */}
        <header className={styles.header}>
          <h2 id="form-heading" className={styles.title}>{form.title}</h2>
          <p className={styles.subtitle}>{form.subtitle}</p>
        </header>

        <div className={styles.formWrap}>
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label={form.title}
            className={styles.form}
          >
            {/* ── License plate ────────────────────────────────────── */}
            <div className={styles.fieldGroup}>
              <label htmlFor={`${id}-plate`} className={styles.label}>
                {form.plate.label}
                <span className={styles.required} aria-label="required">*</span>
              </label>
              <input
                id={`${id}-plate`}
                name="plate"
                type="text"
                autoComplete="off"
                inputMode="text"
                placeholder={form.plate.placeholder}
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                onBlur={() => handleBlur('plate')}
                aria-describedby={`${id}-plate-hint ${errors.plate ? `${id}-plate-err` : ''}`}
                aria-invalid={!!errors.plate}
                className={`${styles.input} ${errors.plate ? styles.inputError : ''}`}
                disabled={isSubmitting}
                maxLength={10}
              />
              <span id={`${id}-plate-hint`} className={styles.hint}>
                {form.plate.hint}
              </span>
              {errors.plate && (
                <span id={`${id}-plate-err`} className={styles.error} role="alert">
                  {errors.plate}
                </span>
              )}
            </div>

            {/* ── Phone ────────────────────────────────────────────── */}
            <div className={styles.fieldGroup}>
              <label htmlFor={`${id}-phone`} className={styles.label}>
                {form.phone.label}
                <span className={styles.required} aria-label="required">*</span>
              </label>
              <input
                id={`${id}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder={form.phone.placeholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur('phone')}
                aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
                aria-invalid={!!errors.phone}
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                disabled={isSubmitting}
                maxLength={25}
              />
              {errors.phone && (
                <span id={`${id}-phone-err`} className={styles.error} role="alert">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* ── Email ────────────────────────────────────────────── */}
            <div className={styles.fieldGroup}>
              <label htmlFor={`${id}-email`} className={styles.label}>
                {form.email.label}
                <span className={styles.required} aria-label="required">*</span>
              </label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={form.email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                aria-describedby={errors.email ? `${id}-email-err` : undefined}
                aria-invalid={!!errors.email}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                disabled={isSubmitting}
                maxLength={254}
              />
              {errors.email && (
                <span id={`${id}-email-err`} className={styles.error} role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Honeypot — hidden from real users, filled by bots */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor={`${id}-website`}>Website</label>
              <input
                id={`${id}-website`}
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Error / rate limit feedback */}
            {(status === 'error' || status === 'rateLimit') && (
              <div className={styles.formError} role="alert" aria-live="assertive">
                <strong>{form.error.title}.</strong>{' '}
                {status === 'rateLimit' ? form.error.rateLimit : form.error.message}
              </div>
            )}

            {/* Consent text */}
            <p className={styles.consent}>{form.consent}</p>

            {/* Submit */}
            <button
              type="submit"
              className={styles.submit}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? form.submitting : form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
