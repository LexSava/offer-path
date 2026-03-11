export function normalizeString(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}