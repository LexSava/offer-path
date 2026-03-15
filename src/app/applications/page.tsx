'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AddNewApplicationButton,
  ApplicationCard,
  ApplicationSearchInput,
  ApplicationSortDropdown,
} from '@/components/common';
import { Container } from '@/components/layout';
import { useDebounce } from '@/hooks';
import { useApplications } from '@/contexts';
import { PageTitleHeader } from '@/components/pages/page-title-header';
import { searchApplications, sortApplications } from '@/utils';
import { type SortOption } from '@/constants';

export default function ApplicationsPage() {
  const { applications, isLoading } = useApplications();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>('created_desc');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const filteredApplications = useMemo(
    () => searchApplications(applications, debouncedSearchQuery),
    [applications, debouncedSearchQuery],
  );

  const sortedApplications = useMemo(
    () => sortApplications(filteredApplications, selectedSortOption),
    [filteredApplications, selectedSortOption],
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

      {!isLoading && applications.length === 0 ? (
        <p className="text-muted">No applications found.</p>
      ) : null}

      {!isLoading && applications.length > 0 && sortedApplications.length === 0 ? (
        <p className="text-muted">No applications match your search.</p>
      ) : null}

      {!isLoading && sortedApplications.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedApplications.map((application) => (
            <li key={application.id} className="h-full">
              <ApplicationCard
                application={application}
                highlightQuery={debouncedSearchQuery}
                onClick={() => router.push(`/applications/${application.id}`)}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
