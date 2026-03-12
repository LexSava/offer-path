import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { Textarea } from '@/components/common/textarea/textarea';

const createRegistration = (name: string, onChange = vi.fn()): UseFormRegisterReturn => ({
  name,
  onChange,
  onBlur: vi.fn(),
  ref: vi.fn(),
});

describe('Textarea', () => {
  it('renders textarea with label', () => {
    render(<Textarea label="Test Label" registration={createRegistration('test')} id="test-id" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders textarea input element', () => {
    render(<Textarea label="Test Label" registration={createRegistration('test')} id="test-id" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(
      <Textarea
        label="Test Label"
        error="This is an error"
        registration={createRegistration('test')}
        id="test-id"
      />,
    );

    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('handles text input correctly', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Textarea
        label="Test Label"
        registration={createRegistration('test', handleChange)}
        id="test-id"
      />,
    );

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Test content');

    expect(handleChange).toHaveBeenCalled();
  });

  it('displays character count when maxCharacters is provided', () => {
    render(
      <Textarea
        label="Test Label"
        registration={createRegistration('test')}
        id="test-id"
        maxCharacters={100}
        value=""
      />,
    );

    expect(screen.getByText('0 / 100')).toBeInTheDocument();
  });

  it('tracks character count as user types', async () => {
    const user = userEvent.setup();

    render(
      <Textarea
        label="Test Label"
        registration={createRegistration('test')}
        id="test-id"
        maxCharacters={100}
      />,
    );

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello');

    expect(screen.getByText('5 / 100')).toBeInTheDocument();
  });

  it('uses registration name for textarea id when id is not provided', () => {
    render(<Textarea label="Test Label" registration={createRegistration('myField')} />);

    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveAttribute('id', 'myField');
  });

  it('applies custom className to textarea', () => {
    const { container } = render(
      <Textarea
        label="Test Label"
        registration={createRegistration('test')}
        id="test-id"
        className="custom-class"
      />,
    );

    const textarea = container.querySelector('textarea');
    expect(textarea).toHaveClass('custom-class');
  });
});
