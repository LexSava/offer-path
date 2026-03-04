'use client';

import { LoginModalContextValue } from '@/types';
import { createContext } from 'react';

export const LoginModalContext = createContext<LoginModalContextValue | undefined>(undefined);
