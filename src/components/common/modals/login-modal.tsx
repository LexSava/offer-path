'use client';

import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { X } from 'lucide-react';
import { ILoginModalProps } from '@/types';
import { useCloseOnEscape } from '@/utils';
import { GoogleIcon } from '../icons';

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 opacity-100 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      onClick={!isLoading ? onClose : undefined}
    >
      <div
        className="bg-surface border-muted/30 relative w-full max-w-md border p-6 shadow-2xl"
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

        <div className="flex min-h-56 flex-col items-center justify-center gap-12 text-center">
          <div className="space-y-2">
            <h3 id="login-modal-title" className="text-primary text-xl font-semibold">
              Continue with Google
            </h3>
            <p className="text-secondary text-sm">
              Log in using your Google account to continue tracking your applications.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            aria-busy={isLoading}
            className="text-primary flex w-full max-w-70 cursor-pointer items-center justify-center gap-3 border border-gray-300 bg-white px-4 py-2.5 font-medium shadow-[0_2px_0_rgba(26,24,20,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_0_rgba(26,24,20,0.12)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[0_2px_0_rgba(26,24,20,0.08)]"
          >
            <GoogleIcon />
            <span>{isLoading ? 'Redirecting...' : 'Continue with Google'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="border-muted text-primary hover:bg-background cursor-pointer border px-5 py-2 font-medium shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
