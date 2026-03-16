'use client';

import { useCallback, type ChangeEvent } from 'react';
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form';

export function useRegisterWithInstantErrorClear<TFieldValues extends FieldValues>() {
  const { register, clearErrors } = useFormContext<TFieldValues>();

  return useCallback(
    <TName extends FieldPath<TFieldValues>>(
      name: TName,
      options?: RegisterOptions<TFieldValues, TName>,
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
