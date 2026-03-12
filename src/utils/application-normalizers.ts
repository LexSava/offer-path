export const toNullableString = (value?: string) =>
  value && value.trim().length > 0 ? value : null;

export const normalizeCompany = (value?: string) => value?.trim() || 'Unknown';

export const normalizeIsFavorite = <T extends { isFavorite: boolean | null }>(application: T) => ({
  ...application,
  isFavorite: Boolean(application.isFavorite),
});
