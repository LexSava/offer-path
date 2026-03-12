import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/common/buttons/button';

describe('Button', () => {
  it('renders button with text', () => {
    render(
      <Button text="Click me" variant="primary" onClick={vi.fn()} />
    );

    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button text="Click me" variant="primary" onClick={handleClick} />
    );

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies primary variant styles', () => {
    const { container } = render(
      <Button text="Click me" variant="primary" onClick={vi.fn()} />
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-primary', 'text-white');
  });

  it('applies secondary variant styles', () => {
    const { container } = render(
      <Button text="Click me" variant="secondary" onClick={vi.fn()} />
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('border-gray-300', 'text-gray-700');
  });

  it('sets button type to specified type', () => {
    render(
      <Button text="Submit" variant="primary" onClick={vi.fn()} type="submit" />
    );

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('disables button when disabled prop is true', () => {
    render(
      <Button text="Click me" variant="primary" onClick={vi.fn()} disabled={true} />
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it('applies opacity class when disabled', () => {
    const { container } = render(
      <Button text="Click me" variant="primary" onClick={vi.fn()} disabled={true} />
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('opacity-50');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Button text="Click me" variant="primary" onClick={vi.fn()} className="custom-class" />
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('has button type by default', () => {
    render(
      <Button text="Click me" variant="primary" onClick={vi.fn()} />
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveAttribute('type', 'button');
  });
});
