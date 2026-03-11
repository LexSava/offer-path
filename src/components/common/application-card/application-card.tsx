import type { IApplicationCardProps } from '@/types';
import { cn, formatDate } from '@/utils';
import { FavoriteApplicationButton } from '../favorite-application-button/favorite-application-button';
import { HighlightMatch } from '../highlight-match/highlight-match';
import { ApplicationCardDetail } from './application-card-detail';
import { getApplicationDateMeta, getCompensationLabel } from './application-card.utils';

export function ApplicationCard({
  application,
  onClick,
  className,
  highlightQuery,
}: IApplicationCardProps) {
  const applicationDateMeta = getApplicationDateMeta(application);

  return (
    <article
      className={cn(
        'bg-surface group relative flex h-full min-h-56 flex-col gap-4 overflow-hidden border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
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
      <div className="flex flex-col gap-1">
        <h3 className="text-primary overflow-hidden text-lg leading-tight font-semibold text-ellipsis whitespace-nowrap">
          <HighlightMatch text={application.position} query={highlightQuery} />
        </h3>
        <p className="text-secondary text-xs font-semibold tracking-wide uppercase">
          <HighlightMatch text={application.specialization} query={highlightQuery} />
        </p>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <ApplicationCardDetail
          label="Grade"
          value={<HighlightMatch text={application.grade} query={highlightQuery} />}
        />
        <ApplicationCardDetail
          label="Main stack"
          value={<HighlightMatch text={application.mainStack} query={highlightQuery} />}
        />
        <ApplicationCardDetail label="Compensation" value={getCompensationLabel(application)} />
        <ApplicationCardDetail
          label="Contract"
          value={<HighlightMatch text={application.contract} query={highlightQuery} />}
        />
        <ApplicationCardDetail
          label="Status"
          value={<HighlightMatch text={application.status} query={highlightQuery} />}
        />
      </div>

      <div className="flex items-end justify-between gap-6">
        <p className="text-secondary mt-auto text-xs">
          {applicationDateMeta.label}: {formatDate(applicationDateMeta.value)}
        </p>

        <FavoriteApplicationButton
          applicationId={application.id}
          isFavorite={application.isFavorite}
        />
      </div>

      <span className="bg-accent pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
    </article>
  );
}
