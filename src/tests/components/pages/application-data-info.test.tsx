import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ApplicationDataInfo } from '@/components/pages/home-page/application-data-info';

describe('ApplicationDataInfo', () => {
  it('renders section title', () => {
    render(<ApplicationDataInfo />);

    expect(screen.getByText('What You Can Track')).toBeInTheDocument();
  });

  it('renders data category cards', () => {
    const { container } = render(<ApplicationDataInfo />);

    const articles = container.querySelectorAll('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  it('renders as section element', () => {
    const { container } = render(<ApplicationDataInfo />);

    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('has correct layout classes', () => {
    const { container } = render(<ApplicationDataInfo />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('w-full');
  });

  it('title has correct styling', () => {
    render(<ApplicationDataInfo />);

    const title = screen.getByText('What You Can Track');
    expect(title).toHaveClass('text-primary', 'text-center', 'text-2xl', 'font-semibold');
  });

  it('renders grid layout', () => {
    const { container } = render(<ApplicationDataInfo />);

    const grid = container.querySelector('div:nth-child(2)');
    expect(grid).toHaveClass('grid', 'grid-cols-1');
  });

  it('renders all category cards', () => {
    const { container } = render(<ApplicationDataInfo />);

    const articles = container.querySelectorAll('article');
    // Should have at least 3 categories
    expect(articles.length).toBeGreaterThanOrEqual(3);
  });
});
