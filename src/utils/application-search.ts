import type { IApplication } from '@/types';
import { SEARCHABLE_APPLICATION_FIELDS } from '@/constants';
import { normalizeString } from './normalize-string';

export function searchApplications(applications: IApplication[], query: string) {
  const normalizedQuery = normalizeString(query);

  if (!normalizedQuery) {
    return applications;
  }

  return applications.filter((application) =>
    SEARCHABLE_APPLICATION_FIELDS.some((field) =>
      normalizeString(application[field]).includes(normalizedQuery),
    ),
  );
}