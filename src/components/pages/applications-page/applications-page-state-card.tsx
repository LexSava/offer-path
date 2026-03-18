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
    <section className="mt-5 flex w-full flex-col gap-4 rounded-md p-4 md:p-6">
      <h2 className="text-muted text-center text-2xl">{message}</h2>

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
