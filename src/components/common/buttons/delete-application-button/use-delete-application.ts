import { useState } from 'react';
import { useApplications, useTooltip } from '@/contexts';
import type { IDeleteApplicationButtonProps, IDeleteApplicationResponse } from '@/types';
import { DELETE_APPLICATION_SUCCESS_MESSAGE, DELETE_APPLICATION_ERROR_MESSAGE } from '@/constants';

type IUseDeleteApplicationParams = Pick<
  IDeleteApplicationButtonProps,
  'applicationId' | 'onDeleted'
>;

export function useDeleteApplication({ applicationId, onDeleted }: IUseDeleteApplicationParams) {
  const { removeApplicationById } = useApplications();
  const { showTooltip } = useTooltip();

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
      showTooltip(DELETE_APPLICATION_SUCCESS_MESSAGE, { variant: 'success' });
      setIsModalOpen(false);
      onDeleted?.();
    } catch (error) {
      console.error('Failed to delete application:', error);
      showTooltip(DELETE_APPLICATION_ERROR_MESSAGE, { variant: 'error' });
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
