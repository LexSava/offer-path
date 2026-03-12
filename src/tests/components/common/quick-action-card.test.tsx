import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuickActionCard } from '@/components/common/quick-actions/quick-action-card';
import { Plus } from 'lucide-react';

describe('QuickActionCard', () => {
  it('renders title', () => {
    render(
      <QuickActionCard
        title="Test Title"
        description="Test Description"
        icon={<Plus size={24} />}
        variant="primary"
        onClick={vi.fn()}
      />,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <QuickActionCard
        title="Test Title"
        description="Test Description"
        icon={<Plus size={24} />}
        variant="primary"
        onClick={vi.fn()}
      />,
    );

    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders icon', () => {
    const { container } = render(
      <QuickActionCard
        title="Test Title"
        description="Test Description"
        icon={<Plus size={24} />}
        variant="primary"
        onClick={vi.fn()}
      />,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies primary variant styles', () => {
    const { container } = render(
      <QuickActionCard
        title="Test Title"
        description="Test Description"
        icon={<Plus size={24} />}
        variant="primary"
        onClick={vi.fn()}
      />,
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-accent', 'text-white');
  });

  it('applies secondary variant styles', () => {
    const { container } = render(
      <QuickActionCard
        title="Test Title"
        description="Test Description"
        icon={<Plus size={24} />}
        variant="secondary"
        onClick={vi.fn()}
      />,
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-surface', 'text-primary', 'border-2');
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <QuickActionCard
        title="Test Title"
        description="Test Description"
        icon={<Plus size={24} />}
        variant="primary"
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button', { name: /test title/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders as button element', () => {
    render(
      <QuickActionCard
        title="Test Title"
        description="Test Description"
        icon={<Plus size={24} />}
        variant="primary"
        onClick={vi.fn()}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('has correct text alignment', () => {
    const { container } = render(
      <QuickActionCard
        title="Test Title"
        description="Test Description"
        icon={<Plus size={24} />}
        variant="primary"
        onClick={vi.fn()}
      />,
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('text-left');
  });
});
