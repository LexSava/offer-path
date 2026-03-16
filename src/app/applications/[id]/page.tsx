'use client';

import { memo, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { DeleteApplicationButton, FavoriteApplicationButton } from '@/components/common';
import { Container } from '@/components/layout';
import { Button } from '@/components/common';
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
import { ApplicationDetailFormFields } from './application-detail-form-fields';
import { toApplicationFromApi, toFormValues } from './application-detail.utils';
import { PageTitleHeader } from '@/components/pages';

const ApplicationDetailPageHeader = memo(function ApplicationDetailPageHeaderComponent() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <PageTitleHeader
        backLinkUrl="/applications"
        backLinkText="Back to My applications"
        title="Applications Detail"
      />
    </div>
  );
});

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

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateApplicationRequestInputValues, unknown, CreateApplicationRequestValues>({
    resolver: zodResolver(createApplicationRequestSchema),
    mode: 'onSubmit',
  });

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

  const handleStartEdit = () => {
    if (!resolvedApplication) {
      return;
    }

    const values = toFormValues(resolvedApplication);
    setInitialEditValues(values);
    reset(values);
    setSubmitError(null);
    clearErrors();
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    if (initialEditValues) {
      reset(initialEditValues);
    } else if (resolvedApplication) {
      reset(toFormValues(resolvedApplication));
    }

    setSubmitError(null);
    clearErrors();
    setIsEditing(false);
  };

  const onSubmit = async (values: CreateApplicationRequestValues) => {
    if (!resolvedApplication) {
      return;
    }

    if (!isDirty) {
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
  };

  return (
    <Container className="bg-background flex flex-col gap-5">
      <ApplicationDetailPageHeader />

      {isLoading ? <p className="text-muted">Loading application detail...</p> : null}

      {!isLoading && !resolvedApplication ? (
        <p className="text-muted">Application not found.</p>
      ) : null}

      {resolvedApplication ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-surface flex flex-col gap-4 border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="font-logo text-primary text-3xl font-medium">
                {resolvedApplication.position}
              </h2>
              <p className="text-secondary text-lg">{resolvedApplication.specialization}</p>
              <p className="text-secondary text-lg">Company: {resolvedApplication.company}</p>
            </div>

            <div className="flex items-center gap-2">
              <FavoriteApplicationButton applicationId={resolvedApplication.id} />

              {!isEditing ? (
                <DeleteApplicationButton
                  applicationId={resolvedApplication.id}
                  onDeleted={() => {
                    setIsRedirectingAfterDelete(true);
                    router.replace('/applications');
                  }}
                />
              ) : null}

              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="text-secondary flex cursor-pointer items-center gap-1 border border-gray-300 px-3 py-2 text-sm font-medium transition-colors hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              ) : null}
            </div>
          </div>

          <ApplicationDetailFormFields
            resolvedApplication={resolvedApplication}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />

          {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}

          {isEditing ? (
            <div className="flex items-center justify-end gap-3">
              <Button
                text="Close"
                variant="secondary"
                onClick={handleCloseEdit}
                disabled={isSubmitting}
              />
              <Button
                text={isSubmitting ? 'Submitting...' : 'Submit'}
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          ) : null}
        </form>
      ) : null}
    </Container>
  );
}
