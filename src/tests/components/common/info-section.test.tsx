import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoSection } from '@/components/common/info-section/info-section';

describe('InfoSection', () => {
  it('renders number badge', () => {
    render(
      <InfoSection
        number={'1'}
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(
      <InfoSection
        number={'1'}
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <InfoSection
        number={'1'}
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders all numbers correctly', () => {
    const { rerender } = render(
      <InfoSection
        number={'1'}
        title="First"
        description="First section"
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();

    rerender(
      <InfoSection
        number={'2'}
        title="Second"
        description="Second section"
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('applies accent background to number badge', () => {
    render(
      <InfoSection
        number={'1'}
        title="Test Title"
        description="Test Description"
      />
    );

    const badge = screen.getByText('1').closest('div');
    expect(badge).toHaveClass('bg-accent', 'text-white');
  });

  it('renders with correct structure', () => {
    const { container } = render(
      <InfoSection
        number={'1'}
        title="Test Title"
        description="Test Description"
      />
    );

    const wrapper = container.querySelector('div:first-child');
    expect(wrapper).toHaveClass('flex', 'gap-4');
  });
});
