import type { IDropdownOption } from '@/types';

export const toSelectOptions = (values: readonly string[]): IDropdownOption[] =>
  values.map((value) => ({
    value,
    label: value,
  }));
