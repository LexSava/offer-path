import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HighlightMatch } from '@/components/common/highlight-match/highlight-match';

describe('HighlightMatch', () => {
  it('renders text without query', () => {
    render(
      <HighlightMatch text="Test text" query="" />
    );

    expect(screen.getByText('Test text')).toBeInTheDocument();
  });

  it('renders text without highlight when no matches', () => {
    render(
      <HighlightMatch text="Test text" query="xyz" />
    );

    expect(screen.getByText('Test text')).toBeInTheDocument();
  });

  it('highlights matching text', () => {
    const { container } = render(
      <HighlightMatch text="Test text" query="test" />
    );

    const highlight = container.querySelector('span');
    expect(highlight).toBeInTheDocument();
    expect(highlight).toHaveClass('rounded', 'bg-yellow-200');
  });

  it('handles case-insensitive matching', () => {
    const { container } = render(
      <HighlightMatch text="Test TEXT" query="test" />
    );

    const highlights = container.querySelectorAll('span');
    expect(highlights.length).toBeGreaterThan(0);
  });

  it('highlights multiple occurrences', () => {
    const { container } = render(
      <HighlightMatch text="test test test" query="test" />
    );

    const highlights = container.querySelectorAll('span');
    expect(highlights.length).toBe(3);
  });

  it('applies custom highlight class name', () => {
    const { container } = render(
      <HighlightMatch
        text="Test text"
        query="test"
        highlightClassName="custom-highlight"
      />
    );

    const highlight = container.querySelector('span');
    expect(highlight).toHaveClass('custom-highlight');
  });

  it('preserves non-highlighted text', () => {
    const { container } = render(
      <HighlightMatch text="The test string" query="test" />
    );

    expect(container.textContent).toBe('The test string');
  });

  it('handles partial word matching', () => {
    const { container } = render(
      <HighlightMatch text="Testing tested" query="test" />
    );

    const highlights = container.querySelectorAll('span');
    expect(highlights.length).toBe(2);
  });
});
