'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CreateApplicationModal } from '@/components/common';
import { useLoginModal } from '@/contexts';
import { Button } from '.';

export function AddNewApplicationButton() {
  const { data: session } = useSession();
  const { openLoginModal } = useLoginModal();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleOpen = () => {
    if (!session?.user) {
      openLoginModal();
      return;
    }

    setIsCreateModalOpen(true);
  };

  return (
    <div>
      <Button text="Add New Application" variant="primary" onClick={handleOpen} />

      <CreateApplicationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
