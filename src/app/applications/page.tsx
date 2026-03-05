'use client';

import { useEffect } from 'react';
import { Container } from '@/components/layout';
import { useApplications } from '@/contexts';

export default function ApplicationsPage() {
  const { applications, isLoading } = useApplications();

  useEffect(() => {
    console.log('Applications page data:', applications);
  }, [applications]);

  return (
    <Container className="bg-background flex flex-col gap-4">
      <h1 className="font-logo text-3xl font-medium text-primary">My Applications</h1>

      {isLoading ? <p className="text-muted">Loading applications...</p> : null}

      {!isLoading && applications.length === 0 ? (
        <p className="text-muted">No applications found.</p>
      ) : null}

      {!isLoading && applications.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {applications.map((application) => (
            <li key={application.id} className="text-secondary text-sm">
              {application.position} • {application.specialization} • {application.status}
            </li>
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
