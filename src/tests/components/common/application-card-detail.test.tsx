import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ApplicationCardDetail } from '@/components/common/application-card/application-card-detail';

describe('ApplicationCardDetail', () => {
  it('renders label', () => {
    render(
      <ApplicationCardDetail label="Position" value="Software Engineer" />
    );

    expect(screen.getByText(/position/i)).toBeInTheDocument();
  });

  it('renders value', () => {
    render(
      <ApplicationCardDetail label="Position" value="Software Engineer" />
    );

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders label and value with colon separator', () => {
    const { container } = render(
      <ApplicationCardDetail label="Position" value="Software Engineer" />
    );

    expect(container.textContent).toContain('Position:');
  });

  it('renders with correct text styling for label', () => {
    const { container } = render(
      <ApplicationCardDetail label="Position" value="Software Engineer" />
    );

    const labelElement = container.querySelector('p');
    expect(labelElement).toHaveClass('text-primary');
  });

  it('renders with correct text styling for value', () => {
    const { container } = render(
      <ApplicationCardDetail label="Position" value="Software Engineer" />
    );

    const valueElement = container.querySelector('span');
    expect(valueElement).toHaveClass('text-secondary', 'font-semibold');
  });

  it('renders with correct flex layout', () => {
    const { container } = render(
      <ApplicationCardDetail label="Position" value="Software Engineer" />
    );

    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveClass('flex', 'items-start', 'gap-2');
  });

  it('handles React node as value', () => {
    render(
      <ApplicationCardDetail
        label="Position"
        value={<span data-testid="custom-value">Custom Value</span>}
      />
    );

    expect(screen.getByTestId('custom-value')).toBeInTheDocument();
  });

  it('renders multiple instances correctly', () => {
    const { container } = render(
      <>
        <ApplicationCardDetail label="Position" value="Software Engineer" />
        <ApplicationCardDetail label="Company" value="Tech Corp" />
      </>
    );

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });
});
