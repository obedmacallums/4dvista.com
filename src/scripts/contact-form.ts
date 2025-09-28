import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  disclaimer?: boolean;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  toEmail: string;
}

const getEmailJSConfig = (): EmailJSConfig => {
  return {
    serviceId: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || '',
    toEmail: import.meta.env.PUBLIC_EMAILJS_TO_EMAIL || '',
  };
};

const validateEmailJSConfig = (config: EmailJSConfig): boolean => {
  return !!(config.serviceId && config.templateId && config.publicKey && config.toEmail);
};

const sendEmail = async (formData: ContactFormData): Promise<EmailResponse> => {
  try {
    const config = getEmailJSConfig();

    if (!validateEmailJSConfig(config)) {
      console.error('EmailJS configuration is incomplete:', config);
      return {
        success: false,
        message: 'EmailJS configuration is incomplete. Please check your environment variables.',
      };
    }

    console.log('Sending email with config:', {
      serviceId: config.serviceId,
      templateId: config.templateId,
      publicKey: config.publicKey?.substring(0, 5) + '...',
    });

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      email: `${config.toEmail}, ${formData.email}`,
      message: formData.message,
      to_name: '4DVista Team',
    };

    console.log('Template params:', templateParams);

    const result = await emailjs.send(config.serviceId, config.templateId, templateParams, config.publicKey);

    console.log('EmailJS result:', result);

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

export const initializeContactForm = (
  formElement: HTMLFormElement,
  originalButtonText: string = 'Contact us'
): void => {
  if (!formElement) {
    console.error('Form element not found');
    return;
  }

  console.log('Initializing contact form');

  let messageContainer = formElement.querySelector('.form-message') as HTMLDivElement;

  if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.className = 'form-message mt-4 p-3 rounded-md hidden';
    formElement.appendChild(messageContainer);
  }

  // Remove any existing event listeners
  const newForm = formElement.cloneNode(true) as HTMLFormElement;
  formElement.parentNode?.replaceChild(newForm, formElement);

  // Re-get references after cloning
  const newSubmitButton = newForm.querySelector('button[type="submit"]') as HTMLButtonElement;
  const disclaimerCheckbox = newForm.querySelector('input[name="disclaimer"]') as HTMLInputElement;
  let newMessageContainer = newForm.querySelector('.form-message') as HTMLDivElement;

  if (!newMessageContainer) {
    newMessageContainer = document.createElement('div');
    newMessageContainer.className = 'form-message mt-4 p-3 rounded-md hidden';
    newForm.appendChild(newMessageContainer);
  }

  // Function to update submit button state based on disclaimer checkbox
  const updateSubmitButtonState = () => {
    if (newSubmitButton && disclaimerCheckbox) {
      newSubmitButton.disabled = !disclaimerCheckbox.checked;

      // Update button appearance when disabled
      if (disclaimerCheckbox.checked) {
        newSubmitButton.classList.remove('opacity-50', 'cursor-not-allowed');
      } else {
        newSubmitButton.classList.add('opacity-50', 'cursor-not-allowed');
      }
    }
  };

  // Initialize submit button state (disabled by default if disclaimer exists)
  if (disclaimerCheckbox) {
    updateSubmitButtonState();

    // Add event listener for checkbox changes
    disclaimerCheckbox.addEventListener('change', updateSubmitButtonState);
  }

  newForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    if (newSubmitButton) {
      newSubmitButton.disabled = true;
      newSubmitButton.textContent = 'Sending...';
    }

    newMessageContainer.classList.add('hidden');

    const formData = new FormData(newForm);
    const emailData: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      disclaimer: formData.get('disclaimer') === 'on',
    };

    console.log('Form data:', emailData);

    const response = await sendEmail(emailData);

    newMessageContainer.textContent = response.message;
    newMessageContainer.className = `form-message mt-4 p-3 rounded-md ${
      response.success
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }`;
    newMessageContainer.classList.remove('hidden');

    if (response.success) {
      newForm.reset();
    }

    if (newSubmitButton) {
      newSubmitButton.disabled = false;
      newSubmitButton.textContent = originalButtonText;
    }
  });
};
