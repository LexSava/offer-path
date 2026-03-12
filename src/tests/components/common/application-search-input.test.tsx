import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationSearchInput } from '@/components/common/application-search-input/application-search-input';

describe('ApplicationSearchInput', () => {
  it('renders search input', () => {
    render(<ApplicationSearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders search label', () => {
    render(<ApplicationSearchInput value="" onChange={vi.fn()} />);

    expect(screen.getByText('Search applications')).toBeInTheDocument();
  });

  it('renders search icon', () => {
    const { container } = render(<ApplicationSearchInput value="" onChange={vi.fn()} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(<ApplicationSearchInput value="" onChange={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search applications...');
    expect(input).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(<ApplicationSearchInput value="test search" onChange={vi.fn()} />);

    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('test search');
  });

  it('calls onChange when text is entered', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ApplicationSearchInput value="" onChange={handleChange} />);

    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalledTimes(4);
    expect(handleChange).toHaveBeenNthCalledWith(1, 't');
    expect(handleChange).toHaveBeenNthCalledWith(2, 'e');
    expect(handleChange).toHaveBeenNthCalledWith(3, 's');
    expect(handleChange).toHaveBeenNthCalledWith(4, 't');
  });

  it('updates value on input change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { rerender } = render(<ApplicationSearchInput value="" onChange={handleChange} />);

    const input = screen.getByRole('searchbox');
    await user.type(input, 't');

    expect(handleChange).toHaveBeenCalledWith('t');

    rerender(<ApplicationSearchInput value="t" onChange={handleChange} />);

    expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('t');
  });

  it('has correct input type', () => {
    render(<ApplicationSearchInput value="" onChange={vi.fn()} />);

    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('type', 'search');
  });

  it('renders with custom styling', () => {
    const { container } = render(<ApplicationSearchInput value="" onChange={vi.fn()} />);

    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveClass('relative', 'w-full');
  });
});
