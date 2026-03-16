'use client';

import { useContext, useMemo, useSyncExternalStore } from 'react';
import { type SortOption } from '@/constants';
import { searchApplications, sortApplications } from '@/utils';
import type { IApplication, IApplicationsStoreState } from '@/types';
import { ApplicationsStoreContext } from './applications-context';

type ApplicationsStateSelector<T> = (state: IApplicationsStoreState) => T;

function useApplicationsStore() {
  const store = useContext(ApplicationsStoreContext);

  if (!store) {
    throw new Error('useApplicationsState must be used within ApplicationsProvider');
  }

  return store;
}

export function useApplicationsState<T>(selector: ApplicationsStateSelector<T>) {
  const store = useApplicationsStore();

  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()),
  );
}

export function useApplicationsIsLoading() {
  return useApplicationsState((state) => state.isLoading);
}

export function useApplicationsCount() {
  return useApplicationsState((state) => state.applicationIds.length);
}

export function useApplicationCardDataById(applicationId: string) {
  return useApplicationsState((state) => state.listIndexById[applicationId] ?? null);
}

export function useApplicationIsFavoriteById(applicationId: string) {
  return useApplicationsState(
    (state) => state.applicationsById[applicationId]?.isFavorite ?? false,
  );
}

export function useFilteredSortedApplicationIds(query: string, sortOption: SortOption) {
  const applicationIds = useApplicationsState((state) => state.applicationIds);
  const listIndexById = useApplicationsState((state) => state.listIndexById);

  return useMemo(() => {
    const applicationsForList: IApplication[] = applicationIds
      .map((applicationId) => listIndexById[applicationId])
      .filter((application): application is IApplication => Boolean(application));

    const filteredApplications = searchApplications(applicationsForList, query);
    const sortedApplications = sortApplications(filteredApplications, sortOption);

    return sortedApplications.map((application) => application.id);
  }, [applicationIds, listIndexById, query, sortOption]);
}
