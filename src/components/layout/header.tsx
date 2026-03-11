'use client';

import Link from 'next/link';
import { Container } from './container';
import { LoginButton } from '../common';

export function Header() {
  return (
    <header className="bg-surface sticky top-0 z-50">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-logo flex items-center gap-3 text-xl font-normal tracking-wider hover:font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            <div className="h-3 w-3" style={{ backgroundColor: 'var(--accent)' }} />
            OfferPath
          </Link>

          <LoginButton />
        </div>
      </Container>
    </header>
  );
}
