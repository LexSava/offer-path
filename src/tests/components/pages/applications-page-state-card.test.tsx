import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Star } from 'lucide-react';
import { ApplicationsPageStateCard } from '@/components/pages';

describe('ApplicationsPageStateCard', () => {
  it('renders message and action content', () => {
    render(
      <ApplicationsPageStateCard
        message="State message"
        actionTitle="Action title"
        actionDescription="Action description"
        onAction={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: 'State message' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /action title/i })).toBeInTheDocument();
    expect(screen.getByText('Action description')).toBeInTheDocument();
  });

  it('calls onAction when action card is clicked', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <ApplicationsPageStateCard
        message="State message"
        actionTitle="Action title"
        actionDescription="Action description"
        onAction={onAction}
      />,
    );

    await user.click(screen.getByRole('button', { name: /action title/i }));

    expect(onAction).toHaveBeenCalledOnce();
  });

  it('uses full-width wrapper for action card', () => {
    render(
      <ApplicationsPageStateCard
        message="State message"
        actionTitle="Action title"
        actionDescription="Action description"
        onAction={vi.fn()}
      />,
    );

    const button = screen.getByRole('button', { name: /action title/i });
    const wrapper = button.parentElement;

    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('w-full');
    expect(wrapper?.className).toContain('[&_button]:w-full');
  });

  it('renders provided custom icon', () => {
    render(
      <ApplicationsPageStateCard
        message="State message"
        actionTitle="Action title"
        actionDescription="Action description"
        onAction={vi.fn()}
        icon={<Star data-testid="custom-action-icon" size={24} />}
      />,
    );

    expect(screen.getByTestId('custom-action-icon')).toBeInTheDocument();
  });
});
