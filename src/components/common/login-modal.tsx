'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { X } from 'lucide-react';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    await signIn('google', {
      callbackUrl: '/',
    });
    setIsGoogleLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="bg-primary/40 fixed inset-0 z-60 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Login modal"
    >
      <div className="bg-surface border-muted/30 relative w-full max-w-md rounded-xl border p-6 shadow-lg">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="text-muted hover:text-primary absolute top-4 right-4 cursor-pointer text-xl leading-none transition-colors"
        >
          <X />
        </button>

        <div className="flex min-h-56 flex-col items-center justify-around gap-4 text-center">
          <p className="text-primary text-base font-medium">
            You can log in using your Google account
          </p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="bg-accent hover:bg-primary cursor-pointer rounded px-4 py-2 font-semibold text-white transition-colors"
          >
            {isGoogleLoading ? 'Redirecting...' : 'Log in with Google'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border-muted text-primary hover:bg-background cursor-pointer rounded border px-4 py-2 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
