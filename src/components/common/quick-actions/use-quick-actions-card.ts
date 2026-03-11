import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLoginModal } from '@/contexts';

export function useQuickActionsButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const { openLoginModal } = useLoginModal();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const isSignedIn = Boolean(session?.user);

  const handleCreateApplication = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenLogin = () => {
    openLoginModal();
  };

  const handleOpenApplications = () => {
    router.push('/applications');
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return {
    isSignedIn,
    isCreateModalOpen,
    handleCreateApplication,
    handleOpenLogin,
    handleOpenApplications,
    handleCloseCreateModal,
  };
}
