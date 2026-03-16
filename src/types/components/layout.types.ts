import { ReactNode } from 'react';

export interface IContainerProps {
  children: ReactNode;
  className?: string;
}

export interface IHeaderLink {
  label: string;
  href: string;
}

export interface IHeaderLinksProps {
  className?: string;
}
