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
      es: 'Los tests con stubs pasaban mientras el generador multiagente fallaba de verdad. Ejecutarlo de extremo a extremo con Docker y modelos reales, y probar Link-Chat con dos pares sobre sockets reales, destapó bugs de fondo; los del generador quedaron con su test de regresión.',
      en: 'Stubbed tests were green while the multi-agent generator was genuinely broken. Running it end to end with Docker and real models, and testing Link-Chat with two real peers over real sockets, exposed deep bugs; the generator’s fixes each got a regression test.',
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
      es: 'El código generado por un LLM corre en un sandbox sin red, sin root y sin acceso al socket de Docker. En GuildWork el refresh token solo se guarda como hash, rota en cada uso y reutilizarlo revoca la sesión; la puerta real siempre es el servidor, no la interfaz.',
      en: 'LLM-generated code runs in a sandbox with no network, no root and no access to the Docker socket. In GuildWork the refresh token is stored only as a hash, rotates on every use, and reusing it revokes the session; the real gate is always the server, not the UI.',
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
      es: 'Tech RAG se evalúa con Precision@k, MAP, MRR y nDCG sobre qrels propios congelados, así los números no dependen del corpus vivo. En Population Simulation, la vectorización con NumPy llegó con benchmarks reproducibles del antes y el después.',
      en: 'Tech RAG is evaluated with Precision@k, MAP, MRR and nDCG against frozen custom qrels, so the numbers don’t depend on the live corpus. In Population Simulation, the NumPy vectorization came with reproducible before-and-after benchmarks.',
    },
    evidence: ['tech-rag', 'population-simulation'],
  },
];
