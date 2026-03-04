'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Dropdown, Input, Textarea } from '@/components/common';
import { Button } from '@/components/ui';
import { toSelectOptions } from '@/utils';
import {
  createApplicationValidationSchema,
  type CreateApplicationFormInputValues,
  type CreateApplicationFormValues,
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
import { ICreateApplicationFormProps } from '@/types';
import { createApplicationFormDefaultValues } from '@/constants';

export function CreateApplicationForm({ isOpen, onClose }: ICreateApplicationFormProps) {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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

  const onSubmit = (values: CreateApplicationFormValues) => {
    const createdAt = new Date().toISOString();
    const authorizedUser = session?.user;

    if (!authorizedUser?.id || !authorizedUser?.email) {
      console.error('Authorized user is missing id or email in session');
      return;
    }

    const payload = {
      ...values,
      createdAt,
      updatedAt: createdAt,
      isFavorite: false,
      userId: authorizedUser.id,
      email: authorizedUser.email,
    };

    console.log(payload);
    reset(createApplicationFormDefaultValues);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Position"
        registration={register('position')}
        error={errors.position?.message}
      />

      <Dropdown
        label="Specialization"
        placeholder="Choose specialization"
        options={toSelectOptions(specializationOptions)}
        registration={register('specialization')}
        error={errors.specialization?.message}
      />
      <Dropdown
        label="Grade"
        placeholder="Choose grade"
        options={toSelectOptions(gradeOptions)}
        registration={register('grade')}
        error={errors.grade?.message}
      />
      <Dropdown
        label="Main Stack"
        placeholder="Choose technology"
        options={toSelectOptions(stackOptions)}
        registration={register('mainStack')}
        error={errors.mainStack?.message}
      />

      <Input
        label="Salary"
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
        placeholder="Select currency"
        options={toSelectOptions(currencyOptions)}
        registration={register('currency')}
        error={errors.currency?.message}
      />
      <Dropdown
        label="Period"
        placeholder="Select period"
        options={toSelectOptions(periodOptions)}
        registration={register('period')}
        error={errors.period?.message}
      />
      <Dropdown
        label="Contract"
        placeholder="Choose contract"
        options={toSelectOptions(contractOptions)}
        registration={register('contract')}
        error={errors.contract?.message}
      />

      <Input label="URL" registration={register('url')} error={errors.url?.message} />
      <Textarea
        label="Notes"
        rows={4}
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

      <div className="mt-2 flex items-center justify-end gap-3">
        <Button text="Close" variant="secondary" onClick={onClose} />
        <Button text="Submit" variant="primary" type="submit" />
      </div>
    </form>
  );
}
