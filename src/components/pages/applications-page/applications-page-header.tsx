import { memo } from 'react';
import { AddNewApplicationButton } from '@/components/common';
import { PageTitleHeader } from '../page-title-header';

function ApplicationsPageHeaderComponent() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <PageTitleHeader backLinkUrl="/" backLinkText="Home page" title="My Applications" />

      <div className="w-full sm:w-auto [&_button]:w-full sm:[&_button]:w-auto">
        <AddNewApplicationButton />
      </div>
    </div>
  );
}

export const ApplicationsPageHeader = memo(ApplicationsPageHeaderComponent);
