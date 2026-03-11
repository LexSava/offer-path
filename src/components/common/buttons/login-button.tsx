'use client';

import { LogIn, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useLoginModal } from '@/contexts';

export function LoginButton() {
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
      className="bg-accent flex cursor-pointer items-center gap-2 px-4 py-2 font-semibold text-white shadow-[3px_3px_0_rgba(0,0,0,0.15)] transition-all hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_rgba(0,0,0,0.2)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_rgba(0,0,0,0.15)]"
      onClick={handleClick}
      disabled={status === 'loading'}
    >
      {isSignedIn ? <LogOut size={16} /> : <LogIn size={16} />}
      <span>{isSignedIn ? 'Logout' : 'Login'}</span>
    </button>
  );
}
