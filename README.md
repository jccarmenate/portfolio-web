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
