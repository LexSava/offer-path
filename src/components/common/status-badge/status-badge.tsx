import type { IStatusBadgeProps } from '@/types';
import { cn } from '@/utils';
import { statusConfig } from '@/constants';

export function StatusBadge({ status, className }: IStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <p
      className={cn('mb-3 w-full px-3 py-2 text-sm font-medium', className)}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
        border: `1px solid ${config.color}`,
      }}
    >
      Status: {status}
    </p>
  );
}
