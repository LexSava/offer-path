import type { CreateApplicationRequestValues } from '@/forms/create-application/create-application-validation';
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
}

export interface IApplicationDetailPageFormProps {
  resolvedApplication: IApplication;
  isEditing: boolean;
  submitError: string | null;
  onSubmit: (values: CreateApplicationRequestValues) => Promise<void>;
  onDeleted: () => void;
  onStartEdit: () => void;
  onCloseEdit: () => void;
}

export interface IApplicationDetailContentHeaderProps {
  resolvedApplication: IApplication;
  isEditing: boolean;
  onDeleted: () => void;
  onStartEdit: () => void;
}
