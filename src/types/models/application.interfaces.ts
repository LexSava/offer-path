import type {
  ContractType,
  CurrencyType,
  GradeType,
  OppositionType,
  PeriodType,
  StackType,
  StatusType,
} from './application.types';

export interface IApplication {
  id: string;
  position: string;
  opposition: OppositionType;
  grade: GradeType;
  mainStack: StackType[];
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
