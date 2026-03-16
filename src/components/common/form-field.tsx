'use client';

import type { FieldPath, FieldValues } from 'react-hook-form';
import { useFormFieldError, useRegisterWithInstantErrorClear } from '@/hooks';
import type { FormFieldProps } from '@/types';
import { Dropdown } from './dropdown/dropdown';
import { Input } from './input/input';
import { Textarea } from './textarea/textarea';

export function FormField<
  TValues extends FieldValues,
  TName extends FieldPath<TValues> = FieldPath<TValues>,
>(props: FormFieldProps<TValues, TName>) {
  const registerField = useRegisterWithInstantErrorClear<TValues>();
  const errorMessage = useFormFieldError<TValues, TName>(props.name);

  if (props.type === 'dropdown') {
    const {
      name,
      label,
      placeholder,
      options,
      isEditing = true,
      registrationOptions,
      ...dropdownProps
    } = props;

    return (
      <Dropdown
        label={label}
        placeholder={placeholder}
        options={options}
        registration={registerField(name, registrationOptions)}
        error={errorMessage}
        disabled={!isEditing}
        {...dropdownProps}
      />
    );
  }

  if (props.type === 'textarea') {
    const {
      name,
      label,
      placeholder,
      isEditing = true,
      registrationOptions,
      ...textareaProps
    } = props;

    return (
      <Textarea
        label={label}
        placeholder={placeholder}
        registration={registerField(name, registrationOptions)}
        error={errorMessage}
        disabled={!isEditing}
        {...textareaProps}
      />
    );
  }

  const {
    name,
    label,
    placeholder,
    isEditing = true,
    registrationOptions,
    readOnlyWhenNotEditing = false,
    ...inputProps
  } = props;

  return (
    <Input
      label={label}
      placeholder={placeholder}
      registration={registerField(name, registrationOptions)}
      error={errorMessage}
      disabled={!isEditing}
      readOnly={readOnlyWhenNotEditing ? !isEditing : undefined}
      {...inputProps}
    />
  );
}
