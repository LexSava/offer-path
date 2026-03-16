'use client';

import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Container } from '@/components/layout';
import {
  ApplicationDetailPageHeader,
  ApplicationDetailPageForm,
  toApplicationFromApi,
  toFormValues,
} from '@/components/pages';
import { useApplicationCardDataById, useApplications } from '@/contexts';
import {
  createApplicationRequestSchema,
  type CreateApplicationRequestInputValues,
  type CreateApplicationRequestValues,
} from '@/forms/create-application/create-application-validation';
import { TOAST_MESSAGES, showInfoToast, showSuccessToast } from '@/lib/toast';
import type {
  IApplication,
  IApplicationDetailApiResponse,
  IApplicationUpdateErrorResponse,
  IApplicationUpdateSuccessResponse,
} from '@/types';

function hasFormChanges(
  values: CreateApplicationRequestValues,
  baseline: CreateApplicationRequestValues,
) {
  return (Object.keys(baseline) as Array<keyof CreateApplicationRequestValues>).some(
    (key) => values[key] !== baseline[key],
  );
}

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const applicationId = params.id;
  const router = useRouter();

  const { setApplicationFavoriteState, updateApplicationFromApi } = useApplications();

  const [localApplication, setLocalApplication] = useState<IApplication | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRedirectingAfterDelete, setIsRedirectingAfterDelete] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [initialEditValues, setInitialEditValues] = useState<CreateApplicationRequestValues | null>(
    null,
  );

  const methods = useForm<
    CreateApplicationRequestInputValues,
    unknown,
    CreateApplicationRequestValues
  >({
    resolver: zodResolver(createApplicationRequestSchema),
    mode: 'onSubmit',
  });
  const { reset, setError, clearErrors } = methods;

  const contextApplication = useApplicationCardDataById(applicationId);

  const resolvedApplication = contextApplication ?? localApplication;

  useEffect(() => {
    if (!applicationId || contextApplication || isRedirectingAfterDelete) {
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

        if (response.status === 404) {
          setLocalApplication(null);
          return;
        }

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
  }, [applicationId, contextApplication, isRedirectingAfterDelete, setApplicationFavoriteState]);

  useEffect(() => {
    if (!resolvedApplication || isEditing) {
      return;
    }

    reset(toFormValues(resolvedApplication));
  }, [isEditing, reset, resolvedApplication]);

  const handleStartEdit = useCallback(() => {
    if (!resolvedApplication) {
      return;
    }

    const values = toFormValues(resolvedApplication);
    setInitialEditValues(values);
    reset(values);
    setSubmitError(null);
    clearErrors();
    setIsEditing(true);
  }, [resolvedApplication, reset, clearErrors]);

  const handleCloseEdit = useCallback(() => {
    if (initialEditValues) {
      reset(initialEditValues);
    } else if (resolvedApplication) {
      reset(toFormValues(resolvedApplication));
    }

    setSubmitError(null);
    clearErrors();
    setIsEditing(false);
  }, [initialEditValues, resolvedApplication, reset, clearErrors]);

  const handleDeleted = useCallback(() => {
    setIsRedirectingAfterDelete(true);
    router.replace('/applications');
  }, [router]);

  const onSubmit = useCallback(
    async (values: CreateApplicationRequestValues) => {
      if (!resolvedApplication) {
        return;
      }

      const baselineValues = initialEditValues ?? toFormValues(resolvedApplication);

      if (!hasFormChanges(values, baselineValues)) {
        showInfoToast(TOAST_MESSAGES.FORM_NOT_CHANGED);
        return;
      }

      setSubmitError(null);

      const response = await fetch(`/api/applications/${resolvedApplication.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorResponse = (await response
          .json()
          .catch(() => null)) as IApplicationUpdateErrorResponse | null;

        if (errorResponse?.fieldErrors) {
          Object.entries(errorResponse.fieldErrors).forEach(([field, fieldError]) => {
            const message = fieldError?.[0];

            if (!message) {
              return;
            }

            setError(field as keyof CreateApplicationRequestValues, {
              type: 'server',
              message,
            });
          });
        }

        setSubmitError(errorResponse?.message ?? 'Failed to update application');
        return;
      }

      const payload = (await response.json()) as IApplicationUpdateSuccessResponse;

      if (!payload.data) {
        setSubmitError('Updated application data is missing');
        return;
      }

      const normalized = toApplicationFromApi(payload.data);

      setLocalApplication(normalized);
      updateApplicationFromApi(payload.data);
      setApplicationFavoriteState(normalized.id, normalized.isFavorite);
      setInitialEditValues(toFormValues(normalized));
      reset(toFormValues(normalized));
      setIsEditing(false);
      showSuccessToast(TOAST_MESSAGES.APPLICATION_UPDATED);
    },
    [
      resolvedApplication,
      initialEditValues,
      setError,
      updateApplicationFromApi,
      setApplicationFavoriteState,
      reset,
    ],
  );

  return (
    <Container className="bg-background flex flex-col gap-5">
      <ApplicationDetailPageHeader />

      {isLoading ? <p className="text-muted">Loading application detail...</p> : null}

      {!isLoading && !resolvedApplication ? (
        <p className="text-muted">Application not found.</p>
      ) : null}

      {resolvedApplication ? (
        <FormProvider {...methods}>
          <ApplicationDetailPageForm
            resolvedApplication={resolvedApplication}
            isEditing={isEditing}
            submitError={submitError}
            onSubmit={onSubmit}
            onDeleted={handleDeleted}
            onStartEdit={handleStartEdit}
            onCloseEdit={handleCloseEdit}
          />
        </FormProvider>
      ) : null}
    </Container>
  );
}
