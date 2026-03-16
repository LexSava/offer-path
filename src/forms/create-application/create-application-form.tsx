'use client';

import { FormProvider, useFormContext, useFormState } from 'react-hook-form';
import { Button } from '@/components/common';
import { FormField } from '@/components/common';
import { createApplicationFieldsConfig } from '@/constants';
import { type CreateApplicationFormValues } from './create-application-validation';
import type { ICreateApplicationFormProps } from '@/types';
import { useCreateApplicationForm } from './use-create-application-form';

function CreateApplicationFieldsSection() {
  return (
    <>
      {createApplicationFieldsConfig.map((field) => (
        <FormField<CreateApplicationFormValues> key={field.name} {...field} />
      ))}
    </>
  );
}

function CreateApplicationRootError() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control });

  return errors.root?.message ? (
    <p className="text-sm text-red-600">{errors.root.message}</p>
  ) : null;
}

function CreateApplicationSubmitActions({ onClose }: { onClose: () => void }) {
  const { isSubmitting } = useFormState<CreateApplicationFormValues>();

  return (
    <div className="mt-2 flex items-center justify-end gap-3">
      <Button text="Close" variant="secondary" onClick={onClose} disabled={isSubmitting} />
      <Button
        text={isSubmitting ? 'Submitting...' : 'Submit'}
        variant="primary"
        type="submit"
        disabled={isSubmitting}
      />
    </div>
  );
}

export function CreateApplicationForm({ isOpen, onClose }: ICreateApplicationFormProps) {
  const { methods, onSubmit } = useCreateApplicationForm({ isOpen, onClose });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <CreateApplicationFieldsSection />
        <CreateApplicationRootError />
        <CreateApplicationSubmitActions onClose={onClose} />
      </form>
    </FormProvider>
  );
}
