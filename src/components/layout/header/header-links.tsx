'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HEADER_LINKS } from '@/constants';
import { cn } from '@/utils';
import { IHeaderLinksProps } from '@/types';
import { isCurrentRoute, normalizePath } from './header-route.utils';

function isHeaderLinkActive(pathname: string | null, href: string) {
  const currentPath = normalizePath(pathname ?? '/');
  const targetPath = normalizePath(href);

  if (targetPath === '/') {
    return currentPath === '/';
  }

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}

export function HeaderLinks({ className }: IHeaderLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className={className}>
      <ul className="flex items-center justify-center gap-4 sm:justify-start sm:gap-6">
        {HEADER_LINKS.map((link) => {
          const isActive = isHeaderLinkActive(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => {
                  if (isCurrentRoute(pathname, link.href)) {
                    event.preventDefault();
                  }
                }}
                className={cn(
                  'border-b-2 border-transparent py-1 text-sm font-semibold tracking-wide uppercase transition-colors',
                  'hover:border-accent hover:text-accent',
                  isActive && 'border-accent text-primary',
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
