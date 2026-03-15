import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomePageHowItWorks } from '@/components/pages/home-page/home-page-how-it-works';

describe('HomePageHowItWorks', () => {
  it('renders section title', () => {
    render(<HomePageHowItWorks />);

    expect(screen.getByText('How It Works')).toBeInTheDocument();
  });

  it('renders info sections', () => {
    const { container } = render(<HomePageHowItWorks />);

    // Should render at least one InfoSection
    const infoSections = container.querySelectorAll('div');
    expect(infoSections.length).toBeGreaterThan(0);
  });

  it('renders as section element', () => {
    const { container } = render(<HomePageHowItWorks />);

    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('title has correct styling', () => {
    render(<HomePageHowItWorks />);

    const title = screen.getByText('How It Works');
    expect(title).toHaveClass('text-primary', 'text-center', 'text-2xl', 'font-semibold');
  });

  it('renders grid layout', () => {
    const { container } = render(<HomePageHowItWorks />);

    const grid = container.querySelector('div.grid');
    expect(grid).toHaveClass('grid', 'grid-cols-1');
  });

  it('has margin bottom applied', () => {
    const { container } = render(<HomePageHowItWorks />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('mb-16', 'w-full');
  });
});
