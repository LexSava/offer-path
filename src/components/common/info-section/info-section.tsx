import type { IInfoSectionProps } from '@/types';

export function InfoSection({ number, title, description }: IInfoSectionProps) {
  return (
    <div className="flex gap-4">
      <div className="bg-accent flex h-12 w-12 shrink-0 items-center justify-center font-bold text-white">
        {number}
      </div>
      <div>
        <h4 className="text-primary mb-1 font-semibold">{title}</h4>
        <p className="text-muted text-left text-sm leading-[1.6]">{description}</p>
      </div>
    </div>
  );
}
