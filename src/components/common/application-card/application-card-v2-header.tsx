import { memo } from 'react';
import type { IApplicationCardV2HeaderProps } from '@/types';
import { FavoriteApplicationButton } from '../favorite-application-button/favorite-application-button';
import { HighlightMatch } from '../highlight-match/highlight-match';

function ApplicationCardV2HeaderComponent({
  applicationId,
  position,
  specialization,
  highlightQuery,
}: IApplicationCardV2HeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <h3 className="text-primary overflow-hidden text-lg leading-tight font-semibold text-ellipsis whitespace-nowrap">
          <HighlightMatch text={position} query={highlightQuery} />
        </h3>
        <p className="overflow-hidden text-xs leading-tight font-semibold tracking-wide text-ellipsis whitespace-nowrap text-gray-600 uppercase">
          <HighlightMatch text={specialization} query={highlightQuery} />
        </p>
      </div>

      <FavoriteApplicationButton applicationId={applicationId} className="shrink-0" />
    </div>
  );
}

export const ApplicationCardV2Header = memo(ApplicationCardV2HeaderComponent);
