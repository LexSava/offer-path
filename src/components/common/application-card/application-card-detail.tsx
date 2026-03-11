import type { IApplicationCardDetailProps } from '@/types';

export function ApplicationCardDetail({ label, value }: IApplicationCardDetailProps) {
  return (
    <div className="flex items-start gap-2">
      <p className="text-primary overflow-hidden text-ellipsis whitespace-nowrap">
        {label}: <span className="text-secondary font-semibold">{value}</span>
      </p>
    </div>
  );
}
