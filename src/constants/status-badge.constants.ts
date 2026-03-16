import type { StatusType } from '@/types';

export const statusConfig: Record<StatusType, { color: string; bgColor: string }> = {
  Applied: {
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
  },
  'Auto Confirmation': {
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
  },
  'Contacted HR': {
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
  },
  Prescreening: {
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  'Technical Interview': {
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.1)',
  },
  Offer: {
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.1)',
  },
  Rejected: {
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
  },
};
