'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { IApplication, IApplicationResponseDto, IApplicationsProviderProps } from '@/types';
import { ApplicationsContext } from './applications-context';

const CACHE_KEY_PREFIX = 'applications-cache';

function toApplicationFromApi(application: IApplicationResponseDto): IApplication {
  return {
    ...application,
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
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadedUserIdRef = useRef<string | null>(null);

  const userId = session?.user?.id;

  const persistApplications = useCallback(
    (nextApplications: IApplication[]) => {
      if (!userId || typeof window === 'undefined') {
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

      setApplications((previousApplications) => {
        const nextApplications = [
          normalized,
          ...previousApplications.filter(
            (existingApplication) => existingApplication.id !== normalized.id,
          ),
        ];

        persistApplications(nextApplications);
        console.log('Applications cache updated:', nextApplications);

        return nextApplications;
      });
    },
    [persistApplications],
  );

  const setApplicationFavoriteState = useCallback(
    (applicationId: string, isFavorite: boolean) => {
      setApplications((previousApplications) => {
        const nextApplications = previousApplications.map((application) =>
          application.id === applicationId ? { ...application, isFavorite } : application,
        );

        persistApplications(nextApplications);

        return nextApplications;
      });
    },
    [persistApplications],
  );

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!userId) {
      loadedUserIdRef.current = null;
      setApplications([]);
      setIsLoading(false);

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
          setApplications(cachedApplications);
          loadedUserIdRef.current = userId;
          console.log('Applications loaded from cache:', cachedApplications);

          return;
        }
      } catch (error) {
        console.error('Failed to parse applications cache:', error);
      }
    }

    const fetchApplications = async () => {
      setIsLoading(true);

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

        setApplications(receivedApplications);
        loadedUserIdRef.current = userId;
        persistApplications(receivedApplications);
        console.log('Applications fetched from API:', receivedApplications);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchApplications();
  }, [persistApplications, status, userId]);

  const contextValue = useMemo(
    () => ({
      applications,
      isLoading,
      addApplicationFromApi,
      setApplicationFavoriteState,
    }),
    [addApplicationFromApi, applications, isLoading, setApplicationFavoriteState],
  );

  return (
    <ApplicationsContext.Provider value={contextValue}>{children}</ApplicationsContext.Provider>
  );
}
