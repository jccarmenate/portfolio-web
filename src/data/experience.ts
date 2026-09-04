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
    dateRange: { es: '2025 – Presente', en: '2025 – Present' },
    title: {
      es: 'Alumno Ayudante — Lógica y Matemática Discreta',
      en: 'Teaching Assistant — Logic and Discrete Mathematics',
    },
    org: 'Universidad de La Habana (MatCom)',
    description: {
      es: 'Imparto clases prácticas de Lógica y Matemática Discreta a estudiantes de primer año en la Facultad de Matemática y Computación, diseño y califico ejercicios y evaluaciones, y atiendo consultas individuales sobre demostraciones y lógica de predicados.',
      en: 'Teaching practical sessions of Logic and Discrete Mathematics to first-year students at the Faculty of Mathematics and Computer Science, designing and grading exercises and exams, and holding one-on-one office hours on proofs and predicate logic.',
    },
    tags: ['Lógica', 'Matemática Discreta'],
  },
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
