import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationCard } from '@/components/common/application-card/application-card';
import type { IApplication } from '@/types';

vi.mock('@/contexts', () => ({
  useApplicationIsFavoriteById: () => false,
  useApplications: () => ({
    setApplicationFavoriteState: vi.fn(),
  }),
}));

const mockApplication: IApplication = {
  id: '1',
  position: 'Senior Engineer',
  specialization: 'Backend',
  mainStack: 'Node',
  grade: 'Senior',
  salary: 150000,
  currency: 'USD',
  company: 'TechCorp',
  contract: 'B2B',
  status: 'Applied',
  url: 'https://example.com',
  isFavorite: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 'user-1',
};

describe('ApplicationCard', () => {
  it('renders application position', () => {
    render(<ApplicationCard application={mockApplication} />);

    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
  });

  it('renders application specialization', () => {
    render(<ApplicationCard application={mockApplication} />);

    expect(screen.getByText('Backend')).toBeInTheDocument();
  });

  it('renders company name', () => {
    render(<ApplicationCard application={mockApplication} />);

    expect(screen.getByText('TechCorp')).toBeInTheDocument();
  });

  it('renders grade', () => {
    render(<ApplicationCard application={mockApplication} />);

    expect(screen.getByText('Senior')).toBeInTheDocument();
  });

  it('renders main stack', () => {
    render(<ApplicationCard application={mockApplication} />);

    expect(screen.getByText('Node')).toBeInTheDocument();
  });

  it('renders contract type', () => {
    render(<ApplicationCard application={mockApplication} />);

    expect(screen.getByText('B2B')).toBeInTheDocument();
  });

  it('renders status', () => {
    render(<ApplicationCard application={mockApplication} />);

    expect(screen.getByText('Applied')).toBeInTheDocument();
  });

  it('renders as article element', () => {
    const { container } = render(<ApplicationCard application={mockApplication} />);

    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ApplicationCard application={mockApplication} onClick={handleClick} />);

    const card = screen.getByRole('button', { name: /open application senior engineer/i });
    await user.click(card);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('has interactive styling when onClick is provided', () => {
    const { container } = render(
      <ApplicationCard application={mockApplication} onClick={vi.fn()} />,
    );

    const card = container.querySelector('article');
    expect(card).toHaveClass('cursor-pointer');
  });

  it('renders favorite button', () => {
    const { container } = render(<ApplicationCard application={mockApplication} />);

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('highlights query matches', () => {
    render(<ApplicationCard application={mockApplication} highlightQuery="engineer" />);

    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toHaveClass('bg-yellow-200');
  });

  it('renders with custom className', () => {
    const { container } = render(
      <ApplicationCard application={mockApplication} className="custom-class" />,
    );

    const card = container.querySelector('article');
    expect(card).toHaveClass('custom-class');
  });
});
