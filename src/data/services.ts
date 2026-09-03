export interface Service {
  title: Record<'es' | 'en', string>;
  description: Record<'es' | 'en', string>;
}

export const services: Service[] = [
  {
    title: { es: 'Desarrollo Full-Stack', en: 'Full-Stack Development' },
    description: {
      es: 'Construcción de aplicaciones web completas, desde el diseño de base de datos y API hasta un frontend funcional.',
      en: 'Building complete web applications, from database and API design through to a working frontend.',
    },
  },
  {
    title: { es: 'Desarrollo de Sitios Web', en: 'Website Development' },
    description: {
      es: 'Construcción y publicación de sitios web (landing pages, portfolios, sitios de pequeños negocios).',
      en: 'Building and shipping websites (marketing sites, portfolios, small business sites).',
    },
  },
];
