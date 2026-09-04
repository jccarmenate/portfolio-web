const PALETTE: [string, string][] = [
  ['#34d399', '#0891b2'],
  ['#a3e635', '#14b8a6'],
  ['#10b981', '#0ea5e9'],
  ['#4ade80', '#0d9488'],
];

export function gradientForSlug(slug: string): [string, string] {
  let hash = 0;
  for (const ch of slug) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
