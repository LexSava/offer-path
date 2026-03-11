'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useApplications, useTooltip } from '@/contexts';
import type { IDeleteApplicationButtonProps, IDeleteApplicationResponse } from '@/types';
import { cn } from '@/utils';
import { ConfirmationModal } from '../modals/confirmation-modal';

export function DeleteApplicationButton({
  applicationId,
  className,
  onDeleted,
}: IDeleteApplicationButtonProps) {
  const { removeApplicationById } = useApplications();
  const { showTooltip } = useTooltip();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isDeleting) {
      return;
    }

    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete application: ${response.status}`);
      }

      const payload = (await response.json()) as IDeleteApplicationResponse;
      const deletedId = payload.data?.id ?? applicationId;

      removeApplicationById(deletedId);
      showTooltip('Application was successfully deleted.', { variant: 'success' });
      setIsModalOpen(false);
      onDeleted?.();
    } catch (error) {
      console.error('Failed to delete application:', error);
      showTooltip('Failed to delete application', { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          handleOpenModal();
        }}
        aria-label="Delete application"
        className={cn(
          'text-muted cursor-pointer border border-gray-300 p-2 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60',
          className,
        )}
        disabled={isDeleting}
      >
        <Trash2 size={18} />
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this application?"
        confirmText="Yes"
        cancelText="No"
        isSubmitting={isDeleting}
        onConfirm={() => {
          void handleDelete();
        }}
        onCancel={handleCloseModal}
      />
    </>
  );
}
