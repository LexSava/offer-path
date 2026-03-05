'use client';

import { X } from 'lucide-react';
import { CreateApplicationForm } from '@/forms';
import { ICreateApplicationModalProps } from '@/types';
import { useCloseOnEscape } from '@/utils';

export function CreateApplicationModal({ isOpen, onClose }: ICreateApplicationModalProps) {
  useCloseOnEscape({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 opacity-100 transition-opacity duration-300">
      <div className="relative flex max-h-[90vh] w-full max-w-3/5 flex-col overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="text-muted hover:text-primary absolute top-4 right-4 cursor-pointer text-xl leading-none transition-colors disabled:opacity-50"
        >
          <X />
        </button>

        <div className="mb-8 pr-8">
          <h3 className="font-logo text-2xl font-medium text-primary">Create Application</h3>
          <p className="mt-2 text-sm text-gray-600">Application</p>
        </div>

        <CreateApplicationForm isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
}
