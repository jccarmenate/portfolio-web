# Portfolio Astro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Juan Carlos's personal portfolio site: an Astro + Tailwind static site that closely replicates the visual design and layout of https://leynier.dev/ (dot-grid background, dashed decorative borders, timeline, sketch-hover project cards, pill badges/buttons), but with Juan Carlos's own content, an emerald accent instead of sky-blue, and a reduced section set (Hero, Experience, Projects, Services — no blog).

**Architecture:** Single Astro project, output fully static. Content lives in typed TypeScript data files under `src/data/`; UI strings live in two small dictionaries under `src/i18n/` (`es`, `en`). Astro's built-in i18n routing serves Spanish at `/` (default) and English at `/en/`, both pages rendering the same set of components against the locale's data slice. Dark mode is a `dark` class on `<html>` toggled by a small client script and persisted to `localStorage`, applied before paint via an inline head script to avoid a flash of the wrong theme.

**Tech Stack:** Astro (latest stable), TypeScript (strict), Tailwind CSS v4 (via `@tailwindcss/vite`), no UI framework (plain `.astro` components + minimal vanilla `<script>` for the two client-side toggles), no test framework (static content — verification is `astro check` + `astro build` + manual browser checks).

**Spec:** [docs/superpowers/specs/2026-09-03-portfolio-astro-design.md](../specs/2026-09-03-portfolio-astro-design.md)

## Global Constraints

- Stack is fixed: Astro + TypeScript + Tailwind CSS, static output. No CMS, no blog.
- i18n: Spanish is the default locale at `/`; English lives at `/en/`. No client-side language state — the toggle is a plain link between the two routes.
- Dark mode: class-based (`.dark` on `<html>`), persisted in `localStorage`, initialized via a blocking inline `<script>` in `<head>` (never a flash of unstyled/wrong theme).
- Accent color mapping (leynier.dev → this site): solid accent `sky-400` → `emerald-400`; multi-stop gradient `#ffdb3b → #53c2fe → #5e51ea → #0044ff` (135deg) → `#a3e635 → #34d399 → #14b8a6 → #0891b2` (135deg). Use these exact hex stops everywhere a gradient is called for.
- Neutral grays (`bg-white`/`dark:bg-neutral-950`, `text-neutral-*`, `border-neutral-*`) stay as Tailwind's default neutral scale — unchanged from the source site, since they're structural, not identity color.
- No unit test framework. Verification per task is `astro check` (types/routes), `npm run build` (production build must succeed), and a manual check in the browser preview.
- Avatar and project preview images are generated placeholders (initials-based) — real assets are a later, out-of-plan swap.
- LinkedIn is omitted from contact/footer (not created yet).
- All real content (name, bio, skills, experience, the 4 featured projects, services, contact) comes from the spec's "Content" section — copy it verbatim, translating only where the spec gives both ES and EN text.

---

## File Structure

```
portfolio-astro/
  astro.config.mjs
  package.json
  tsconfig.json
  public/
    favicon.svg
    logo.svg
    avatar-placeholder.svg
  src/
    styles/
      global.css              # Tailwind import, dark variant, gradient/dot-grid utility classes
    lib/
      getInitials.ts           # "Juan Carlos" -> "JC"
      gradient.ts               # deterministic 2-color gradient per project slug
    i18n/
      ui.ts                      # Lang type + getLangFromUrl()
      es.ts                       # Spanish UI strings (nav, section headings, footer)
      en.ts                        # English UI strings
    data/
      profile.ts                   # name, role line, bio (es/en), skills, contact
      experience.ts                 # timeline entries
      projects.ts                    # 4 featured projects
      services.ts                     # 2 service offerings
    components/
      DotGridBackground.astro
      ThemeToggle.astro
      LangToggle.astro
      Nav.astro
      Footer.astro
      AvatarFrame.astro
      SkillsList.astro
      Button.astro
      Hero.astro
      Badge.astro
      ExperienceTimeline.astro
      ProjectPreview.astro
      ProjectCard.astro
      ProjectsSection.astro
      ServicesSection.astro
    layouts/
      BaseLayout.astro
    pages/
      index.astro                 # es (default locale)
      en/
        index.astro                 # en
```

Each `*Section`-style component (`ExperienceTimeline`, `ProjectsSection`, `ServicesSection`) owns its own `<section id="...">` wrapper and heading, so `pages/index.astro` / `pages/en/index.astro` are just a flat list of `<Hero /> <ExperienceTimeline /> <ProjectsSection /> <ServicesSection />` inside `BaseLayout`.

---

### Task 1: Project scaffold — Astro + Tailwind v4 + design-token CSS

