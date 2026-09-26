import type { ImageMetadata } from 'astro';
import type { SvgComponent } from 'astro/types';
import type { Localized } from '../i18n/ui';

import techRagCover from '../assets/projects/tech-rag.png';
import multiagentCover from '../assets/projects/multiagent-code-generator.png';
import guildworkCover from '../assets/projects/guildwork.png';
import matcomGuardCover from '../assets/projects/matcom-guard.png';
import populationCover from '../assets/projects/population-simulation.png';
import hexarenaCover from '../assets/projects/hexarena.svg';
import hulkIdeCover from '../assets/projects/hulk-ide.png';
import captivePortalDiagram from '../assets/diagrams/captive-portal.svg';
import linkChatDiagram from '../assets/diagrams/link-chat.svg';
import multiagentGraph from '../assets/diagrams/multiagent-graph.svg';
import techRagArch from '../assets/diagrams/tech-rag-arch.svg';
import multiagentDashboard from '../assets/projects/gallery/multiagent-dashboard.png';
import multiagentLogs from '../assets/projects/gallery/multiagent-logs.png';
import techRagResults from '../assets/projects/gallery/tech-rag-results.png';
import techRagAnswer from '../assets/projects/gallery/tech-rag-answer.png';
import guildworkProjectDetail from '../assets/projects/gallery/guildwork-project-detail.png';
import guildworkTeam from '../assets/projects/gallery/guildwork-team.png';
import guildworkAnalytics from '../assets/projects/gallery/guildwork-analytics.png';

/**
 * What the preview window shows. Screenshots are real captures from each
 * repo's README; diagrams are drawn from the README's own architecture notes
 * and are labelled as such, so nothing pretends to be a UI it isn't.
 */
export type ProjectCover =
  | { kind: 'screenshot'; src: ImageMetadata; alt: Localized }
  | { kind: 'vector'; src: ImageMetadata; alt: Localized }
  | { kind: 'diagram'; src: SvgComponent; alt: Localized };

export interface ProjectImage {
  src: ImageMetadata;
  alt: Localized;
  caption: Localized;
}

export interface CaseStudy {
  description: Localized;
  problem: Localized;
  architecture: Localized;
  diagram?: { src: SvgComponent; alt: Localized };
  table?: { caption: Localized; head: Localized<string[]>; rows: Localized<string[][]> };
  decisions: { title: Localized; body: Localized }[];
  validation: Localized<string[]>;
  gallery: ProjectImage[];
}

export interface Project {
  slug: string;
  title: string;
  /** `owner/name` on GitHub. */
  repo: string;
  /** One line for cards: what it is and what it's for (≤110 chars). */
  summary: Localized;
  /** Shown on wide featured cards. */
  highlights?: Localized<string[]>;
  stack: string[];
  featured?: boolean;
  /** Team size, when it wasn't a solo project. */
  team?: number;
  demo?: string;
  cover: ProjectCover;
  caseStudy?: CaseStudy;
}

export const repoUrl = (project: Project) => `https://github.com/${project.repo}`;

