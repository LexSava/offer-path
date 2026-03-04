import { useContext } from 'react';
import { LoginModalContext } from './login-modal-context';

export function useLoginModal() {
  const context = useContext(LoginModalContext);

  if (!context) {
    throw new Error('useLoginModal must be used within LoginModalProvider');
  }

  return context;
}
