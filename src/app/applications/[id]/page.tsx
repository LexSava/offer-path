'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { BackLink, FavoriteApplicationButton } from '@/components/common';
import { Container } from '@/components/layout';
import { useApplications } from '@/contexts';
import type {
  IApplication,
  IApplicationDetailApiResponse,
  IApplicationDetailItemProps,
  IApplicationResponseDto,
} from '@/types';
import { cn, formatDate } from '@/utils';

function ApplicationDetailItem({ label, value, fullWidth = false }: IApplicationDetailItemProps) {
  return (
    <p className={cn('text-secondary', fullWidth && 'sm:col-span-2')}>
      <span className="text-muted">{label}:</span> {value}
    </p>
  );
}

function toApplicationFromApi(application: IApplicationResponseDto): IApplication {
  return {
    ...application,
    isFavorite: Boolean(application.isFavorite),
    createdAt: new Date(application.createdAt),
    updatedAt: new Date(application.updatedAt),
  };
}

function formatCompensation(application: IApplication) {
  if (!application.salary || !application.currency || !application.period) {
    return 'Not specified';
  }

  return `${application.salary} ${application.currency} / ${application.period}`;
}

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const applicationId = params.id;
  const { applications, setApplicationFavoriteState } = useApplications();

  const [localApplication, setLocalApplication] = useState<IApplication | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const contextApplication = useMemo(
    () => applications.find((application) => application.id === applicationId) ?? null,
    [applicationId, applications],
  );

  const resolvedApplication = contextApplication ?? localApplication;

  useEffect(() => {
    if (!applicationId || contextApplication) {
      return;
    }

    const fetchApplicationDetail = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/applications/${applicationId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch application detail: ${response.status}`);
        }

        const payload = (await response.json()) as IApplicationDetailApiResponse;

        if (!payload.data) {
          setLocalApplication(null);
          return;
        }

        const normalized = toApplicationFromApi(payload.data);
        setLocalApplication(normalized);
        setApplicationFavoriteState(normalized.id, normalized.isFavorite);
      } catch (error) {
        console.error('Failed to load application detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchApplicationDetail();
  }, [applicationId, contextApplication, setApplicationFavoriteState]);

  useEffect(() => {
    if (!resolvedApplication) {
      return;
    }

    console.log('Application detail data:', resolvedApplication);
  }, [resolvedApplication]);

  return (
    <Container className="bg-background flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <BackLink url="/applications" text="Back to My applications" />{' '}
          <span className="font-3xl hidden font-thin sm:block"> | </span>
          <h1 className="font-logo text-primary text-3xl font-medium">Applications Detail</h1>
        </div>
      </div>

      {isLoading ? <p className="text-muted">Loading application detail...</p> : null}

      {!isLoading && !resolvedApplication ? (
        <p className="text-muted">Application not found.</p>
      ) : null}

      {resolvedApplication ? (
        <section className="bg-surface flex flex-col gap-4 border border-gray-200 p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-logo text-primary text-3xl font-medium">
                {resolvedApplication.position}
              </h1>
              <p className="text-secondary text-lg">{resolvedApplication.specialization}</p>
            </div>

            <FavoriteApplicationButton
              applicationId={resolvedApplication.id}
              isFavorite={resolvedApplication.isFavorite}
            />
          </div>

          <div className="flex flex-col gap-3 text-lg">
            <ApplicationDetailItem label="Grade" value={resolvedApplication.grade} />
            <ApplicationDetailItem label="Main stack" value={resolvedApplication.mainStack} />
            <ApplicationDetailItem label="Status" value={resolvedApplication.status} />
            <ApplicationDetailItem label="Contract" value={resolvedApplication.contract} />
            <ApplicationDetailItem
              label="Compensation"
              value={formatCompensation(resolvedApplication)}
              fullWidth
            />
            <ApplicationDetailItem
              label="URL"
              value={resolvedApplication.url || 'Not specified'}
              fullWidth
            />
            <ApplicationDetailItem
              label="Notes"
              value={resolvedApplication.notes || 'Not specified'}
              fullWidth
            />
            <ApplicationDetailItem
              label="Created"
              value={formatDate(resolvedApplication.createdAt)}
            />
            <ApplicationDetailItem
              label="Updated"
              value={formatDate(resolvedApplication.updatedAt)}
            />
          </div>
        </section>
      ) : null}
    </Container>
  );
}
