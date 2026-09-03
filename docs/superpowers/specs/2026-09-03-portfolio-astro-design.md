# Portfolio Astro — Design Spec

Date: 2026-09-03
Owner: Juan Carlos (juancarlosmatcom@gmail.com)

## Purpose

Personal portfolio website for Juan Carlos, a final-year Computer Science
student at the University of Havana (MatCom). Modeled visually and
structurally on a friend's site, https://leynier.dev/ (built with Astro +
Tailwind CSS), using the same stack, the same section layout, and a
close visual replica of its design system (layout, spacing, typography,
decorative details), but with Juan Carlos's own content, a different
accent color/gradient, different assets (avatar, logo), and a reduced
scope (no blog).

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
      DotGridBackground.astro   # decorative dotted-grid layer, edge-faded
      Hero.astro
      AvatarFrame.astro          # dashed-ring avatar frame w/ accent corners
      SkillsList.astro
      ExperienceTimeline.astro
      ProjectCard.astro           # double dashed-border "sketch" hover card
      ProjectsSection.astro
      ServicesSection.astro
      Badge.astro                  # pill tag, gradient-text label
      Button.astro                  # pill CTA, gradient border/edge
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

## Visual design system

Extracted directly from leynier.dev's rendered CSS/DOM (Tailwind utility
classes read from the live site), so this is a close structural/visual
replica — same layout, spacing, typography scale, and decorative
mechanics — with the accent recolored from sky-blue to emerald and all
image assets swapped.

### Base tokens

- **Font**: no custom webfont — Tailwind's default system font stack
  (`-apple-system, "Segoe UI", Roboto, ...`). Keep as-is.
- **Backgrounds**: `bg-white` (light) / `dark:bg-neutral-950` (dark) on
  `<body>`.
- **Text scale**: neutral gray scale throughout —
  `text-neutral-900`/`text-neutral-800` for headings/body (light),
  `dark:text-neutral-100` (dark); secondary/muted text
  `text-neutral-600 dark:text-neutral-400`; faint labels (dates, eyebrow
  text) `text-neutral-400 dark:text-neutral-500` with
  `uppercase tracking-widest text-xs`.
- **Borders**: structural borders `border-neutral-300 dark:border-neutral-700`,
  frequently `border-dashed` for decorative framing (nav mobile panel,
  avatar frame, project card hover frame).
- **Radii**: generous rounding — `rounded-2xl` for cards/panels,
  `rounded-full` for avatars/badges/buttons.

### Accent (this site's swap: sky/gradient → emerald)

| Role | leynier.dev | This site |
|---|---|---|
| Name/heading accent (solid) | `text-sky-400` | `text-emerald-400` |
| Avatar ring / focal accents | sky-400 dashed accents | `emerald-400` dashed accents |
| Multi-stop gradient (buttons, `.gradient-text` tag labels) | ~135deg, stops `#ffdb3b → #53c2fe → #5e51ea → #0044ff` (yellow→sky→indigo→blue) | ~135deg, stops `#a3e635 → #34d399 → #14b8a6 → #0891b2` (lime→emerald→teal→cyan) |
| CTA button fill | `bg-[#212121]` (near-black) + gradient border | same near-black fill + emerald-gradient border |

Implement the gradient as a small reusable CSS class (`.gradient-text` /
`.gradient-border`) in a global stylesheet, mirroring leynier.dev's own
approach of a named utility class rather than inlining the gradient
per-component.

### Decorative background: dot grid

A page-wide dotted-grid texture, most visible in empty corners, faded
toward content via corner gradients. Reproduce as a `::before` layer:

```css
.dot-grid::before {
  content: "";
  position: absolute; inset: 0;
  background-image: radial-gradient(currentColor 1px, transparent 1%);
  background-size: 50px 50px;
  color: theme('colors.neutral.300'); /* dark: neutral.800 */
  opacity: 0.4;
}
```

plus two corner-fade overlays (`bg-gradient-to-tl`/`tr`,
`from-white dark:from-neutral-950 from-50% via-transparent via-90%`) so
the dots fade out near the hero content, same technique as the source
site.

### Avatar frame (Hero)

Rounded-full photo inside a `relative` wrapper with: a dashed
accent-colored ring (`border-dashed border-emerald-400`-family, drawn via
layered linear-gradients as border image, same technique as source) and a
soft gradient panel behind it (`bg-gradient-to-r from-white dark:from-neutral-950 via-... to-...`)
sitting at a lower z-index for depth. Placeholder avatar (initials "JC")
sits inside this same frame so swapping in a real photo later is a
one-line asset change, not a layout change.

### Experience timeline

- Vertical line: `border-l border-neutral-200 dark:border-neutral-700`
  wrapping each stacked entry (`pb-10` between entries).
- Circular logo/icon badge, absolutely positioned at the top-left of each
  entry, straddling the line: `w-14 h-14 rounded-full bg-neutral-800
  dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700`.
  Since Juan Carlos's single entry (university) has no external logo yet,
  use a simple monogram/icon placeholder in the badge.
- Entry content, indented past the badge (`pl-12`): eyebrow date
  (`text-xs uppercase tracking-widest text-neutral-400`), title
  (`text-lg font-bold`), org name (`text-sm font-medium underline`),
  description (`text-sm font-light text-neutral-600 dark:text-neutral-400`),
  and a row of tech `Badge`s below.

### Project cards

Grid: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7`. Each card is a
link with a "sketch" hover effect built from two absolutely-positioned
dashed-border layers offset behind the content:

- base layer: `border border-dashed border-neutral-300 dark:border-neutral-600 rounded-2xl`, offset `translate-x-1 translate-y-1`
- hover layer: transparent border that fills in and shifts
  `-translate-x-1 -translate-y-1` on `group-hover`, revealing the base
  layer as an offset "shadow" outline
- content (image `aspect-video rounded-lg object-cover`, title with a
  small arrow icon that animates in on hover, description, tech
  `Badge`s) shifts `-translate-x-1 -translate-y-1` together with the
  hover layer

Since Juan Carlos's projects don't have custom preview images yet, use a
generated placeholder (gradient tile + project initials, same fallback
pattern as his earlier portfolio project) in the `aspect-video` image
slot — swappable later exactly like the avatar.

### Badges & buttons

- **Badge** (tech tag): pill, `text-[0.6rem] uppercase tracking-widest px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm`, label text rendered with `.gradient-text`.
- **Button** (CTA, e.g. "See My Services" equivalent if used): pill
  (`rounded-full`), dark fill, `.gradient-border`, small bold uppercase
  label, `px-4 py-2`.

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
