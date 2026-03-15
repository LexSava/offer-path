import { memo, useCallback, useMemo, type KeyboardEvent } from 'react';
import type { IApplicationCardProps } from '@/types';
import { cn } from '@/utils';
import { getApplicationCardFields, getApplicationDates } from './application-card-v2.utils';
import { ApplicationCardV2Content } from './application-card-v2-content';
import { ApplicationCardV2Header } from './application-card-v2-header';
import { ApplicationCardV2Meta } from './application-card-v2-meta';

function ApplicationCardV2Component({
  application,
  onClick,
  className,
  highlightQuery,
}: IApplicationCardProps) {
  const fields = useMemo(() => getApplicationCardFields(application), [application]);
  const { createdAt, updatedAt } = useMemo(() => getApplicationDates(application), [application]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!onClick) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  return (
    <article
      className={cn(
        'bg-surface flex h-full min-h-64 flex-col border border-gray-200 p-5 shadow-[4px_4px_0_rgba(26,24,20,0.1)] transition-all duration-200',
        'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_rgba(26,24,20,0.15)]',
        'active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0_rgba(26,24,20,0.12)]',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `Open application ${application.position}` : undefined}
    >
      <ApplicationCardV2Header
        applicationId={application.id}
        position={application.position}
        specialization={application.specialization}
        highlightQuery={highlightQuery}
      />

      <ApplicationCardV2Content fields={fields} highlightQuery={highlightQuery} />

      <ApplicationCardV2Meta
        status={application.status}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
    </article>
  );
}

export const ApplicationCardV2 = memo(ApplicationCardV2Component);
