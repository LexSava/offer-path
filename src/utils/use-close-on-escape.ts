'use client';

import { useEffect } from 'react';
import { IUseCloseOnEscapeParams } from '@/types';

export function useCloseOnEscape({ isOpen, onClose, enabled = true }: IUseCloseOnEscapeParams) {
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
}
