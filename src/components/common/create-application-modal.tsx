'use client';

import { X } from 'lucide-react';
import { useCloseOnEscape } from '@/utils/use-close-on-escape';

interface CreateApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateApplicationModal({ isOpen, onClose }: CreateApplicationModalProps) {
  useCloseOnEscape({ isOpen, onClose });

  if (!isOpen) return null;

  const handleSubmit = () => {
    console.log('Submit');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 opacity-100 transition-opacity duration-300">
      <div className="relative flex w-full max-w-lg flex-col rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="text-muted hover:text-primary absolute top-4 right-4 cursor-pointer text-xl leading-none transition-colors disabled:opacity-50"
        >
          <X />
        </button>

        <div className="mb-8 pr-8">
          <h2 className="text-xl font-semibold text-gray-900">Create Application</h2>
          <p className="mt-2 text-sm text-gray-600">Application</p>
        </div>

        <div className="mt-auto flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 cursor-pointer rounded px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
