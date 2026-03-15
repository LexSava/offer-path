'use client';

import { createPortal } from 'react-dom';
import { useSyncExternalStore } from 'react';
import { Tooltip } from '@/components/common';
import type { ITooltipStore } from './tooltip-store';

interface ITooltipRendererProps {
  store: ITooltipStore;
  onClose: () => void;
}

export function TooltipRenderer({ store, onClose }: ITooltipRendererProps) {
  const tooltipState = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <Tooltip
      isVisible={Boolean(tooltipState)}
      message={tooltipState?.message ?? ''}
      variant={tooltipState?.variant ?? 'success'}
      onClose={onClose}
    />,
    document.body,
  );
}
