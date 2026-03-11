import type { IQuickActionButtonProps } from '@/types';

export function QuickActionCard({
  title,
  description,
  icon,
  variant,
  onClick,
}: IQuickActionButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <button
      type="button"
      className={[
        'p-6 text-left transition-all',
        'hover:-translate-x-0.5 hover:-translate-y-0.5',
        isPrimary
          ? 'bg-accent text-white shadow-[5px_5px_0_rgba(0,0,0,0.2)] hover:shadow-[7px_7px_0_rgba(0,0,0,0.25)]'
          : 'bg-surface border-2 border-[rgba(26,24,20,0.1)] text-primary shadow-[5px_5px_0_rgba(26,24,20,0.1)] hover:shadow-[7px_7px_0_rgba(26,24,20,0.15)]',
      ].join(' ')}
      onClick={onClick}
    >
      <div className="mb-2 flex items-center gap-3">
        {icon}
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className={isPrimary ? 'text-sm text-white/80' : 'text-muted text-sm'}>{description}</p>
    </button>
  );
}
