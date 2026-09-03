# Portfolio Astro — Design Spec

Date: 2026-09-03
Owner: Juan Carlos (juancarlosmatcom@gmail.com)

## Purpose

Personal portfolio website for Juan Carlos, a final-year Computer Science
student at the University of Havana (MatCom). Modeled visually and
structurally on a friend's site, https://leynier.dev/ (built with Astro +
Tailwind CSS), using the same stack and a similar section layout, but with
Juan Carlos's own content and a reduced scope (no blog).

## Stack

- **Astro** (static site generation) + **TypeScript**
- **Tailwind CSS** for styling
- Dark/light theme toggle via `localStorage` + a `dark` class on `<html>`,
  same mechanism as leynier.dev (inline blocking script in `<head>` to avoid
  flash of wrong theme)
- **Astro i18n routing**: default locale `es` at `/`, secondary locale `en`
  at `/en/` — mirrors how leynier.dev structures `/` (default) and `/es/`
- Deploy target: Vercel (static/Astro preset), but output is plain static
  files so any static host works

## Project structure

```
portfolio-astro/
  src/
    data/
      profile.ts       # name, tagline, bio (es/en), skills, socials
      projects.ts       # featured projects (title, description, stack, url)
      experience.ts      # timeline entries
      services.ts        # service offerings
    i18n/
      es.ts / en.ts       # UI string dictionaries (nav labels, section titles, etc.)
    components/
      Nav.astro
      ThemeToggle.astro
      LangToggle.astro
      Hero.astro
      SkillsList.astro
      ExperienceTimeline.astro
      ProjectCard.astro
      ProjectsSection.astro
      ServicesSection.astro
      Footer.astro
    layouts/
      BaseLayout.astro    # <head>, theme init script, Nav + Footer wrapper
    pages/
      index.astro         # es (default)
      en/index.astro       # en
  public/
    avatar-placeholder.svg  # placeholder avatar (initials "JC")
  astro.config.mjs
  tailwind.config.mjs
```

Single-page layout per locale (Hero + Experience + Projects + Services all
on `index.astro`, as anchored sections with nav links), matching the scope
decision to drop the blog and keep experiences/projects/services on one
page rather than separate routes — simpler than leynier.dev's multi-page
structure since there's no blog/services-page content to justify separate
routes yet.

## Content

### Profile / Hero

- Name: **Juan Carlos**
- Role line: "Estudiante de Ciencias de la Computación (último año) —
  Universidad de La Habana (MatCom)"
- Bio (ES, translated/adapted from GitHub profile):
  > Soy estudiante de Ciencias de la Computación (último año) en la
  > Universidad de La Habana (MatCom). Me gusta construir sistemas
  > completos y funcionales: sistemas de IA agéntica que orquestan
  > múltiples agentes LLM sobre un sandbox de ejecución real y aislado;
  > recuperación de información e IA construidas desde cero en vez de con
  > frameworks de orquestación prearmados; aplicaciones full-stack con
  > autenticación real, jobs en segundo plano y funciones de IA que
  > degradan con elegancia sin API key; programación de sistemas y redes a
  > nivel de socket/kernel; y simulación, juegos y quant — un modelo
  > epidemiológico vectorizado, una IA de juego MCTS hecha desde cero, y un
  > dashboard de finanzas cuantitativas en vivo.
- Bio (EN, from GitHub profile, lightly trimmed):
  > I'm a final-year Computer Science student at the University of Havana
  > (MatCom) who likes shipping complete, working systems: agentic AI
  > systems that orchestrate multiple LLM agents against a real, isolated
  > execution sandbox; information retrieval and AI built from first
  > principles rather than off-the-shelf orchestration frameworks;
  > full-stack apps with real authentication, background jobs, and LLM
  > features that degrade gracefully without an API key; systems and
  > networks programming down at the socket/kernel level; and simulation,
  > games and quant work — a vectorized epidemiological model, a
  > from-scratch MCTS game AI, and a live quant-finance dashboard.
- Avatar: placeholder with initials "JC" (SVG, generated), swappable later
  by dropping a real photo into `public/` and updating `profile.ts`.

### Skills (grouped, shown in Hero)

- **Backend**: Python, FastAPI, Node.js, Express
- **Frontend**: React, Flutter/Dart
- **IA / Agentes**: LangChain/LangGraph, RAG, ChromaDB, Google ADK
- **Bases de datos**: PostgreSQL, Prisma, ChromaDB
- **Sistemas y redes**: C, sockets, iptables, nginx, GTK+3
- **Herramientas**: Docker, GitHub Actions, Rust

### Experience (timeline)

