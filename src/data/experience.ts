import type { Localized } from '../i18n/ui';

export interface TimelineEntry {
  kind: 'work' | 'education';
  dateRange: Localized;
  /** Secondary line under the dates (duration, "final year"…). */
  dateNote?: Localized;
  title: Localized;
  org: Localized;
  orgUrl?: string;
  location?: Localized;
  bullets: Localized<string[]>;
  tags: string[];
}

export const experience: TimelineEntry[] = [
  {
    kind: 'work',
    dateRange: { es: 'ene. 2025 – oct. 2025', en: 'Jan 2025 – Oct 2025' },
    dateNote: { es: '10 meses', en: '10 months' },
    title: {
      es: 'Ingeniero de IA — Fine-tuning de LLM',
      en: 'AI Engineer — LLM Fine-tuning',
    },
    org: { es: 'Empresa privada', en: 'Private company' },
    location: { es: 'La Habana, Cuba', en: 'Havana, Cuba' },
    bullets: {
      es: [
        'Ajusté (fine-tuning) un modelo de lenguaje para automatizar la gestión de inventario interno de la empresa, sustituyendo un flujo de registro y consulta que hasta entonces era manual.',
        'Preparé y limpié el conjunto de datos de entrenamiento a partir de los registros internos y definí el formato de instrucciones.',
        'Evalué el modelo sobre consultas reales de inventario, iterando sobre datos e hiperparámetros hasta alcanzar una calidad utilizable por el equipo.',
      ],
      en: [
        "Fine-tuned a language model to automate the company's internal inventory management, replacing a workflow that until then was manual.",
        'Prepared and cleaned the training dataset from internal records and defined the instruction format.',
        'Evaluated the model against real inventory queries, iterating on data and hyperparameters until reaching quality the team could actually use.',
      ],
    },
    tags: ['Python', 'Fine-tuning LLM', 'NLP'],
  },
  {
    kind: 'education',
    dateRange: { es: 'sept. 2023 – jul. 2027', en: 'Sep 2023 – Jul 2027' },
    dateNote: { es: 'Último año', en: 'Final year' },
    title: {
      es: 'Licenciatura en Ciencias de la Computación',
      en: 'B.Sc. in Computer Science',
    },
    org: {
      es: 'Universidad de La Habana · Facultad de Matemática y Computación (MatCom)',
      en: 'University of Havana · Faculty of Mathematics and Computer Science (MatCom)',
    },
    location: { es: 'La Habana, Cuba', en: 'Havana, Cuba' },
    bullets: {
      es: [
        'Trabajo de diploma (en curso): explicabilidad contrafactual en grafos, con un método heurístico que edita atributos de nodos para cambiar la decisión de un modelo.',
      ],
      en: [
        "Thesis (in progress): counterfactual explainability for graphs, using a heuristic node-attribute editing method that flips a model's decision.",
      ],
    },
    tags: [],
  },
];
