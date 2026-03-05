'use client';

import { createContext } from 'react';
import type { IApplicationsContextValue } from '@/types';

export const ApplicationsContext = createContext<IApplicationsContextValue | undefined>(undefined);
