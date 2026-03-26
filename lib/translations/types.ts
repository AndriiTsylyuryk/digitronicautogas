export interface Translation {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    about: string;
    contact: string;
    consultation: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    trustItems: string[];
  };
  about: {
    title: string;
    subtitle: string;
    features: Array<{ title: string; description: string }>;
  };
  form: {
    title: string;
    subtitle: string;
    plate: { label: string; placeholder: string; hint: string };
    phone: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    consent: string;
    submit: string;
    submitting: string;
    success: { title: string; message: string };
    error: { title: string; message: string; rateLimit: string };
    validation: {
      plateRequired: string;
      plateInvalid: string;
      phoneRequired: string;
      phoneInvalid: string;
      emailRequired: string;
      emailInvalid: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    items: {
      email: { label: string; value: string };
      phone: { label: string; value: string };
      telegram: { label: string; value: string };
      address: { label: string; value: string };
      hours: { label: string; value: string };
    };
  };
  footer: {
    tagline: string;
    privacy: string;
    copyright: string;
  };
}
