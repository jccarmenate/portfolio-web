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
  name: 'Juan Carlos Carmenate',
  roleLine: {
    es: 'Estudiante de Ciencias de la Computación (último año) — Universidad de La Habana (MatCom)',
    en: 'Final-year Computer Science student — University of Havana (MatCom)',
  },
  bio: {
    es: 'Estudiante de último año de Ciencias de la Computación en la Universidad de La Habana (MatCom), con experiencia construyendo backends en Python y sistemas sobre modelos de lenguaje: fine-tuning de LLMs en producción, pipelines de RAG e infraestructura de agentes. Me gusta construir sistemas completos y funcionales — desde un sistema de recuperación de información hecho módulo a módulo desde cero, hasta un generador de código multiagente que ejecuta y se autocorrige dentro de un sandbox real y aislado. Busco oportunidades como Backend Engineer o AI Engineer.',
    en: "Final-year Computer Science student at the University of Havana (MatCom), with experience building Python backends and systems on top of language models: production LLM fine-tuning, RAG pipelines, and agent infrastructure. I like building complete, working systems — from an information retrieval system built module-by-module from scratch, to a multi-agent code generator that runs and self-corrects inside a real, isolated sandbox. Looking for Backend Engineer or AI Engineer opportunities.",
  },
  skills: [
    {
      category: { es: 'Backend', en: 'Backend' },
      items: ['Python', 'FastAPI', 'Node.js', 'Express'],
    },
    {
      category: { es: 'Frontend', en: 'Frontend' },
      items: ['React', 'Flutter/Dart'],
    },
    {
      category: { es: 'IA / Agentes', en: 'AI / Agents' },
      items: ['LangChain/LangGraph', 'RAG', 'ChromaDB', 'Google ADK'],
    },
    {
      category: { es: 'Bases de datos', en: 'Databases' },
      items: ['PostgreSQL', 'Prisma', 'ChromaDB'],
    },
    {
      category: { es: 'Sistemas y redes', en: 'Systems & networks' },
      items: ['C', 'Sockets', 'iptables', 'nginx', 'GTK+3'],
    },
    {
      category: { es: 'Herramientas', en: 'Tools' },
      items: ['Docker', 'GitHub Actions', 'Rust'],
    },
  ],
  contact: {
    email: 'juancarlosmatcom@gmail.com',
    github: 'https://github.com/jccarmenate',
  },
};
