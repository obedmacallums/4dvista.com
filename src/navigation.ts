import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '¿Qué hacemos?',
      href: getPermalink('/#services'),
    },
    {
      text: '¿Dónde funciona?',
      href: getPermalink('/#features'),
    },
    // {
    //   text: 'Precios',
    //   href: getPermalink('/#pricing'),
    // },
    {
      text: 'Ejemplos',
      href: getPermalink('/#examples'),
    },
    {
      text: 'Blog',
      href: getPermalink('/#blog'),
    },
  ],
  actions: [
    {
      text: 'Contáctenos',
      href: '/#contact',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Secciones',
      links: [
        { text: '¿Qué hacemos?', href: getPermalink('/#services') },
        { text: '¿Dónde funciona?', href: getPermalink('/#features') },
        { text: 'Ejemplos', href: getPermalink('/#examples') },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { text: 'Blog', href: getPermalink('/#blog') },
        { text: 'Contáctenos', href: getPermalink('/#contact') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Términos y Condiciones', href: getPermalink('/terms') },
    { text: 'Política de Privacidad', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    {
      ariaLabel: 'WhatsApp',
      icon: 'tabler:brand-whatsapp',
      href: 'https://wa.me/56930679681?text=Hola%2C%20quiero%20cotizar%20un%20tour%20virtual',
    },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/4dvista' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    Hecho por <a class="text-blue-600 underline dark:text-muted" href="https://4dvista.com"> 4dvista.com</a>
  `,
};
