'use client';

import { memo } from 'react';
import { PageTitleHeader } from '../page-title-header';

function ApplicationDetailPageHeaderComponent() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <PageTitleHeader
        backLinkUrl="/applications"
        backLinkText="Back to My applications"
        title="Applications Detail"
      />
    </div>
  );
}

export const ApplicationDetailPageHeader = memo(ApplicationDetailPageHeaderComponent);
