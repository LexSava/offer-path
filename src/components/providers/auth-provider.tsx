'use client';

import { type ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface AuthProviderProps {
  children: ReactNode;
  session?: Session | null;
  refetchInterval?: number;
  basePath?: string;
}

export const AuthProvider = ({
  children,
  session,
  refetchInterval = 300, // 5 minutes in seconds
  basePath = '/api/auth',
}: AuthProviderProps) => {
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
};
