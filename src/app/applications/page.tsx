'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout';
import { useDebounce } from '@/hooks';
import {
  ApplicationsList,
  ApplicationsPageControls,
  ApplicationsPageHeader,
} from '@/components/pages';
import { type SortOption } from '@/constants';

export default function ApplicationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>('created_desc');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const handleOpenApplication = useCallback(
    (applicationId: string) => {
      router.push(`/applications/${applicationId}`);
    },
    [router],
  );

  return (
    <Container className="bg-background flex flex-col gap-4">
      <ApplicationsPageHeader />

      <ApplicationsPageControls
        searchQuery={searchQuery}
        selectedSortOption={selectedSortOption}
        onSearchQueryChange={setSearchQuery}
        onSortOptionChange={setSelectedSortOption}
      />

      <ApplicationsList
        highlightQuery={debouncedSearchQuery}
        selectedSortOption={selectedSortOption}
        onOpenApplication={handleOpenApplication}
      />
    </Container>
  );
}
