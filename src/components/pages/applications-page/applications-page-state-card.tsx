import { memo, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { QuickActionCard } from '@/components/common/quick-actions';
import type { IApplicationsPageStateCardProps } from '@/types';

function ApplicationsPageStateCardComponent({
  message,
  actionTitle,
  actionDescription,
  onAction,
  icon,
}: IApplicationsPageStateCardProps & { icon?: ReactNode }) {
  const actionIcon = icon ?? <Plus size={24} />;

  return (
    <section className="bg-surface flex w-full flex-col gap-4 rounded-md border border-black/5 p-4 md:p-6">
      <p className="text-muted text-center text-base">{message}</p>

      <div className="w-full [&_button]:w-full">
        <QuickActionCard
          title={actionTitle}
          description={actionDescription}
          icon={actionIcon}
          variant="primary"
          onClick={onAction}
        />
      </div>
    </section>
  );
}

export const ApplicationsPageStateCard = memo(ApplicationsPageStateCardComponent);
