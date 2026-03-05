'use client';

import { X } from 'lucide-react';
import { ITooltipProps } from '@/types';
import { cn } from '@/utils';

const variantClassMap = {
  success: 'border-primary text-primary',
  error: 'border-red-500 text-red-600',
} as const;

export function Tooltip({ message, isVisible, variant, onClose }: ITooltipProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'bg-surface pointer-events-none fixed top-10 right-5 z-100 max-w-sm translate-y-0 border px-4 py-3 shadow-sm transition-all duration-200',
        variantClassMap[variant],
        isVisible ? 'opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
      )}
    >
      <div className="flex items-start gap-3">
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close tooltip"
          className="pointer-events-auto cursor-pointer text-current/70 transition-colors hover:text-current"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
