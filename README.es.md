# Portfolio — Juan Carlos

🇪🇸 Español (estás aquí) · 🇬🇧 [Read in English](README.md)

Sitio personal de Juan Carlos, estudiante de último año de Ciencias de la
Computación que busca roles de Backend Engineer / AI Engineer. Bilingüe
(español por defecto en `/`, inglés en `/en/`), construido con Astro y
Tailwind CSS.

**Sitio:** https://portfolio-web-eight-rose.vercel.app
**Repositorio:** https://github.com/jccarmenate/portfolio-web

## Características

- **Home pensada para reclutadores** — nombre y rol en el `h1`, un pitch de
  dos líneas, datos clave (carrera, fecha de graduación, ubicación, idiomas)
  y dos CTAs (proyectos y CV), todo visible sin hacer scroll en un móvil actual. El
  CV queda siempre a un clic en la navegación fija.
- **Presentación de proyectos** — todas las vistas previas usan el mismo
  marco de "ventana": capturas reales de cada repo (recortes 16:10 servidos
  como AVIF/WebP con `astro:assets`) o diagramas SVG incrustados, hechos a
  partir de las notas de arquitectura del propio README y marcados como
  diagramas. Los proyectos destacados van en formato ancho; el resto pasa a
  filas con miniatura en móvil.
- **Casos de estudio** — `/proyectos/<slug>/` y `/en/projects/<slug>/` para
  los tres proyectos destacados: problema, arquitectura, decisiones clave,
  validación y galería, todo sacado de los README de los repos.
- **Ventana de código en el hero** — escribe extractos cortos copiados
  literalmente del código de los proyectos (con archivo y rango de líneas) y
  enlaza cada uno a su proyecto. El primer fragmento se renderiza
  en el servidor; el tecleo se pausa fuera de pantalla, en pestañas en
  segundo plano, a demanda y con movimiento reducido.
- **«Cómo trabajo»** — tres hábitos de ingeniería (probar contra lo real,
  seguridad por defecto, medir en vez de estimar), cada uno con enlaces a los
  proyectos y casos de estudio donde está la evidencia.
- **Movimiento mínimo, solo CSS** — barra de progreso de scroll bajo la
  navegación y aparición suave de secciones y tarjetas, con animaciones de CSS
  dirigidas por scroll (`animation-timeline`), más un subrayado deslizante en
  el menú, sin JavaScript. Los navegadores sin soporte,
  `prefers-reduced-motion` y la impresión muestran todo de forma estática. Un
  test protege el CSS compilado (el minificador puede eliminar estas
  animaciones en producción sin avisar).
- **Enrutado bilingüe bien hecho** — un único mapa de rutas
  (`src/i18n/paths.mjs`) genera las URLs canónicas, los `hreflang`
  (es/en/x-default), el sitemap y el cambio de idioma, que siempre lleva a la
  página equivalente.
- **Sistema de diseño** — Geist + Geist Mono (autoalojadas con la Fonts API
  de Astro), tokens de color semánticos para claro/oscuro con contraste AA,
  modo oscuro por clase aplicado antes del primer render.
- **SEO y accesibilidad** — título y descripción por página, imágenes Open
  Graph por idioma y por caso de estudio, JSON-LD, 404 bilingüe, skip link,
  menú móvil accesible y tarjetas con enlace estirado y encabezados reales.

## Stack técnico

- **Astro 7** + **TypeScript** (strict), salida estática
- **Tailwind CSS v4** vía `@tailwindcss/vite`
- Sin framework de UI ni librería de estado en el cliente — componentes
  `.astro` y unas pocas interacciones en JS vanilla (tema, navegación móvil,
  ventana de código, copiar email)

## Cómo empezar

Requiere Node.js 22.12 o superior.

```bash
npm ci
npm run dev
```

Abre http://localhost:4321 (las URLs llevan barra final, p. ej. `/proyectos/`).

## Comandos

| Comando | Acción |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run check` | Chequeo de tipos y validación (`astro check`) |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Sirve el build de producción localmente |
| `npm test` | Comprobaciones sobre `dist/` (tras un build): metadatos, hreflang, sitemap, enlaces, imágenes y CSS minificado |

La CI (GitHub Actions) ejecuta `npm ci`, `npm run check`, `npm run build`,
`npm test` y `npm audit` en cada push y pull request.

## Despliegue

Salida estática. En Vercel el preset "Astro" se detecta automáticamente;
`vercel.json` añade cabeceras de seguridad, caché larga para los assets con
hash y redirecciones a la URL con barra final.

## Estructura del proyecto

```
src/
├── pages/        # rutas: / y /en/, /proyectos/ y /en/projects/ (+ casos de estudio [slug]), 404, robots.txt
├── views/        # composición de páginas compartida por ambos idiomas
├── layouts/      # BaseLayout.astro — head (SEO, hreflang, JSON-LD), tema, Nav + Footer
├── components/   # secciones (Hero, FeaturedProjects, ExperienceSection, …) y piezas (ProjectPreview, CodeWindow, …)
├── data/         # contenido editable — perfil, experiencia, proyectos (+ casos de estudio), servicios, fragmentos
├── assets/       # capturas de proyectos, diagramas SVG, fuentes autoalojadas (OFL)
├── i18n/         # textos de interfaz (es/en) y el mapa de rutas compartido
├── lib/          # utilidades pequeñas
└── styles/       # global.css — tokens de diseño, modo oscuro, movimiento
public/           # CV en PDF (ES/EN), imágenes Open Graph, favicons
scripts/          # tests de sanidad sobre dist/ (node:test)
```

Para añadir un proyecto, agrégalo en `src/data/projects.ts`: su vista previa
necesita una captura real en `src/assets/projects/` (o un diagrama en
`src/assets/diagrams/`). Añade un `caseStudy` para darle página propia.

## Licencia

MIT. Geist y Geist Mono se distribuyen bajo la SIL Open Font License
(`src/assets/fonts/OFL.txt`).
