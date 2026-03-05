import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { CreateApplicationRequestInputValues, CreateApplicationRequestValues } from '@/forms/create-application/create-application-validation';
import type { IApplicationResponseDto } from '@/types/contexts/applications/applications.types';
import type { IApplication } from '@/types/models/application.types';

export interface IApplicationDetailApiResponse {
  data?: IApplicationResponseDto;
}

export interface IApplicationDetailItemProps {
  label: string;
  value: string;
  fullWidth?: boolean;
}

export interface IApplicationUpdateErrorResponse {
  message: string;
  fieldErrors?: Partial<Record<keyof CreateApplicationRequestValues, string[]>>;
}

export interface IApplicationUpdateSuccessResponse {
  data?: IApplicationResponseDto;
}

export interface IApplicationDetailFormFieldsProps {
  resolvedApplication: IApplication;
  isEditing: boolean;
  register: UseFormRegister<CreateApplicationRequestInputValues>;
  errors: FieldErrors<CreateApplicationRequestInputValues>;
}
