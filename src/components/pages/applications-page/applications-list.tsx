import { memo } from 'react';
import type { IApplicationsListProps } from '@/types';
import {
  useApplicationsCount,
  useApplicationsIsLoading,
  useFilteredSortedApplicationIds,
} from '@/contexts';
import { ApplicationListItem } from './application-list-item';

function ApplicationsListComponent({
  highlightQuery,
  selectedSortOption,
  onOpenApplication,
}: IApplicationsListProps) {
  const isLoading = useApplicationsIsLoading();
  const applicationsCount = useApplicationsCount();
  const sortedApplicationIds = useFilteredSortedApplicationIds(highlightQuery, selectedSortOption);

  if (isLoading) {
    return <p className="text-muted">Loading applications...</p>;
  }

  if (applicationsCount === 0) {
    return <p className="text-muted">No applications found.</p>;
  }

  if (sortedApplicationIds.length === 0) {
    return <p className="text-muted">No applications match your search.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedApplicationIds.map((applicationId) => (
        <ApplicationListItem
          key={applicationId}
          applicationId={applicationId}
          highlightQuery={highlightQuery}
          onOpenApplication={onOpenApplication}
        />
      ))}
    </ul>
  );
}

export const ApplicationsList = memo(ApplicationsListComponent);
