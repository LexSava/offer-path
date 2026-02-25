'use client';

import { createContext } from 'react';
import type { LoginModalContextValue } from './types';

export const LoginModalContext = createContext<LoginModalContextValue | undefined>(undefined);
