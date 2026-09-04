export function getInitials(text: string): string {
  const spaced = text.trim().replace(/([a-z])([A-Z])/g, '$1 $2');
  const words = spaced.split(/[\s-]+/).filter(Boolean);
  const initials = words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '');
  return initials.join('') || '?';
}
