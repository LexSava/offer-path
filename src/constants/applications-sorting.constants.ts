import { IDropdownOption } from '@/types';

export const applicationsSortOptions: IDropdownOption[] = [
  { label: 'Created (Newest first)', value: 'created_desc' },
  { label: 'Created (Oldest first)', value: 'created_asc' },
  { label: 'Updated (Newest first)', value: 'updated_desc' },
  { label: 'Updated (Oldest first)', value: 'updated_asc' },
];

export type SortOption = 'created_desc' | 'created_asc' | 'updated_desc' | 'updated_asc';
