# Portfolio — Juan Carlos

🇪🇸 Español (estás aquí) · 🇬🇧 [Read in English](README.md)

Sitio personal de Juan Carlos, estudiante de último año de Ciencias de la
Computación enfocado en sistemas de IA agéntica, recuperación de
información y desarrollo full-stack. Bilingüe (español por defecto en
`/`, inglés en `/en/`), construido con Astro y Tailwind CSS.

**Repositorio:** https://github.com/jccarmenate/portfolio-web

## Características

- **Enrutado bilingüe** — i18n nativo de Astro (`/` español, `/en/`
  inglés), incluyendo una página de proyectos dedicada por idioma
  (`/proyectos`, `/en/projects`).
- **Modo oscuro** — basado en clase, persistido en `localStorage`,
  aplicado antes del primer render con un script bloqueante (sin flash
  del tema incorrecto).
- **Panel de terminal en el hero** — un panel estilo `whoami.sh` que
  escribe fragmentos de código reales y cortos, tomados de los proyectos
  destacados abajo (recuperación Bayesiana, orquestación de agentes,
  rotación de JWT, autenticación PBKDF2, MCTS), en vez de una foto o una
  animación genérica.
- **Tarjetas de proyecto con hover "boceto"** — un contorno de borde
  punteado que se desplaza al pasar el mouse, hecho con transforms CSS
  en capas.
- **Descarga de CV** — link a PDF según el idioma (español/inglés),
  siempre visible junto al botón de menú móvil, no escondido dentro del
  nav.
- **SEO básico** — URLs canónicas, meta tags Open Graph + Twitter Card con
  una imagen de social preview generada (1200×630), y sitemap automático
  (`@astrojs/sitemap`) + `robots.txt`.

## Stack técnico

- **Astro** + **TypeScript** (strict), salida estática
- **Tailwind CSS v4** vía `@tailwindcss/vite`
- Sin framework de UI, sin librería de estado en el cliente — componentes
  `.astro` planos y un puñado de interacciones pequeñas en JS vanilla
  (toggle de tema, nav móvil, tipeo del panel del hero)

## Cómo empezar

```bash
npm install
npm run dev
```

Abre http://localhost:4321

## Comandos

| Comando | Acción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Sirve el build de producción localmente |
| `npx astro check` | Chequeo de tipos y validación de rutas |

## Despliegue

Salida estática, desplegable en cualquier lado. En Vercel: importa este
repositorio, el preset de framework "Astro" se detecta automáticamente y
no hace falta configuración adicional.

## Estructura del proyecto

```
src/
├── pages/            # index.astro + proyectos.astro (es); en/index.astro + en/projects.astro (en)
├── layouts/          # BaseLayout.astro — head, script de tema, Nav + Footer
├── components/       # secciones (Hero, ExperienceTimeline, ProjectsSection, ServicesSection)
│                      # y piezas reutilizables (Badge, Button, AvatarFrame, toggles)
├── data/             # contenido editable — perfil, experiencia, proyectos, servicios
├── i18n/             # diccionarios de strings de interfaz (es/en)
└── lib/               # utilidades puras pequeñas (iniciales, degradados de los tiles)
```

## Licencia

MIT
