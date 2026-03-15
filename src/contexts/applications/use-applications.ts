'use client';

import { useContext } from 'react';
import { ApplicationsActionsContext } from './applications-context';

export function useApplications() {
  const context = useContext(ApplicationsActionsContext);

  if (!context) {
    throw new Error('useApplications must be used within ApplicationsProvider');
  }

  return context;
}
