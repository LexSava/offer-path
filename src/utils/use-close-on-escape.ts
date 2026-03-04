import { useEffect } from 'react';

interface UseCloseOnEscapeParams {
  isOpen: boolean;
  onClose: () => void;
  enabled?: boolean;
}

export const useCloseOnEscape = ({
  isOpen,
  onClose,
  enabled = true,
}: UseCloseOnEscapeParams) => {
  useEffect(() => {
    if (!isOpen || !enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, enabled, onClose]);
};
