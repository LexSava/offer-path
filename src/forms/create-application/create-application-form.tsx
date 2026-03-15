'use client';

import { FormEvent, memo } from 'react';
import { FormProvider, useFormContext, useFormState } from 'react-hook-form';
import { Dropdown, Input, Textarea } from '@/components/common';
import { Button } from '@/components/common';
import { toSelectOptions } from '@/utils';
import { type CreateApplicationFormValues } from './create-application-validation';
import {
  contractOptions,
  currencyOptions,
  gradeOptions,
  periodOptions,
  specializationOptions,
  stackOptions,
  statusOptions,
} from '@/constants/application-options.constants';
import type { ICreateApplicationFormProps } from '@/types';
import {
  useCreateApplicationForm,
  useRegisterWithInstantErrorClear,
} from './use-create-application-form';

const specializationSelectOptions = toSelectOptions(specializationOptions);
const gradeSelectOptions = toSelectOptions(gradeOptions);
const stackSelectOptions = toSelectOptions(stackOptions);
const currencySelectOptions = toSelectOptions(currencyOptions);
const periodSelectOptions = toSelectOptions(periodOptions);
const contractSelectOptions = toSelectOptions(contractOptions);
const statusSelectOptions = toSelectOptions(statusOptions);
const salaryRegistrationOptions = {
  setValueAs: (value: unknown) => (typeof value === 'string' ? value.replace(/\D/g, '') : value),
};

function handleSalaryInput(event: FormEvent<HTMLInputElement>) {
  event.currentTarget.value = event.currentTarget.value.replace(/\D/g, '');
}

const CreateApplicationFieldsSection = memo(function CreateApplicationFieldsSectionComponent() {
  return (
    <>
      <PositionField />
      <CompanyField />
      <SpecializationField />
      <GradeField />
      <MainStackField />
      <SalaryField />
      <CurrencyField />
      <PeriodField />
      <ContractField />
      <UrlField />
      <NotesField />
      <StatusField />
    </>
  );
});

const CreateApplicationRootError = memo(function CreateApplicationRootErrorComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control });

  return errors.root?.message ? (
    <p className="text-sm text-red-600">{errors.root.message}</p>
  ) : null;
});

const CreateApplicationSubmitActions = memo(function CreateApplicationSubmitActionsComponent({
  onClose,
}: {
  onClose: () => void;
}) {
  const { isSubmitting } = useFormState<CreateApplicationFormValues>();

  return (
    <div className="mt-2 flex items-center justify-end gap-3">
      <Button text="Close" variant="secondary" onClick={onClose} disabled={isSubmitting} />
      <Button
        text={isSubmitting ? 'Submitting...' : 'Submit'}
        variant="primary"
        type="submit"
        disabled={isSubmitting}
      />
    </div>
  );
});

const PositionField = memo(function PositionFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'position' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Input
      label="Position"
      placeholder="Enter position title"
      registration={registerField('position')}
      error={errors.position?.message}
    />
  );
});

const CompanyField = memo(function CompanyFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'company' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Input
      label="Company"
      placeholder="Enter company name"
      registration={registerField('company')}
      error={errors.company?.message}
    />
  );
});

const SpecializationField = memo(function SpecializationFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'specialization' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Dropdown
      label="Specialization"
      placeholder="Choose specialization (backend, frontend, etc.)"
      options={specializationSelectOptions}
      registration={registerField('specialization')}
      error={errors.specialization?.message}
    />
  );
});

const GradeField = memo(function GradeFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'grade' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Dropdown
      label="Grade"
      placeholder="Choose grade (senior, middle, junior, etc.)"
      options={gradeSelectOptions}
      registration={registerField('grade')}
      error={errors.grade?.message}
    />
  );
});

const MainStackField = memo(function MainStackFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'mainStack' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Dropdown
      label="Main Stack"
      placeholder="Choose main technology stack"
      options={stackSelectOptions}
      registration={registerField('mainStack')}
      error={errors.mainStack?.message}
    />
  );
});

const SalaryField = memo(function SalaryFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'salary' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Input
      label="Salary"
      placeholder="Enter salary amount"
      registration={registerField('salary', salaryRegistrationOptions)}
      error={errors.salary?.message}
      inputMode="numeric"
      pattern="[0-9]*"
      onInput={handleSalaryInput}
    />
  );
});

const CurrencyField = memo(function CurrencyFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'currency' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Dropdown
      label="Currency"
      placeholder="Select currency of salary"
      options={currencySelectOptions}
      registration={registerField('currency')}
      error={errors.currency?.message}
    />
  );
});

const PeriodField = memo(function PeriodFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'period' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Dropdown
      label="Period"
      placeholder="Select period of salary"
      options={periodSelectOptions}
      registration={registerField('period')}
      error={errors.period?.message}
    />
  );
});

const ContractField = memo(function ContractFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'contract' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Dropdown
      label="Contract"
      placeholder="Choose contract type"
      options={contractSelectOptions}
      registration={registerField('contract')}
      error={errors.contract?.message}
    />
  );
});

const UrlField = memo(function UrlFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'url' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Input
      label="URL"
      placeholder="Enter URL to job posting or company website"
      registration={registerField('url')}
      error={errors.url?.message}
    />
  );
});

const NotesField = memo(function NotesFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'notes' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Textarea
      label="Notes"
      placeholder="Enter notes details about the application (achievements, interview feedback, etc.)"
      rows={2}
      maxCharacters={500}
      registration={registerField('notes')}
      error={errors.notes?.message}
    />
  );
});

const StatusField = memo(function StatusFieldComponent() {
  const { control } = useFormContext<CreateApplicationFormValues>();
  const { errors } = useFormState<CreateApplicationFormValues>({ control, name: 'status' });
  const registerField = useRegisterWithInstantErrorClear();

  return (
    <Dropdown
      label="Status"
      options={statusSelectOptions}
      registration={registerField('status')}
      error={errors.status?.message}
    />
  );
});

export function CreateApplicationForm({ isOpen, onClose }: ICreateApplicationFormProps) {
  const { methods, onSubmit } = useCreateApplicationForm({ isOpen, onClose });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <CreateApplicationFieldsSection />
        <CreateApplicationRootError />
        <CreateApplicationSubmitActions onClose={onClose} />
      </form>
    </FormProvider>
  );
}
