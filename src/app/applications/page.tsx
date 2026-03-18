'use client';

import { CreateApplicationModal } from '@/components/common';
import { Container } from '@/components/layout';
import { APPLICATIONS_PAGE_ACTIONS, APPLICATIONS_PAGE_MESSAGES } from '@/constants';
import { useApplicationsPageViewState } from '@/hooks';
import {
  ApplicationsList,
  ApplicationsPageControls,
  ApplicationsPageHeader,
  ApplicationsPageStateCard,
} from '@/components/pages';

export default function ApplicationsPage() {
  const {
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
  } = useApplicationsPageViewState();

  return (
    <Container className="bg-background flex flex-col gap-4">
      <ApplicationsPageHeader showAddButton={isSignedIn} />

      {shouldShowControls ? (
        <ApplicationsPageControls
          searchQuery={searchQuery}
          selectedSortOption={selectedSortOption}
          onSearchQueryChange={handleSearchQueryChange}
          onSortOptionChange={handleSortOptionChange}
        />
      ) : null}

      {shouldShowUnauthorizedState ? (
        <ApplicationsPageStateCard
          message={APPLICATIONS_PAGE_MESSAGES.unauthorized}
          actionTitle={APPLICATIONS_PAGE_ACTIONS.login.title}
          actionDescription={APPLICATIONS_PAGE_ACTIONS.login.description}
          onAction={handleOpenLogin}
        />
      ) : null}

      {shouldShowEmptyState ? (
        <>
          <ApplicationsPageStateCard
            message={APPLICATIONS_PAGE_MESSAGES.empty}
            actionTitle={APPLICATIONS_PAGE_ACTIONS.add.title}
            actionDescription={APPLICATIONS_PAGE_ACTIONS.add.description}
            onAction={handleCreateApplication}
          />

          <CreateApplicationModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />
        </>
      ) : null}

      {shouldShowApplicationsList ? (
        <ApplicationsList
          highlightQuery={debouncedSearchQuery}
          selectedSortOption={selectedSortOption}
          onOpenApplication={handleOpenApplication}
        />
      ) : null}
    </Container>
  );
}
