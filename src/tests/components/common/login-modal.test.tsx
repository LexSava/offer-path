import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LoginModal } from '@/components/common/modals/login-modal';
import { signIn } from 'next-auth/react';

vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));

vi.mock('@/components/common/icons', () => ({
  GoogleIcon: () => <svg data-testid="google-icon" />,
}));

describe('LoginModal', () => {
  const mockedSignIn = vi.mocked(signIn);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when closed', () => {
    const onClose = vi.fn();
    const { container } = render(<LoginModal isOpen={false} onClose={onClose} />);

    expect(container.firstChild).toBeNull();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders login dialog content when open', () => {
    render(<LoginModal isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Continue with Google' })).toBeInTheDocument();
    expect(screen.getByTestId('google-icon')).toBeInTheDocument();
  });

  it('calls onClose from close controls and Escape', () => {
    const onClose = vi.fn();
    render(<LoginModal isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByLabelText(/close modal/i));
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('starts google sign in flow and sets loading state', async () => {
    const pendingPromise = new Promise<void>(() => undefined);
    mockedSignIn.mockReturnValue(pendingPromise as never);

    render(<LoginModal isOpen={true} onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Continue with Google' }));

    expect(mockedSignIn).toHaveBeenCalledWith('google', { callbackUrl: '/' });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Redirecting...' })).toBeDisabled();
      expect(screen.getByLabelText(/close modal/i)).toBeDisabled();
    });
  });

  it('prevents repeated submit while loading', async () => {
    const pendingPromise = new Promise<void>(() => undefined);
    mockedSignIn.mockReturnValue(pendingPromise as never);

    render(<LoginModal isOpen={true} onClose={vi.fn()} />);

    const googleButton = screen.getByRole('button', { name: 'Continue with Google' });
    fireEvent.click(googleButton);
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledTimes(1);
    });
  });
});
