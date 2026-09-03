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
    es: 'Soy estudiante de Ciencias de la Computación (último año) en la Universidad de La Habana (MatCom). Me gusta construir sistemas completos y funcionales: sistemas de IA agéntica que orquestan múltiples agentes LLM sobre un sandbox de ejecución real y aislado; recuperación de información e IA construidas desde cero en vez de con frameworks de orquestación prearmados; aplicaciones full-stack con autenticación real, jobs en segundo plano y funciones de IA que degradan con elegancia sin API key; programación de sistemas y redes a nivel de socket/kernel; y simulación, juegos y quant — un modelo epidemiológico vectorizado, una IA de juego MCTS hecha desde cero, y un dashboard de finanzas cuantitativas en vivo.',
    en: "I'm a final-year Computer Science student at the University of Havana (MatCom) who likes shipping complete, working systems: agentic AI systems that orchestrate multiple LLM agents against a real, isolated execution sandbox; information retrieval and AI built from first principles rather than off-the-shelf orchestration frameworks; full-stack apps with real authentication, background jobs, and LLM features that degrade gracefully without an API key; systems and networks programming down at the socket/kernel level; and simulation, games and quant work — a vectorized epidemiological model, a from-scratch MCTS game AI, and a live quant-finance dashboard.",
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
