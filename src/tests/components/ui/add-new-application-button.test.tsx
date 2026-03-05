import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AddNewApplicationButton } from '@/components/ui/add-new-application-button';
import { useLoginModal } from '@/contexts';
import { useSession } from 'next-auth/react';

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

vi.mock('@/contexts', () => ({
  useLoginModal: vi.fn(),
}));

vi.mock('@/components/common', () => ({
  CreateApplicationModal: ({ isOpen }: { isOpen: boolean }) => (
    <div data-testid="create-application-modal">{isOpen ? 'open' : 'closed'}</div>
  ),
}));

describe('AddNewApplicationButton', () => {
  const mockedUseSession = vi.mocked(useSession);
  const mockedUseLoginModal = vi.mocked(useLoginModal);

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseLoginModal.mockReturnValue({
      openLoginModal: vi.fn(),
      closeLoginModal: vi.fn(),
    });
  });

  it('opens login modal when user is not authenticated', () => {
    const openLoginModal = vi.fn();
    mockedUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn(),
    });
    mockedUseLoginModal.mockReturnValue({
      openLoginModal,
      closeLoginModal: vi.fn(),
    });

    render(<AddNewApplicationButton />);

    fireEvent.click(screen.getByRole('button', { name: 'Add New Application' }));

    expect(openLoginModal).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('create-application-modal')).toHaveTextContent('closed');
  });

  it('opens create application modal when user is authenticated', () => {
    const openLoginModal = vi.fn();
    mockedUseSession.mockReturnValue({
      data: {
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test',
        },
        expires: '2099-01-01T00:00:00.000Z',
      },
      status: 'authenticated',
      update: vi.fn(),
    });
    mockedUseLoginModal.mockReturnValue({
      openLoginModal,
      closeLoginModal: vi.fn(),
    });

    render(<AddNewApplicationButton />);

    fireEvent.click(screen.getByRole('button', { name: 'Add New Application' }));

    expect(openLoginModal).not.toHaveBeenCalled();
    expect(screen.getByTestId('create-application-modal')).toHaveTextContent('open');
  });
});
