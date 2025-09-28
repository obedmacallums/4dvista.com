export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  toEmail: string;
}

export const emailjsConfig: EmailJSConfig = {
  serviceId: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || '',
  toEmail: import.meta.env.PUBLIC_EMAILJS_TO_EMAIL || '',
};

export const validateEmailJSConfig = (): boolean => {
  return !!(emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey && emailjsConfig.toEmail);
};
