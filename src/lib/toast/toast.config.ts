import type { ComponentProps } from 'react';
import { Toaster } from 'sonner';

export const TOASTER_CONFIG: ComponentProps<typeof Toaster> = {
  position: 'top-right',
  duration: 3200,
  visibleToasts: 4,
  expand: false,
  closeButton: true,
  richColors: false,
  offset: 16,
  toastOptions: {
    style: { borderRadius: '0px' },
    classNames: {
      toast: 'pixel-toast',
      title: 'pixel-toast-title',
      description: 'pixel-toast-description',
      closeButton: 'pixel-toast-close',
      success: 'pixel-toast-success',
      error: 'pixel-toast-error',
      info: 'pixel-toast-info',
      warning: 'pixel-toast-warning',
    },
  },
};
