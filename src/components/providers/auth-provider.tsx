'use client';

import { SessionProvider } from 'next-auth/react';
import { IAuthProviderProps } from '@/types';

export function AuthProvider({
  children,
  session,
  refetchInterval = 300, // 5 minutes in seconds
  basePath = '/api/auth',
}: IAuthProviderProps) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={refetchInterval}
      refetchOnWindowFocus={false} // Prevents unnecessary re-fetching
      basePath={basePath}
    >
      {children}
    </SessionProvider>
  );
}
