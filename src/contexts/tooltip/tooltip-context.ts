'use client';

import { createContext } from 'react';
import { ITooltipContextValue } from '@/types';

export const TooltipContext = createContext<ITooltipContextValue | undefined>(undefined);
