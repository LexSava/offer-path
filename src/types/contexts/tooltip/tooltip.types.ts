import { ReactNode } from 'react';

export type TooltipVariantType = 'success' | 'error';

export interface IShowTooltipOptions {
  variant?: TooltipVariantType;
  durationMs?: number;
}

export interface ITooltipState {
  message: string;
  variant: TooltipVariantType;
}

export interface ITooltipContextValue {
  showTooltip: (message: string, options?: IShowTooltipOptions) => void;
  hideTooltip: () => void;
}

export interface ITooltipProviderProps {
  children: ReactNode;
}
