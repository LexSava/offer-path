'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Tooltip } from '@/components/common';
import {
  IShowTooltipOptions,
  ITooltipProviderProps,
  ITooltipState,
  TooltipVariantType,
} from '@/types';
import { TooltipContext } from './tooltip-context';

const DEFAULT_DURATION_MS = 3000;

export function TooltipProvider({ children }: ITooltipProviderProps) {
  const [tooltipState, setTooltipState] = useState<ITooltipState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setTooltipState(null);
  }, []);

  const showTooltip = useCallback((message: string, options?: IShowTooltipOptions) => {
    const variant: TooltipVariantType = options?.variant ?? 'success';
    const durationMs = options?.durationMs ?? DEFAULT_DURATION_MS;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTooltipState({ message, variant });

    timeoutRef.current = setTimeout(() => {
      setTooltipState(null);
    }, durationMs);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      <Tooltip
        isVisible={Boolean(tooltipState)}
        message={tooltipState?.message ?? ''}
        variant={tooltipState?.variant ?? 'success'}
        onClose={hideTooltip}
      />
    </TooltipContext.Provider>
  );
}
