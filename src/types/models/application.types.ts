export type SpecializationType = 'Frontend' | 'Fullstack' | 'Backend' | 'Other';

export type GradeType = 'Junior' | 'Middle' | 'Middle+' | 'Senior' | 'Team Lead';

export type StackType = 'Angular' | 'React | Next.js' | 'Vue' | 'Node' | 'Other';

export type CurrencyType = 'PLN' | 'EUR' | 'USD';

export type PeriodType = 'hour' | 'month' | 'year';

export type ContractType = 'B2B' | 'B2B Incubator' | 'Umowa o pracę' | 'Other';

export type StatusType =
  | 'Applied'
  | 'Auto Confirmation'
  | 'Contacted HR'
  | 'Prescreening'
  | 'Technical Interview'
  | 'Offer'
  | 'Rejected';

export interface IApplication {
  id: string;
  position: string;
  specialization: SpecializationType;
  grade: GradeType;
  mainStack: StackType;
  salary?: number;
  currency?: CurrencyType;
  period?: PeriodType;
  contract: ContractType;
  url?: string;
  notes?: string;
  status: StatusType;
  isFavorite?: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
