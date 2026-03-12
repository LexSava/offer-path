import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { HomePageHero } from '@/components/pages/home-page-hero';

vi.mock('@/components/common', () => ({
  QuickActionsCards: () => <div data-testid="quick-actions-cards">quick-actions</div>,
}));

describe('HomePageHero', () => {
  it('renders main heading and supporting texts', () => {
    render(<HomePageHero />);

    expect(screen.getByRole('heading', { level: 1, name: 'OfferPath' })).toBeInTheDocument();
    expect(screen.getByText('Track your job applications easily')).toBeInTheDocument();
    expect(screen.getByText(/keep track of all your job applications in one place/i)).toBeInTheDocument();
  });

  it('renders quick actions block', () => {
    render(<HomePageHero />);

    expect(screen.getByTestId('quick-actions-cards')).toBeInTheDocument();
  });

  it('renders as section with centered layout classes', () => {
    const { container } = render(<HomePageHero />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('flex', 'flex-col', 'items-center', 'text-center');
  });
});
