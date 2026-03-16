import { useState } from 'react';
import { useApplications } from '@/contexts';
import { TOAST_MESSAGES, showErrorToast, showInfoToast } from '@/lib/toast';
import type { IDeleteApplicationButtonProps, IDeleteApplicationResponse } from '@/types';

type IUseDeleteApplicationParams = Pick<
  IDeleteApplicationButtonProps,
  'applicationId' | 'onDeleted'
>;

export function useDeleteApplication({ applicationId, onDeleted }: IUseDeleteApplicationParams) {
  const { removeApplicationById } = useApplications();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isDeleting) {
      return;
    }

    setIsModalOpen(false);
  };

  const deleteApplication = async () => {
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
      showInfoToast(TOAST_MESSAGES.APPLICATION_DELETED);
      setIsModalOpen(false);
      onDeleted?.();
    } catch (error) {
      console.error('Failed to delete application:', error);
      showErrorToast(TOAST_MESSAGES.APPLICATION_DELETE_FAILED);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isModalOpen,
    isDeleting,
    openModal,
    closeModal,
    deleteApplication,
  };
}
