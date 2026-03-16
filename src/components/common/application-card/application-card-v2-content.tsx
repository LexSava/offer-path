import { memo } from 'react';
import type { IApplicationCardV2ContentProps } from '@/types';
import { HighlightMatch } from '../highlight-match/highlight-match';
import { ApplicationCardV2Detail } from './application-card-v2-detail';

function ApplicationCardV2ContentComponent({
  fields,
  highlightQuery,
}: IApplicationCardV2ContentProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 text-sm">
      {fields.map((field) => (
        <ApplicationCardV2Detail
          key={field.label}
          label={field.label}
          value={<HighlightMatch text={field.value} query={highlightQuery} />}
        />
      ))}
    </div>
  );
}

export const ApplicationCardV2Content = memo(ApplicationCardV2ContentComponent);
