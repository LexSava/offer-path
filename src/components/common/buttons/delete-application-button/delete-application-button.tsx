'use client';

import { Trash2 } from 'lucide-react';
import type { IDeleteApplicationButtonProps } from '@/types';
import { cn } from '@/utils';
import { ConfirmationModal } from '../../modals/confirmation-modal';

import { useDeleteApplication } from './use-delete-application';
import {
  DELETE_APPLICATION_BUTTON_CLASSNAME,
  DELETE_APPLICATION_CONFIRMATION_TEXT,
} from '@/constants';

export function DeleteApplicationButton({
  applicationId,
  className,
  onDeleted,
}: IDeleteApplicationButtonProps) {
  const { isModalOpen, isDeleting, openModal, closeModal, deleteApplication } =
    useDeleteApplication({
      applicationId,
      onDeleted,
    });

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          openModal();
        }}
        aria-label="Delete application"
        className={cn(DELETE_APPLICATION_BUTTON_CLASSNAME, className)}
        disabled={isDeleting}
      >
        <Trash2 size={18} />
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={DELETE_APPLICATION_CONFIRMATION_TEXT}
        confirmText="Yes"
        cancelText="No"
        isSubmitting={isDeleting}
        onConfirm={() => {
          void deleteApplication();
        }}
        onCancel={closeModal}
      />
    </>
  );
}
