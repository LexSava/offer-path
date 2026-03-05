'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ApplicationCard } from '@/components/common';
import { Container } from '@/components/layout';
import { AddNewApplicationButton } from '@/components/ui';
import { useApplications } from '@/contexts';
import { PageTitleHeader } from '@/components/pages/page-title-header';

export default function ApplicationsPage() {
  const { applications, isLoading } = useApplications();
  const router = useRouter();

  useEffect(() => {
    console.log('Applications page data:', applications);
  }, [applications]);

  return (
    <Container className="bg-background flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageTitleHeader backLinkUrl="/" backLinkText="Home page" title="My Applications" />

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
              <ApplicationCard
                application={application}
                onClick={() => router.push(`/applications/${application.id}`)}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
