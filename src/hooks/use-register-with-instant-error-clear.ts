'use client';

import { useCallback } from 'react';
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
        onChange: (event: Parameters<typeof registration.onChange>[0]) => {
          const result = registration.onChange(event);
          clearErrors(name);
          return result;
        },
      };
    },
    [register, clearErrors],
  );
}
