'use client';

import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { CreateApplicationRequestValues } from '@/forms/create-application/create-application-validation';
import type { IApplicationDetailPageFormProps } from '@/types';
import { ApplicationDetailContentHeader } from './application-detail-content-header';
import { ApplicationDetailFormActions } from './application-detail-form-actions';
import { ApplicationDetailFormFields } from './application-detail-form-fields';
import { ApplicationDetailSubmitError } from './application-detail-submit-error';

export const ApplicationDetailPageForm = memo(function ApplicationDetailPageFormComponent({
  resolvedApplication,
  isEditing,
  submitError,
  onSubmit,
  onDeleted,
  onStartEdit,
  onCloseEdit,
}: IApplicationDetailPageFormProps) {
  const { handleSubmit } = useFormContext<CreateApplicationRequestValues>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface flex flex-col gap-4 border border-gray-200 p-5 shadow-sm"
    >
      <ApplicationDetailContentHeader
        resolvedApplication={resolvedApplication}
        isEditing={isEditing}
        onDeleted={onDeleted}
        onStartEdit={onStartEdit}
      />

      <ApplicationDetailFormFields
        resolvedApplication={resolvedApplication}
        isEditing={isEditing}
      />

      <ApplicationDetailSubmitError submitError={submitError} />
      <ApplicationDetailFormActions isEditing={isEditing} onCloseEdit={onCloseEdit} />
    </form>
  );
});
