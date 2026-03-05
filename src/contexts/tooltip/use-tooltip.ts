'use client';

import { useContext } from 'react';
import { TooltipContext } from './tooltip-context';

export function useTooltip() {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error('useTooltip must be used within TooltipProvider');
  }

  return context;
}
