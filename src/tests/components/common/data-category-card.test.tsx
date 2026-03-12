import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataCategoryCard } from '@/components/common/data-category-card/data-category-card';
import { Plus } from 'lucide-react';

describe('DataCategoryCard', () => {
  const mockFields = ['Field 1', 'Field 2', 'Field 3'];

  it('renders title', () => {
    render(<DataCategoryCard icon={Plus} title="Test Category" fields={mockFields} />);

    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('renders all fields', () => {
    render(<DataCategoryCard icon={Plus} title="Test Category" fields={mockFields} />);

    mockFields.forEach((field) => {
      expect(screen.getByText(field)).toBeInTheDocument();
    });
  });

  it('renders icon', () => {
    const { container } = render(
      <DataCategoryCard icon={Plus} title="Test Category" fields={mockFields} />,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders as article element', () => {
    const { container } = render(
      <DataCategoryCard icon={Plus} title="Test Category" fields={mockFields} />,
    );

    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('renders fields as list items', () => {
    const { container } = render(
      <DataCategoryCard icon={Plus} title="Test Category" fields={mockFields} />,
    );

    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toBe(mockFields.length);
  });

  it('applies correct classes to fields', () => {
    const { container } = render(
      <DataCategoryCard icon={Plus} title="Test Category" fields={mockFields} />,
    );

    const listItems = container.querySelectorAll('li');
    listItems.forEach((item) => {
      expect(item).toHaveClass('text-secondary', 'text-sm');
    });
  });

  it('renders with border and padding', () => {
    const { container } = render(
      <DataCategoryCard icon={Plus} title="Test Category" fields={mockFields} />,
    );

    const article = container.querySelector('article');
    expect(article).toHaveClass('bg-surface', 'border-2', 'p-6');
  });

  it('handles empty fields array', () => {
    render(<DataCategoryCard icon={Plus} title="Test Category" fields={[]} />);

    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });
});
