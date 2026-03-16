'use client';

import { useFormContext, useFormState, type FieldPath, type FieldValues } from 'react-hook-form';

export function useFormFieldError<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(name: TName) {
  const { control } = useFormContext<TFieldValues>();
  const { errors } = useFormState<TFieldValues>({ control, name });
  const message = errors[name]?.message;

  return typeof message === 'string' ? message : undefined;
}
