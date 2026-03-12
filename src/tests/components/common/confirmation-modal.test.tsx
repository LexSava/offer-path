import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationModal } from '@/components/common/modals/confirmation-modal';

describe('ConfirmationModal', () => {
  it('does not render when not open', () => {
    const { container } = render(
      <ConfirmationModal
        isOpen={false}
        message="Confirm this action?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders modal when open', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        message="Confirm this action?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByText('Confirm this action?')).toBeInTheDocument();
  });

  it('renders with dialog role', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        message="Confirm this action?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('displays confirm and cancel buttons with custom text', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        message="Confirm this action?"
        confirmText="Yes, delete"
        cancelText="Cancel"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yes, delete/i })).toBeInTheDocument();
  });

  it('displays default button text', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        message="Confirm this action?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();

    render(
      <ConfirmationModal
        isOpen={true}
        message="Confirm this action?"
        onConfirm={handleConfirm}
        onCancel={vi.fn()}
      />,
    );

    const confirmButton = screen.getByRole('button', { name: /yes/i });
    await user.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledOnce();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(
      <ConfirmationModal
        isOpen={true}
        message="Confirm this action?"
        onConfirm={vi.fn()}
        onCancel={handleCancel}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: /no/i });
    await user.click(cancelButton);

    expect(handleCancel).toHaveBeenCalledOnce();
  });

  it('calls onCancel when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(
      <ConfirmationModal
        isOpen={true}
        message="Confirm this action?"
        onConfirm={vi.fn()}
        onCancel={handleCancel}
      />,
    );

    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);

    expect(handleCancel).toHaveBeenCalledOnce();
  });

  it('disables buttons when submitting', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        message="Confirm this action?"
        isSubmitting={true}
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    const confirmButton = screen.getByRole('button', { name: /yes/i });
    const cancelButton = screen.getByRole('button', { name: /no/i });

    expect(confirmButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('renders close button', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        message="Confirm this action?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });
});
