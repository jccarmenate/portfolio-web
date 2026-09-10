export interface Project {
  slug: string;
  title: string;
  description: Record<'es' | 'en', string>;
  stack: string[];
  url: string;
  image?: string;
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
    image: '/projects/tech-rag.png',
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
    image: '/projects/multiagent-code-generator.png',
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
    image: '/projects/guildwork.png',
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
  {
    slug: 'link-chat',
    title: 'Link-Chat',
    description: {
      es: 'Mensajería P2P sin servidor central: cliente de escritorio a nivel de enlace sobre sockets AF_PACKET (framing manual con CRC16, EtherType propio) y cliente móvil en Flutter con descubrimiento por UDP y cifrado X25519 + ChaCha20-Poly1305 por conexión. Proyecto en equipo de 2.',
      en: 'Server-less P2P messaging: a desktop client at the link layer over raw AF_PACKET sockets (manual CRC16 framing, custom EtherType) and a Flutter mobile client with UDP discovery and per-connection X25519 + ChaCha20-Poly1305 encryption. Built with a team of 2.',
    },
    stack: ['Python', 'Flutter/Dart', 'Docker'],
    url: 'https://github.com/jccarmenate/Link-Chat',
  },
  {
    slug: 'matcom-guard',
    title: 'MatCom Guard',
    description: {
      es: 'Monitor de seguridad UNIX en tiempo real: forensia de dispositivos USB con snapshots y hashes SHA-256, detección de anomalías de CPU/memoria por proceso, y escáner de puertos — todo con arquitectura multihilo thread-safe y exportación de reportes PDF.',
      en: 'Real-time UNIX security monitor: USB device forensics with snapshots and SHA-256 hashes, per-process CPU/memory anomaly detection, and a port scanner — all behind a thread-safe multi-threaded architecture with PDF report export.',
    },
    stack: ['C', 'GTK+3', 'pthreads'],
    url: 'https://github.com/jccarmenate/MatCom-Guard-SO-Project',
  },
  {
    slug: 'population-simulation',
    title: 'Population-Simulation',
    description: {
      es: 'Simulación de eventos discretos de una población con motor 100% vectorizado en NumPy (generador congruencial lineal propio, vectorizado con block-doubling), un modelo epidemiológico SEIR multivariante con reinfección y escape inmune, y una app interactiva en Streamlit para explorar cada parámetro.',
      en: 'Discrete-event population simulation with a fully NumPy-vectorized engine (a custom linear congruential generator, vectorized via block-doubling), a multi-variant SEIR epidemic model with reinfection and immune escape, and an interactive Streamlit app to explore every parameter.',
    },
    stack: ['Python', 'NumPy', 'Streamlit'],
    url: 'https://github.com/jccarmenate/Population-Simulation',
    image: '/projects/population-simulation.png',
  },
  {
    slug: 'hexarena',
    title: 'HexArena',
    description: {
      es: 'Juego de Hex de escritorio para Windows con IA propia (MCTS + RAVE, sesgo de distancia con Dijkstra, reconocimiento de puentes), empaquetado como un único .exe portable — modos contra la IA, local y en red.',
      en: 'Desktop Hex game for Windows with a self-built AI (MCTS + RAVE, Dijkstra distance bias, bridge recognition), packaged as a single portable .exe — vs-AI, local hotseat, and networked play.',
    },
    stack: ['Python', 'pywebview'],
    url: 'https://github.com/jccarmenate/HexArena',
    image: '/projects/hexarena.svg',
  },
];
