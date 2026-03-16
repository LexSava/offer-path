'use client';

import { memo } from 'react';

export const ApplicationDetailSubmitError = memo(function ApplicationDetailSubmitErrorComponent({
  submitError,
}: {
  submitError: string | null;
}) {
  return submitError ? <p className="text-sm text-red-600">{submitError}</p> : null;
});
