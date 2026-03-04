'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CreateApplicationModal } from '@/components/common';
import { useLoginModal } from '@/contexts';

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
      <button
        onClick={handleOpen}
        className="bg-primary hover:bg-primary/90 cursor-pointer rounded px-4 py-2 text-white"
      >
        Add New Application
      </button>

      <CreateApplicationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
