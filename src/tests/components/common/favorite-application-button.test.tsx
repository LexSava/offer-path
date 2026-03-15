import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTransition } from 'react';

import { FavoriteApplicationButton } from '@/components/common/favorite-application-button/favorite-application-button';
import { useApplicationIsFavoriteById, useApplications, useTooltip } from '@/contexts';

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();

  return {
    ...actual,
    useTransition: vi.fn(() => [false, actual.startTransition]),
  };
});

vi.mock('@/contexts', () => ({
  useApplicationIsFavoriteById: vi.fn(),
  useApplications: vi.fn(),
  useTooltip: vi.fn(),
}));

describe('FavoriteApplicationButton', () => {
  const mockedUseApplicationIsFavoriteById = vi.mocked(useApplicationIsFavoriteById);
  const mockedUseApplications = vi.mocked(useApplications);
  const mockedUseTooltip = vi.mocked(useTooltip);
  const mockedUseTransition = vi.mocked(useTransition);

  const setApplicationFavoriteState = vi.fn();
  const showTooltip = vi.fn();
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();

    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    mockedUseApplicationIsFavoriteById.mockReturnValue(false);

    mockedUseApplications.mockReturnValue({
      addApplicationFromApi: vi.fn(),
      updateApplicationFromApi: vi.fn(),
      removeApplicationById: vi.fn(),
      setApplicationFavoriteState,
    });

    mockedUseTooltip.mockReturnValue({
      showTooltip,
      hideTooltip: vi.fn(),
    });

    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders button with add label when application is not favorite', () => {
    render(<FavoriteApplicationButton applicationId="app-1" />);

    expect(screen.getByRole('button', { name: 'Add to favorites' })).toBeInTheDocument();
  });

  it('stops propagation and sends optimistic + confirmed updates on success', async () => {
    const parentClick = vi.fn();

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          id: 'app-1',
          isFavorite: true,
        },
      }),
    } as Response);

    render(
      <div onClick={parentClick}>
        <FavoriteApplicationButton applicationId="app-1" />
      </div>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add to favorites' }));

    expect(parentClick).not.toHaveBeenCalled();
    expect(setApplicationFavoriteState).toHaveBeenNthCalledWith(1, 'app-1', true);
    expect(global.fetch).toHaveBeenCalledWith('/api/applications/app-1/favorite', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await waitFor(() => {
      expect(showTooltip).toHaveBeenCalledWith('Added to favorites', { variant: 'success' });
    });

    expect(setApplicationFavoriteState).toHaveBeenCalledTimes(1);
  });

  it('shows removed tooltip when API confirms favorite=false', async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          id: 'app-1',
          isFavorite: false,
        },
      }),
    } as Response);

    mockedUseApplicationIsFavoriteById.mockReturnValueOnce(true);

    render(<FavoriteApplicationButton applicationId="app-1" />);

    fireEvent.click(screen.getByRole('button', { name: 'Remove from favorites' }));

    await waitFor(() => {
      expect(showTooltip).toHaveBeenCalledWith('Removed from favorites', { variant: 'success' });
    });
  });

  it('rolls back optimistic update and shows error tooltip when request fails', async () => {
    vi.mocked(global.fetch).mockRejectedValue(new Error('Network failure'));

    render(<FavoriteApplicationButton applicationId="app-1" />);

    fireEvent.click(screen.getByRole('button', { name: 'Add to favorites' }));

    expect(setApplicationFavoriteState).toHaveBeenNthCalledWith(1, 'app-1', true);

    await waitFor(() => {
      expect(setApplicationFavoriteState).toHaveBeenNthCalledWith(2, 'app-1', false);
      expect(showTooltip).toHaveBeenCalledWith('Failed to update favorite', { variant: 'error' });
    });
  });

  it('is disabled and does nothing when transition is pending', () => {
    mockedUseTransition.mockReturnValueOnce([true, vi.fn()]);

    render(<FavoriteApplicationButton applicationId="app-1" />);

    const button = screen.getByRole('button', { name: 'Add to favorites' });
    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(setApplicationFavoriteState).not.toHaveBeenCalled();
    expect(showTooltip).not.toHaveBeenCalled();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });
});
