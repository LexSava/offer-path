import type {
  ContractType,
  CurrencyType,
  GradeType,
  PeriodType,
  SpecializationType,
  StackType,
  StatusType,
} from '@/types';

export const specializationOptions = [
  'Frontend',
  'Fullstack',
  'Backend',
  'Other',
] as const satisfies readonly SpecializationType[];

export const gradeOptions = [
  'Junior',
  'Middle',
  'Middle+',
  'Senior',
  'Team Lead',
] as const satisfies readonly GradeType[];

export const stackOptions = [
  'Angular',
  'React | Next.js',
  'Vue',
  'Node',
  'Other',
] as const satisfies readonly StackType[];

export const currencyOptions = ['PLN', 'EUR', 'USD'] as const satisfies readonly CurrencyType[];

export const periodOptions = ['hour', 'month', 'year'] as const satisfies readonly PeriodType[];

export const contractOptions = [
  'B2B',
  'B2B Incubator',
  'Umowa o pracę',
  'Other',
] as const satisfies readonly ContractType[];

export const statusOptions = [
  'Applied',
  'Auto Confirmation',
  'Contacted HR',
  'Prescreening',
  'Technical Interview',
  'Offer',
  'Rejected',
] as const satisfies readonly StatusType[];
