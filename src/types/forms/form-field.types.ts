import type { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import type { IDropdownOption, IDropdownProps, IInputProps, ITextareaProps } from '@/types';

export type FieldType = 'input' | 'dropdown' | 'textarea';

export type ApplicationFieldName =
  | 'position'
  | 'company'
  | 'specialization'
  | 'grade'
  | 'mainStack'
  | 'salary'
  | 'currency'
  | 'period'
  | 'contract'
  | 'url'
  | 'notes'
  | 'status';

type FormFieldBaseProps<TValues extends FieldValues, TName extends FieldPath<TValues>> = {
  name: TName;
  label: string;
  placeholder?: string;
  isEditing?: boolean;
  registrationOptions?: RegisterOptions<TValues, TName>;
};

type InputExtras = Omit<IInputProps, 'label' | 'placeholder' | 'registration' | 'error'>;
type DropdownExtras = Omit<
  IDropdownProps,
  'label' | 'placeholder' | 'options' | 'registration' | 'error'
>;
type TextareaExtras = Omit<ITextareaProps, 'label' | 'placeholder' | 'registration' | 'error'>;

export type FormFieldProps<
  TValues extends FieldValues,
  TName extends FieldPath<TValues> = FieldPath<TValues>,
> =
  | ({
      type: 'input';
      readOnlyWhenNotEditing?: boolean;
    } & FormFieldBaseProps<TValues, TName> &
      InputExtras)
  | ({
      type: 'dropdown';
      options: IDropdownOption[];
    } & FormFieldBaseProps<TValues, TName> &
      DropdownExtras)
  | ({
      type: 'textarea';
    } & FormFieldBaseProps<TValues, TName> &
      TextareaExtras);

export type FormFieldConfig<
  TValues extends FieldValues,
  TName extends FieldPath<TValues> = FieldPath<TValues>,
> = FormFieldProps<TValues, TName>;
