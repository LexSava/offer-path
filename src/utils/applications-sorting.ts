import { applicationsSortOptions, SortOption } from '@/constants';
import type { IApplication } from '@/types';

export function isApplicationsSortOption(value: string): value is SortOption {
  return applicationsSortOptions.some((option) => option.value === value);
}

function compareApplicationsBySortOption(a: IApplication, b: IApplication, sortOption: SortOption) {
  switch (sortOption) {
    case 'created_asc':
      return a.createdAt.getTime() - b.createdAt.getTime();
    case 'updated_desc':
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    case 'updated_asc':
      return a.updatedAt.getTime() - b.updatedAt.getTime();
    case 'created_desc':
    default:
      return b.createdAt.getTime() - a.createdAt.getTime();
  }
}

export function getStableSortedApplications(applications: IApplication[], sortOption: SortOption) {
  return applications
    .map((application, index) => ({ application, index }))
    .sort((left, right) => {
      const sortResult = compareApplicationsBySortOption(
        left.application,
        right.application,
        sortOption,
      );

      if (sortResult !== 0) {
        return sortResult;
      }

      return left.index - right.index;
    })
    .map(({ application }) => application);
}
