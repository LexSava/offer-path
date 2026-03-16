'use client';

import { memo, type ComponentProps } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
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
import type { CreateApplicationRequestValues } from '@/forms/create-application/create-application-validation';
import { formatDate, toSelectOptions } from '@/utils';
import { formatCompensation } from './application-detail.utils';

const specializationSelectOptions = toSelectOptions(specializationOptions);
const gradeSelectOptions = toSelectOptions(gradeOptions);
const stackSelectOptions = toSelectOptions(stackOptions);
const currencySelectOptions = toSelectOptions(currencyOptions);
const periodSelectOptions = toSelectOptions(periodOptions);
const contractSelectOptions = toSelectOptions(contractOptions);
const statusSelectOptions = toSelectOptions(statusOptions);

const handleSalaryInput: NonNullable<ComponentProps<'input'>['onInput']> = (event) => {
  event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '');
};

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

const PositionField = memo(function PositionField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'position' });

  return (
    <Input
      label="Position"
      placeholder="Enter position title"
      registration={register('position')}
      error={errors.position?.message}
      disabled={!isEditing}
      readOnly={!isEditing}
    />
  );
});

const CompanyField = memo(function CompanyField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'company' });

  return (
    <Input
      label="Company"
      placeholder="Enter company name"
      registration={register('company')}
      error={errors.company?.message}
      disabled={!isEditing}
      readOnly={!isEditing}
    />
  );
});

const SpecializationField = memo(function SpecializationField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({
    control,
    name: 'specialization',
  });

  return (
    <Dropdown
      label="Specialization"
      placeholder="Select specialization (backend, frontend, etc.)"
      options={specializationSelectOptions}
      registration={register('specialization')}
      error={errors.specialization?.message}
      disabled={!isEditing}
    />
  );
});

const GradeField = memo(function GradeField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'grade' });

  return (
    <Dropdown
      label="Grade"
      placeholder="Select grade (senior, middle, junior, etc.)"
      options={gradeSelectOptions}
      registration={register('grade')}
      error={errors.grade?.message}
      disabled={!isEditing}
    />
  );
});

const MainStackField = memo(function MainStackField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'mainStack' });

  return (
    <Dropdown
      label="Main Stack"
      placeholder="Select main technology stack"
      options={stackSelectOptions}
      registration={register('mainStack')}
      error={errors.mainStack?.message}
      disabled={!isEditing}
    />
  );
});

const SalaryField = memo(function SalaryField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'salary' });

  return (
    <Input
      label="Salary"
      placeholder="Enter salary amount"
      registration={register('salary')}
      error={errors.salary?.message}
      disabled={!isEditing}
      readOnly={!isEditing}
      inputMode="numeric"
      pattern="[0-9]*"
      onInput={handleSalaryInput}
    />
  );
});

const CurrencyField = memo(function CurrencyField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'currency' });

  return (
    <Dropdown
      label="Currency"
      placeholder="Select currency of salary"
      options={currencySelectOptions}
      registration={register('currency')}
      error={errors.currency?.message}
      disabled={!isEditing}
    />
  );
});

const PeriodField = memo(function PeriodField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'period' });

  return (
    <Dropdown
      label="Period"
      placeholder="Select period of salary"
      options={periodSelectOptions}
      registration={register('period')}
      error={errors.period?.message}
      disabled={!isEditing}
    />
  );
});

const ContractField = memo(function ContractField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'contract' });

  return (
    <Dropdown
      label="Contract"
      placeholder="Select contract type"
      options={contractSelectOptions}
      registration={register('contract')}
      error={errors.contract?.message}
      disabled={!isEditing}
    />
  );
});

const StatusField = memo(function StatusField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'status' });

  return (
    <Dropdown
      label="Status"
      placeholder="Select current status of application"
      options={statusSelectOptions}
      registration={register('status')}
      error={errors.status?.message}
      disabled={!isEditing}
    />
  );
});

const UrlField = memo(function UrlField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'url' });

  return (
    <Input
      label="URL"
      placeholder="Enter URL to job posting or company website"
      registration={register('url')}
      error={errors.url?.message}
      disabled={!isEditing}
      readOnly={!isEditing}
      className="sm:col-span-2"
    />
  );
});

const NotesField = memo(function NotesField({
  isEditing,
}: Pick<IApplicationDetailFormFieldsProps, 'isEditing'>) {
  const { register, control } = useFormContext<CreateApplicationRequestValues>();
  const { errors } = useFormState<CreateApplicationRequestValues>({ control, name: 'notes' });

  return (
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
  );
});

export const ApplicationDetailFormFields = memo(function ApplicationDetailFormFields({
  resolvedApplication,
  isEditing,
}: IApplicationDetailFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <PositionField isEditing={isEditing} />
        <CompanyField isEditing={isEditing} />
        <SpecializationField isEditing={isEditing} />
        <GradeField isEditing={isEditing} />
        <MainStackField isEditing={isEditing} />
        <SalaryField isEditing={isEditing} />
        <CurrencyField isEditing={isEditing} />
        <PeriodField isEditing={isEditing} />
        <ContractField isEditing={isEditing} />
        <StatusField isEditing={isEditing} />
        <UrlField isEditing={isEditing} />
        <NotesField isEditing={isEditing} />
      </div>

      <ApplicationDetailStaticMeta resolvedApplication={resolvedApplication} />
    </>
  );
});
