import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ReactNode } from 'react';
import { Header } from '@/components/layout';

const containerSpy = vi.fn();

vi.mock('@/components/common', () => ({
  HeaderLinks: () => <nav aria-label="Main navigation">Mock Header Links</nav>,
  LoginButton: () => <button type="button">Mock Login Button</button>,
}));

vi.mock('@/components/layout/container', () => ({
  Container: ({ children, className }: { children: ReactNode; className?: string }) => {
    containerSpy({ className });
    return <div data-testid="header-container">{children}</div>;
  },
}));

describe('Header', () => {
  it('renders brand link to home page', () => {
    render(<Header />);

    const brandLink = screen.getByRole('link', { name: /offerpath/i });
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('renders login button inside header', () => {
    render(<Header />);

    expect(screen.getByRole('button', { name: 'Mock Login Button' })).toBeInTheDocument();
  });

  it('passes compact vertical spacing to container', () => {
    render(<Header />);

    const lastCallArgs = containerSpy.mock.calls.at(-1)?.[0];
    expect(lastCallArgs).toMatchObject({ className: 'py-4' });
  });

  it('applies sticky header classes', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky', 'top-0', 'z-5', 'bg-surface');
  });
});
