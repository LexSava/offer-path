import type { IApplication } from '@/types';

export const SEARCHABLE_APPLICATION_FIELDS = [
  'grade',
  'contract',
  'mainStack',
  'position',
  'specialization',
  'status',
] as const satisfies ReadonlyArray<keyof IApplication>;

export type SearchableApplicationField = (typeof SEARCHABLE_APPLICATION_FIELDS)[number];