**Files:**
- Create (via scaffold CLI): `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `public/favicon.svg`
- Create: `src/styles/global.css`
- Modify: `astro.config.mjs` (add Tailwind Vite plugin + i18n config)

**Interfaces:**
- Produces: `src/styles/global.css` exposing utility classes `.gradient-text`, `.gradient-border`, `.dot-grid` (with `::before` dot layer), and Tailwind's `dark:` variant driven by a `.dark` class (not OS preference) via `@custom-variant dark (&:where(.dark, .dark *));`.

- [ ] **Step 1: Scaffold the Astro project**

Run inside `portfolio-astro/` (already has `docs/` and `.git/` from the design-spec step):

```bash
npm create astro@latest . -- --template minimal --typescript strict --no-git --yes
```

If the CLI prompts about the directory not being empty, choose to continue anyway (only `docs/` and `.git/` exist so far).

- [ ] **Step 2: Verify the bare scaffold builds**

Run: `npm run build`
Expected: exits 0, `dist/` is created with an `index.html`.

- [ ] **Step 3: Install Tailwind v4**

```bash
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 4: Wire Tailwind into Astro config**

Replace the contents of `astro.config.mjs` with:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 5: Create the global stylesheet with design tokens**

Create `src/styles/global.css`:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@layer utilities {
  .gradient-text {
    background-image: linear-gradient(135deg, #a3e635 0%, #34d399 35%, #14b8a6 65%, #0891b2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .gradient-border {
    position: relative;
  }
  .gradient-border::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(135deg, #a3e635 0%, #34d399 35%, #14b8a6 65%, #0891b2 100%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .dot-grid {
    position: relative;
  }
  .dot-grid::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(currentColor 1px, transparent 1%);
    background-size: 50px 50px;
    color: var(--color-neutral-300);
    opacity: 0.5;
    pointer-events: none;
  }
  .dark .dot-grid::before {
    color: var(--color-neutral-800);
  }
}
```

- [ ] **Step 6: Import the stylesheet and verify Tailwind renders**

Edit `src/pages/index.astro` (whatever the scaffold generated) so its frontmatter starts with:

```astro
---
import '../styles/global.css';
---
```

and its body contains at least one Tailwind-styled element, e.g. `<h1 class="text-4xl font-bold text-emerald-400">Hola</h1>`.

Run: `npm run dev`, open the browser preview at `http://localhost:4321`.
Expected: text renders large, bold, emerald-colored — confirms Tailwind is active.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Scaffold Astro + Tailwind v4 with design-token stylesheet"
```

---

### Task 2: i18n dictionaries and content data files

**Files:**
- Create: `src/i18n/ui.ts`
- Create: `src/i18n/es.ts`
- Create: `src/i18n/en.ts`
- Create: `src/data/profile.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/services.ts`

**Interfaces:**
- Produces: `Lang` type (`'es' | 'en'`) from `src/i18n/ui.ts`, consumed as the `lang` prop type by every component in later tasks; `es`/`en` dictionary objects (shape: `{ nav: {...}, sections: {...}, hero: {...}, footer: {...} }`) from `src/i18n/es.ts` / `en.ts`; `profile: Profile`, `experience: ExperienceEntry[]`, `projects: Project[]`, `services: Service[]` — all consumed by components in later tasks. (`getLangFromUrl` is included in `ui.ts` as a small utility but isn't called anywhere in this plan — both pages set `lang` as a literal constant since each is a fixed, single-locale route.)

- [ ] **Step 1: Language helper**

Create `src/i18n/ui.ts`:

```ts
export type Lang = 'es' | 'en';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'es';
}
```

- [ ] **Step 2: UI string dictionaries**

Create `src/i18n/es.ts`:

```ts
export const es = {
  nav: {
    home: 'Inicio',
    experience: 'Experiencia',
    projects: 'Proyectos',
    services: 'Servicios',
  },
  hero: {
    greeting: 'Hola',
    intro: 'mi nombre es',
    ctaServices: 'Ver mis servicios',
  },
  sections: {
    experience: 'Experiencia destacada',
    projects: 'Proyectos destacados',
    services: 'Servicios',
  },
  footer: {
    rights: 'Todos los derechos reservados',
  },
};
```

Create `src/i18n/en.ts`:

```ts
export const en = {
  nav: {
    home: 'Home',
    experience: 'Experience',
    projects: 'Projects',
    services: 'Services',
  },
  hero: {
    greeting: 'Hello',
    intro: 'my name is',
    ctaServices: 'See my services',
  },
  sections: {
    experience: 'Highlighted Experience',
    projects: 'Highlighted Projects',
    services: 'Services',
  },
  footer: {
    rights: 'All rights reserved',
  },
};
```

- [ ] **Step 3: Profile data**

Create `src/data/profile.ts`:

```ts
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
```

- [ ] **Step 4: Experience data**

Create `src/data/experience.ts`:

```ts
export interface ExperienceEntry {
  dateRange: Record<'es' | 'en', string>;
  title: Record<'es' | 'en', string>;
  org: string;
  orgUrl?: string;
  description: Record<'es' | 'en', string>;
  tags: string[];
}

