'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AddNewApplicationButton,
  ApplicationSearchInput,
  ApplicationSortDropdown,
} from '@/components/common';
import { Container } from '@/components/layout';
import { useDebounce } from '@/hooks';
import {
  useApplicationsCount,
  useApplicationsIsLoading,
  useFilteredSortedApplicationIds,
} from '@/contexts';
import { ApplicationListItem, PageTitleHeader } from '@/components/pages';
import { type SortOption } from '@/constants';

export default function ApplicationsPage() {
  const isLoading = useApplicationsIsLoading();
  const applicationsCount = useApplicationsCount();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>('created_desc');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const sortedApplicationIds = useFilteredSortedApplicationIds(
    debouncedSearchQuery,
    selectedSortOption,
  );

  const handleOpenApplication = useCallback(
    (applicationId: string) => {
      router.push(`/applications/${applicationId}`);
    },
    [router],
  );

  return (
    <Container className="bg-background flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageTitleHeader backLinkUrl="/" backLinkText="Home page" title="My Applications" />

        <div className="w-full sm:w-auto [&_button]:w-full sm:[&_button]:w-auto">
          <AddNewApplicationButton />
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="w-full md:max-w-md">
          <ApplicationSearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="w-full md:max-w-xs">
          <ApplicationSortDropdown value={selectedSortOption} onChange={setSelectedSortOption} />
        </div>
      </div>

      {isLoading ? <p className="text-muted">Loading applications...</p> : null}

      {!isLoading && applicationsCount === 0 ? (
        <p className="text-muted">No applications found.</p>
      ) : null}

      {!isLoading && applicationsCount > 0 && sortedApplicationIds.length === 0 ? (
        <p className="text-muted">No applications match your search.</p>
      ) : null}

      {!isLoading && sortedApplicationIds.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedApplicationIds.map((applicationId) => (
            <ApplicationListItem
              key={applicationId}
              applicationId={applicationId}
              highlightQuery={debouncedSearchQuery}
              onOpenApplication={handleOpenApplication}
            />
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
