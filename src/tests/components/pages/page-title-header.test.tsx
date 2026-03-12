import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageTitleHeader } from '@/components/pages/page-title-header';

describe('PageTitleHeader', () => {
  it('renders back link', () => {
    render(
      <PageTitleHeader
        backLinkUrl="/previous"
        backLinkText="Go Back"
        title="Applications"
      />
    );

    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('renders page title', () => {
    render(
      <PageTitleHeader
        backLinkUrl="/previous"
        backLinkText="Go Back"
        title="Applications"
      />
    );

    expect(screen.getByText('Applications')).toBeInTheDocument();
  });

  it('back link has correct href', () => {
    render(
      <PageTitleHeader
        backLinkUrl="/applications"
        backLinkText="Go Back"
        title="Detail"
      />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/applications');
  });

  it('renders divider separator', () => {
    const { container } = render(
      <PageTitleHeader
        backLinkUrl="/previous"
        backLinkText="Go Back"
        title="Applications"
      />
    );

    expect(container.textContent).toContain('|');
  });

  it('renders as section element', () => {
    const { container } = render(
      <PageTitleHeader
        backLinkUrl="/previous"
        backLinkText="Go Back"
        title="Applications"
      />
    );

    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('has correct layout classes', () => {
    const { container } = render(
      <PageTitleHeader
        backLinkUrl="/previous"
        backLinkText="Go Back"
        title="Applications"
      />
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('flex', 'flex-wrap', 'items-center', 'gap-3');
  });

  it('title has correct styling', () => {
    const { container } = render(
      <PageTitleHeader
        backLinkUrl="/previous"
        backLinkText="Go Back"
        title="Applications"
      />
    );

    const title = screen.getByText('Applications');
    expect(title).toHaveClass('text-primary', 'text-3xl', 'font-medium');
  });
});
