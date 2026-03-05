import type { IApplicationCardProps } from '@/types';

function getCompensationLabel(application: IApplicationCardProps['application']) {
  const { salary, currency, period } = application;

  if (!salary || !currency || !period) {
    return 'Not specified';
  }

  return `${salary} ${currency} / ${period}`;
}

function getFormattedUpdatedDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function ApplicationCard({ application }: IApplicationCardProps) {
  return (
    <article className="bg-surface group relative flex h-full min-h-56 cursor-pointer flex-col gap-4 overflow-hidden border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-1">
        <h3 className="text-primary overflow-hidden text-lg leading-tight font-semibold text-ellipsis whitespace-nowrap">
          {application.position}
        </h3>
        <p className="text-secondary text-xs font-semibold tracking-wide uppercase">
          {application.specialization}
        </p>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-start gap-2">
          <p className="text-primary">
            Grade: <span className="text-secondary font-semibold">{application.grade}</span>
          </p>
        </div>
        <div className="flex items-start gap-2">
          <p className="text-primary">
            Status: <span className="text-secondary font-semibold">{application.status}</span>
          </p>
        </div>
        <div className="flex items-start gap-2">
          <p className="text-primary">
            Contract: <span className="text-secondary font-semibold">{application.contract}</span>
          </p>
        </div>
        <div className="flex items-start gap-2 sm:col-span-2">
          <p className="text-primary overflow-hidden text-ellipsis whitespace-nowrap">
            Compensation:{' '}
            <span className="text-secondary font-semibold">
              {getCompensationLabel(application)}
            </span>
          </p>
        </div>
      </div>

      <p className="text-secondary mt-auto text-xs">
        Updated: {getFormattedUpdatedDate(application.updatedAt)}
      </p>

      <span className="bg-accent pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
    </article>
  );
}
