import type { Localized } from '../i18n/ui';

export interface Service {
  title: Localized;
  description: Localized;
  /** Project slugs (see projects.ts) that back this service up. */
  evidence: string[];
}

export const services: Service[] = [
  {
    title: { es: 'Integración de IA / LLMs', en: 'AI / LLM Integration' },
    description: {
      es: 'Fine-tuning de modelos de lenguaje, pipelines RAG con recuperación léxica y vectorial y sistemas de agentes orquestados con LangGraph para automatizar flujos de trabajo reales.',
      en: 'LLM fine-tuning, RAG pipelines combining lexical and vector retrieval, and LangGraph-orchestrated agent systems that automate real workflows.',
    },
    evidence: ['tech-rag', 'multiagent-code-generator'],
  },
  {
    title: { es: 'APIs y arquitectura backend', en: 'APIs & Backend Architecture' },
    description: {
      es: 'Diseño de APIs REST, autenticación JWT con control de acceso por roles, bases de datos relacionales y backends cubiertos por tests.',
      en: 'REST API design, JWT authentication with role-based access control, relational databases, and test-covered backends.',
    },
    evidence: ['guildwork', 'tech-rag', 'captive-portal'],
  },
  {
    title: { es: 'Desarrollo full-stack', en: 'Full-Stack Development' },
    description: {
      es: 'Aplicaciones web completas, desde el diseño de la base de datos y la API hasta un frontend funcional.',
      en: 'Complete web applications, from database and API design through to a working frontend.',
    },
    evidence: ['guildwork', 'multiagent-code-generator'],
  },
  {
    title: { es: 'Sistemas y redes', en: 'Systems & Networking' },
    description: {
      es: 'Programación de bajo nivel con sockets (incluidos raw sockets AF_PACKET), herramientas de seguridad de red y servicios de servidor en Python y herramientas de sistema en C.',
      en: 'Low-level socket programming (including raw AF_PACKET sockets), network security tooling, and server-side services in Python and systems tooling in C.',
    },
    evidence: ['link-chat', 'captive-portal', 'matcom-guard'],
  },
  {
    title: { es: 'Desarrollo de sitios web', en: 'Website Development' },
    description: {
      es: 'Construcción y publicación de sitios web: landing pages, portfolios y sitios de pequeños negocios.',
      en: 'Building and shipping websites: landing pages, portfolios and small-business sites.',
    },
    evidence: [],
  },
];
