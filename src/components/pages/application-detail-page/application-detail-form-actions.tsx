'use client';

import { memo } from 'react';
import { useFormState } from 'react-hook-form';
import { Button } from '@/components/common';
import type { CreateApplicationRequestValues } from '@/forms/create-application/create-application-validation';

export const ApplicationDetailFormActions = memo(function ApplicationDetailFormActionsComponent({
  isEditing,
  onCloseEdit,
}: {
  isEditing: boolean;
  onCloseEdit: () => void;
}) {
  const { isSubmitting } = useFormState<CreateApplicationRequestValues>();

  if (!isEditing) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <Button text="Close" variant="secondary" onClick={onCloseEdit} disabled={isSubmitting} />
      <Button
        text={isSubmitting ? 'Submitting...' : 'Submit'}
        variant="primary"
        type="submit"
        disabled={isSubmitting}
      />
    </div>
  );
});
