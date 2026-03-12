import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { Input } from '@/components/common/input/input';

const createRegistration = (name: string, onChange = vi.fn()): UseFormRegisterReturn => ({
  name,
  onChange,
  onBlur: vi.fn(),
  ref: vi.fn(),
});

describe('Input', () => {
  it('renders input with label', () => {
    render(<Input label="Test Label" registration={createRegistration('test')} id="test-id" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders input element', () => {
    render(<Input label="Test Label" registration={createRegistration('test')} id="test-id" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(
      <Input
        label="Test Label"
        error="This is an error"
        registration={createRegistration('test')}
        id="test-id"
      />,
    );

    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('applies error styles when error exists', () => {
    const { container } = render(
      <Input
        label="Test Label"
        error="This is an error"
        registration={createRegistration('test')}
        id="test-id"
      />,
    );

    const input = container.querySelector('input');
    expect(input).toHaveClass('border-red-500', 'focus:border-red-500');
  });

  it('applies default styles when no error', () => {
    const { container } = render(
      <Input label="Test Label" registration={createRegistration('test')} id="test-id" />,
    );

    const input = container.querySelector('input');
    expect(input).toHaveClass('border-gray-300', 'focus:border-primary');
  });

  it('uses registration name for input id when id is not provided', () => {
    render(<Input label="Test Label" registration={createRegistration('myField')} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'myField');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Input
        label="Test Label"
        registration={createRegistration('test')}
        id="test-id"
        className="custom-class"
      />,
    );

    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });

  it('handles input type prop', () => {
    render(
      <Input label="Email" registration={createRegistration('email')} id="email" type="email" />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('handles text input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Input
        label="Test Label"
        registration={createRegistration('test', handleChange)}
        id="test-id"
      />,
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'Test content');

    expect(handleChange).toHaveBeenCalled();
  });
});
