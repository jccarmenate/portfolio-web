import type { Project } from '../data/projects';
import { paths, type Lang } from '../i18n/ui';

/** Case study page when there is one, otherwise the card on the projects page. */
export const projectHref = (project: Project, lang: Lang) =>
  project.caseStudy ? paths.project(project.slug)[lang] : `${paths.projects[lang]}#${project.slug}`;
