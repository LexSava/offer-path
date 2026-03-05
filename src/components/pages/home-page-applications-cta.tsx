'use client';

import { useRouter } from 'next/navigation';
import { useApplications } from '@/contexts';
import { Button } from '@/components/ui';

export function HomePageApplicationsCta() {
  const router = useRouter();
  const { applications, isLoading } = useApplications();

  const applicationsCount = applications.length;
  const applicationsInfoText = isLoading
    ? 'Loading your applications...'
    : applicationsCount > 0
      ? `You already have ${applicationsCount} applications in your tracker.`
      : 'You do not have applications yet. Create your first one and keep progress in one place.';

  return (
    <section className="flex flex-col items-center gap-3">
      <h2 className="font-logo text-secondary text-2xl font-medium">Applications List</h2>
      <p className="text-muted max-w-xl text-sm">{applicationsInfoText}</p>
      <Button
        text={applicationsCount > 0 ? 'Go to My Applications' : 'Create and Open Applications'}
        variant="primary"
        onClick={() => router.push('/applications')}
      />
    </section>
  );
}
