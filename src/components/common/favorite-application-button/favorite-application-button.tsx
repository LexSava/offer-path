'use client';

import { Bookmark } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { useApplications, useTooltip } from '@/contexts';
import type { IFavoriteApplicationButtonProps } from '@/types';
import { cn } from '@/utils';

interface IUpdateFavoriteResponse {
  data?: {
    id: string;
    isFavorite: boolean;
  };
}

export function FavoriteApplicationButton({
  applicationId,
  isFavorite,
  className,
}: IFavoriteApplicationButtonProps) {
  const { showTooltip } = useTooltip();
  const { setApplicationFavoriteState } = useApplications();
  const [isPending, startTransition] = useTransition();
  const [optimisticIsFavorite, setOptimisticIsFavorite] = useOptimistic(
    isFavorite,
    (_currentState, nextState: boolean) => nextState,
  );

  const handleToggleFavorite = () => {
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

        startTransition(() => {
          setOptimisticIsFavorite(confirmedState);
          setApplicationFavoriteState(applicationId, confirmedState);
        });

        showTooltip(confirmedState ? 'Added to favorites' : 'Removed from favorites', {
          variant: 'success',
        });
      } catch (error) {
        console.error('Failed to toggle favorite state:', error);

        startTransition(() => {
          setOptimisticIsFavorite(!nextState);
          setApplicationFavoriteState(applicationId, !nextState);
        });

        showTooltip('Failed to update favorite', { variant: 'error' });
      }
    })();
  };

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
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
