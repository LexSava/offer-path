import Link from 'next/link';
import { Container } from './container';
import { LoginButton } from '../ui';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface">
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <span className="font-logo text-xl font-normal hover:font-bold text-primary">
              OfferPath
            </span>
          </Link>
          <LoginButton />
        </div>
      </Container>
    </header>
  );
}
