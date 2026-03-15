import { memo } from 'react';
import { CalendarDays } from 'lucide-react';
import type { IApplicationCardV2MetaProps } from '@/types';
import { formatDate } from '@/utils';
import { StatusBadge } from '../status-badge/status-badge';

function ApplicationCardV2MetaComponent({
  status,
  createdAt,
  updatedAt,
}: IApplicationCardV2MetaProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <StatusBadge status={status} />

      <div className="flex items-center justify-start gap-1 text-xs text-gray-600">
        <CalendarDays size={14} aria-hidden="true" />
        <div className="flex flex-1 items-center justify-between gap-1.5 pt-0.5">
          {updatedAt ? <span>Updated: {formatDate(updatedAt)}</span> : null}
          <span>Created: {formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export const ApplicationCardV2Meta = memo(ApplicationCardV2MetaComponent);
