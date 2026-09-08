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
  {
    title: { es: 'Integración de IA / LLMs', en: 'AI / LLM Integration' },
    description: {
      es: 'Fine-tuning de modelos de lenguaje, pipelines RAG con recuperación híbrida, y sistemas de agentes orquestados (LangGraph) para automatizar flujos de trabajo reales.',
      en: 'LLM fine-tuning, RAG pipelines with hybrid retrieval, and orchestrated agent systems (LangGraph) to automate real workflows.',
    },
  },
  {
    title: { es: 'APIs y Arquitectura Backend', en: 'APIs & Backend Architecture' },
    description: {
      es: 'Diseño de APIs REST, autenticación con JWT y control de acceso por roles, bases de datos relacionales, y backends cubiertos por tests.',
      en: 'REST API design, JWT authentication and role-based access control, relational databases, and test-covered backend architecture.',
    },
  },
  {
    title: { es: 'Sistemas y Redes', en: 'Systems & Networking' },
    description: {
      es: 'Programación a nivel de socket/kernel, herramientas de seguridad de red, y servicios del lado del servidor en C y Python.',
      en: 'Socket/kernel-level programming, network security tooling, and server-side services in C and Python.',
    },
  },
];
