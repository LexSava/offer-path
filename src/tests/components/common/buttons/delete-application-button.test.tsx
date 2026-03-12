import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DeleteApplicationButton } from '@/components/common/buttons/delete-application-button/delete-application-button';
import { DELETE_APPLICATION_CONFIRMATION_TEXT } from '@/constants';

const { useDeleteApplicationMock, confirmationModalPropsSpy } = vi.hoisted(() => ({
  useDeleteApplicationMock: vi.fn(),
  confirmationModalPropsSpy: vi.fn(),
}));

vi.mock('@/components/common/buttons/delete-application-button/use-delete-application', () => ({
  useDeleteApplication: useDeleteApplicationMock,
}));

vi.mock('@/components/common/modals/confirmation-modal', () => ({
  ConfirmationModal: (props: {
    isOpen: boolean;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isSubmitting?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }) => {
    confirmationModalPropsSpy(props);

    return (
      <div data-testid="confirmation-modal" data-open={String(props.isOpen)}>
        <span>{props.message}</span>
        <button type="button" onClick={props.onConfirm}>
          confirm-delete
        </button>
        <button type="button" onClick={props.onCancel}>
          cancel-delete
        </button>
      </div>
    );
  },
}));

describe('DeleteApplicationButton', () => {
  const openModal = vi.fn();
  const closeModal = vi.fn();
  const deleteApplication = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();

    useDeleteApplicationMock.mockReturnValue({
      isModalOpen: false,
      isDeleting: false,
      openModal,
      closeModal,
      deleteApplication,
    });
  });

  it('calls useDeleteApplication with applicationId and onDeleted', () => {
    const onDeleted = vi.fn();

    render(<DeleteApplicationButton applicationId="app-1" onDeleted={onDeleted} />);

    expect(useDeleteApplicationMock).toHaveBeenCalledWith({
      applicationId: 'app-1',
      onDeleted,
    });
  });

  it('opens confirmation modal when delete button is clicked and stops event propagation', () => {
    const parentClick = vi.fn();

    render(
      <div onClick={parentClick}>
        <DeleteApplicationButton applicationId="app-1" />
      </div>
    );

    fireEvent.click(screen.getByRole('button', { name: /delete application/i }));

    expect(openModal).toHaveBeenCalledTimes(1);
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('passes confirmation modal props and triggers delete on confirm', () => {
    useDeleteApplicationMock.mockReturnValue({
      isModalOpen: true,
      isDeleting: false,
      openModal,
      closeModal,
      deleteApplication,
    });

    render(<DeleteApplicationButton applicationId="app-1" />);

    expect(screen.getByTestId('confirmation-modal')).toHaveAttribute('data-open', 'true');
    expect(screen.getByText(DELETE_APPLICATION_CONFIRMATION_TEXT)).toBeInTheDocument();
    expect(confirmationModalPropsSpy).toHaveBeenCalled();

    const lastCallArgs = confirmationModalPropsSpy.mock.calls.at(-1)?.[0];
    expect(lastCallArgs).toMatchObject({
      message: DELETE_APPLICATION_CONFIRMATION_TEXT,
      confirmText: 'Yes',
      cancelText: 'No',
      isSubmitting: false,
    });

    fireEvent.click(screen.getByRole('button', { name: 'confirm-delete' }));

    expect(deleteApplication).toHaveBeenCalledTimes(1);
  });

  it('calls closeModal when cancel is clicked', () => {
    useDeleteApplicationMock.mockReturnValue({
      isModalOpen: true,
      isDeleting: false,
      openModal,
      closeModal,
      deleteApplication,
    });

    render(<DeleteApplicationButton applicationId="app-1" />);

    fireEvent.click(screen.getByRole('button', { name: 'cancel-delete' }));

    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('disables delete button while deletion is in progress', () => {
    useDeleteApplicationMock.mockReturnValue({
      isModalOpen: false,
      isDeleting: true,
      openModal,
      closeModal,
      deleteApplication,
    });

    render(<DeleteApplicationButton applicationId="app-1" className="extra-class" />);

    const button = screen.getByRole('button', { name: /delete application/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('extra-class');
  });
});
