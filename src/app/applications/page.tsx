'use client';

import { useEffect } from 'react';
import { ApplicationCard } from '@/components/common';
import { Container } from '@/components/layout';
import { useApplications } from '@/contexts';

export default function ApplicationsPage() {
  const { applications, isLoading } = useApplications();

  useEffect(() => {
    console.log('Applications page data:', applications);
  }, [applications]);

  return (
    <Container className="bg-background flex flex-col gap-4">
      <h1 className="font-logo text-primary text-3xl font-medium">My Applications</h1>

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
