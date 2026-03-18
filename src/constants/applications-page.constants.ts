import type { SortOption } from './applications-sorting.constants';

export const APPLICATIONS_PAGE_DEFAULT_SORT_OPTION: SortOption = 'created_desc';

export const APPLICATIONS_PAGE_HEADER_TEXT = {
  backLinkText: 'Home page',
  title: 'My Applications',
} as const;

export const APPLICATIONS_PAGE_MESSAGES = {
  unauthorized: 'This page contains all your saved applications for tracking',
  empty:
    'No Applications Found. Create your first application to start tracking',
} as const;

export const APPLICATIONS_PAGE_ACTIONS = {
  login: {
    title: 'Login to Start Tracking',
    description: 'Sign in to create and manage your applications',
  },
  add: {
    title: 'Add Application',
    description: 'Track a new job application',
  },
} as const;

export const APPLICATIONS_PAGE_LIST_TEXT = {
  loading: 'Loading applications...',
  noApplications: 'No applications found.',
  noSearchMatches: 'No applications match your search.',
} as const;