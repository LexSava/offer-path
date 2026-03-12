import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { Dropdown } from '@/components/common/dropdown/dropdown';

const createRegistration = (
  name: string,
  onChange = vi.fn(),
): UseFormRegisterReturn => ({
  name,
  onChange,
  onBlur: vi.fn(),
  ref: vi.fn(),
});

describe('Dropdown', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders dropdown with label', () => {
    render(
      <Dropdown
        label="Test Label"
        options={mockOptions}
        registration={createRegistration('test')}
      />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(
      <Dropdown
        label="Test Label"
        options={mockOptions}
        registration={createRegistration('test')}
      />
    );

    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('renders placeholder option when provided', () => {
    render(
      <Dropdown
        label="Test Label"
        options={mockOptions}
        placeholder="Select an option"
        registration={createRegistration('test')}
      />
    );

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(
      <Dropdown
        label="Test Label"
        error="This is an error"
        options={mockOptions}
        registration={createRegistration('test')}
      />
    );

    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('applies error styles when error exists', () => {
    const { container } = render(
      <Dropdown
        label="Test Label"
        error="This is an error"
        options={mockOptions}
        registration={createRegistration('test')}
      />
    );

    const select = container.querySelector('select');
    expect(select).toHaveClass('border-red-500', 'focus:border-red-500');
  });

  it('applies default styles when no error', () => {
    const { container } = render(
      <Dropdown
        label="Test Label"
        options={mockOptions}
        registration={createRegistration('test')}
      />
    );

    const select = container.querySelector('select');
    expect(select).toHaveClass('border-gray-300', 'focus:border-primary');
  });

  it('uses registration name for select id when id is not provided', () => {
    render(
      <Dropdown
        label="Test Label"
        options={mockOptions}
        registration={createRegistration('myField')}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'myField');
  });

  it('shows chevron icon when not disabled', () => {
    const { container } = render(
      <Dropdown
        label="Test Label"
        options={mockOptions}
        registration={createRegistration('test')}
      />
    );

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('hides chevron icon when disabled', () => {
    const { container } = render(
      <Dropdown
        label="Test Label"
        options={mockOptions}
        registration={createRegistration('test')}
        disabled={true}
      />
    );

    const icon = container.querySelector('svg');
    expect(icon).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Dropdown
        label="Test Label"
        options={mockOptions}
        registration={createRegistration('test')}
        className="custom-class"
      />
    );

    const select = container.querySelector('select');
    expect(select).toHaveClass('custom-class');
  });

  it('handles selection change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Dropdown
        label="Test Label"
        options={mockOptions}
        registration={createRegistration('test', handleChange)}
      />
    );

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'option1');

    expect(handleChange).toHaveBeenCalled();
  });
});
