'use client';

import { memo } from 'react';
import { FormField } from '@/components/common';
import { applicationDetailFieldsConfig } from '@/constants';
import type { IApplicationDetailFormFieldsProps } from '@/types';
import type { CreateApplicationRequestValues } from '@/forms/create-application/create-application-validation';
import { formatCompensation, formatDate } from '@/utils/forms';

const ApplicationDetailStaticMeta = memo(function ApplicationDetailStaticMetaComponent({
  resolvedApplication,
}: Pick<IApplicationDetailFormFieldsProps, 'resolvedApplication'>) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-start gap-1.5">
        <p className="text-sm font-medium text-gray-700">Compensation:</p>
        <p className="text-secondary text-sm">{formatCompensation(resolvedApplication)}</p>
      </div>
      <div className="flex w-full items-start gap-1.5">
        <p className="text-sm font-medium text-gray-700">Created Date:</p>
        <p className="text-secondary text-sm">{formatDate(resolvedApplication.createdAt)}</p>
      </div>
      <div className="flex w-full items-start gap-1.5">
        <p className="text-sm font-medium text-gray-700">Last Updated Date:</p>
        <p className="text-secondary text-sm">{formatDate(resolvedApplication.updatedAt)}</p>
      </div>
    </div>
  );
});

export const ApplicationDetailFormFields = memo(function ApplicationDetailFormFields({
  resolvedApplication,
  isEditing,
}: IApplicationDetailFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {applicationDetailFieldsConfig.map((field) => (
          <FormField<CreateApplicationRequestValues>
            key={field.name}
            {...field}
            isEditing={isEditing}
          />
        ))}
      </div>

      <ApplicationDetailStaticMeta resolvedApplication={resolvedApplication} />
    </>
  );
});
