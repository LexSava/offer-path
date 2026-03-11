import { IDropdownOption } from '@/types';

export const applicationsSortOptions: IDropdownOption[] = [
  { label: 'Created date (Newest first)', value: 'created_desc' },
  { label: 'Created date (Oldest first)', value: 'created_asc' },
  { label: 'Updated date (Newest first)', value: 'updated_desc' },
  { label: 'Updated date (Oldest first)', value: 'updated_asc' },
];

export type SortOption = 'created_desc' | 'created_asc' | 'updated_desc' | 'updated_asc';
