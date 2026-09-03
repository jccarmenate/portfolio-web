export interface Project {
  slug: string;
  title: string;
  description: Record<'es' | 'en', string>;
  stack: string[];
  url: string;
}

export const projects: Project[] = [
  {
    slug: 'tech-rag-information-retrieval-system',
    title: 'Tech RAG Information Retrieval System',
    description: {
      es: 'Sistema de recuperación de información construido módulo a módulo desde cero: índice invertido + TF-IDF, un recuperador de redes de inferencia Bayesianas, un vector store con ChromaDB, un pipeline RAG con proveedor de LLM intercambiable (Ollama/Claude), fusión learning-to-rank, expansión de consultas (Rocchio + WordNet), búsqueda multimodal con CLIP, recomendaciones híbridas, y evaluación IR (Precision@k, MAP, MRR, nDCG, LLM-as-judge).',
      en: 'Full IR system built module-by-module from scratch: custom inverted index + TF-IDF, a Bayesian inference-network retriever, a ChromaDB vector store, a RAG pipeline with a swappable LLM provider (Ollama/Claude), learning-to-rank fusion, query expansion (Rocchio + WordNet), CLIP-based multimodal search, hybrid recommendations, and IR evaluation (Precision@k, MAP, MRR, nDCG, LLM-as-judge).',
    },
    stack: ['Python', 'FastAPI', 'ChromaDB', 'React'],
    url: 'https://github.com/jccarmenate/tech-rag-information-retrieval-system',
  },
  {
    slug: 'multiagent-code-generator',
    title: 'multiagent-code-generator',
    description: {
      es: 'Sistema orquestado con LangGraph donde 8 agentes especializados (analista de spec → arquitecto → diseñador de BD → programadores → revisor) convierten una especificación en lenguaje natural en una app full-stack, la ejecutan en un sandbox de Docker aislado de red y sin privilegios, y se autocorrigen ante fallos reales de pytest/build.',
      en: 'LangGraph-orchestrated system where 8 specialized agents (spec analyst → architect → db designer → coders → reviewer) turn a natural-language spec into a full-stack app, run it in a network-isolated, non-root Docker sandbox, and self-correct on real pytest/build failures.',
    },
    stack: ['Python', 'LangGraph', 'FastAPI', 'Docker', 'React'],
    url: 'https://github.com/jccarmenate/multiagent-code-generator',
  },
  {
    slug: 'guildwork',
    title: 'GuildWork',
    description: {
      es: 'Sistema de gestión de proyectos con tres roles (Admin/PM/Developer), un esquema JWT de dos tokens (access token de corta duración + refresh token httpOnly rotativo) con detección de repetición, y una matriz de autorización en cada ruta del servidor.',
      en: 'Role-based project-management system with three enforced roles (Admin/PM/Developer), a two-token JWT scheme (short-lived access token + rotating httpOnly refresh token) with replay detection, and a server-side authorization matrix backing every route.',
    },
    stack: ['TypeScript', 'Express', 'Prisma', 'React'],
    url: 'https://github.com/jccarmenate/GuildWork',
  },
  {
    slug: 'captive-portal',
    title: 'Captive-Portal',
    description: {
      es: 'Stack completo de portal cautivo: interceptación de tráfico con iptables/ipset por IP+MAC, dnsmasq, terminación TLS con nginx, y un backend de autenticación en Python con hashing PBKDF2, protección CSRF y rate limiting.',
      en: 'Full captive-portal stack: iptables/ipset traffic interception bound to IP+MAC, dnsmasq, nginx TLS termination, and a Python auth backend with PBKDF2 password hashing, CSRF protection, and rate limiting.',
    },
    stack: ['Python', 'nginx', 'iptables'],
    url: 'https://github.com/jccarmenate/Captive-Portal',
  },
];
