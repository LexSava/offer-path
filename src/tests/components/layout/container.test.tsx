import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Container } from '@/components/layout/container';

describe('Container', () => {
  it('renders children content', () => {
    render(
      <Container>
        <span>Container content</span>
      </Container>,
    );

    expect(screen.getByText('Container content')).toBeInTheDocument();
  });

  it('applies base layout classes', () => {
    const { container } = render(
      <Container>
        <span>Child</span>
      </Container>,
    );

    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass('mx-auto', 'w-full', 'max-w-475', 'px-4', 'py-6');
    expect(wrapper).toHaveClass('md:px-6', 'lg:px-8');
  });

  it('merges custom className with base classes', () => {
    const { container } = render(
      <Container className="custom-wrapper">
        <span>Child</span>
      </Container>,
    );

    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass('custom-wrapper');
    expect(wrapper).toHaveClass('mx-auto');
  });
});
