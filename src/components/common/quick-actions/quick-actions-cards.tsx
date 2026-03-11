'use client';

import { List, Plus } from 'lucide-react';
import { CreateApplicationModal } from '@/components/common';
import { QuickActionCard } from './quick-action-card';
import { useQuickActionsButton } from './use-quick-actions-card';

export function QuickActionsCards() {
  const {
    isSignedIn,
    isCreateModalOpen,
    handleCreateApplication,
    handleOpenLogin,
    handleOpenApplications,
    handleCloseCreateModal,
  } = useQuickActionsButton();

  return (
    <>
      <div className={isSignedIn ? 'grid w-full grid-cols-1 gap-4 md:grid-cols-2' : 'grid w-full grid-cols-1 gap-4'}>
        {isSignedIn ? (
          <>
            <QuickActionCard
              title="Add Application"
              description="Track a new job application"
              icon={<Plus size={24} />}
              variant="primary"
              onClick={handleCreateApplication}
            />
            <QuickActionCard
              title="View All Applications"
              description="Browse and manage your applications"
              icon={<List size={24} />}
              variant="secondary"
              onClick={handleOpenApplications}
            />
          </>
        ) : (
          <QuickActionCard
            title="Login to Start Tracking"
            description="Sign in to create and manage your applications"
            icon={<Plus size={24} />}
            variant="primary"
            onClick={handleOpenLogin}
          />
        )}
      </div>

      <CreateApplicationModal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} />
    </>
  );
}
