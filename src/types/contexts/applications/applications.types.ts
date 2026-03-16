import type { ReactNode } from 'react';
import type { IApplication } from '@/types';

export interface IApplicationResponseDto extends Omit<IApplication, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export interface IApplicationsStoreState {
  applicationsById: Partial<Record<string, IApplication>>;
  listIndexById: Partial<Record<string, IApplication>>;
  applicationIds: string[];
  isLoading: boolean;
}

export interface IApplicationsStore {
  getState: () => IApplicationsStoreState;
  setState: (
    updater:
      | IApplicationsStoreState
      | ((state: IApplicationsStoreState) => IApplicationsStoreState),
  ) => void;
  subscribe: (listener: () => void) => () => void;
}

export interface IApplicationsActionsContextValue {
  addApplicationFromApi: (application: IApplicationResponseDto) => void;
  updateApplicationFromApi: (application: IApplicationResponseDto) => void;
  setApplicationFavoriteState: (applicationId: string, isFavorite: boolean) => void;
  removeApplicationById: (applicationId: string) => void;
}

export interface IApplicationsProviderProps {
  children: ReactNode;
}
