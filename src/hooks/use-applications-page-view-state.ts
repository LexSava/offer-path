'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useApplicationsCount, useApplicationsIsLoading, useLoginModal } from '@/contexts';
import { APPLICATIONS_PAGE_DEFAULT_SORT_OPTION, type SortOption } from '@/constants';
import type { IUseApplicationsPageViewStateResult } from '@/types';
import { useDebounce } from './use-debounce';

export function useApplicationsPageViewState(): IUseApplicationsPageViewStateResult {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const { openLoginModal } = useLoginModal();
  const isApplicationsLoading = useApplicationsIsLoading();
  const applicationsCount = useApplicationsCount();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(
    APPLICATIONS_PAGE_DEFAULT_SORT_OPTION,
  );
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const isSignedIn = Boolean(session?.user);
  const isSessionLoading = sessionStatus === 'loading';
  const shouldShowUnauthorizedState = !isSessionLoading && !isSignedIn;
  const shouldShowControls = !isSessionLoading && isSignedIn;
  const shouldShowEmptyState =
    isSignedIn && !isSessionLoading && !isApplicationsLoading && applicationsCount === 0;
  const shouldShowApplicationsList = isSignedIn && !isSessionLoading && !shouldShowEmptyState;

  const handleOpenLogin = useCallback(() => {
    openLoginModal();
  }, [openLoginModal]);

  const handleCreateApplication = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const handleOpenApplication = useCallback(
    (applicationId: string) => {
      router.push(`/applications/${applicationId}`);
    },
    [router],
  );

  const handleSearchQueryChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleSortOptionChange = useCallback((value: SortOption) => {
    setSelectedSortOption(value);
  }, []);

  return {
    isSignedIn,
    shouldShowUnauthorizedState,
    shouldShowControls,
    shouldShowEmptyState,
    shouldShowApplicationsList,
    isCreateModalOpen,
    searchQuery,
    selectedSortOption,
    debouncedSearchQuery,
    handleOpenLogin,
    handleCreateApplication,
    handleCloseCreateModal,
    handleOpenApplication,
    handleSearchQueryChange,
    handleSortOptionChange,
  };
}
