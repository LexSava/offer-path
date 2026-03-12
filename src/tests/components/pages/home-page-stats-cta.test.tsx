import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomePageStatsCta } from '@/components/pages/home-page-stats-cta';

describe('HomePageStatsCta', () => {
  it('renders heading', () => {
    render(<HomePageStatsCta />);

    expect(screen.getByText('Start tracking your job applications today')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<HomePageStatsCta />);

    expect(screen.getByText(/join professionals/i)).toBeInTheDocument();
  });

  it('renders call to action link', () => {
    render(<HomePageStatsCta />);

    const link = screen.getByRole('link', { name: /get started/i });
    expect(link).toBeInTheDocument();
  });

  it('link has correct href', () => {
    render(<HomePageStatsCta />);

    const link = screen.getByRole('link', { name: /get started/i });
    expect(link).toHaveAttribute('href', '/applications');
  });

  it('renders with primary background color', () => {
    const { container } = render(<HomePageStatsCta />);

    const wrapper = container.querySelector('div:first-child');
    expect(wrapper).toHaveClass('bg-primary');
  });

  it('heading has correct styling', () => {
    render(<HomePageStatsCta />);

    const heading = screen.getByText('Start tracking your job applications today');
    expect(heading).toHaveClass('text-2xl', 'font-semibold');
  });

  it('renders with flex layout and white text', () => {
    const { container } = render(<HomePageStatsCta />);

    const wrapper = container.querySelector('div:first-child');
    expect(wrapper).toHaveClass('flex', 'text-white');
  });

  it('button has accent background', () => {
    const { container } = render(<HomePageStatsCta />);

    const link = screen.getByRole('link', { name: /get started/i });
    expect(link).toHaveClass('bg-accent', 'text-white');
  });

  it('renders full width', () => {
    const { container } = render(<HomePageStatsCta />);

    const wrapper = container.querySelector('div:first-child');
    expect(wrapper).toHaveClass('w-full');
  });
});