export const experience: ExperienceEntry[] = [
  {
    dateRange: { es: '2022 – Presente', en: '2022 – Present' },
    title: {
      es: 'Estudiante de Ciencias de la Computación',
      en: 'Computer Science Student',
    },
    org: 'Universidad de La Habana (MatCom)',
    description: {
      es: 'Último año de la carrera, enfocado en sistemas de IA agéntica, recuperación de información, desarrollo full-stack y sistemas/redes.',
      en: 'Final year of the program, focused on agentic AI systems, information retrieval, full-stack development, and systems/networks.',
    },
    tags: ['Python', 'TypeScript', 'AI/ML', 'Full-Stack'],
  },
];
```

- [ ] **Step 5: Projects data**

Create `src/data/projects.ts`:

```ts
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
```

- [ ] **Step 6: Services data**

Create `src/data/services.ts`:

```ts
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
```

- [ ] **Step 7: Type-check**

Run: `npx astro check`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/i18n src/data
git commit -m "Add i18n dictionaries and content data files"
```

---

### Task 3: Layout chrome — BaseLayout, DotGridBackground, Nav, ThemeToggle, LangToggle, Footer

**Files:**
- Create: `src/components/DotGridBackground.astro`
- Create: `src/components/ThemeToggle.astro`
- Create: `src/components/LangToggle.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro` (replace scaffold placeholder)
- Create: `src/pages/en/index.astro`
- Create: `public/logo.svg`
- Create: `public/favicon.svg` (overwrite scaffold default)

**Interfaces:**
- Consumes: `Lang`, `getLangFromUrl` from `src/i18n/ui.ts`; `es`/`en` dicts; `profile` from `src/data/profile.ts` (Task 2).
- Produces: `BaseLayout.astro` with `Props { lang: Lang; title: string; description: string }` and a default `<slot />` for page content — consumed by both page files and by every later task's homepage wiring.

- [ ] **Step 1: Logo and favicon assets**

Create `public/logo.svg` (simple monogram, emerald):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="100" height="40">
  <text x="0" y="28" font-family="monospace" font-size="24" font-weight="700" fill="#34d399">&lt;JC/&gt;</text>
</svg>
```

Create `public/favicon.svg` (overwrite the scaffold's default):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#0891b2"/>
  <text x="16" y="21" font-family="monospace" font-size="13" font-weight="700" fill="white" text-anchor="middle">JC</text>
</svg>
```

- [ ] **Step 2: DotGridBackground**

Create `src/components/DotGridBackground.astro`:

```astro
---
---
<div class="dot-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true">
  <div class="absolute inset-0 bg-gradient-to-tl from-white via-transparent to-transparent dark:from-neutral-950"></div>
  <div class="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-transparent dark:from-neutral-950"></div>
</div>
```

- [ ] **Step 3: ThemeToggle**

Create `src/components/ThemeToggle.astro`:

```astro
---
---
<button id="theme-toggle" aria-label="Toggle theme" class="flex h-6 w-6 items-center justify-center text-neutral-700 dark:text-neutral-200">
  <svg id="theme-icon-sun" class="hidden h-5 w-5 dark:block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="4"></circle>
    <path stroke-linecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
  </svg>
  <svg id="theme-icon-moon" class="block h-5 w-5 dark:hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
  </svg>
</button>

<script>
  const btn = document.getElementById('theme-toggle');
  btn?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

- [ ] **Step 4: LangToggle**

Create `src/components/LangToggle.astro`:

```astro
---
import type { Lang } from '../i18n/ui';

interface Props {
  lang: Lang;
}
const { lang } = Astro.props;
const target = lang === 'es' ? '/en/' : '/';
const label = lang === 'es' ? 'EN' : 'ES';
---
<a href={target} class="text-xs font-bold uppercase tracking-widest text-neutral-700 hover:text-emerald-400 dark:text-neutral-200">
  {label}
</a>
```

- [ ] **Step 5: Nav**

Create `src/components/Nav.astro`:

```astro
---
import ThemeToggle from './ThemeToggle.astro';
import LangToggle from './LangToggle.astro';
import type { Lang } from '../i18n/ui';
import { es } from '../i18n/es';
import { en } from '../i18n/en';

