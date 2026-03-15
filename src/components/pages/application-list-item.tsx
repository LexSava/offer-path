'use client';

import { memo, useCallback } from 'react';
import { ApplicationCard } from '@/components/common';
import { useApplicationById } from '@/contexts';
import type { IApplicationListItemProps } from '@/types';

function ApplicationListItemComponent({
  applicationId,
  highlightQuery,
  onOpenApplication,
}: IApplicationListItemProps) {
  const application = useApplicationById(applicationId);

  const handleOpen = useCallback(() => {
    onOpenApplication(applicationId);
  }, [applicationId, onOpenApplication]);

  if (!application) {
    return null;
  }

  return (
    <li className="h-full">
      <ApplicationCard application={application} highlightQuery={highlightQuery} onClick={handleOpen} />
    </li>
  );
}

export const ApplicationListItem = memo(ApplicationListItemComponent);
