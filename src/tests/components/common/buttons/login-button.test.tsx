import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LoginButton } from '@/components/common/buttons/login-button';
import { useLoginModal } from '@/contexts';
import { signOut, useSession } from 'next-auth/react';

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('@/contexts', () => ({
  useLoginModal: vi.fn(),
}));

describe('LoginButton', () => {
  const mockedUseSession = vi.mocked(useSession);
  const mockedSignOut = vi.mocked(signOut);
  const mockedUseLoginModal = vi.mocked(useLoginModal);

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseLoginModal.mockReturnValue({
      openLoginModal: vi.fn(),
      closeLoginModal: vi.fn(),
    });
  });

  it('shows Login and opens login modal when user is not signed in', () => {
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

    render(<LoginButton />);

    const button = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(button);

    expect(button.className).toContain('bg-accent');
    expect(button.className).toContain('shadow-[3px_3px_0_rgba(0,0,0,0.15)]');
    expect(button.className).toContain('hover:shadow-[4px_4px_0_rgba(0,0,0,0.2)]');
    expect(button.querySelector('svg')).toBeInTheDocument();
    expect(openLoginModal).toHaveBeenCalledTimes(1);
    expect(mockedSignOut).not.toHaveBeenCalled();
  });

  it('shows Logout and calls signOut when user is signed in', () => {
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

    mockedSignOut.mockResolvedValue(undefined);

    render(<LoginButton />);

    const button = screen.getByRole('button', { name: 'Logout' });
    fireEvent.click(button);

    expect(button.querySelector('svg')).toBeInTheDocument();
    expect(mockedSignOut).toHaveBeenCalledWith({ callbackUrl: '/' });
  });

  it('is disabled while session status is loading', () => {
    mockedUseSession.mockReturnValue({
      data: null,
      status: 'loading',
      update: vi.fn(),
    });

    render(<LoginButton />);

    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled();
  });
});
