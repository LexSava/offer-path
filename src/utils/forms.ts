import type { IApplication } from '@/types';
export { formatDate } from './format-date';
export { handleSalaryInput } from './handle-salary-input';
export { toSelectOptions } from './to-select-options';

export function formatCompensation(
  application: Pick<IApplication, 'salary' | 'currency' | 'period'>,
) {
  if (!application.salary || !application.currency || !application.period) {
    return 'Not specified';
  }

  return `${application.salary} ${application.currency} / ${application.period}`;
}
