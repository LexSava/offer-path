import { ReactNode } from 'react';

export type LoginModalContextValue = {
  openLoginModal: () => void;
  closeLoginModal: () => void;
};

export type LoginModalProviderProps = {
  children: ReactNode;
};