- **Estudiante de Ciencias de la Computación** — Universidad de La Habana
  (MatCom) — 2022 – Presente. Descripción: último año de la carrera,
  enfocado en sistemas de IA agéntica, recuperación de información,
  desarrollo full-stack y sistemas/redes.

Single entry for now; `experience.ts` is a list so more entries can be
added later without touching component code.

### Featured projects (Juan Carlos's 4 pinned GitHub repos)

1. **Tech RAG Information Retrieval System** — Full IR system built
   module-by-module from scratch: custom inverted index + TF-IDF, a
   Bayesian inference-network retriever, a ChromaDB vector store, a RAG
   pipeline with a swappable LLM provider (Ollama/Claude), learning-to-rank
   fusion, query expansion (Rocchio + WordNet), CLIP-based multimodal
   search, hybrid recommendations, and IR evaluation (Precision@k, MAP,
   MRR, nDCG, LLM-as-judge). — Stack: Python, FastAPI, ChromaDB, React —
   `https://github.com/jccarmenate/tech-rag-information-retrieval-system`
2. **multiagent-code-generator** — LangGraph-orchestrated system where 8
   specialized agents (spec analyst → architect → db designer → coders →
   reviewer) turn a natural-language spec into a full-stack app, run it in
   a network-isolated, non-root Docker sandbox, and self-correct on real
   pytest/build failures, with a live dashboard showing the agent graph and
   streaming logs. — Stack: Python, LangGraph, FastAPI, Docker, React —
   `https://github.com/jccarmenate/multiagent-code-generator`
3. **GuildWork** — Role-based project-management system for a software
   consultancy: three enforced roles (Admin/PM/Developer), a two-token JWT
   scheme (short-lived access token + rotating httpOnly refresh token) with
   replay detection, bug tracking, analytics, and PDF reports. — Stack:
   TypeScript, Express, Prisma, React —
   `https://github.com/jccarmenate/GuildWork`
4. **Captive-Portal** — Full captive-portal stack: iptables/ipset traffic
   interception bound to IP+MAC, dnsmasq, nginx TLS termination, and a
   Python auth backend with PBKDF2 password hashing, CSRF protection, and
   rate limiting. — Stack: Python, nginx, iptables —
   `https://github.com/jccarmenate/Captive-Portal`

Each project card: title, description, stack tags, "View on GitHub" link
(external, opens in new tab).

### Services

- **Full-Stack Development** — building complete web applications, from
  database and API design through to a working frontend.
- **Website Development** — building and shipping websites (marketing
  sites, portfolios, small business sites).

Placeholder-quality copy; Juan Carlos can refine wording later in
`services.ts`.

### Contact / Footer

- Email: `juancarlosmatcom@gmail.com` (mailto link)
- GitHub: `https://github.com/jccarmenate`
- LinkedIn: omitted for now (not created yet) — `profile.ts` has a
  commented-out slot so it's a one-line add once the profile exists.

## Data flow

All content lives in typed data files under `src/data/`. Components import
from those files and render — no CMS, no runtime data fetching. The two
locale pages (`index.astro`, `en/index.astro`) each render the same
components, passing the ES or EN slice of the data (bio and UI strings are
locale-keyed objects; skills/projects/services technical content — names,
stacks, links — is language-agnostic and shared).

## Theme & language toggles

- **Theme**: inline `<script>` in `BaseLayout.astro` `<head>` reads
  `localStorage.theme` before paint and applies `.dark` to `<html>` (same
  approach as leynier.dev, avoids flash-of-wrong-theme). A `ThemeToggle`
  button flips the class and updates `localStorage`.
- **Language**: `LangToggle` is a plain link between `/` and `/en/`
  (Astro's file-based i18n routing) — no client-side state, so it works
  without JS and is trivially crawlable/shareable.

## Error handling

None needed beyond what Astro/TypeScript give at build time — this is a
static content site with no forms, no external API calls, and no runtime
user input. Type-checking (`astro check`) is the safety net for data-shape
mistakes in `src/data/*.ts`.

## Testing / verification

- `astro check` — type/route validation
- `astro build` — production build must succeed
- Manual verification in the browser preview: both locales render, theme
  toggle persists across reload, project links point to the right repos,
  responsive check (mobile width)

No unit test framework is being added — there's no logic to unit-test
(pure static content + two small client-side toggles).

## Out of scope (deliberately)

- Blog / Posts section (dropped in scope discussion)
- CMS or markdown-driven content (data lives in `.ts` files instead)
- LinkedIn link (not ready yet)
- Real photo (placeholder avatar until Juan Carlos provides one)
