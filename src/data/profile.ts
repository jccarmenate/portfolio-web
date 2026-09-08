export interface SkillGroup {
  category: Record<'es' | 'en', string>;
  items: string[];
}

export interface Profile {
  name: string;
  roleLine: Record<'es' | 'en', string>;
  bio: Record<'es' | 'en', string>;
  skills: SkillGroup[];
  contact: {
    email: string;
    github: string;
  };
}

export const profile: Profile = {
  name: 'Juan Carlos',
  roleLine: {
    es: 'Estudiante de Ciencias de la Computación (último año) — Universidad de La Habana (MatCom)',
    en: 'Final-year Computer Science student — University of Havana (MatCom)',
  },
  bio: {
    es: 'Estudiante de último año de Ciencias de la Computación en la Universidad de La Habana (MatCom), con experiencia construyendo backends en Python y sistemas sobre modelos de lenguaje: fine-tuning de LLMs en producción, pipelines de RAG e infraestructura de agentes. Construyo sistemas completos y funcionales — desde un sistema de recuperación de información hecho módulo a módulo desde cero, hasta un generador de código multiagente que ejecuta y se autocorrige dentro de un sandbox real y aislado. Busco oportunidades como Backend Engineer o AI Engineer.',
    en: "Final-year Computer Science student at the University of Havana (MatCom), with experience building Python backends and systems on top of language models: production LLM fine-tuning, RAG pipelines, and agent infrastructure. I build complete, working systems — from an information retrieval system built module-by-module from scratch, to a multi-agent code generator that runs and self-corrects inside a real, isolated sandbox. Looking for Backend Engineer or AI Engineer opportunities.",
  },
  skills: [
    {
      category: { es: 'Lenguajes de programación', en: 'Programming languages' },
      items: ['Python', 'TypeScript', 'JavaScript', 'C', 'C++', 'Rust', 'SQL'],
    },
    {
      category: { es: 'IA / ML', en: 'AI / ML' },
      items: ['LLM Fine-tuning', 'RAG', 'LangGraph', 'LangChain', 'ChromaDB', 'CLIP', 'Ollama', 'Anthropic API', 'Google ADK'],
    },
    {
      category: { es: 'Backend', en: 'Backend' },
      items: ['FastAPI', 'Express', 'SQLAlchemy', 'Prisma', 'PostgreSQL', 'SQLite', 'REST APIs', 'WebSockets'],
    },
    {
      category: { es: 'Frontend', en: 'Frontend' },
      items: ['React', 'Vite', 'Flutter/Dart'],
    },
    {
      category: { es: 'Sistemas y redes', en: 'Systems & networks' },
      items: ['Sockets (AF_PACKET)', 'iptables', 'nginx', 'GTK+3'],
    },
    {
      category: { es: 'Herramientas', en: 'Tools' },
      items: ['Docker', 'Git', 'GitHub Actions', 'Linux', 'pytest', 'Vitest'],
    },
    {
      category: { es: 'Idiomas', en: 'Languages spoken' },
      items: ['Spanish (native)', 'English (B2)'],
    },
  ],
  contact: {
    email: 'juancarlosmatcom@gmail.com',
    github: 'https://github.com/jccarmenate',
  },
};
