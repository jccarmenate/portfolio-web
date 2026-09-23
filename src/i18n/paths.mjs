// @ts-check
// Every page and its translation, shared by astro.config.mjs (sitemap
// alternates) and the layout (canonical, hreflang, language switch).

export const paths = /** @type {const} */ ({
  home: { es: '/', en: '/en/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
});

/** @param {string} slug */
export const projectPaths = (slug) => ({ es: `/proyectos/${slug}/`, en: `/en/projects/${slug}/` });

/**
 * @param {string} pathname
 * @returns {{ es: string, en: string } | undefined}
 */
export function alternatesFor(pathname) {
  const match = pathname.match(/^\/(?:proyectos|en\/projects)\/([^/]+)\/$/);
  if (match) return projectPaths(match[1]);
  return Object.values(paths).find((p) => p.es === pathname || p.en === pathname);
}
