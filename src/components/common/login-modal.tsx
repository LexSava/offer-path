'use client';

import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { X } from 'lucide-react';
import { useCloseOnEscape } from '@/utils/use-close-on-escape';
import { ILoginModalProps } from '@/types';

export function LoginModal({ isOpen, onClose }: ILoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isSubmittingRef = useRef(false);

  useCloseOnEscape({ isOpen, onClose, enabled: !isLoading });

  const handleGoogleLogin = async () => {
    if (isSubmittingRef.current) return;

    try {
      isSubmittingRef.current = true;
      setIsLoading(true);

      await signIn('google', {
        callbackUrl: '/',
      });
    } catch (error) {
      console.error('Google login failed:', error);
      isSubmittingRef.current = false;
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="bg-primary/40 fixed inset-0 z-60 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onClick={!isLoading ? onClose : undefined}
    >
      <div
        className="bg-surface border-muted/30 relative w-full max-w-md rounded-xl border p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close modal"
          className="text-muted hover:text-primary absolute top-4 right-4 cursor-pointer text-xl leading-none transition-colors disabled:opacity-50"
        >
          <X />
        </button>

        <div className="flex min-h-56 flex-col items-center justify-around gap-4 text-center">
          <p id="login-modal-title" className="text-primary text-base font-medium">
            You can log in using your Google account
          </p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            aria-busy={isLoading}
            className="bg-accent hover:bg-primary cursor-pointer rounded px-4 py-2 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Redirecting...' : 'Log in with Google'}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="border-muted text-primary hover:bg-background cursor-pointer rounded border px-4 py-2 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
