import type { ReactNode } from 'react';
import type { IApplication } from '@/types/models/application.types';
import type { SortOption } from '@/constants';
import type { StatusType } from '@/types/models/application.types';

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
  highlightQuery?: string;
}

export interface IApplicationCardDetailProps {
  label: string;
  value: ReactNode;
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

export interface IStatusBadgeProps {
  status: StatusType;
  className?: string;
}

export interface IDeleteApplicationButtonProps {
  applicationId: string;
  className?: string;
  onDeleted?: () => void;
}

export interface IConfirmationModalProps {
  isOpen: boolean;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface IUpdateFavoriteResponse {
  data?: {
    id: string;
    isFavorite: boolean;
  };
}

export interface IDeleteApplicationResponse {
  data?: {
    id: string;
  };
}

export interface IPageTitleHeaderProps {
  backLinkUrl: string;
  backLinkText: string;
  title: string;
}

export interface IApplicationSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface IApplicationSortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export interface IHighlightMatchProps {
  text: string;
  query?: string;
  highlightClassName?: string;
}

export type QuickActionButtonVariant = 'primary' | 'secondary';

export interface IQuickActionButtonProps {
  title: string;
  description: string;
  icon: ReactNode;
  variant: QuickActionButtonVariant;
  onClick: () => void;
}

export interface IInfoSectionProps {
  number: string;
  title: string;
  description: string;
}

export interface INormalizedTextWithIndexMap {
  value: string;
  indexMap: number[];
}

export interface IMatchRange {
  start: number;
  end: number;
}
