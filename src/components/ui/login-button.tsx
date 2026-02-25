'use client';

import { signOut, useSession } from 'next-auth/react';
import { useLoginModal } from '@/contexts';

export const LoginButton = () => {
  const { data: session, status } = useSession();
  const { openLoginModal } = useLoginModal();
  const isSignedIn = Boolean(session?.user);

  const handleClick = async () => {
    if (isSignedIn) {
      await signOut({ callbackUrl: '/' });
      return;
    }

    openLoginModal();
  };

  return (
    <button
      type="button"
      className="bg-accent hover:bg-primary cursor-pointer rounded px-4 py-2 font-semibold text-white transition-colors"
      onClick={handleClick}
      disabled={status === 'loading'}
    >
      {isSignedIn ? 'Logout' : 'Login'}
    </button>
  );
};
