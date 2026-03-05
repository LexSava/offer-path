import type { IDropdownOption } from '@/types';

export function toSelectOptions(values: readonly string[]): IDropdownOption[] {
  return values.map((value) => ({
    value,
    label: value,
  }));
}
