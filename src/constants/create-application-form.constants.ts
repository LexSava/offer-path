import { CreateApplicationFormInputValues } from '@/forms';
import type { DefaultValues } from 'react-hook-form';

export const createApplicationFormDefaultValues: DefaultValues<CreateApplicationFormInputValues> = {
  id: undefined,
  position: '',
  company: '',
  specialization: '',
  grade: '',
  mainStack: '',
  salary: '',
  currency: '',
  period: '',
  contract: '',
  url: '',
  notes: '',
  status: 'Applied',
  isFavorite: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  userId: undefined,
  email: undefined,
};
