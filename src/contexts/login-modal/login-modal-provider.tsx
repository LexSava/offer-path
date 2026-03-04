'use client';

import { useState } from 'react';
import { LoginModal } from '@/components/common';
import { LoginModalContext } from './login-modal-context';
import { LoginModalProviderProps } from '@/types';

export function LoginModalProvider({ children }: LoginModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openLoginModal = () => setIsOpen(true);
  const closeLoginModal = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ openLoginModal, closeLoginModal }}>
      {children}
      <LoginModal isOpen={isOpen} onClose={closeLoginModal} />
    </LoginModalContext.Provider>
  );
}