interface Props {
  lang: Lang;
}
const { lang } = Astro.props;
const dict = lang === 'es' ? es : en;
const homeHref = lang === 'es' ? '/' : '/en/';
---
<header class="relative mx-auto flex max-w-4xl items-center justify-between px-7 py-6 lg:px-0">
  <a href={homeHref} class="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
    <img src="/logo.svg" alt="jccarmenate" class="h-6 w-auto" />
  </a>

  <button
    id="nav-toggle"
    class="flex h-8 w-8 items-center justify-center text-neutral-700 sm:hidden dark:text-neutral-200"
    aria-label="Toggle menu"
    aria-expanded="false"
  >
    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16"></path>
    </svg>
  </button>

  <nav
    id="nav-menu"
    class="absolute top-20 right-4 left-4 hidden flex-col gap-4 rounded-xl border border-dashed border-neutral-300 bg-white p-4 text-sm font-medium text-neutral-700 sm:static sm:flex sm:flex-row sm:items-center sm:gap-6 sm:border-none sm:bg-transparent sm:p-0 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200"
  >
    <a href={`${homeHref}#home`} class="hover:text-emerald-400">{dict.nav.home}</a>
    <a href={`${homeHref}#experience`} class="hover:text-emerald-400">{dict.nav.experience}</a>
    <a href={`${homeHref}#projects`} class="hover:text-emerald-400">{dict.nav.projects}</a>
    <a href={`${homeHref}#services`} class="hover:text-emerald-400">{dict.nav.services}</a>
    <LangToggle lang={lang} />
    <ThemeToggle />
  </nav>
</header>

<script>
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  toggle?.addEventListener('click', () => {
    const isHidden = menu?.classList.toggle('hidden');
    toggle.setAttribute('aria-expanded', String(!isHidden));
  });
</script>
```

- [ ] **Step 6: Footer**

Create `src/components/Footer.astro`:

```astro
---
import { profile } from '../data/profile';
import type { Lang } from '../i18n/ui';
import { es } from '../i18n/es';
import { en } from '../i18n/en';

interface Props {
  lang: Lang;
}
const { lang } = Astro.props;
const dict = lang === 'es' ? es : en;
const year = new Date().getFullYear();
---
<footer class="mx-auto flex max-w-4xl flex-col items-center gap-4 px-7 py-10 text-sm text-neutral-500 lg:px-0 dark:text-neutral-400">
  <div class="flex gap-4">
    <a href={`mailto:${profile.contact.email}`} class="hover:text-emerald-400">{profile.contact.email}</a>
    <a href={profile.contact.github} target="_blank" rel="noopener" class="hover:text-emerald-400">GitHub</a>
  </div>
  <p>{profile.name} — {dict.footer.rights} © {year}</p>
</footer>
```

- [ ] **Step 7: BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';
import DotGridBackground from '../components/DotGridBackground.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import type { Lang } from '../i18n/ui';

interface Props {
  lang: Lang;
  title: string;
  description: string;
}
const { lang, title, description } = Astro.props;
---
<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <script is:inline>
      if (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      }
    </script>
  </head>
  <body class="relative bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
    <DotGridBackground />
    <div class="relative z-10">
      <Nav lang={lang} />
      <main>
        <slot />
      </main>
      <Footer lang={lang} />
    </div>
  </body>
</html>
```

- [ ] **Step 8: Wire the two locale pages (placeholder body for now)**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { profile } from '../data/profile';

const lang = 'es' as const;
---
<BaseLayout lang={lang} title={profile.name} description={profile.bio[lang]}>
  <section id="home" class="mx-auto max-w-4xl px-7 py-16 lg:px-0">
    <p class="text-neutral-600 dark:text-neutral-400">Contenido próximamente.</p>
  </section>
</BaseLayout>
```

Create `src/pages/en/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { profile } from '../../data/profile';

const lang = 'en' as const;
---
<BaseLayout lang={lang} title={profile.name} description={profile.bio[lang]}>
  <section id="home" class="mx-auto max-w-4xl px-7 py-16 lg:px-0">
    <p class="text-neutral-600 dark:text-neutral-400">Content coming soon.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 9: Type-check and build**

Run: `npx astro check && npm run build`
Expected: no errors, `dist/index.html` and `dist/en/index.html` both exist.

- [ ] **Step 10: Manual browser verification**

Run `npm run dev`, open `http://localhost:4321/`:
- Logo, nav links, EN toggle, and theme toggle icon are visible.
- Click the theme toggle → page goes dark, reload → stays dark (persisted).
- Click "EN" → navigates to `/en/` with English content; click "ES" → back to `/`.
- A faint dot-grid pattern is visible in the empty corners of the page.
- Resize to mobile width → nav collapses to a hamburger button that opens/closes the menu panel.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "Add BaseLayout, Nav, Footer, theme/lang toggles, dot-grid background"
```

---

### Task 4: Hero section — AvatarFrame, SkillsList, Button, Hero

**Files:**
- Create: `src/components/AvatarFrame.astro`
- Create: `src/components/SkillsList.astro`
- Create: `src/components/Button.astro`
- Create: `src/components/Hero.astro`
- Create: `public/avatar-placeholder.svg`
- Modify: `src/pages/index.astro`, `src/pages/en/index.astro` (render `<Hero lang={lang} />` instead of the placeholder paragraph)

**Interfaces:**
- Consumes: `profile` (Task 2), `Lang` (Task 2).
- Produces: `Hero.astro` with `Props { lang: Lang }`, rendered with `id="home"` — consumed directly by both page files.

- [ ] **Step 1: Placeholder avatar asset**

Create `public/avatar-placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#0891b2"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#g)"/>
  <text x="100" y="118" font-family="monospace" font-size="64" font-weight="700" fill="white" text-anchor="middle">JC</text>
