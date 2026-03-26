import type { Translation } from './types';

export const en: Translation = {
  meta: {
    title: 'Digitronic Gas Estonia | Official LPG Autogas Representative',
    description:
      'Official Digitronic autogas representative in Estonia. Expert consultation on LPG systems, certified equipment, and professional installation support.',
    keywords: 'digitronic, LPG, autogas, Estonia, representative, consultation, autogas equipment',
  },
  nav: {
    about: 'About',
    contact: 'Contact',
    consultation: 'Get Consultation',
  },
  hero: {
    badge: 'Official Digitronic Representative',
    title: 'Professional LPG Autogas Solutions for Estonia',
    subtitle:
      'We are the official representative of Digitronic in Estonia — providing expert consultation on LPG autogas equipment, installation, and certification.',
    cta: 'Request Consultation',
    trustItems: [
      'Official Representative',
      'Certified Equipment',
      'Expert Support',
      'Fast Response',
    ],
  },
  about: {
    title: 'Why Choose Us',
    subtitle:
      'We combine official Digitronic expertise with deep knowledge of the Estonian market to deliver the right LPG solution for your vehicle.',
    features: [
      {
        title: 'Official Representative',
        description:
          'Authorized Digitronic dealer in Estonia with full product access, manufacturer warranties, and direct technical support.',
      },
      {
        title: 'Certified Quality',
        description:
          'All equipment meets European E-mark automotive standards and complies with Estonian vehicle registration requirements.',
      },
      {
        title: 'Expert Consultation',
        description:
          'Our specialists help you choose the right LPG system for your vehicle type, engine, and usage pattern.',
      },
      {
        title: 'Fast Response',
        description:
          'We respond to all inquiries promptly and keep you informed at every step of the process.',
      },
    ],
  },
  form: {
    title: 'Request a Consultation',
    subtitle:
      'Leave your details and we will contact you to discuss LPG solutions for your vehicle.',
    plate: {
      label: 'License Plate',
      placeholder: 'ABC 123',
      hint: 'Estonian vehicle registration number',
    },
    phone: {
      label: 'Phone Number',
      placeholder: '+372 5XXX XXXX',
    },
    email: {
      label: 'Email Address',
      placeholder: 'you@example.com',
    },
    consent:
      'By submitting this form, you agree to be contacted regarding your inquiry. We do not share your data with third parties.',
    submit: 'Send Inquiry',
    submitting: 'Sending…',
    success: {
      title: 'Thank you!',
      message:
        'We have received your inquiry and will contact you shortly.',
    },
    error: {
      title: 'Something went wrong',
      message: 'Please try again or contact us directly.',
      rateLimit: 'Too many requests. Please wait a moment and try again.',
    },
    validation: {
      plateRequired: 'License plate is required',
      plateInvalid: 'Please enter a valid Estonian license plate (e.g. ABC 123)',
      phoneRequired: 'Phone number is required',
      phoneInvalid: 'Please enter a valid phone number',
      emailRequired: 'Email address is required',
      emailInvalid: 'Please enter a valid email address',
    },
  },
  contact: {
    title: 'Contact Us',
    subtitle:
      'Reach us through any of the channels below. We are available during business hours.',
    items: {
      email: { label: 'Email', value: 'info@digitronicgas.ee' },
      phone: { label: 'Phone', value: '+372 5XXX XXXX' },
      telegram: { label: 'Telegram', value: '@digitronicgas' },
      address: { label: 'Address', value: 'Tallinn, Estonia' },
      hours: { label: 'Working Hours', value: 'Mon–Fri 9:00–18:00' },
    },
  },
  footer: {
    tagline: 'Official Digitronic representative in Estonia',
    privacy: 'Privacy Policy',
    copyright: '© 2025 digitronicgas.ee. All rights reserved.',
  },
};
