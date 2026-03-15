import type { IApplication, IApplicationCardDetailProps } from '@/types';
import { getCompensationLabel } from './application-card.utils';

export function getApplicationCardFields(
  application: IApplication,
): Array<Pick<IApplicationCardDetailProps, 'label'> & { value: string }> {
  return [
    { label: 'Company', value: application.company || 'Unknown' },
    { label: 'Grade', value: application.grade },
    { label: 'Main stack', value: application.mainStack },
    { label: 'Compensation', value: getCompensationLabel(application) },
    { label: 'Contract', value: application.contract },
  ];
}

export function getApplicationDates(application: IApplication) {
  const isUpdated = application.updatedAt.getTime() !== application.createdAt.getTime();

  return {
    createdAt: application.createdAt,
    updatedAt: isUpdated ? application.updatedAt : null,
  };
}
