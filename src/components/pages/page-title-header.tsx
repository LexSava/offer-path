'use client';

import { BackLink } from '@/components/common';
import type { IPageTitleHeaderProps } from '@/types';

export function PageTitleHeader({ backLinkUrl, backLinkText, title }: IPageTitleHeaderProps) {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <BackLink url={backLinkUrl} text={backLinkText} />
      <span className="font-3xl hidden font-thin sm:block"> | </span>
      <h2 className="font-logo text-primary text-3xl font-medium">{title}</h2>
    </section>
  );
}
