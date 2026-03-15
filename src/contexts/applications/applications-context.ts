'use client';

import { createContext } from 'react';
import type { IApplicationsActionsContextValue, IApplicationsStore } from '@/types';

export const ApplicationsStoreContext = createContext<IApplicationsStore | undefined>(undefined);

export const ApplicationsActionsContext = createContext<
  IApplicationsActionsContextValue | undefined
>(undefined);
