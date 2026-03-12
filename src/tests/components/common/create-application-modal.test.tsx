import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CreateApplicationModal } from '@/components/common/modals/create-application-modal';

const createApplicationFormSpy = vi.fn();

vi.mock('@/forms', () => ({
  CreateApplicationForm: (props: { isOpen: boolean; onClose: () => void }) => {
    createApplicationFormSpy(props);

    return (
      <div data-testid="create-application-form" data-open={String(props.isOpen)}>
        mocked-create-application-form
      </div>
    );
  },
}));

describe('CreateApplicationModal', () => {
  it('does not render when closed', () => {
    const onClose = vi.fn();
    const { container } = render(<CreateApplicationModal isOpen={false} onClose={onClose} />);

    expect(container.firstChild).toBeNull();
    expect(screen.queryByText('Create Application')).not.toBeInTheDocument();
  });

  it('renders title, subtitle and form when open', () => {
    const onClose = vi.fn();
    render(<CreateApplicationModal isOpen={true} onClose={onClose} />);

    expect(screen.getByText('Create Application')).toBeInTheDocument();
    expect(screen.getByText('Application')).toBeInTheDocument();
    expect(screen.getByTestId('create-application-form')).toBeInTheDocument();

    expect(createApplicationFormSpy).toHaveBeenCalled();
    const lastCallArgs = createApplicationFormSpy.mock.calls.at(-1)?.[0];
    expect(lastCallArgs).toMatchObject({
      isOpen: true,
      onClose,
    });
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<CreateApplicationModal isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape is pressed while open', () => {
    const onClose = vi.fn();
    render(<CreateApplicationModal isOpen={true} onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when modal is closed', () => {
    const onClose = vi.fn();
    render(<CreateApplicationModal isOpen={false} onClose={onClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });
});
