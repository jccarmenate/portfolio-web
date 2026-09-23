import { es } from './es';
import { en } from './en';
import { paths as basePaths, projectPaths } from './paths.mjs';

export type Lang = 'es' | 'en';
export type Localized<T = string> = Record<Lang, T>;

export const langs: readonly Lang[] = ['es', 'en'];

const dicts: Localized<typeof es> = { es, en };

/** UI strings for a locale. */
export const t = (lang: Lang) => dicts[lang];

export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

/** Replace `{name}` placeholders in a UI string. */
export const fmt = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));

/** Every page and its translation (see paths.mjs). */
export const paths = { ...basePaths, project: projectPaths };

export const cv: Localized<{ href: string; download: string }> = {
  es: { href: '/cv-juan-carlos-carmenate-es.pdf', download: 'CV-Juan-Carlos-ES.pdf' },
  en: { href: '/cv-juan-carlos-carmenate-en.pdf', download: 'CV-Juan-Carlos-EN.pdf' },
};