</svg>
```

- [ ] **Step 2: Button**

Create `src/components/Button.astro`:

```astro
---
interface Props {
  href: string;
  label: string;
}
const { href, label } = Astro.props;
---
<a
  href={href}
  class="gradient-border relative inline-flex w-auto items-center justify-center rounded-full bg-[#212121] px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase"
>
  {label}
</a>
```

- [ ] **Step 3: AvatarFrame**

Create `src/components/AvatarFrame.astro`:

```astro
---
---
<div class="relative mx-auto w-full max-w-[220px]">
  <div class="absolute -inset-3 rounded-2xl border-2 border-dashed border-emerald-400/70"></div>
  <div class="absolute -right-3 -bottom-3 -z-10 h-full w-full rounded-2xl bg-gradient-to-r from-white via-emerald-100 to-white dark:from-neutral-950 dark:via-emerald-950/30 dark:to-neutral-950"></div>
  <img
    src="/avatar-placeholder.svg"
    alt="Juan Carlos"
    class="relative z-10 w-full rounded-full border-4 border-white shadow-sm dark:border-neutral-950"
  />
</div>
```

- [ ] **Step 4: SkillsList**

Create `src/components/SkillsList.astro`:

```astro
---
import { profile } from '../data/profile';
import type { Lang } from '../i18n/ui';

interface Props {
  lang: Lang;
}
const { lang } = Astro.props;
---
<ul class="mt-5 space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
  {profile.skills.map((group) => (
    <li>
      <span class="font-semibold text-neutral-800 dark:text-neutral-200">{group.category[lang]}:</span>
      {' '}{group.items.join(', ')}
    </li>
  ))}
</ul>
```

- [ ] **Step 5: Hero**

Create `src/components/Hero.astro`:

```astro
---
import AvatarFrame from './AvatarFrame.astro';
import SkillsList from './SkillsList.astro';
import Button from './Button.astro';
import { profile } from '../data/profile';
import type { Lang } from '../i18n/ui';
import { es } from '../i18n/es';
import { en } from '../i18n/en';

interface Props {
  lang: Lang;
}
const { lang } = Astro.props;
const dict = lang === 'es' ? es : en;
---
<section id="home" class="relative mx-auto max-w-4xl px-7 pt-16 pb-10 lg:px-0">
  <div class="grid gap-8 md:grid-cols-[1fr_260px] md:items-center">
    <div>
      <p class="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
        {dict.hero.greeting} 👋 {dict.hero.intro}
      </p>
      <h1 class="mt-2 mb-5 text-4xl leading-tight font-bold">
        <span class="text-emerald-400">{profile.name}</span>
      </h1>
      <p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {profile.bio[lang]}
      </p>
      <p class="mt-4 text-sm font-medium text-neutral-800 dark:text-neutral-200">
        {profile.roleLine[lang]}
      </p>
      <SkillsList lang={lang} />
      <div class="mt-6">
        <Button href="#services" label={dict.hero.ctaServices} />
      </div>
    </div>
    <AvatarFrame />
  </div>
</section>
```

- [ ] **Step 6: Wire Hero into both pages**

In `src/pages/index.astro`, replace the placeholder `<section id="home">...</section>` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import { profile } from '../data/profile';

const lang = 'es' as const;
---
<BaseLayout lang={lang} title={profile.name} description={profile.bio[lang]}>
  <Hero lang={lang} />
</BaseLayout>
```

Do the equivalent in `src/pages/en/index.astro` (import paths `../../layouts/BaseLayout.astro`, `../../components/Hero.astro`, `../../data/profile`, `lang = 'en'`).

- [ ] **Step 7: Type-check, build, and visually verify**

Run: `npx astro check && npm run build`
Expected: no errors.

Run `npm run dev`, open `http://localhost:4321/`:
- "Juan Carlos" renders in emerald.
- Bio and role line render (Spanish on `/`, English on `/en/`).
- Skills list shows all 6 grouped categories.
- Avatar placeholder shows "JC" inside a dashed emerald ring.
- The "Ver mis servicios" / "See my services" pill button renders with a gradient border on a dark fill.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add Hero section with avatar frame, skills list, and CTA button"
```

---

### Task 5: Experience timeline — Badge, ExperienceTimeline

**Files:**
- Create: `src/components/Badge.astro`
- Create: `src/components/ExperienceTimeline.astro`
- Modify: `src/pages/index.astro`, `src/pages/en/index.astro` (add `<ExperienceTimeline lang={lang} />` after `<Hero />`)

**Interfaces:**
- Consumes: `experience` (Task 2), `Lang`.
- Produces: `Badge.astro` with `Props { label: string }` — reused by Task 6 (`ProjectCard`). `ExperienceTimeline.astro` with `Props { lang: Lang }`, self-contained `<section id="experience">`.

- [ ] **Step 1: Badge**

Create `src/components/Badge.astro`:

```astro
---
interface Props {
  label: string;
}
const { label } = Astro.props;
---
<span class="m-1 inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-[0.6rem] font-bold tracking-widest uppercase text-neutral-800 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
  <span class="gradient-text leading-none">{label}</span>
