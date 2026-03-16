'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSession } from 'next-auth/react';
import type { IApplication, IApplicationResponseDto, IApplicationsProviderProps } from '@/types';
import { ApplicationsActionsContext, ApplicationsStoreContext } from './applications-context';
import {
  createApplicationsStore,
  toApplicationsList,
  toApplicationsStoreState,
} from './applications-store';

const CACHE_KEY_PREFIX = 'applications-cache';

function toApplicationFromApi(application: IApplicationResponseDto): IApplication {
  return {
    ...application,
    company: application.company?.trim() || 'Unknown',
    isFavorite: Boolean(application.isFavorite),
    createdAt: new Date(application.createdAt),
    updatedAt: new Date(application.updatedAt),
  };
}

function toCacheValue(applications: IApplication[]) {
  return applications.map((application) => ({
    ...application,
    createdAt: application.createdAt.toISOString(),
    updatedAt: application.updatedAt.toISOString(),
  }));
}

function isApplicationDto(value: unknown): value is IApplicationResponseDto {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<IApplicationResponseDto>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.position === 'string' &&
    (typeof candidate.company === 'string' || typeof candidate.company === 'undefined') &&
    typeof candidate.specialization === 'string' &&
    typeof candidate.grade === 'string' &&
    typeof candidate.mainStack === 'string' &&
    typeof candidate.contract === 'string' &&
    typeof candidate.status === 'string' &&
    typeof candidate.userId === 'string' &&
    (candidate.isFavorite === null ||
      typeof candidate.isFavorite === 'boolean' ||
      typeof candidate.isFavorite === 'undefined') &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.updatedAt === 'string'
  );
}

function getCacheKey(userId: string) {
  return `${CACHE_KEY_PREFIX}:${userId}`;
}

