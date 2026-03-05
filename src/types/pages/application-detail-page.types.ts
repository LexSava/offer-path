import type { IApplicationResponseDto } from '@/types/contexts/applications/applications.types';

export interface IApplicationDetailApiResponse {
  data?: IApplicationResponseDto;
}

export interface IApplicationDetailItemProps {
  label: string;
  value: string;
  fullWidth?: boolean;
}
