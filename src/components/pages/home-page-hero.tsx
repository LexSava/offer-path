import { AddNewApplicationButton } from '../ui';

export function HomePageHero() {
  return (
    <section className="bg-background flex flex-col gap-2 py-4 lg:py-6 xl:py-8  rounded-lg text-center items-center justify-center">
      <h1 className=" text-3xl  lg:text-5xl xl:text-7xl font-medium font-logo">OfferPath</h1>
      <p className="text-muted text-2xl">Track your job applications easily</p>
      <p className="text-secondary">
        Keep track of all your job applications in one place. Track the positions you applied for,
        manage their status, and get insights on your application history.
      </p>
      <AddNewApplicationButton />
    </section>
  );
}