export function ApplicationsProvider({ children }: IApplicationsProviderProps) {
  const { data: session, status } = useSession();
  const storeRef = useRef(createApplicationsStore());
  const loadedUserIdRef = useRef<string | null>(null);

  const userId = session?.user?.id;
  const store = storeRef.current;

  const setStoreLoading = useCallback(
    (isLoading: boolean) => {
      store.setState((previousState) => {
        if (previousState.isLoading === isLoading) {
          return previousState;
        }

        return {
          ...previousState,
          isLoading,
        };
      });
    },
    [store],
  );

  const setStoreApplications = useCallback(
    (nextApplications: IApplication[]) => {
      store.setState((previousState) => ({
        ...previousState,
        ...toApplicationsStoreState(nextApplications),
      }));
    },
    [store],
  );

  const persistApplications = useCallback(
    (nextApplications: IApplication[] | null) => {
      if (!userId || typeof window === 'undefined') {
        return;
      }

      if (!nextApplications) {
        window.localStorage.removeItem(getCacheKey(userId));
        return;
      }

      window.localStorage.setItem(
        getCacheKey(userId),
        JSON.stringify(toCacheValue(nextApplications)),
      );
    },
    [userId],
  );

  const addApplicationFromApi = useCallback(
    (application: IApplicationResponseDto) => {
      const normalized = toApplicationFromApi(application);

      store.setState((previousState) => {
        const previousApplication = previousState.applicationsById[normalized.id];
        const nextApplicationIds = previousApplication
          ? previousState.applicationIds
          : [normalized.id, ...previousState.applicationIds];

        const nextState = {
          ...previousState,
          applicationsById: {
            ...previousState.applicationsById,
            [normalized.id]: normalized,
          },
          listIndexById: {
            ...previousState.listIndexById,
            [normalized.id]: normalized,
          },
          applicationIds: nextApplicationIds,
        };

        persistApplications(toApplicationsList(nextState));

        return nextState;
      });
    },
    [persistApplications, store],
  );

  const updateApplicationFromApi = useCallback(
    (application: IApplicationResponseDto) => {
      const normalized = toApplicationFromApi(application);

      store.setState((previousState) => {
        if (!previousState.applicationsById[normalized.id]) {
          return previousState;
        }

        const nextState = {
          ...previousState,
          applicationsById: {
            ...previousState.applicationsById,
            [normalized.id]: normalized,
          },
          listIndexById: {
            ...previousState.listIndexById,
            [normalized.id]: normalized,
          },
        };

        persistApplications(toApplicationsList(nextState));

        return nextState;
      });
    },
    [persistApplications, store],
  );

  const setApplicationFavoriteState = useCallback(
    (applicationId: string, isFavorite: boolean) => {
      store.setState((previousState) => {
        const existingApplication = previousState.applicationsById[applicationId];

        if (!existingApplication || existingApplication.isFavorite === isFavorite) {
          return previousState;
        }

        const nextState = {
          ...previousState,
          applicationsById: {
            ...previousState.applicationsById,
            [applicationId]: {
              ...existingApplication,
              isFavorite,
            },
          },
        };

        persistApplications(toApplicationsList(nextState));

        return nextState;
      });
    },
    [persistApplications, store],
  );

  const removeApplicationById = useCallback(
    (applicationId: string) => {
      store.setState((previousState) => {
        if (!previousState.applicationsById[applicationId]) {
          return previousState;
        }

        const nextApplicationsById = { ...previousState.applicationsById };
        delete nextApplicationsById[applicationId];

        const nextListIndexById = { ...previousState.listIndexById };
        delete nextListIndexById[applicationId];

        const nextState = {
          ...previousState,
          applicationsById: nextApplicationsById,
          listIndexById: nextListIndexById,
          applicationIds: previousState.applicationIds.filter((id) => id !== applicationId),
        };

        persistApplications(toApplicationsList(nextState));

        return nextState;
      });
    },
    [persistApplications, store],
  );

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!userId) {
      loadedUserIdRef.current = null;
      setStoreApplications([]);
      setStoreLoading(false);
      persistApplications(null);

      return;
    }

    if (loadedUserIdRef.current === userId) {
      return;
    }

    const cacheKey = getCacheKey(userId);
    const rawCachedValue = window.localStorage.getItem(cacheKey);

    if (rawCachedValue) {
      try {
        const parsedCachedValue = JSON.parse(rawCachedValue) as unknown;

        if (Array.isArray(parsedCachedValue) && parsedCachedValue.every(isApplicationDto)) {
          const cachedApplications = parsedCachedValue.map(toApplicationFromApi);
          setStoreApplications(cachedApplications);
          setStoreLoading(false);
          loadedUserIdRef.current = userId;

          return;
        }
      } catch (error) {
        console.error('Failed to parse applications cache:', error);
      }
    }

    const fetchApplications = async () => {
      setStoreLoading(true);

      try {
        const response = await fetch('/api/applications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch applications: ${response.status}`);
        }

        const payload = (await response.json()) as { data?: unknown };
        const receivedApplications = Array.isArray(payload.data)
          ? payload.data.filter(isApplicationDto).map(toApplicationFromApi)
          : [];

        setStoreApplications(receivedApplications);
        loadedUserIdRef.current = userId;
        persistApplications(receivedApplications);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setStoreLoading(false);
      }
    };

    void fetchApplications();
  }, [persistApplications, setStoreApplications, setStoreLoading, status, userId]);

  const actionsContextValue = useMemo(
    () => ({
      addApplicationFromApi,
      updateApplicationFromApi,
      setApplicationFavoriteState,
      removeApplicationById,
    }),
    [
      addApplicationFromApi,
      removeApplicationById,
      setApplicationFavoriteState,
      updateApplicationFromApi,
    ],
  );

  return (
    <ApplicationsStoreContext.Provider value={store}>
      <ApplicationsActionsContext.Provider value={actionsContextValue}>
        {children}
      </ApplicationsActionsContext.Provider>
    </ApplicationsStoreContext.Provider>
  );
}
