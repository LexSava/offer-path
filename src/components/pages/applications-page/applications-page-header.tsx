import { memo } from 'react';
import { AddNewApplicationButton } from '@/components/common';
import { APPLICATIONS_PAGE_HEADER_TEXT } from '@/constants';
import type { IApplicationsPageHeaderProps } from '@/types';
import { PageTitleHeader } from '../page-title-header';

function ApplicationsPageHeaderComponent({ showAddButton }: IApplicationsPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <PageTitleHeader
        backLinkUrl="/"
        backLinkText={APPLICATIONS_PAGE_HEADER_TEXT.backLinkText}
        title={APPLICATIONS_PAGE_HEADER_TEXT.title}
      />

      {showAddButton ? (
        <div className="w-full sm:w-auto [&_button]:w-full sm:[&_button]:w-auto">
          <AddNewApplicationButton />
        </div>
      ) : null}
    </div>
  );
}

export const ApplicationsPageHeader = memo(ApplicationsPageHeaderComponent);
