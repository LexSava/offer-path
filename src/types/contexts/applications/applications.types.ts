import type { ReactNode } from 'react';
import type { IApplication } from '@/types';

export interface IApplicationResponseDto extends Omit<IApplication, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export interface IApplicationsContextValue {
  applications: IApplication[];
  isLoading: boolean;
  addApplicationFromApi: (application: IApplicationResponseDto) => void;
}

export interface IApplicationsProviderProps {
  children: ReactNode;
}
