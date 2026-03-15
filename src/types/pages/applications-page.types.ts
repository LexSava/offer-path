import type { SortOption } from '@/constants';

export interface IApplicationsPageControlsProps {
  searchQuery: string;
  selectedSortOption: SortOption;
  onSearchQueryChange: (value: string) => void;
  onSortOptionChange: (value: SortOption) => void;
}

export interface IApplicationsListProps {
  highlightQuery: string;
  selectedSortOption: SortOption;
  onOpenApplication: (applicationId: string) => void;
}
