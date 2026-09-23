# Portfolio — Juan Carlos

🇬🇧 English (you are here) · 🇪🇸 [Leer en español](README.es.md)

Personal portfolio site for Juan Carlos, a final-year Computer Science
student looking for Backend Engineer / AI Engineer roles. Bilingual
(Spanish default at `/`, English at `/en/`), built with Astro and
Tailwind CSS.

## Features

- **Recruiter-first home** — name and role in the `h1`, a two-line pitch,
  key facts (degree, graduation date, location, languages) and two CTAs
  (projects, CV), all above the fold on a phone. The CV stays one click
  away in the sticky nav.
- **Project showcase** — every preview sits in the same "window" frame:
  real screenshots from each repo (16:10 crops served as AVIF/WebP through
  `astro:assets`), or inline SVG diagrams built from the README's own
  architecture notes, clearly labelled as diagrams. Featured projects get a
  wide layout; the rest collapse to thumbnail rows on phones.
- **Case studies** — `/proyectos/<slug>/` and `/en/projects/<slug>/` for the
  three featured projects: problem, architecture, key decisions, validation
  and a gallery, all sourced from the repos' READMEs.
- **Hero code window** — types out short snippets from the projects and
  links each one to its project. The first snippet is server-rendered; typing
  pauses off-screen, in background tabs, on demand and under reduced motion.
- **Bilingual routing done properly** — one route map
  (`src/i18n/paths.mjs`) drives canonical URLs, `hreflang` alternates
  (es/en/x-default), the sitemap and the language switch, which always lands
  on the equivalent page.
- **Design system** — Geist + Geist Mono (self-hosted via Astro's Fonts API),
  semantic color tokens for light/dark with AA contrast, class-based dark mode
  applied before first paint.
- **SEO & a11y** — per-page titles/descriptions, Open Graph images per locale
  and per case study, JSON-LD, bilingual 404, skip link, accessible mobile
  menu, stretched-link cards with real headings.

## Tech stack

- **Astro 7** + **TypeScript** (strict), static output
- **Tailwind CSS v4** via `@tailwindcss/vite`
- No UI framework, no client-side state library — plain `.astro`
  components and a few small vanilla-JS interactions (theme toggle, mobile
  nav, code window, copy email)

## Getting started

```bash
npm ci
npm run dev
```

Open http://localhost:4321 (URLs use a trailing slash, e.g. `/proyectos/`).

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run check` | Type-check and validate the project (`astro check`) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |

CI (GitHub Actions) runs `npm ci`, `npm run check` and `npm run build` on
every push and pull request.

## Deployment

Static output. On Vercel the "Astro" preset is detected automatically;
`vercel.json` adds security headers, long-lived caching for hashed assets
and trailing-slash redirects.

## Project structure

```
src/
├── pages/        # routes: / and /en/, /proyectos/ and /en/projects/ (+ [slug] case studies), 404, robots.txt
├── views/        # page compositions shared by both locales
├── layouts/      # BaseLayout.astro — head (SEO, hreflang, JSON-LD), theme init, Nav + Footer
├── components/   # sections (Hero, FeaturedProjects, ExperienceSection, …) and pieces (ProjectPreview, CodeWindow, …)
├── data/         # editable content — profile, experience, projects (+ case studies), services, snippets
├── assets/       # project screenshots, inline SVG diagrams, self-hosted fonts (OFL)
├── i18n/         # UI strings (es/en) and the shared route map
└── lib/          # small helpers
```

To add a project, append it to `src/data/projects.ts`: a real screenshot in
`src/assets/projects/` (or a diagram in `src/assets/diagrams/`) is required
for its preview. Add a `caseStudy` to give it its own page.

## License

MIT. Geist and Geist Mono are licensed under the SIL Open Font License
(`src/assets/fonts/OFL.txt`).
