export interface ExperienceEntry {
  dateRange: Record<'es' | 'en', string>;
  title: Record<'es' | 'en', string>;
  org: string;
  orgUrl?: string;
  description: Record<'es' | 'en', string>;
  tags: string[];
}

export const experience: ExperienceEntry[] = [
  {
    dateRange: { es: '2022 – Presente', en: '2022 – Present' },
    title: {
      es: 'Estudiante de Ciencias de la Computación',
      en: 'Computer Science Student',
    },
    org: 'Universidad de La Habana (MatCom)',
    description: {
      es: 'Último año de la carrera, enfocado en sistemas de IA agéntica, recuperación de información, desarrollo full-stack y sistemas/redes.',
      en: 'Final year of the program, focused on agentic AI systems, information retrieval, full-stack development, and systems/networks.',
    },
    tags: ['Python', 'TypeScript', 'AI/ML', 'Full-Stack'],
  },
];
