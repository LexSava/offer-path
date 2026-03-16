import type { FormFieldConfig } from '@/types';
import { handleSalaryInput, toSelectOptions } from '@/utils/forms';
import {
  contractOptions,
  currencyOptions,
  gradeOptions,
  periodOptions,
  specializationOptions,
  stackOptions,
  statusOptions,
} from './application-options.constants';
import { CreateApplicationFormValues, CreateApplicationRequestValues } from '@/forms';

export const salaryRegistrationOptions = {
  setValueAs: (value: unknown) => (typeof value === 'string' ? value.replace(/\D/g, '') : value),
};

export const selectOptions = {
  specialization: toSelectOptions(specializationOptions),
  grade: toSelectOptions(gradeOptions),
  mainStack: toSelectOptions(stackOptions),
  currency: toSelectOptions(currencyOptions),
  period: toSelectOptions(periodOptions),
  contract: toSelectOptions(contractOptions),
  status: toSelectOptions(statusOptions),
};

export const createApplicationFieldsConfig = [
  { type: 'input', name: 'position', label: 'Position', placeholder: 'Enter position title' },
  { type: 'input', name: 'company', label: 'Company', placeholder: 'Enter company name' },
  {
    type: 'dropdown',
    name: 'specialization',
    label: 'Specialization',
    placeholder: 'Choose specialization (backend, frontend, etc.)',
    options: selectOptions.specialization,
  },
  {
    type: 'dropdown',
    name: 'grade',
    label: 'Grade',
    placeholder: 'Choose grade (senior, middle, junior, etc.)',
    options: selectOptions.grade,
  },
  {
    type: 'dropdown',
    name: 'mainStack',
    label: 'Main Stack',
    placeholder: 'Choose main technology stack',
    options: selectOptions.mainStack,
  },
  {
    type: 'input',
    name: 'salary',
    label: 'Salary',
    placeholder: 'Enter salary amount',
    registrationOptions: salaryRegistrationOptions,
    inputMode: 'numeric',
    pattern: '[0-9]*',
    onInput: handleSalaryInput,
  },
  {
    type: 'dropdown',
    name: 'currency',
    label: 'Currency',
    placeholder: 'Select currency of salary',
    options: selectOptions.currency,
  },
  {
    type: 'dropdown',
    name: 'period',
    label: 'Period',
    placeholder: 'Select period of salary',
    options: selectOptions.period,
  },
  {
    type: 'dropdown',
    name: 'contract',
    label: 'Contract',
    placeholder: 'Choose contract type',
    options: selectOptions.contract,
  },
  {
    type: 'input',
    name: 'url',
    label: 'URL',
    placeholder: 'Enter URL to job posting or company website',
  },
  {
    type: 'textarea',
    name: 'notes',
    label: 'Notes',
    placeholder:
      'Enter notes details about the application (achievements, interview feedback, etc.)',
    rows: 2,
    maxCharacters: 500,
  },
  { type: 'dropdown', name: 'status', label: 'Status', options: selectOptions.status },
] as const satisfies ReadonlyArray<FormFieldConfig<CreateApplicationFormValues>>;

export const applicationDetailFieldsConfig = [
  {
    type: 'input',
    name: 'position',
    label: 'Position',
    placeholder: 'Enter position title',
    readOnlyWhenNotEditing: true,
  },
  {
    type: 'input',
    name: 'company',
    label: 'Company',
    placeholder: 'Enter company name',
    readOnlyWhenNotEditing: true,
  },
  {
    type: 'dropdown',
    name: 'specialization',
    label: 'Specialization',
    placeholder: 'Select specialization (backend, frontend, etc.)',
    options: selectOptions.specialization,
  },
  {
    type: 'dropdown',
    name: 'grade',
    label: 'Grade',
    placeholder: 'Select grade (senior, middle, junior, etc.)',
    options: selectOptions.grade,
  },
  {
    type: 'dropdown',
    name: 'mainStack',
    label: 'Main Stack',
    placeholder: 'Select main technology stack',
    options: selectOptions.mainStack,
  },
  {
    type: 'input',
    name: 'salary',
    label: 'Salary',
    placeholder: 'Enter salary amount',
    readOnlyWhenNotEditing: true,
    inputMode: 'numeric',
    pattern: '[0-9]*',
    onInput: handleSalaryInput,
  },
  {
    type: 'dropdown',
    name: 'currency',
    label: 'Currency',
    placeholder: 'Select currency of salary',
    options: selectOptions.currency,
  },
  {
    type: 'dropdown',
    name: 'period',
    label: 'Period',
    placeholder: 'Select period of salary',
    options: selectOptions.period,
  },
  {
    type: 'dropdown',
    name: 'contract',
    label: 'Contract',
    placeholder: 'Select contract type',
    options: selectOptions.contract,
  },
  {
    type: 'dropdown',
    name: 'status',
    label: 'Status',
    placeholder: 'Select current status of application',
    options: selectOptions.status,
  },
  {
    type: 'input',
    name: 'url',
    label: 'URL',
    placeholder: 'Enter URL to job posting or company website',
    readOnlyWhenNotEditing: true,
    className: 'sm:col-span-2',
  },
  {
    type: 'textarea',
    name: 'notes',
    label: 'Notes',
    placeholder:
      'Enter notes details about the application (achievements, interview feedback, etc.)',
    rows: 4,
    maxCharacters: 500,
    className: 'sm:col-span-2',
  },
] as const satisfies ReadonlyArray<FormFieldConfig<CreateApplicationRequestValues>>;
