import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { QuickActionsCards } from '@/components/common/quick-actions/quick-actions-cards';
import { useQuickActionsButton } from '@/components/common/quick-actions/use-quick-actions-card';

const modalPropsSpy = vi.fn();

vi.mock('@/components/common', () => ({
  CreateApplicationModal: (props: { isOpen: boolean; onClose: () => void }) => {
    modalPropsSpy(props);

    return (
      <div data-testid="create-modal" data-open={String(props.isOpen)}>
        <button type="button" onClick={props.onClose}>
          close-create-modal
        </button>
      </div>
    );
  },
}));

vi.mock('@/components/common/quick-actions/use-quick-actions-card', () => ({
  useQuickActionsButton: vi.fn(),
}));

describe('QuickActionsCards', () => {
  const mockedUseQuickActionsButton = vi.mocked(useQuickActionsButton);

  const handleCreateApplication = vi.fn();
  const handleOpenLogin = vi.fn();
  const handleOpenApplications = vi.fn();
  const handleCloseCreateModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseQuickActionsButton.mockReturnValue({
      isSignedIn: false,
      isCreateModalOpen: false,
      handleCreateApplication,
      handleOpenLogin,
      handleOpenApplications,
      handleCloseCreateModal,
    });
  });

  it('renders single login card for unauthenticated user and opens login on click', () => {
    render(<QuickActionsCards />);

    const loginCard = screen.getByRole('button', { name: /login to start tracking/i });
    fireEvent.click(loginCard);

    expect(screen.queryByRole('button', { name: /add application/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /view all applications/i })).not.toBeInTheDocument();
    expect(handleOpenLogin).toHaveBeenCalledTimes(1);
  });

  it('renders signed-in actions and triggers proper handlers', () => {
    mockedUseQuickActionsButton.mockReturnValue({
      isSignedIn: true,
      isCreateModalOpen: false,
      handleCreateApplication,
      handleOpenLogin,
      handleOpenApplications,
      handleCloseCreateModal,
    });

    render(<QuickActionsCards />);

    fireEvent.click(screen.getByRole('button', { name: /add application/i }));
    fireEvent.click(screen.getByRole('button', { name: /view all applications/i }));

    expect(handleCreateApplication).toHaveBeenCalledTimes(1);
    expect(handleOpenApplications).toHaveBeenCalledTimes(1);
    expect(handleOpenLogin).not.toHaveBeenCalled();
  });

  it('passes open state and close handler to create modal', () => {
    mockedUseQuickActionsButton.mockReturnValue({
      isSignedIn: true,
      isCreateModalOpen: true,
      handleCreateApplication,
      handleOpenLogin,
      handleOpenApplications,
      handleCloseCreateModal,
    });

    render(<QuickActionsCards />);

    expect(screen.getByTestId('create-modal')).toHaveAttribute('data-open', 'true');

    const lastCallArgs = modalPropsSpy.mock.calls.at(-1)?.[0];
    expect(lastCallArgs).toMatchObject({
      isOpen: true,
      onClose: handleCloseCreateModal,
    });

    fireEvent.click(screen.getByRole('button', { name: 'close-create-modal' }));
    expect(handleCloseCreateModal).toHaveBeenCalledTimes(1);
  });
});
