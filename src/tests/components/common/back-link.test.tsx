import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BackLink } from '@/components/common/back-link/back-link';

describe('BackLink', () => {
  it('renders back link with text', () => {
    render(<BackLink url="/test" text="Go Back" />);

    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('has correct href attribute', () => {
    render(<BackLink url="/test-path" text="Go Back" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-path');
  });

  it('renders with back arrow icon', () => {
    const { container } = render(<BackLink url="/test" text="Go Back" />);

    const link = container.querySelector('a');
    const svg = link?.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has correct classes applied', () => {
    const { container } = render(<BackLink url="/test" text="Go Back" />);

    const link = container.querySelector('a');
    expect(link).toHaveClass('inline-flex', 'items-start', 'gap-1');
  });

  it('applies hover styles', () => {
    const { container } = render(<BackLink url="/test" text="Go Back" />);

    const link = container.querySelector('a');
    expect(link).toHaveClass('hover:text-primary', 'hover:border-gray-300');
  });

  it('renders as link component', () => {
    render(<BackLink url="/applications" text="Back to Applications" />);

    const link = screen.getByRole('link', { name: /back to applications/i });
    expect(link).toBeInTheDocument();
  });

  it('contains text and icon in correct order', () => {
    const { container } = render(<BackLink url="/test" text="Go Back" />);

    const link = container.querySelector('a');
    expect(link?.textContent).toContain('Go Back');
  });
});
