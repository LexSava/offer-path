'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Dropdown, Input, Textarea } from '@/components/common';
import { Button } from '@/components/common';
import { toSelectOptions } from '@/utils';
import {
  createApplicationValidationSchema,
  type CreateApplicationFormInputValues,
  type CreateApplicationFormValues,
  type CreateApplicationRequestValues,
} from './create-application-validation';
import {
  contractOptions,
  currencyOptions,
  gradeOptions,
  periodOptions,
  specializationOptions,
  stackOptions,
  statusOptions,
} from '@/constants/application-options.constants';
import { useApplications, useTooltip } from '@/contexts';
import type { IApplicationResponseDto, ICreateApplicationFormProps } from '@/types';
import { createApplicationFormDefaultValues } from '@/constants';

interface ICreateApplicationErrorResponse {
  message: string;
  fieldErrors?: Partial<Record<keyof CreateApplicationRequestValues, string[]>>;
}

interface ICreateApplicationSuccessResponse {
  message: string;
  data: IApplicationResponseDto;
}

export function CreateApplicationForm({ isOpen, onClose }: ICreateApplicationFormProps) {
  const { data: session } = useSession();
  const { showTooltip } = useTooltip();
  const { addApplicationFromApi } = useApplications();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateApplicationFormInputValues, unknown, CreateApplicationFormValues>({
    resolver: zodResolver(createApplicationValidationSchema),
    mode: 'onSubmit',
    defaultValues: createApplicationFormDefaultValues,
  });

  useEffect(() => {
    if (!isOpen) {
      reset(createApplicationFormDefaultValues);
    }
  }, [isOpen, reset]);

  const onSubmit = async (values: CreateApplicationFormValues) => {
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

      return;
    }

    const successResponse = (await response.json()) as ICreateApplicationSuccessResponse;
    addApplicationFromApi(successResponse.data);

    reset(createApplicationFormDefaultValues);
    onClose();
    showTooltip('Application created successfully', { variant: 'success' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Position"
        placeholder="Enter position title"
        registration={register('position')}
        error={errors.position?.message}
      />

      <Input
        label="Company"
        placeholder="Enter company name"
        registration={register('company')}
        error={errors.company?.message}
      />

      <Dropdown
        label="Specialization"
        placeholder="Choose specialization (backend, frontend, etc.)"
        options={toSelectOptions(specializationOptions)}
        registration={register('specialization')}
        error={errors.specialization?.message}
      />
      <Dropdown
        label="Grade"
        placeholder="Choose grade (senior, middle, junior, etc.)"
        options={toSelectOptions(gradeOptions)}
        registration={register('grade')}
        error={errors.grade?.message}
      />
      <Dropdown
        label="Main Stack"
        placeholder="Choose main technology stack"
        options={toSelectOptions(stackOptions)}
        registration={register('mainStack')}
        error={errors.mainStack?.message}
      />

      <Input
        label="Salary"
        placeholder="Enter salary amount"
        registration={register('salary', {
          setValueAs: (value) => (typeof value === 'string' ? value.replace(/\D/g, '') : value),
        })}
        error={errors.salary?.message}
        inputMode="numeric"
        pattern="[0-9]*"
        onInput={(event) => {
          event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '');
        }}
      />
      <Dropdown
        label="Currency"
        placeholder="Select currency of salary"
        options={toSelectOptions(currencyOptions)}
        registration={register('currency')}
        error={errors.currency?.message}
      />
      <Dropdown
        label="Period"
        placeholder="Select period of salary"
        options={toSelectOptions(periodOptions)}
        registration={register('period')}
        error={errors.period?.message}
      />
      <Dropdown
        label="Contract"
        placeholder="Choose contract type"
        options={toSelectOptions(contractOptions)}
        registration={register('contract')}
        error={errors.contract?.message}
      />

      <Input
        label="URL"
        placeholder="Enter URL to job posting or company website"
        registration={register('url')}
        error={errors.url?.message}
      />
      <Textarea
        label="Notes"
        placeholder="Enter notes details about the application (achievements, interview feedback, etc.)"
        rows={2}
        maxCharacters={500}
        registration={register('notes')}
        error={errors.notes?.message}
      />

      <Dropdown
        label="Status"
        options={toSelectOptions(statusOptions)}
        registration={register('status')}
        error={errors.status?.message}
      />

      {errors.root?.message ? <p className="text-sm text-red-600">{errors.root.message}</p> : null}

      <div className="mt-2 flex items-center justify-end gap-3">
        <Button text="Close" variant="secondary" onClick={onClose} disabled={isSubmitting} />
        <Button
          text={isSubmitting ? 'Submitting...' : 'Submit'}
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
