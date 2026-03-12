'use client';

import { Dropdown, Input, Textarea } from '@/components/common';
import {
  contractOptions,
  currencyOptions,
  gradeOptions,
  periodOptions,
  specializationOptions,
  stackOptions,
  statusOptions,
} from '@/constants/application-options.constants';
import type { IApplicationDetailFormFieldsProps } from '@/types';
import { formatDate, toSelectOptions } from '@/utils';
import { formatCompensation } from './application-detail.utils';

export function ApplicationDetailFormFields({
  resolvedApplication,
  isEditing,
  register,
  errors,
}: IApplicationDetailFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          label="Position"
          placeholder="Enter position title"
          registration={register('position')}
          error={errors.position?.message}
          disabled={!isEditing}
          readOnly={!isEditing}
        />
        <Input
          label="Company"
          placeholder="Enter company name"
          registration={register('company')}
          error={errors.company?.message}
          disabled={!isEditing}
          readOnly={!isEditing}
        />
        <Dropdown
          label="Specialization"
          placeholder="Select specialization (backend, frontend, etc.)"
          options={toSelectOptions(specializationOptions)}
          registration={register('specialization')}
          error={errors.specialization?.message}
          disabled={!isEditing}
        />
        <Dropdown
          label="Grade"
          placeholder="Select grade (senior, middle, junior, etc.)"
          options={toSelectOptions(gradeOptions)}
          registration={register('grade')}
          error={errors.grade?.message}
          disabled={!isEditing}
        />
        <Dropdown
          label="Main Stack"
          placeholder="Select main technology stack"
          options={toSelectOptions(stackOptions)}
          registration={register('mainStack')}
          error={errors.mainStack?.message}
          disabled={!isEditing}
        />
        <Input
          label="Salary"
          placeholder="Enter salary amount"
          registration={register('salary')}
          error={errors.salary?.message}
          disabled={!isEditing}
          readOnly={!isEditing}
          inputMode="numeric"
          pattern="[0-9]*"
          onInput={(event) => {
            event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '');
          }}
        />
        <Dropdown
          label="Currency"
          placeholder="Select currency of salary"
          options={toSelectOptions(currencyOptions)}
          registration={register('currency')}
          error={errors.currency?.message}
          disabled={!isEditing}
        />
        <Dropdown
          label="Period"
          placeholder="Select period of salary"
          options={toSelectOptions(periodOptions)}
          registration={register('period')}
          error={errors.period?.message}
          disabled={!isEditing}
        />
        <Dropdown
          label="Contract"
          placeholder="Select contract type"
          options={toSelectOptions(contractOptions)}
          registration={register('contract')}
          error={errors.contract?.message}
          disabled={!isEditing}
        />
        <Dropdown
          label="Status"
          placeholder="Select current status of application"
          options={toSelectOptions(statusOptions)}
          registration={register('status')}
          error={errors.status?.message}
          disabled={!isEditing}
        />

        <Input
          label="URL"
          placeholder="Enter URL to job posting or company website"
          registration={register('url')}
          error={errors.url?.message}
          disabled={!isEditing}
          readOnly={!isEditing}
          className="sm:col-span-2"
        />
        <Textarea
          label="Notes"
          placeholder="Enter notes details about the application (achievements, interview feedback, etc.)"
          rows={4}
          maxCharacters={500}
          registration={register('notes')}
          error={errors.notes?.message}
          disabled={!isEditing}
          className="sm:col-span-2"
        />
      </div>

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
    </>
  );
}
