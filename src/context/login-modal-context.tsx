'use client';

import React from 'react';
import { LoginModal } from '@/components/common';

type LoginModalContextValue = {
  openLoginModal: () => void;
  closeLoginModal: () => void;
};

const LoginModalContext = React.createContext<LoginModalContextValue | undefined>(undefined);

type LoginModalProviderProps = {
  children: React.ReactNode;
};

export const LoginModalProvider: React.FC<LoginModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openLoginModal = () => {
    setIsOpen(true);
  };

  const closeLoginModal = () => {
    setIsOpen(false);
  };

  return (
    <LoginModalContext.Provider value={{ openLoginModal, closeLoginModal }}>
      {children}
      <LoginModal isOpen={isOpen} onClose={closeLoginModal} />
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => {
  const context = React.useContext(LoginModalContext);

  if (!context) {
    throw new Error('useLoginModal must be used within LoginModalProvider.');
  }

  return context;
};