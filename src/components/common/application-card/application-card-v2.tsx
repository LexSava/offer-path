import { CalendarDays } from 'lucide-react';
import type { IApplicationCardProps } from '@/types';
import { cn, formatDate } from '@/utils';
import { FavoriteApplicationButton } from '../favorite-application-button/favorite-application-button';
import { HighlightMatch } from '../highlight-match/highlight-match';
import { StatusBadge } from '../status-badge/status-badge';
import { ApplicationCardV2Detail } from './application-card-v2-detail';
import { getApplicationCardFields, getApplicationDates } from './application-card-v2.utils';

export function ApplicationCardV2({
  application,
  onClick,
  className,
  highlightQuery,
}: IApplicationCardProps) {
  const fields = getApplicationCardFields(application);
  const { createdAt, updatedAt } = getApplicationDates(application);

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
      onKeyDown={(event) => {
        if (!onClick) {
          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `Open application ${application.position}` : undefined}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-primary overflow-hidden text-lg leading-tight font-semibold text-ellipsis whitespace-nowrap">
            <HighlightMatch text={application.position} query={highlightQuery} />
          </h3>
          <p className="overflow-hidden text-xs leading-tight font-semibold tracking-wide text-ellipsis whitespace-nowrap text-gray-600 uppercase">
            <HighlightMatch text={application.specialization} query={highlightQuery} />
          </p>
        </div>

        <FavoriteApplicationButton
          applicationId={application.id}
          isFavorite={application.isFavorite}
          className="shrink-0"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 text-sm">
        {fields.map((field) => (
          <ApplicationCardV2Detail
            key={field.label}
            label={field.label}
            value={<HighlightMatch text={field.value} query={highlightQuery} />}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <StatusBadge status={application.status} />

        <div className="flex items-center justify-start gap-1 text-xs text-gray-600">
          <CalendarDays size={14} aria-hidden="true" />
          <div className="flex flex-1 items-center justify-between gap-1.5 pt-0.5">
            {updatedAt ? <span>Updated: {formatDate(updatedAt)}</span> : null}
            <span>Created: {formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
