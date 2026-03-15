import { memo } from 'react';
import { ApplicationSearchInput, ApplicationSortDropdown } from '@/components/common';
import type { IApplicationsPageControlsProps } from '@/types';

function ApplicationsPageControlsComponent({
  searchQuery,
  selectedSortOption,
  onSearchQueryChange,
  onSortOptionChange,
}: IApplicationsPageControlsProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end">
      <div className="w-full md:max-w-md">
        <ApplicationSearchInput value={searchQuery} onChange={onSearchQueryChange} />
      </div>

      <div className="w-full md:max-w-xs">
        <ApplicationSortDropdown value={selectedSortOption} onChange={onSortOptionChange} />
      </div>
    </div>
  );
}

export const ApplicationsPageControls = memo(ApplicationsPageControlsComponent);
