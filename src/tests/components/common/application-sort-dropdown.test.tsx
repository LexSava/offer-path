import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationSortDropdown } from '@/components/common/application-sort-dropdown/application-sort-dropdown';

describe('ApplicationSortDropdown', () => {
  it('renders sort label', () => {
    render(<ApplicationSortDropdown value="created_desc" onChange={vi.fn()} />);

    expect(screen.getByText('Sort applications')).toBeInTheDocument();
  });

  it('renders sort options', () => {
    render(<ApplicationSortDropdown value="created_desc" onChange={vi.fn()} />);

    // Dropdown should have options available
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('displays current value selection', () => {
    render(<ApplicationSortDropdown value="created_desc" onChange={vi.fn()} />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('created_desc');
  });

  it('calls onChange when selection changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ApplicationSortDropdown value="created_desc" onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'updated_asc');
    expect(handleChange).toHaveBeenCalledWith('updated_asc');
  });

  it('renders as dropdown component', () => {
    const { container } = render(
      <ApplicationSortDropdown value="created_desc" onChange={vi.fn()} />,
    );

    const select = container.querySelector('select');
    expect(select).toBeInTheDocument();
  });

  it('has chevron icon', () => {
    const { container } = render(
      <ApplicationSortDropdown value="created_desc" onChange={vi.fn()} />,
    );

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
