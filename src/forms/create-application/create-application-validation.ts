import { z } from 'zod';
import type {
  ContractType,
  CurrencyType,
  GradeType,
  SpecializationType,
  PeriodType,
} from '@/types';
import {
  contractOptions,
  currencyOptions,
  gradeOptions,
  periodOptions,
  specializationOptions,
  statusOptions,
} from '@/constants/application-options.constants';

const requiredDigitsString = z
  .string()
  .min(1, 'Salary is required')
  .refine((value) => /^\d+$/.test(value), { message: 'Salary must contain only digits' });

const optionalUrl = z
  .string()
  .optional()
  .refine((value) => !value || /^https?:\/\/.+/i.test(value), {
    message: 'URL must start with http:// or https://',
  });

const requiredSpecialization = z
  .union([z.enum(specializationOptions), z.literal('')])
  .refine((value) => value !== '', { message: 'Please choose specialization' })
  .transform((value) => value as SpecializationType);

const requiredGrade = z
  .union([z.enum(gradeOptions), z.literal('')])
  .refine((value) => value !== '', { message: 'Please choose grade' })
  .transform((value) => value as GradeType);

const requiredContract = z
  .union([z.enum(contractOptions), z.literal('')])
  .refine((value) => value !== '', { message: 'Please choose contract' })
  .transform((value) => value as ContractType);

const requiredCurrency = z
  .union([z.enum(currencyOptions), z.literal('')])
  .refine((value) => value !== '', { message: 'Please choose currency' })
  .transform((value) => value as CurrencyType);

const requiredPeriod = z
  .union([z.enum(periodOptions), z.literal('')])
  .refine((value) => value !== '', { message: 'Please choose period' })
  .transform((value) => value as PeriodType);

export const createApplicationValidationSchema = z.object({
  id: z.string().optional(),
  position: z.string().min(1, 'Position is required'),
  specialization: requiredSpecialization,
  grade: requiredGrade,
  mainStack: z.string().min(1, 'Please choose a technology'),
  salary: requiredDigitsString,
  currency: requiredCurrency,
  period: requiredPeriod,
  contract: requiredContract,
  url: optionalUrl,
  notes: z.string().optional(),
  status: z.enum(statusOptions, { message: 'Status is required' }),
  isFavorite: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.string().optional(),
  email: z.string().optional(),
});

export type CreateApplicationFormInputValues = z.input<typeof createApplicationValidationSchema>;
export type CreateApplicationFormValues = z.infer<typeof createApplicationValidationSchema>;
