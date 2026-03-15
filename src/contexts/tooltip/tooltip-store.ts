import type { ITooltipState } from '@/types';

export interface ITooltipStore {
  getState: () => ITooltipState | null;
  setState: (nextState: ITooltipState | null) => void;
  subscribe: (listener: () => void) => () => void;
}

export function createTooltipStore(initialState: ITooltipState | null = null): ITooltipStore {
  let state = initialState;
  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    setState: (nextState) => {
      if (Object.is(nextState, state)) {
        return;
      }

      state = nextState;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
      };
    },
  };
}
