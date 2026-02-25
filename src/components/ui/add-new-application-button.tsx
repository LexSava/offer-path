'use client';

import { useSession } from 'next-auth/react';
import { useLoginModal } from '@/contexts';

export const AddNewApplicationButton = () => {
  const { data: session } = useSession();
  const { openLoginModal } = useLoginModal();

  const handleOpen = () => {
    if (!session?.user) {
      openLoginModal();
      return;
    }

    console.log('open modal create application');
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-primary hover:bg-primary/90 cursor-pointer rounded px-4 py-2 text-white"
      >
        Add New Application
      </button>
    </div>
  );
};
