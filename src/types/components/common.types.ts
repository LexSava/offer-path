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
  onClick?: () => void;
  className?: string;
}

export interface IApplicationCardDetailProps {
  label: string;
  value: string;
}

export interface IBackLinkProps {
  url: string;
  text: string;
}

export interface IFavoriteApplicationButtonProps {
  applicationId: string;
  isFavorite: boolean;
  className?: string;
}

export interface IUpdateFavoriteResponse {
  data?: {
    id: string;
    isFavorite: boolean;
  };
}

export interface IPageTitleHeaderProps {
  backLinkUrl: string;
  backLinkText: string;
  title: string;
}
