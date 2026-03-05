'use client';

import { AddNewApplicationButton } from '../ui';
import { HomePageApplicationsCta } from './home-page-applications-cta';

export function HomePageHero() {
  return (
    <section className="bg-background flex flex-col items-center justify-center gap-8 rounded-lg py-4 text-center lg:py-6 xl:py-8">
      <h1 className="font-logo text-3xl font-medium lg:text-5xl xl:text-7xl">OfferPath</h1>
      <p className="text-muted text-2xl">Track your job applications easily</p>
      <p className="text-secondary">
        Keep track of all your job applications in one place. Track the positions you applied for,
        manage their status, and get insights on your application history.
      </p>
      <AddNewApplicationButton />
      <HomePageApplicationsCta />
    </section>
  );
}
