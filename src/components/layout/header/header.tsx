'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { LoginButton } from '@/components/common';
import { usePathname } from 'next/navigation';
import { HeaderLinks } from './header-links';
import { isCurrentRoute } from './header-route.utils';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-surface sticky top-0 z-5 shadow-[0_2px_0_rgba(26,24,20,0.1)]">
      <Container className="py-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="flex items-center justify-start gap-6">
            <Link
              href="/"
              onClick={(event) => {
                if (isCurrentRoute(pathname, '/')) {
                  event.preventDefault();
                }
              }}
              className="font-logo flex items-center gap-3 text-xl font-normal tracking-wider hover:font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              <div className="h-3 w-3" style={{ backgroundColor: 'var(--accent)' }} />
              OfferPath
            </Link>
            <HeaderLinks className="hidden sm:block" />
          </div>

          <LoginButton />
        </div>
      </Container>
    </header>
  );
}
