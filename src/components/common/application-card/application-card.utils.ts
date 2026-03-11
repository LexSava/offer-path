import type { IApplicationCardProps } from '@/types';

export function getCompensationLabel(application: IApplicationCardProps['application']): string {
  const { salary, currency, period } = application;

  if (!salary || !currency || !period) {
    return 'Not specified';
  }

  return `${salary} ${currency} / ${period}`;
}

export function getApplicationDateMeta(application: IApplicationCardProps['application']): {
  label: string;
  value: Date;
} {
  const isUpdated = application.updatedAt.getTime() !== application.createdAt.getTime();

  if (isUpdated) {
    return {
      label: 'Updated',
      value: application.updatedAt,
    };
  }

  return {
    label: 'Created',
    value: application.createdAt,
  };
}
