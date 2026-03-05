'use client';

import { useEffect } from 'react';
import { ApplicationCard, BackLink } from '@/components/common';
import { Container } from '@/components/layout';
import { AddNewApplicationButton } from '@/components/ui';
import { useApplications } from '@/contexts';

export default function ApplicationsPage() {
  const { applications, isLoading } = useApplications();

  useEffect(() => {
    console.log('Applications page data:', applications);
  }, [applications]);

  return (
    <Container className="bg-background flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <BackLink url="/" text="Home page" />
          <span className="font-3xl hidden font-thin sm:block"> | </span>
          <h1 className="font-logo text-primary text-3xl font-medium">My Applications</h1>
        </div>

        <div className="w-full sm:w-auto [&_button]:w-full sm:[&_button]:w-auto">
          <AddNewApplicationButton />
        </div>
      </div>

      {isLoading ? <p className="text-muted">Loading applications...</p> : null}

      {!isLoading && applications.length === 0 ? (
        <p className="text-muted">No applications found.</p>
      ) : null}

      {!isLoading && applications.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {applications.map((application) => (
            <li key={application.id} className="h-full">
              <ApplicationCard application={application} />
            </li>
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
