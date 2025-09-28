import emailjs from '@emailjs/browser';
import { emailjsConfig, validateEmailJSConfig } from '~/config/emailjs';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  disclaimer?: boolean;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

export const sendEmail = async (formData: ContactFormData): Promise<EmailResponse> => {
  try {
    if (!validateEmailJSConfig()) {
      return {
        success: false,
        message: 'EmailJS configuration is incomplete. Please check your environment variables.',
      };
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: '4DVista Team',
    };

    const result = await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams,
      emailjsConfig.publicKey
    );

    if (result.status === 200) {
      return {
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
      };
    } else {
      return {
        success: false,
        message: 'Failed to send message. Please try again later.',
      };
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'An error occurred while sending your message. Please try again later.',
    };
  }
};

export const initializeForm = (formElement: HTMLFormElement): void => {
  if (!formElement) return;

  const submitButton = formElement.querySelector('button[type="submit"]') as HTMLButtonElement;
  const messageContainer = document.createElement('div');
  messageContainer.className = 'mt-4 p-3 rounded-md hidden';
  formElement.appendChild(messageContainer);

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    messageContainer.classList.add('hidden');

    const formData = new FormData(formElement);
    const emailData: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      disclaimer: formData.get('disclaimer') === 'on',
    };

    const response = await sendEmail(emailData);

    messageContainer.textContent = response.message;
    messageContainer.className = `mt-4 p-3 rounded-md ${
      response.success
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }`;
    messageContainer.classList.remove('hidden');

    if (response.success) {
      formElement.reset();
    }

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Contact us';
    }
  });
};
