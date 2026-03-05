import type { IApplicationCardDetailProps, IApplicationCardProps } from '@/types';
import { cn, formatDate } from '@/utils';
import { FavoriteApplicationButton } from '../favorite-application-button/favorite-application-button';

function ApplicationCardDetail({ label, value }: IApplicationCardDetailProps) {
  return (
    <div className="flex items-start gap-2">
      <p className="text-primary overflow-hidden text-ellipsis whitespace-nowrap">
        {label}: <span className="text-secondary font-semibold">{value}</span>
      </p>
    </div>
  );
}

function getCompensationLabel(application: IApplicationCardProps['application']) {
  const { salary, currency, period } = application;

  if (!salary || !currency || !period) {
    return 'Not specified';
  }

  return `${salary} ${currency} / ${period}`;
}


export function ApplicationCard({ application, onClick, className }: IApplicationCardProps) {
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
          {application.position}
        </h3>
        <p className="text-secondary text-xs font-semibold tracking-wide uppercase">
          {application.specialization}
        </p>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <ApplicationCardDetail label="Grade" value={application.grade} />
        <ApplicationCardDetail label="Status" value={application.status} />
        <ApplicationCardDetail label="Contract" value={application.contract} />
        <ApplicationCardDetail label="Compensation" value={getCompensationLabel(application)} />
      </div>

      <div className="flex items-end justify-between gap-6">
        <p className="text-secondary mt-auto text-xs">
          Updated: {formatDate(application.updatedAt)}
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