export const projects: Project[] = [
  {
    slug: 'multiagent-code-generator',
    title: 'Multiagent Code Generator',
    repo: 'jccarmenate/multiagent-code-generator',
    featured: true,
    summary: {
      es: 'Convierte una especificación en una app full-stack: 8 agentes LangGraph que se autocorrigen en un sandbox.',
      en: 'Turns a written spec into a full-stack app with 8 LangGraph agents that fix their own errors in a sandbox.',
    },
    highlights: {
      es: [
        'Sandbox Docker sin red, sin root y sin socket de Docker, con límites de CPU y memoria.',
        'Autocorrección ante fallos reales de pytest/build, acotada por circuit breaker y tope de iteraciones.',
        'Panel en vivo por WebSocket; depurado con ejecuciones reales de extremo a extremo.',
      ],
      en: [
        'Docker sandbox with no network, no root and no Docker socket, plus CPU and memory limits.',
        'Self-correction on real pytest/build failures, bounded by a circuit breaker and an iteration cap.',
        'Live WebSocket dashboard; debugged with real end-to-end runs.',
      ],
    },
    stack: ['Python', 'LangGraph', 'FastAPI', 'Docker', 'React', 'WebSockets'],
    cover: {
      kind: 'screenshot',
      src: multiagentCover,
      alt: {
        es: 'Panel en vivo del generador multiagente: ejecución SUCCEEDED, agentes en estado DONE y logs del sandbox.',
        en: 'Live dashboard of the multi-agent generator: a SUCCEEDED run, agents marked DONE, and sandbox logs.',
      },
    },
    caseStudy: {
      description: {
        es: 'Multiagent Code Generator: 8 agentes LangGraph convierten una especificación en una app FastAPI + React, la prueban en Docker aislado y se autocorrigen.',
        en: 'Multiagent Code Generator: 8 LangGraph agents turn a spec into a FastAPI + React app, test it in an isolated Docker sandbox and fix their own errors.',
      },
      problem: {
        es: 'Generar una app full-stack (FastAPI + React) desde una especificación en lenguaje natural no basta: el código que escribe un LLM hay que ejecutarlo y probarlo de verdad, sin poner en riesgo la máquina, y corregirlo hasta que pase. Además, el proceso debía verse en directo.',
        en: "Generating a full-stack app (FastAPI + React) from a natural-language spec isn't enough: LLM-written code has to be actually run and tested, without putting the host at risk, and fixed until it passes. The process also had to be visible live.",
      },
      architecture: {
        es: 'Un grafo de LangGraph reparte el trabajo entre 8 agentes: spec_analyst, architect, db_designer, backend_coder, frontend_coder, test_writer, docker_executor (no es un LLM: ejecuta pytest y npm run build en contenedores aislados) y reviewer, que decide qué agente reintenta. Cada evento se guarda en SQLite y se emite por WebSocket a un panel React que reproduce el historial al reconectar.',
        en: 'A LangGraph graph splits the work across 8 agents: spec_analyst, architect, db_designer, backend_coder, frontend_coder, test_writer, docker_executor (not an LLM: it runs pytest and npm run build in isolated containers) and reviewer, which decides which agent retries. Every event is stored in SQLite and streamed over WebSocket to a React dashboard that replays history on reconnect.',
      },
      diagram: {
        src: multiagentGraph,
        alt: {
          es: 'Grafo de agentes: seis agentes en cadena, docker_executor, reviewer con reintentos y finalización.',
          en: 'Agent graph: six chained agents, docker_executor, reviewer with retries, and finalization.',
        },
      },
      decisions: [
        {
          title: { es: 'Grafo explícito, no un supervisor libre', en: 'Explicit graph, not a free-form supervisor' },
          body: {
            es: 'Casi lineal y con un bucle de corrección acotado, para que el comportamiento sea predecible en una demo en vivo.',
            en: 'Mostly linear with a bounded correction loop, so behavior stays predictable in a live demo.',
          },
        },
        {
          title: { es: 'Un único contrato', en: 'A single contract' },
          body: {
            es: 'El architect produce un ArchitecturePlan (rutas y formas de datos) que leen tanto backend como frontend. Los coders rellenan un esqueleto fijo y nunca inventan la estructura.',
            en: 'The architect produces an ArchitecturePlan (routes and data shapes) that both backend and frontend read. Coders fill a fixed skeleton and never invent the structure.',
          },
        },
        {
          title: { es: 'Sandbox endurecido', en: 'Hardened sandbox' },
          body: {
            es: 'Contenedores hermanos, no Docker-in-Docker: el código generado nunca ve el socket de Docker. Imágenes precompiladas que elige el proyecto, nunca el LLM, network_mode=none, límites de CPU, memoria y procesos, usuario no root, cap_drop=ALL y un reaper que elimina contenedores huérfanos.',
            en: 'Sibling containers, not Docker-in-Docker: generated code never sees the Docker socket. Pre-built images chosen by the project (never by the LLM), network_mode=none, CPU, memory and process limits, a non-root user, cap_drop=ALL and a reaper that removes orphaned containers.',
          },
        },
        {
          title: { es: 'Bucle con frenos', en: 'A loop with brakes' },
          body: {
            es: 'Un circuit breaker corta cuando reaparece el mismo fallo (mismo objetivo de arreglo y misma firma de error) y MAX_ITERATIONS (4 por defecto) pone el tope. Que la salud del backend va primero lo impone el código, no el modelo.',
            en: 'A circuit breaker stops when the same failure (same fix target and error signature) recurs, and MAX_ITERATIONS (default 4) caps it. Backend health taking priority is enforced in code, not left to the model.',
          },
        },
      ],
      validation: {
        es: [
          'Tests de routing, reviewer y prompts, más CI separada para backend y frontend.',
          'Test de integración del WebSocket: al conectar reproduce el historial guardado, en orden.',
          'Ejecuciones reales de extremo a extremo hasta llegar a succeeded con ambos sandboxes en verde.',
          'Esas ejecuciones destaparon bugs que los tests con stubs no veían (rutas duplicadas /api/api, un reviewer que nunca devolvía el fallo al backend, tests que asumían CRUD inexistente). Los de enrutado y del reviewer quedaron con test de regresión; los arreglos de prompts fueron cambios de prompt sin test automático.',
        ],
        en: [
          'Routing, reviewer and prompt tests, plus separate backend and frontend CI.',
          'WebSocket integration test: on connect it replays the stored history in order.',
          'Real end-to-end runs until reaching succeeded with both sandboxes green.',
          "Those runs exposed bugs stubbed tests missed (doubled /api/api routes, a reviewer that never routed back to the backend, tests assuming CRUD that didn't exist). The routing and reviewer bugs got regression tests; the prompt fixes were prompt changes with no automated test.",
        ],
      },
      gallery: [
        {
          src: multiagentDashboard,
          alt: {
            es: 'Panel completo: grafo de agentes, logs, árbol de archivos generados y resultados de tests.',
            en: 'Full dashboard: agent graph, logs, generated file tree and test results.',
          },
          caption: {
            es: 'Ejecución real sin editar con un modelo local (Ollama, qwen2.5-coder:7b): el bucle de autocorrección detectó y corrigió un bug real del backend.',
            en: 'A real, unedited run on a local model (Ollama, qwen2.5-coder:7b): the self-correction loop caught and fixed a real backend bug.',
          },
        },
        {
          src: multiagentLogs,
          alt: {
            es: 'Logs de la iteración 1 con el diagnóstico del reviewer, los tests de backend y el build de frontend superados.',
            en: "Iteration 1 logs with the reviewer's diagnosis, passing backend tests and frontend build.",
          },
          caption: {
            es: 'El reviewer diagnostica el fallo, backend_coder reescribe los archivos y el sandbox confirma: tests superados y build correcto.',
            en: 'The reviewer diagnoses the failure, backend_coder rewrites the files, and the sandbox confirms: tests passed, build OK.',
          },
        },
      ],
    },
  },
  {
    slug: 'tech-rag',
    title: 'Tech RAG',
    repo: 'jccarmenate/tech-rag-information-retrieval-system',
    featured: true,
    summary: {
      es: 'Buscador RAG con índice invertido y red bayesiana propios: cita sus fuentes y se evalúa con métricas IR.',
      en: 'RAG search engine with its own inverted index and Bayesian network: cites sources, evaluated with IR metrics.',
    },
    highlights: {
      es: [
        'Red de inferencia bayesiana (Turtle & Croft) e índice invertido propios, más búsqueda vectorial en ChromaDB; el RAG une los resultados de ambos.',
        'Evaluado con P@k, MAP, MRR y nDCG sobre qrels propios congelados (15 consultas, corpus de 22 documentos).',
        '120+ tests y CI del frontend en GitHub Actions; proveedor de LLM intercambiable (Ollama o Claude).',
      ],
      en: [
        'Custom Bayesian inference network (Turtle & Croft) and inverted index, plus ChromaDB vector search; the RAG pipeline merges both result sets.',
        'Evaluated with P@k, MAP, MRR and nDCG on frozen custom qrels (15 queries, 22-document corpus).',
        '120+ tests and frontend CI on GitHub Actions; swappable LLM provider (Ollama or Claude).',
      ],
    },
    stack: ['Python', 'FastAPI', 'ChromaDB', 'React', 'Docker'],
    cover: {
      kind: 'screenshot',
      src: techRagCover,
      alt: {
        es: 'Interfaz de Tech RAG: búsqueda con el modelo «Bayesian Inference Network», respuesta RAG con citas numeradas y recomendaciones.',
        en: 'Tech RAG interface: a query using the Bayesian Inference Network model, a RAG answer with numbered citations, and recommendations.',
      },
    },
    caseStudy: {
      description: {
        es: 'Tech RAG: buscador RAG hecho desde cero con red de inferencia bayesiana, ChromaDB y respuestas con citas. Evaluado con MAP y nDCG; 120+ tests.',
        en: 'Tech RAG: a RAG search engine built from scratch with a Bayesian inference network, ChromaDB and cited answers. Evaluated with MAP and nDCG; 120+ tests.',
      },
      problem: {
        es: 'Responder preguntas técnicas con información actual de GitHub, Hacker News, StackExchange, Dev.to y arXiv, citando sus fuentes. Es un proyecto personal para construir desde cero cada módulo de un sistema de recuperación de información (adquisición, indexado, recuperación, ranking, RAG y evaluación) sin frameworks de orquestación.',
        en: 'Answer technical questions with current information from GitHub, Hacker News, StackExchange, Dev.to and arXiv, citing its sources. A personal project to build every module of an information retrieval system (acquisition, indexing, retrieval, ranking, RAG and evaluation) from scratch, with no orchestration framework.',
      },
      architecture: {
        es: 'Conectores a 5 APIs, refrescados con APScheduler, alimentan SQLite, un índice invertido propio con TF-IDF y ChromaDB con embeddings. Dos recuperadores (una red de inferencia bayesiana y uno vectorial) alimentan un ranker (relevancia, recencia, autoridad y feedback) y el pipeline RAG, que genera respuestas citadas con Ollama o Anthropic. FastAPI expone la API y una SPA en React (servida por nginx) la consume; CLIP añade búsqueda de imágenes.',
        en: 'Connectors to 5 APIs, refreshed with APScheduler, feed SQLite, a custom TF-IDF inverted index and ChromaDB embeddings. Two retrievers (a Bayesian inference network and a vector one) feed a ranker (relevance, recency, authority and feedback) and the RAG pipeline, which generates cited answers with Ollama or Anthropic. FastAPI exposes the API and a React SPA (served by nginx) consumes it; CLIP adds image search.',
      },
      diagram: {
        src: techRagArch,
        alt: {
          es: 'Arquitectura: 5 fuentes, índice invertido y ChromaDB, red de inferencia bayesiana y recuperador vectorial, RAG y ranker, FastAPI y React.',
          en: 'Architecture: 5 sources, inverted index and ChromaDB, Bayesian inference network and vector retriever, RAG and ranker, FastAPI and React.',
        },
      },
      decisions: [
        {
          title: { es: 'Un recuperador no trivial', en: 'A non-trivial retriever' },
          body: {
            es: 'Una red de inferencia bayesiana (Turtle & Croft, 1991) con noisy-OR sobre nodos documento → término → consulta, seleccionable junto a la búsqueda vectorial.',
            en: 'A Bayesian inference network (Turtle & Croft, 1991) with noisy-OR over document → term → query nodes, selectable alongside vector search.',
          },
        },
        {
          title: { es: 'LLM intercambiable sin tocar código', en: 'Swappable LLM without code changes' },
          body: {
            es: 'Usa Ollama en local por defecto (coste cero) y Anthropic si existe ANTHROPIC_API_KEY.',
            en: 'Local Ollama by default (zero cost), Anthropic when ANTHROPIC_API_KEY is set.',
          },
        },
        {
          title: { es: 'Si el corpus se queda corto, busca en la web', en: 'Web search when the corpus falls short' },
          body: {
            es: 'Detecta insuficiencia por volumen, calidad o cobertura, consulta DuckDuckGo e indexa lo encontrado para futuras consultas.',
            en: 'Detects insufficiency by volume, quality or coverage, queries DuckDuckGo and indexes the results for future queries.',
          },
        },
        {
          title: { es: 'Evaluación reproducible', en: 'Reproducible evaluation' },
          body: {
            es: 'Las métricas se calculan sobre un corpus y unos qrels propios congelados, independientes del corpus vivo.',
            en: 'Metrics run against a frozen custom corpus and qrels, independent of the live corpus.',
          },
        },
      ],
      validation: {
        es: [
          'Precision@k, Recall@k, MAP, MRR y nDCG (scripts/evaluate.py o POST /api/evaluation/run) sobre 15 consultas y un corpus de 22 documentos, solo para el recuperador bayesiano.',
          'Módulo de fidelidad del RAG con LLM-as-judge, implementado y con tests (aún no integrado en scripts/evaluate.py).',
          'Más de 120 tests en pytest; Vitest y Testing Library en el frontend.',
          'CI en GitHub Actions para el frontend (lint, tipos y tests).',
        ],
        en: [
          'Precision@k, Recall@k, MAP, MRR and nDCG (scripts/evaluate.py or POST /api/evaluation/run) over 15 queries and a 22-document corpus, for the Bayesian retriever only.',
          'RAG-faithfulness module using an LLM judge: implemented and unit-tested, not yet wired into scripts/evaluate.py.',
          '120+ pytest tests; Vitest and Testing Library on the frontend.',
          'GitHub Actions CI for the frontend (lint, types and tests).',
        ],
      },
      gallery: [
        {
          src: techRagResults,
          alt: {
            es: 'Resultados rankeados de arXiv con porcentaje de coincidencia, barra de relevancia y botones de voto.',
            en: 'Ranked arXiv results with match percentage, relevance bar and vote buttons.',
          },
          caption: {
            es: 'Cada resultado muestra su puntuación; los votos realimentan el ranking y las recomendaciones.',
            en: 'Each result shows its score; votes feed back into ranking and recommendations.',
          },
        },
        {
          src: techRagAnswer,
          alt: {
            es: 'Panel de respuesta RAG con citas numeradas y la lista de fuentes enlazadas.',
            en: 'RAG answer panel with numbered citations and the linked source list.',
          },
          caption: {
            es: 'La respuesta enlaza sus fuentes con citas numeradas; el prompt le pide avisar cuando no cubren la pregunta.',
            en: "The answer links its sources with numbered citations; the prompt asks it to say when they don't cover the question.",
          },
        },
      ],
    },
  },
  {
    slug: 'guildwork',
    title: 'GuildWork',
    repo: 'jccarmenate/GuildWork',
    featured: true,
    summary: {
      es: 'Gestor de proyectos con 3 roles, permisos comprobados en el servidor y JWT con rotación y detección de reuso.',
      en: 'Project manager with 3 roles, server-enforced permissions and JWT auth with rotation and reuse detection.',
    },
    highlights: {
      es: [
        'Access token de 15 min en memoria y refresh de 30 días en cookie httpOnly, guardado solo como hash SHA-256.',
        'Reutilizar un refresh token revoca todas las sesiones del usuario.',
        'Matriz de permisos cubierta por tests; 404 en vez de 403 en el detalle de proyecto, para no revelar qué existe.',
      ],
      en: [
        '15-minute in-memory access token and 30-day httpOnly refresh cookie, stored only as a SHA-256 hash.',
        "Reusing a refresh token revokes all of the user's sessions.",
        "Permission matrix covered by tests; 404 instead of 403 on project detail, so it doesn't reveal what exists.",
      ],
    },
    stack: ['TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'React'],
    cover: {
      kind: 'screenshot',
      src: guildworkCover,
      alt: {
        es: 'Dashboard de GuildWork con indicadores y gráfico de bugs por severidad (datos de demostración).',
        en: 'GuildWork dashboard with KPIs and a bugs-by-severity chart (demo data).',
      },
    },
    caseStudy: {
      description: {
        es: 'GuildWork: gestor de proyectos con 3 roles, permisos en el servidor cubiertos por tests, access JWT y refresh opaco rotativo con detección de reuso.',
        en: 'GuildWork: project manager with 3 roles, server-enforced permissions covered by tests, access JWT plus rotating opaque refresh token with reuse detection.',
      },
      problem: {
        es: 'Gestor de proyectos modelado sobre una consultora de software (proyecto personal, con datos de demostración): Admins y PMs llevan clientes, proyectos y bugs, y cada Developer solo ve lo que tiene asignado. El foco es la seguridad: que robar un token sirva de poco, que las sesiones se puedan revocar y que los permisos se apliquen en el servidor.',
        en: "A project manager modelled on a software consultancy (a personal project with demo data): Admins and PMs run clients, projects and bugs, while each Developer only sees what they're assigned. The focus is security: a stolen token should be worth little, sessions must be revocable, and permissions enforced server-side.",
      },
      architecture: {
        es: 'Monorepo con npm workspaces. El backend usa Express + TypeScript y PostgreSQL vía Prisma, con handlers finos, módulos de auth y autorización testables por separado y validación con zod. El frontend usa React + Vite, TanStack Query y Recharts; su wrapper de fetch captura un 401, hace un refresco silencioso por cookie y repite la petición una sola vez. Incluye auditoría, informes PDF y emails.',
        en: 'npm-workspaces monorepo. The backend uses Express + TypeScript and PostgreSQL via Prisma, with thin handlers, independently testable auth and authorization modules, and zod validation. The frontend uses React + Vite, TanStack Query and Recharts; its fetch wrapper catches a 401, silently refreshes via cookie and replays the request exactly once. Includes an audit log, PDF reports and emails.',
      },
      table: {
        caption: {
          es: 'Extracto de la matriz de autorización (se aplica en el servidor)',
          en: 'Excerpt of the authorization matrix (enforced server-side)',
        },
        head: {
          es: ['Acción', 'Admin', 'PM', 'Developer'],
          en: ['Action', 'Admin', 'PM', 'Developer'],
        },
        rows: {
          es: [
            ['Gestionar clientes', '✓', '✓', '403'],
            ['Ver el detalle de un proyecto', '✓', '✓', 'Solo si está asignado (si no, 404)'],
            ['Reasignar un bug o cambiar su severidad', '✓', '✓', '403, incluso en sus propios bugs'],
            ['Cambiar el rol de un usuario', '✓', '403', '403'],
            ['Ver analíticas', '✓', '✓', '403'],
          ],
          en: [
            ['Manage clients', '✓', '✓', '403'],
            ["View a project's detail", '✓', '✓', 'Only if assigned (404 otherwise)'],
            ['Reassign a bug or change its severity', '✓', '✓', '403, even on their own bugs'],
            ["Change a user's role", '✓', '403', '403'],
            ['View analytics', '✓', '✓', '403'],
          ],
        },
      },
      decisions: [
        {
          title: { es: 'Access token solo en memoria (15 min)', en: 'Access token in memory only (15 min)' },
          body: {
            es: 'Nunca en localStorage: lo que un XSS puede leer del almacenamiento persistente equivale a una sesión robada.',
            en: 'Never in localStorage: anything XSS can read from persistent storage is a stolen session.',
          },
        },
        {
          title: {
            es: 'Refresh opaco de 30 días en cookie httpOnly',
            en: 'Opaque 30-day refresh in an httpOnly cookie',
          },
          body: {
            es: 'Con SameSite=Strict. El servidor solo guarda su hash SHA-256, así que un volcado de la base de datos no sirve para reutilizarlo.',
            en: "With SameSite=Strict. The server stores only its SHA-256 hash, so a database dump can't be replayed.",
          },
        },
        {
          title: { es: 'Rotación con detección de reuso', en: 'Rotation with reuse detection' },
          body: {
            es: 'Cada refresco revoca el token anterior. Presentar uno ya revocado se trata como robo y revoca todos los tokens del usuario.',
            en: "Each refresh revokes the previous token. Presenting an already-revoked one is treated as theft and revokes all of the user's tokens.",
          },
        },
        {
          title: { es: '403 frente a 404', en: '403 vs 404' },
          body: {
            es: '403 significa «tu rol no puede» y 404 «no existe para ti», así que un Developer no puede sondear qué proyectos existen. La UI oculta acciones, pero la puerta real es el servidor.',
            en: "403 means “your role can't” and 404 “doesn't exist for you”, so a Developer can't probe which projects exist. The UI hides actions, but the server is the real gate.",
          },
        },
      ],
      validation: {
        es: [
          'La suite del backend (Vitest, Prisma mockeado) prioriza la matriz de autorización: misma petición y respuesta correcta para Admin, PM y Developer.',
          'Cubre la restricción por campo en bugs y la detección de reuso del refresh token.',
          'Frontend probado con Vitest y Testing Library.',
          'Configuración de producción: cookie Secure, redirección HTTPS de respaldo y noindex (app privada).',
        ],
        en: [
          'The backend suite (Vitest, mocked Prisma) prioritizes the authorization matrix: same request, correct response for Admin, PM and Developer.',
          'Covers the per-field bug restriction and refresh-token reuse detection.',
          'Frontend tested with Vitest and Testing Library.',
          'Production configuration: Secure cookie, a backstop HTTPS redirect and noindex (private app).',
        ],
      },
      gallery: [
        {
          src: guildworkProjectDetail,
          alt: {
            es: 'Detalle de proyecto: desarrolladores asignados, skills requeridas y bugs con comentarios (datos de demostración).',
            en: 'Project detail: assigned developers, required skills and bugs with comments (demo data).',
          },
          caption: {
            es: 'Bugs con comentarios en hilo, adjuntos e informe PDF por proyecto.',
            en: 'Bugs with threaded comments, attachments and a per-project PDF report.',
          },
        },
        {
          src: guildworkTeam,
          alt: {
            es: 'Tabla del equipo con seniority, skills, mentor, carga de trabajo y selector de rol (datos de demostración).',
            en: 'Team table with seniority, skills, mentor, workload and role selector (demo data).',
          },
          caption: {
            es: 'Solo un Admin puede cambiar roles, y cada cambio queda en el log de auditoría.',
            en: 'Only an Admin can change roles, and every change is recorded in the audit log.',
          },
        },
        {
          src: guildworkAnalytics,
          alt: {
            es: 'Analíticas: bugs por severidad, top performers y porcentaje de proyectos completados (datos de demostración).',
            en: 'Analytics: bugs by severity, top performers and project completion rates (demo data).',
          },
          caption: {
            es: 'Analíticas visibles solo para Admin y PM (403 para Developer).',
            en: 'Analytics visible only to Admin and PM (403 for Developers).',
          },
        },
      ],
    },
  },
  {
    slug: 'captive-portal',
    title: 'Captive Portal',
    repo: 'jccarmenate/Captive-Portal',
    team: 2,
    summary: {
      es: 'Portal cautivo, como el Wi-Fi de un hotel: iptables/ipset por IP+MAC, nginx con TLS y login con PBKDF2.',
      en: 'Captive portal, like hotel Wi-Fi: iptables/ipset per IP+MAC, nginx TLS and a PBKDF2 login with rate limits.',
    },
    stack: ['Python', 'nginx', 'iptables', 'dnsmasq'],
    cover: {
      kind: 'diagram',
      src: captivePortalDiagram,
      alt: {
        es: 'Diagrama del flujo del portal cautivo: cliente, iptables, nginx con TLS, login con PBKDF2, ipset por IP y MAC, e internet.',
        en: 'Captive portal flow diagram: client, iptables, nginx with TLS, PBKDF2 login, ipset keyed on IP and MAC, and internet.',
      },
    },
  },
  {
    slug: 'link-chat',
    title: 'Link-Chat',
    repo: 'jccarmenate/Link-Chat',
    team: 2,
    summary: {
      es: 'Chat P2P sin servidor: protocolo propio sobre Ethernet (AF_PACKET, CRC16) y app Flutter cifrada.',
      en: 'P2P chat with no server: a custom raw-Ethernet protocol (AF_PACKET, CRC16) and an encrypted Flutter app.',
    },
    stack: ['Python', 'Flutter/Dart', 'Docker'],
    cover: {
      kind: 'diagram',
      src: linkChatDiagram,
      alt: {
        es: 'Diagrama de la trama Ethernet de Link-Chat: MAC destino y origen, EtherType 0x88B5, carga cifrada con ChaCha20-Poly1305 y CRC16.',
        en: 'Link-Chat Ethernet frame diagram: destination and source MAC, EtherType 0x88B5, ChaCha20-Poly1305 encrypted payload, and CRC16.',
      },
    },
  },
  {
    slug: 'matcom-guard',
    title: 'MatCom Guard',
    repo: 'jccarmenate/MatCom-Guard',
    team: 3,
    summary: {
      es: 'Monitor de seguridad en C que vigila USB, procesos y puertos en tiempo real, con interfaz GTK multihilo.',
      en: 'Real-time security monitor in C that watches USB devices, processes and ports, with a multithreaded GTK UI.',
    },
    stack: ['C', 'GTK+3', 'pthreads'],
    cover: {
      kind: 'screenshot',
      src: matcomGuardCover,
      alt: {
        es: 'Monitor de procesos de MatCom Guard: lista de procesos con PID, CPU, memoria y estado.',
        en: 'MatCom Guard process monitor: process list with PID, CPU, memory, and status.',
      },
    },
  },
  {
    slug: 'population-simulation',
    title: 'Population Simulation',
    repo: 'jccarmenate/Population-Simulation',
    summary: {
      es: 'Simulador de población y epidemias (modelo SEIR) vectorizado con NumPy, con app interactiva en Streamlit.',
      en: 'Population and epidemic simulator (SEIR model) vectorized with NumPy, with an interactive Streamlit app.',
    },
    stack: ['Python', 'NumPy', 'Streamlit'],
    cover: {
      kind: 'screenshot',
      src: populationCover,
      alt: {
        es: 'App de Streamlit: curvas de expuestos, infecciosos y recuperados del modelo SEIR a lo largo de 100 años.',
        en: 'Streamlit app: exposed, infectious, and recovered curves from the SEIR model over 100 years.',
      },
    },
  },
  {
    slug: 'hexarena',
    title: 'HexArena',
    repo: 'jccarmenate/HexArena',
    summary: {
      es: 'Hex para Windows en un único .exe, con IA MCTS + RAVE adaptada de un proyecto universitario; local y en red.',
      en: 'Hex for Windows in one .exe, with an MCTS + RAVE AI adapted from a university project; local and networked.',
    },
    stack: ['Python', 'pywebview'],
    cover: {
      kind: 'vector',
      src: hexarenaCover,
      alt: {
        es: 'Tablero de Hex 7×7 con un camino rojo ganador que une los bordes superior e inferior.',
        en: '7×7 Hex board with a winning red path connecting the top and bottom edges.',
      },
    },
  },
  {
    slug: 'hulk-ide',
    title: 'HULK IDE',
    repo: 'jccarmenate/hulk-ide',
    summary: {
      es: 'IDE personal para HULK (LSP + VS Code) sobre el compilador Rust/LLVM hecho en equipo de 3.',
      en: 'Personal HULK IDE (LSP + VS Code) on top of a Rust/LLVM compiler built by a team of 3.',
    },
    stack: ['Rust', 'TypeScript', 'LLVM', 'LSP'],
    cover: {
      kind: 'screenshot',
      src: hulkIdeCover,
      alt: {
        es: 'Terminal con hulk-cli sobre LLVM 17: código HULK con una jerarquía de figuras y las áreas calculadas.',
        en: 'Terminal running hulk-cli on LLVM 17: HULK source with a shape hierarchy and the computed areas.',
      },
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
