import type { IApplicationResponseDto } from '../contexts/applications/applications.types';

export interface ICreateApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ICreateApplicationSuccessResponse {
  message: string;
  data: IApplicationResponseDto;
}
