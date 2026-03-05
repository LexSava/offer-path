import type { IApplication } from '@/types/models/application.types';

export interface ICreateApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ButtonVariantType = 'primary' | 'secondary';

export interface IButtonProps {
  text: string;
  variant: ButtonVariantType;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ITooltipProps {
  message: string;
  isVisible: boolean;
  variant: 'success' | 'error';
  onClose: () => void;
}

export interface IApplicationCardProps {
  application: IApplication;
}
