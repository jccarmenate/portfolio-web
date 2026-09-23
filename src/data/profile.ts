import type { Localized } from '../i18n/ui';

export interface SkillGroup {
  category: Localized;
  items: string[];
}

export interface Profile {
  name: string;
  /** Only used in structured data (JSON-LD); the visible site shows `name`. */
  fullName: string;
  /** Short bio used for structured data and as the fallback description. */
  bio: Localized;
  /** The handful of technologies shown right under the hero. */
  coreStack: string[];
  skills: SkillGroup[];
  languages: Localized<string[]>;
  contact: {
    email: string;
    github: string;
    linkedin?: string;
  };
}

export const profile: Profile = {
  name: 'Juan Carlos',
  fullName: 'Juan Carlos Carmenate',
  bio: {
    es: 'Estudiante de último año de Ciencias de la Computación en la Universidad de La Habana (MatCom). Construyo backends en Python y sistemas con LLMs: RAG, agentes y fine-tuning. Busco oportunidades como Backend Engineer o AI Engineer.',
    en: 'Final-year Computer Science student at the University of Havana (MatCom). I build Python backends and LLM systems: RAG, agents and fine-tuning. Looking for Backend Engineer or AI Engineer opportunities.',
  },
  coreStack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'LangGraph', 'RAG'],
  skills: [
    {
      category: { es: 'IA / ML', en: 'AI / ML' },
      items: ['LLM fine-tuning', 'RAG', 'LangGraph', 'LangChain', 'ChromaDB', 'CLIP', 'Ollama', 'Anthropic API', 'Google ADK'],
    },
    {
      category: { es: 'Backend', en: 'Backend' },
      items: ['FastAPI', 'Express', 'SQLAlchemy', 'Prisma', 'PostgreSQL', 'SQLite', 'REST APIs', 'WebSockets'],
    },
    {
      category: { es: 'Lenguajes de programación', en: 'Programming languages' },
      items: ['Python', 'TypeScript', 'JavaScript', 'C', 'C++', 'Rust', 'SQL'],
    },
    {
      category: { es: 'Herramientas', en: 'Tools' },
      items: ['Docker', 'Git', 'GitHub Actions', 'Linux', 'pytest', 'Vitest'],
    },
    {
      category: { es: 'Sistemas y redes', en: 'Systems & networks' },
      items: ['Sockets (AF_PACKET)', 'iptables', 'nginx', 'GTK+3'],
    },
    {
      category: { es: 'Frontend', en: 'Frontend' },
      items: ['React', 'Vite', 'Flutter/Dart'],
    },
  ],
  languages: {
    es: ['Español (nativo)', 'Inglés (B2)'],
    en: ['Spanish (native)', 'English (B2)'],
  },
  contact: {
    email: 'juancarlosmatcom@gmail.com',
    github: 'https://github.com/jccarmenate',
  },
};
