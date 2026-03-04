import { ReactNode } from 'react';
import { Session } from 'next-auth';

export interface IAuthProviderProps {
  children: ReactNode;
  session?: Session | null;
  refetchInterval?: number;
  basePath?: string;
}
