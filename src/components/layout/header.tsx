import Link from 'next/link';
import { Container } from './container';
import { LoginButton } from '../ui';

export function Header() {
  return (
    <header className="bg-surface sticky top-0 z-50">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="group">
            <span className="font-logo text-primary text-xl font-normal hover:font-bold">
              OfferPath
            </span>
          </Link>
          <LoginButton />
        </div>
      </Container>
    </header>
  );
}
