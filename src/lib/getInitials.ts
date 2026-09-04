export function getInitials(text: string): string {
  const words = text.trim().split(/[\s-]+/).filter(Boolean);
  const initials = words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '');
  return initials.join('') || '?';
}
