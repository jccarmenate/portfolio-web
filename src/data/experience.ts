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
    dateRange: { es: 'Enero 2025 – Octubre 2025 (10 meses)', en: 'January 2025 – October 2025 (10 months)' },
    title: {
      es: 'Ingeniero de IA — Fine-tuning de LLM',
      en: 'AI Engineer — LLM Fine-tuning',
    },
    org: 'Empresa privada',
    description: {
      es: 'Ajusté (fine-tuning) un modelo de lenguaje para automatizar la gestión de inventario interno de la empresa, sustituyendo un flujo de registro y consulta que hasta entonces era manual. Preparé y limpié el conjunto de datos de entrenamiento a partir de los registros internos, definí el formato de instrucciones y evalué el modelo sobre consultas reales de inventario, iterando sobre datos e hiperparámetros hasta alcanzar una calidad utilizable por el equipo.',
      en: "Fine-tuned a language model to automate the company's internal inventory management, replacing a workflow that until then was manual. Prepared and cleaned the training dataset from internal records, defined the instruction format, and evaluated the model against real inventory queries, iterating on data and hyperparameters until reaching quality the team could actually use.",
    },
    tags: ['Python', 'Fine-tuning LLM', 'NLP'],
  },
];
