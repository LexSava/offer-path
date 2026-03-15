'use client';

import { useCallback, useEffect, type ChangeEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm, useFormContext, type FieldPath, type RegisterOptions } from 'react-hook-form';
import { createApplicationFormDefaultValues } from '@/constants';
import { useApplications } from '@/contexts';
import { TOAST_MESSAGES, showErrorToast, showSuccessToast } from '@/lib/toast';
import type {
  ICreateApplicationErrorResponse,
  ICreateApplicationFormProps,
  ICreateApplicationSuccessResponse,
} from '@/types';
import {
  createApplicationValidationSchema,
  type CreateApplicationFormInputValues,
  type CreateApplicationFormValues,
  type CreateApplicationRequestValues,
} from './create-application-validation';

export function useRegisterWithInstantErrorClear() {
  const { register, clearErrors } = useFormContext<CreateApplicationFormValues>();

  return useCallback(
    <TName extends FieldPath<CreateApplicationFormValues>>(
      name: TName,
      options?: RegisterOptions<CreateApplicationFormValues, TName>,
    ) => {
      const registration = register(name, options);

      return {
        ...registration,
        onChange: (
          event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        ) => {
          const result = registration.onChange(event);
          clearErrors(name);
          return result;
        },
      };
    },
    [register, clearErrors],
  );
}

export function useCreateApplicationForm({ isOpen, onClose }: ICreateApplicationFormProps) {
  const { data: session } = useSession();
  const { addApplicationFromApi } = useApplications();

  const methods = useForm<CreateApplicationFormInputValues, unknown, CreateApplicationFormValues>({
    resolver: zodResolver(createApplicationValidationSchema),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: createApplicationFormDefaultValues,
  });

  const { setError, clearErrors, reset } = methods;

  useEffect(() => {
    if (!isOpen) {
      reset(createApplicationFormDefaultValues);
    }
  }, [isOpen, reset]);

  const onSubmit = useCallback(
    async (values: CreateApplicationFormValues) => {
      if (!session?.user?.id) {
        setError('root', {
          type: 'manual',
          message: 'Please sign in to create an application',
        });

        return;
      }

      clearErrors('root');

      const payload: CreateApplicationRequestValues = {
        position: values.position,
        company: values.company?.trim() || 'Unknown',
        specialization: values.specialization,
        grade: values.grade,
        mainStack: values.mainStack,
        salary: values.salary,
        currency: values.currency,
        period: values.period,
        contract: values.contract,
        url: values.url,
        notes: values.notes,
        status: values.status,
      };

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorResponse = (await response
          .json()
          .catch(() => null)) as ICreateApplicationErrorResponse | null;

        if (errorResponse?.fieldErrors) {
          Object.entries(errorResponse.fieldErrors).forEach(([field, fieldError]) => {
            const message = fieldError?.[0];

            if (!message) return;

            setError(field as keyof CreateApplicationRequestValues, {
              type: 'server',
              message,
            });
          });
        }

        setError('root', {
          type: 'server',
          message: errorResponse?.message ?? 'Failed to create application',
        });

        showErrorToast(TOAST_MESSAGES.FORM_NOT_CREATED);

        return;
      }

      const successResponse = (await response.json()) as ICreateApplicationSuccessResponse;
      addApplicationFromApi(successResponse.data);

      reset(createApplicationFormDefaultValues);
      onClose();
      showSuccessToast(TOAST_MESSAGES.APPLICATION_CREATED);
    },
    [session?.user?.id, setError, clearErrors, addApplicationFromApi, reset, onClose],
  );

  return {
    methods,
    onSubmit,
  };
}
