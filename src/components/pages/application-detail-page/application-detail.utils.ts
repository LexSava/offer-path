import type { IApplication, IApplicationResponseDto } from '@/types';
import type { CreateApplicationRequestValues } from '@/forms/create-application/create-application-validation';

export function toApplicationFromApi(application: IApplicationResponseDto): IApplication {
  return {
    ...application,
    company: application.company?.trim() || 'Unknown',
    isFavorite: Boolean(application.isFavorite),
    createdAt: new Date(application.createdAt),
    updatedAt: new Date(application.updatedAt),
  };
}

export function toFormValues(application: IApplication): CreateApplicationRequestValues {
  return {
    position: application.position,
    company: application.company,
    specialization: application.specialization,
    grade: application.grade,
    mainStack: application.mainStack,
    salary: String(application.salary ?? ''),
    currency: application.currency ?? 'USD',
    period: application.period ?? 'month',
    contract: application.contract,
    url: application.url ?? '',
    notes: application.notes ?? '',
    status: application.status,
  };
}
