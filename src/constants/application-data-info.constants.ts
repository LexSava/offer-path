import { Briefcase, DollarSign, FileText } from 'lucide-react';
import type { IDataCategoryCardProps } from '@/types';

export const APPLICATION_DATA_INFO_CATEGORIES: IDataCategoryCardProps[] = [
  {
    icon: Briefcase,
    title: 'Position Details',
    fields: [
      'Job Position & Title',
      'Specialization (Frontend, Backend, Fullstack)',
      'Grade Level (Junior to Team Lead)',
      'Main Technology Stack',
    ],
  },
  {
    icon: DollarSign,
    title: 'Compensation',
    fields: [
      'Salary Expectations',
      'Currency (PLN, EUR, USD)',
      'Payment Period (hourly, monthly, yearly)',
      'Contract Type (B2B, Umowa o pracę)',
    ],
  },
  {
    icon: FileText,
    title: 'Additional Information',
    fields: [
      'Job Posting URL',
      'Personal Notes & Comments',
      'Application Status',
      'Mark as Favorite',
    ],
  },
];
