import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '@/components/common/tooltip/tooltip';

describe('Tooltip', () => {
  it('renders tooltip with message when visible', () => {
    render(<Tooltip message="Test message" isVisible={true} variant="success" onClose={vi.fn()} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('has correct aria attributes for accessibility', () => {
    render(<Tooltip message="Test message" isVisible={true} variant="success" onClose={vi.fn()} />);

    const tooltip = screen.getByRole('status');
    expect(tooltip).toHaveAttribute('aria-live', 'polite');
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Tooltip message="Test message" isVisible={true} variant="success" onClose={handleClose} />,
    );

    const closeButton = screen.getByLabelText('Close tooltip');
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledOnce();
  });

  it('applies success variant styles', () => {
    const { container } = render(
      <Tooltip message="Test message" isVisible={true} variant="success" onClose={vi.fn()} />,
    );

    const tooltip = container.querySelector('[role="status"]');
    expect(tooltip).toHaveClass('border-primary', 'text-primary');
  });

  it('applies error variant styles', () => {
    const { container } = render(
      <Tooltip message="Test message" isVisible={true} variant="error" onClose={vi.fn()} />,
    );

    const tooltip = container.querySelector('[role="status"]');
    expect(tooltip).toHaveClass('border-red-500', 'text-red-600');
  });

  it('hides tooltip with opacity class when not visible', () => {
    const { container } = render(
      <Tooltip message="Test message" isVisible={false} variant="success" onClose={vi.fn()} />,
    );

    const tooltip = container.querySelector('[role="status"]');
    expect(tooltip).toHaveClass('opacity-0');
  });
});
