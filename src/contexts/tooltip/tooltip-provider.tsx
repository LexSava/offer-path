'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { IShowTooltipOptions, ITooltipProviderProps, TooltipVariantType } from '@/types';
import { TooltipContext } from './tooltip-context';
import { createTooltipStore } from './tooltip-store';
import { TooltipRenderer } from './tooltip-renderer';

const DEFAULT_DURATION_MS = 3000;

export function TooltipProvider({ children }: ITooltipProviderProps) {
  const store = useMemo(() => createTooltipStore(), []);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    store.setState(null);
  }, [store]);

  const showTooltip = useCallback(
    (message: string, options?: IShowTooltipOptions) => {
      const variant: TooltipVariantType = options?.variant ?? 'success';
      const durationMs = options?.durationMs ?? DEFAULT_DURATION_MS;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      store.setState({ message, variant });

      timeoutRef.current = setTimeout(() => {
        store.setState(null);
      }, durationMs);
    },
    [store],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      showTooltip,
      hideTooltip,
    }),
    [hideTooltip, showTooltip],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      {children}
      <TooltipRenderer store={store} onClose={hideTooltip} />
    </TooltipContext.Provider>
  );
}
