'use client';

import { Bookmark } from 'lucide-react';
import { useCallback, useOptimistic, useTransition, type MouseEvent } from 'react';
import { useApplicationIsFavoriteById, useApplications } from '@/contexts';
import { TOAST_MESSAGES, showErrorToast, showInfoToast, showSuccessToast } from '@/lib/toast';
import type { IFavoriteApplicationButtonProps, IUpdateFavoriteResponse } from '@/types';
import { cn } from '@/utils';

export function FavoriteApplicationButton({
  applicationId,
  className,
}: IFavoriteApplicationButtonProps) {
  const { setApplicationFavoriteState } = useApplications();
  const isFavorite = useApplicationIsFavoriteById(applicationId);
  const [isPending, startTransition] = useTransition();
  const [optimisticIsFavorite, setOptimisticIsFavorite] = useOptimistic(
    isFavorite,
    (_currentState, nextState: boolean) => nextState,
  );

  const handleToggleFavorite = useCallback(() => {
    if (isPending) {
      return;
    }

    const nextState = !optimisticIsFavorite;

    startTransition(() => {
      setOptimisticIsFavorite(nextState);
      setApplicationFavoriteState(applicationId, nextState);
    });

    void (async () => {
      try {
        const response = await fetch(`/api/applications/${applicationId}/favorite`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to update favorite: ${response.status}`);
        }

        const payload = (await response.json()) as IUpdateFavoriteResponse;
        const confirmedState = payload.data?.isFavorite ?? nextState;

        if (confirmedState !== nextState) {
          startTransition(() => {
            setOptimisticIsFavorite(confirmedState);
            setApplicationFavoriteState(applicationId, confirmedState);
          });
        }

        if (confirmedState) {
          showSuccessToast(TOAST_MESSAGES.APPLICATION_ADDED_TO_FAVORITE);
        } else {
          showInfoToast(TOAST_MESSAGES.APPLICATION_REMOVED_FROM_FAVORITE);
        }
      } catch (error) {
        console.error('Failed to toggle favorite state:', error);

        startTransition(() => {
          setOptimisticIsFavorite(!nextState);
          setApplicationFavoriteState(applicationId, !nextState);
        });

        showErrorToast(TOAST_MESSAGES.FAVORITE_UPDATE_FAILED);
      }
    })();
  }, [
    applicationId,
    isPending,
    optimisticIsFavorite,
    setApplicationFavoriteState,
    setOptimisticIsFavorite,
    startTransition,
  ]);

  const handleButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      handleToggleFavorite();
    },
    [handleToggleFavorite],
  );

  return (
    <button
      type="button"
      onClick={handleButtonClick}
      disabled={isPending}
      aria-label={optimisticIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        'bg-surface hover:text-accent text-muted cursor-pointer border border-gray-300 p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        optimisticIsFavorite && 'text-accent border-accent/40',
        className,
      )}
    >
      <Bookmark size={18} className={cn(optimisticIsFavorite && 'fill-current')} />
    </button>
  );
}
