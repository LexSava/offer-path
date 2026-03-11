import { applicationsSortOptions } from '@/constants';
import { isApplicationsSortOption } from '@/utils';
import type { IApplicationSortDropdownProps } from '@/types';
import { Dropdown } from '../dropdown/dropdown';

export function ApplicationSortDropdown({ value, onChange }: IApplicationSortDropdownProps) {
  return (
    <Dropdown
      label="Sort applications"
      options={applicationsSortOptions}
      value={value}
      onChange={(event) => {
        const nextValue = event.currentTarget.value;

        if (!isApplicationsSortOption(nextValue)) {
          return;
        }

        onChange(nextValue);
      }}
    />
  );
}