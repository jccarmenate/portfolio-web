const PALETTE: [string, string][] = [
  ['#34d399', '#0891b2'],
  ['#a3e635', '#14b8a6'],
  ['#10b981', '#0ea5e9'],
  ['#4ade80', '#0d9488'],
];

export function gradientForIndex(index: number): [string, string] {
  return PALETTE[index % PALETTE.length];
}
