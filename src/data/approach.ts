import type { Localized } from '../i18n/ui';

export interface Principle {
  /** Short mono label above the title. */
  tag: Localized;
  title: Localized;
  body: Localized;
  /** Project slugs (see projects.ts) that back this up. */
  evidence: string[];
}

/** Every claim below is taken from the project READMEs / case studies it links to. */
export const principles: Principle[] = [
  {
    tag: { es: 'Verificación', en: 'Verification' },
    title: {
      es: 'Pruebo contra lo real, no solo contra stubs',
      en: 'I test against the real thing, not just stubs',
    },
    body: {
      es: 'Los tests con stubs pasaban mientras el generador multiagente fallaba de verdad. Ejecutarlo de extremo a extremo con Docker y modelos reales destapó bugs de fondo, y los de enrutado y del reviewer quedaron con test de regresión. Probar Link-Chat con dos peers reales sobre una red real destapó además un bug de corrupción en la transferencia de archivos.',
      en: 'Stubbed tests were green while the multi-agent generator was genuinely broken. Running it end to end with Docker and real models exposed deep bugs, and the routing and reviewer ones got regression tests. Testing Link-Chat with two real peers over a real network also exposed a file-corruption bug in file transfer.',
    },
    evidence: ['multiagent-code-generator', 'link-chat'],
  },
  {
    tag: { es: 'Seguridad', en: 'Security' },
    title: {
      es: 'Seguridad por defecto, aplicada en el servidor',
      en: 'Secure by default, enforced on the server',
    },
    body: {
      es: 'El código generado por un LLM corre en un sandbox sin red, sin root y sin acceso al socket de Docker. En GuildWork el refresh token solo se guarda como hash, rota en cada uso y reutilizarlo revoca las sesiones del usuario; la puerta real siempre es el servidor, no la interfaz.',
      en: 'LLM-generated code runs in a sandbox with no network, no root and no access to the Docker socket. In GuildWork the refresh token is stored only as a hash, rotates on every use, and reusing it revokes the user’s sessions; the real gate is always the server, not the UI.',
    },
    evidence: ['multiagent-code-generator', 'guildwork'],
  },
  {
    tag: { es: 'Medición', en: 'Measurement' },
    title: {
      es: 'Mido, no estimo',
      en: 'I measure, I don’t guess',
    },
    body: {
      es: 'Tech RAG incluye un arnés de evaluación con Precision@k, MAP, MRR y nDCG sobre qrels propios congelados (15 consultas, corpus de 22 documentos), independiente del corpus vivo. En Population Simulation la vectorización con NumPy se midió antes y después: entre 2 y 6 veces más rápida con paso mensual.',
      en: 'Tech RAG ships an evaluation harness with Precision@k, MAP, MRR and nDCG against frozen custom qrels (15 queries, a 22-document corpus), independent of the live corpus. In Population Simulation the NumPy vectorization was measured before and after: 2–6× faster at monthly steps.',
    },
    evidence: ['tech-rag', 'population-simulation'],
  },
];
