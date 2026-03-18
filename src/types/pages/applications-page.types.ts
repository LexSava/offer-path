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

export interface IApplicationsPageHeaderProps {
  showAddButton: boolean;
}

export interface IApplicationsPageStateCardProps {
  message: string;
  actionTitle: string;
  actionDescription: string;
  onAction: () => void;
}

export interface IUseApplicationsPageViewStateResult {
  isSignedIn: boolean;
  shouldShowUnauthorizedState: boolean;
  shouldShowControls: boolean;
  shouldShowEmptyState: boolean;
  shouldShowApplicationsList: boolean;
  isCreateModalOpen: boolean;
  searchQuery: string;
  selectedSortOption: SortOption;
  debouncedSearchQuery: string;
  handleOpenLogin: () => void;
  handleCreateApplication: () => void;
  handleCloseCreateModal: () => void;
  handleOpenApplication: (applicationId: string) => void;
  handleSearchQueryChange: (value: string) => void;
  handleSortOptionChange: (value: SortOption) => void;
}
