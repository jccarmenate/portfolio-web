# Portfolio — Juan Carlos

🇬🇧 English (you are here) · 🇪🇸 [Leer en español](README.es.md)

Personal portfolio site for Juan Carlos, a final-year Computer Science
student focused on agentic AI systems, information retrieval, and
full-stack development. Bilingual (Spanish default at `/`, English at
`/en/`), built with Astro and Tailwind CSS.

## Features

- **Bilingual routing** — Astro's built-in i18n (`/` Spanish, `/en/`
  English), including a dedicated projects page in each locale
  (`/proyectos`, `/en/projects`).
- **Dark mode** — class-based, persisted to `localStorage`, applied before
  paint via a blocking inline script (no flash of the wrong theme).
- **Hero terminal panel** — a small `whoami.sh`-style panel that types out
  real, short code snippets pulled from the featured projects below
  (Bayesian retrieval, agent orchestration, JWT rotation, PBKDF2 auth,
  MCTS), instead of a stock photo or generic animation.
- **Sketch-hover project cards** — a dashed-border "sketch" outline that
  offsets on hover, built from layered CSS transforms.
- **CV download** — locale-aware PDF link (Spanish/English) always visible
  next to the mobile menu button, not buried in the nav.
- **SEO basics** — canonical URLs, Open Graph + Twitter Card meta tags with
  a generated 1200×630 social preview image, and an auto-generated sitemap
  (`@astrojs/sitemap`) + `robots.txt`.

## Tech stack

- **Astro** + **TypeScript** (strict), static output
- **Tailwind CSS v4** via `@tailwindcss/vite`
- No UI framework, no client-side state library — plain `.astro`
  components and a handful of small vanilla-JS interactions (theme
  toggle, mobile nav, hero terminal typing)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npx astro check` | Type-check and validate routes |

## Deployment

Static output, deployable anywhere. On Vercel: import this repository,
the "Astro" framework preset is detected automatically, and no
configuration is needed.

## Project structure

```
src/
├── pages/            # index.astro + proyectos.astro (es); en/index.astro + en/projects.astro (en)
├── layouts/          # BaseLayout.astro — head, theme init script, Nav + Footer
├── components/       # sections (Hero, ExperienceTimeline, ProjectsSection, ServicesSection)
│                      # and reusable pieces (Badge, Button, AvatarFrame, toggles)
├── data/             # editable content — profile, experience, projects, services
├── i18n/             # UI string dictionaries (es/en)
└── lib/               # small pure helpers (initials, preview-tile gradients)
```

## License

MIT