</span>
```

- [ ] **Step 2: ExperienceTimeline**

Create `src/components/ExperienceTimeline.astro`:

```astro
---
import Badge from './Badge.astro';
import { experience } from '../data/experience';
import type { Lang } from '../i18n/ui';
import { es } from '../i18n/es';
import { en } from '../i18n/en';

interface Props {
  lang: Lang;
}
const { lang } = Astro.props;
const dict = lang === 'es' ? es : en;
---
<section id="experience" class="mx-auto max-w-4xl px-7 py-10 lg:px-0">
  <h2 class="text-2xl leading-10 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
    {dict.sections.experience}
  </h2>
  <div class="px-5 py-10">
    {experience.map((entry) => (
      <div class="border-l border-neutral-200 pb-10 last:pb-0 dark:border-neutral-700">
        <div class="relative flex flex-col justify-start pl-12">
          <span class="absolute top-0 left-0 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-neutral-300 bg-neutral-800 text-sm font-bold text-emerald-400 dark:border-neutral-700 dark:bg-neutral-950">
            {entry.org.slice(0, 2).toUpperCase()}
          </span>
          <p class="text-xs tracking-widest text-neutral-400 uppercase dark:text-neutral-500">{entry.dateRange[lang]}</p>
          <h3 class="my-1 text-lg font-bold dark:text-neutral-100">{entry.title[lang]}</h3>
          {entry.orgUrl ? (
            <a href={entry.orgUrl} target="_blank" rel="noopener" class="mb-1 text-sm font-medium underline dark:text-neutral-300">{entry.org}</a>
          ) : (
            <span class="mb-1 text-sm font-medium dark:text-neutral-300">{entry.org}</span>
          )}
          <p class="text-sm font-light text-neutral-600 dark:text-neutral-400">{entry.description[lang]}</p>
          <div class="mt-2 flex flex-wrap">
            {entry.tags.map((tag) => <Badge label={tag} />)}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Wire into both pages**

In `src/pages/index.astro`, add the import and render it after `<Hero />`:

```astro
import ExperienceTimeline from '../components/ExperienceTimeline.astro';
...
  <Hero lang={lang} />
  <ExperienceTimeline lang={lang} />
```

Same in `src/pages/en/index.astro` with the `../../components/ExperienceTimeline.astro` path.

- [ ] **Step 4: Type-check, build, and visually verify**

Run: `npx astro check && npm run build`
Expected: no errors.

Open `http://localhost:4321/#experience`:
- Vertical line with a circular "UH" badge at the top.
- Date "2022 – Presente", title, org, description render.
- Tech tags (Python, TypeScript, AI/ML, Full-Stack) render as pills with gradient-colored text.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add experience timeline section"
```

---

### Task 6: Projects grid — ProjectPreview, ProjectCard, ProjectsSection

**Files:**
- Create: `src/lib/getInitials.ts`
- Create: `src/lib/gradient.ts`
- Create: `src/components/ProjectPreview.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/ProjectsSection.astro`
- Modify: `src/pages/index.astro`, `src/pages/en/index.astro` (add `<ProjectsSection lang={lang} />` after `<ExperienceTimeline />`)

**Interfaces:**
- Consumes: `projects` (Task 2), `Badge` (Task 5), `Lang`.
- Produces: `getInitials(text: string): string`, `gradientForSlug(slug: string): [string, string]` — local helpers, not consumed elsewhere. `ProjectsSection.astro` with `Props { lang: Lang }`, self-contained `<section id="projects">`.

- [ ] **Step 1: getInitials helper**

Create `src/lib/getInitials.ts`:

```ts
export function getInitials(text: string): string {
  const words = text.trim().split(/[\s-]+/).filter(Boolean);
  const initials = words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '');
  return initials.join('') || '?';
}
```

- [ ] **Step 2: gradient helper**

Create `src/lib/gradient.ts`:

```ts
const PALETTE: [string, string][] = [
  ['#34d399', '#0891b2'],
  ['#a3e635', '#14b8a6'],
  ['#10b981', '#0ea5e9'],
  ['#4ade80', '#0d9488'],
];

export function gradientForSlug(slug: string): [string, string] {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
```

- [ ] **Step 3: ProjectPreview**

Create `src/components/ProjectPreview.astro`:

```astro
---
import { gradientForSlug } from '../lib/gradient';
import { getInitials } from '../lib/getInitials';

interface Props {
  slug: string;
  title: string;
}
const { slug, title } = Astro.props;
const [from, to] = gradientForSlug(slug);
const initials = getInitials(title);
---
<div
  class="flex aspect-video w-full items-center justify-center rounded-lg text-2xl font-bold text-white/90"
  style={`background-image: linear-gradient(135deg, ${from}, ${to})`}
>
  {initials}
</div>
```

- [ ] **Step 4: ProjectCard**

Create `src/components/ProjectCard.astro`:

```astro
---
import Badge from './Badge.astro';
import ProjectPreview from './ProjectPreview.astro';
import type { Project } from '../data/projects';
import type { Lang } from '../i18n/ui';

interface Props {
  project: Project;
  lang: Lang;
}
const { project, lang } = Astro.props;
---
<a
  href={project.url}
  target="_blank"
  rel="noopener"
  class="group relative flex h-full flex-col items-stretch rounded-2xl p-3 duration-300 ease-out"
>
  <span class="absolute inset-0 z-10 block h-full w-full translate-x-1 translate-y-1 rounded-2xl border border-dashed border-neutral-300 duration-300 ease-out dark:border-neutral-600"></span>
  <span class="absolute inset-0 z-20 block h-full w-full rounded-2xl border border-dashed border-transparent duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-neutral-300 group-hover:bg-white dark:group-hover:border-neutral-600 dark:group-hover:bg-neutral-950"></span>
  <span class="relative z-30 block duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
    <ProjectPreview slug={project.slug} title={project.title} />
    <span class="mt-4 mb-1 flex items-center text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
      {project.title}
      <svg class="ml-1 h-2.5 w-2.5 -translate-x-1 translate-y-1 -rotate-45 transform stroke-current opacity-0 transition-all duration-200 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" viewBox="0 0 13 15" fill="none">
        <path d="M5.3 0L10.8 5.5L5.3 11" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </span>
    <span class="block text-sm font-light text-neutral-600 dark:text-neutral-400">{project.description[lang]}</span>
    <span class="mt-2 flex flex-wrap">
      {project.stack.map((tag) => <Badge label={tag} />)}
    </span>
  </span>
</a>
```

- [ ] **Step 5: ProjectsSection**

Create `src/components/ProjectsSection.astro`:

```astro
---
import ProjectCard from './ProjectCard.astro';
import { projects } from '../data/projects';
import type { Lang } from '../i18n/ui';
import { es } from '../i18n/es';
import { en } from '../i18n/en';

interface Props {
  lang: Lang;
}
const { lang } = Astro.props;
const dict = lang === 'es' ? es : en;
---
<section id="projects" class="mx-auto max-w-4xl px-7 py-10 lg:px-0">
  <h2 class="text-2xl leading-10 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
    {dict.sections.projects}
  </h2>
  <div class="mt-7 grid w-full grid-cols-1 items-stretch gap-7 sm:grid-cols-2 md:grid-cols-3">
    {projects.map((project) => <ProjectCard project={project} lang={lang} />)}
  </div>
</section>
```

- [ ] **Step 6: Wire into both pages**

In `src/pages/index.astro`, add the import and render after `<ExperienceTimeline />`:

```astro
import ProjectsSection from '../components/ProjectsSection.astro';
...
  <ExperienceTimeline lang={lang} />
  <ProjectsSection lang={lang} />
```

Same in `src/pages/en/index.astro` with the `../../components/ProjectsSection.astro` path.

- [ ] **Step 7: Type-check, build, and visually verify**

Run: `npx astro check && npm run build`
Expected: no errors.

Open `http://localhost:4321/#projects`:
- 4 project cards render in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop).
- Each card shows a colored gradient tile with initials, title, description, and stack badges.
- Hovering a card shifts its content and reveals an offset dashed-border "sketch" outline.
- Clicking a card opens the correct GitHub repo in a new tab.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add projects grid with sketch-hover cards and gradient previews"
```

---

### Task 7: Services section

**Files:**
- Create: `src/components/ServicesSection.astro`
- Modify: `src/pages/index.astro`, `src/pages/en/index.astro` (add `<ServicesSection lang={lang} />` after `<ProjectsSection />`)

**Interfaces:**
- Consumes: `services` (Task 2), `Lang`.
- Produces: `ServicesSection.astro` with `Props { lang: Lang }`, self-contained `<section id="services">` — the `href="#services"` button added in Task 4's Hero now resolves to a real section.

- [ ] **Step 1: ServicesSection**

Create `src/components/ServicesSection.astro`:

```astro
---
import { services } from '../data/services';
import type { Lang } from '../i18n/ui';
import { es } from '../i18n/es';
import { en } from '../i18n/en';

interface Props {
  lang: Lang;
}
const { lang } = Astro.props;
const dict = lang === 'es' ? es : en;
---
<section id="services" class="mx-auto max-w-4xl px-7 py-10 lg:px-0">
  <h2 class="text-2xl leading-10 font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
    {dict.sections.services}
  </h2>
  <div class="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2">
    {services.map((service) => (
      <div class="rounded-2xl border border-dashed border-neutral-300 p-6 dark:border-neutral-700">
        <h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{service.title[lang]}</h3>
        <p class="mt-2 text-sm font-light text-neutral-600 dark:text-neutral-400">{service.description[lang]}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Wire into both pages**

In `src/pages/index.astro`, add the import and render after `<ProjectsSection />`:

```astro
import ServicesSection from '../components/ServicesSection.astro';
...
  <ProjectsSection lang={lang} />
  <ServicesSection lang={lang} />
```

Same in `src/pages/en/index.astro` with the `../../components/ServicesSection.astro` path.

- [ ] **Step 3: Type-check, build, and visually verify**

Run: `npx astro check && npm run build`
Expected: no errors.

Open `http://localhost:4321/#services`:
- Two cards render side by side (stacked on mobile) with dashed borders: "Desarrollo Full-Stack" and "Desarrollo de Sitios Web".
- Clicking the Hero's "Ver mis servicios" button scrolls down to this section.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add services section"
```

---

### Task 8: Final QA pass and README

**Files:**
- Modify: `README.md` (scaffold-generated default, replace with real instructions)
- No source changes expected unless QA finds a bug — if it does, fix in the relevant component file from earlier tasks.

**Interfaces:**
- None — this task only verifies and documents; no new interfaces.

- [ ] **Step 1: Full production build**

Run: `npx astro check && npm run build`
Expected: no errors, `dist/index.html` and `dist/en/index.html` exist.

- [ ] **Step 2: Desktop visual QA, both locales**

Run `npm run dev`, open `http://localhost:4321/`:
- Scroll through the full page: Nav → Hero → Experience → Projects → Services → Footer, in that order, with no layout breaks or overlapping elements.
- Repeat at `http://localhost:4321/en/` — confirm every section shows English text (no leftover Spanish strings) and the LangToggle reads "ES".

- [ ] **Step 3: Dark mode QA**

Toggle dark mode on `/`. Confirm every section (not just Hero) has legible text and correct backgrounds in dark mode: nav, hero, timeline badges/pills, project cards (including the dashed hover outline color), service cards, footer.

- [ ] **Step 4: Responsive QA**

Resize the browser (or use the responsive/mobile preset) to a mobile width (~375px):
- Nav collapses to hamburger; menu opens/closes and links work.
- Hero stacks avatar below the text column.
- Project cards go to a single column.
- Service cards go to a single column.
- No horizontal scroll anywhere on the page.

- [ ] **Step 5: Fix any issues found**

If Steps 2–4 surface a bug (layout break, missing translation, wrong dark-mode color), fix it in the owning component file (from Tasks 3–7), re-run `npx astro check && npm run build`, and re-verify the specific check that failed.

- [ ] **Step 6: Write the README**

Replace `README.md` with:

```markdown
# Portfolio — Juan Carlos

Sitio personal construido con Astro + Tailwind CSS, inspirado visualmente
en https://leynier.dev/.

## Desarrollo

    npm install
    npm run dev

Abre http://localhost:4321

## Antes de publicar

1. Reemplaza `public/avatar-placeholder.svg` con una foto real y actualiza
   la referencia en `src/components/AvatarFrame.astro`.
2. Reemplaza los tiles de color de los proyectos (generados en
   `src/components/ProjectPreview.astro`) con capturas reales si quieres:
   agrega la imagen a `public/projects/` y usa un `<img>` en su lugar.
3. Añade tu LinkedIn en `src/data/profile.ts` (`contact`) y en
   `src/components/Footer.astro` cuando el perfil esté listo.
4. Revisa y ajusta el texto de `src/data/services.ts` si tus servicios
   cambian.

## Comandos

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción a `dist/`
- `npm run preview` — sirve el build de producción localmente
- `npx astro check` — chequeo de tipos y rutas

## Despliegue en Vercel

1. Sube este repo a GitHub.
2. En Vercel: "Add New Project" → importa el repo → framework preset
   "Astro" se detecta automáticamente.
3. Deploy.

## Estructura

- `src/pages/` — `index.astro` (es, default) y `en/index.astro` (en)
- `src/layouts/BaseLayout.astro` — head, tema, Nav + Footer
- `src/components/` — secciones (`Hero`, `ExperienceTimeline`,
  `ProjectsSection`, `ServicesSection`) y piezas reutilizables (`Badge`,
  `Button`, `AvatarFrame`, toggles)
- `src/data/` — contenido editable (perfil, experiencia, proyectos, servicios)
- `src/i18n/` — diccionarios de strings de interfaz (es/en)
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Final QA pass and project README"
```
