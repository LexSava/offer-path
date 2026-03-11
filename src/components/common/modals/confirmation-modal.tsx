'use client';

import { X } from 'lucide-react';
import type { IConfirmationModalProps } from '@/types';
import { useCloseOnEscape } from '@/utils';

export function ConfirmationModal({
  isOpen,
  message,
  confirmText = 'Yes',
  cancelText = 'No',
  isSubmitting = false,
  onConfirm,
  onCancel,
}: IConfirmationModalProps) {
  useCloseOnEscape({ isOpen, onClose: onCancel });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 opacity-100 transition-opacity duration-300">
      <div className="relative w-full max-w-md bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close modal"
          className="text-muted hover:text-primary absolute top-4 right-4 cursor-pointer text-xl leading-none transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          <X />
        </button>

        <p className="text-primary pr-8 text-base font-medium">{message}</p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            className="cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="cursor-pointer bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
