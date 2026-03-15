import type { ReactNode } from 'react';

interface IApplicationCardV2DetailProps {
  label: string;
  value: ReactNode;
}

export function ApplicationCardV2Detail({ label, value }: IApplicationCardV2DetailProps) {
  return (
    <div className="flex items-baseline gap-1.5">
      <p className="text-primary shrink-0 font-semibold">{label}:</p>
      <p className="text-secondary min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
        {value}
      </p>
    </div>
  );
}
