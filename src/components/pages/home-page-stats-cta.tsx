'use client';

import Link from 'next/link';

export function HomePageStatsCta() {
  return (
    <div className="bg-primary flex w-full flex-col items-center gap-4 p-8 text-center text-white">
      <h3 className="mb-3 text-2xl font-semibold">Start tracking your job applications today</h3>
      <p className="mb-6 text-white/80">
        Join professionals who are organizing their job search and landing their dream roles
      </p>
      <Link
        href="/applications"
        className="bg-accent block max-w-max px-8 py-3 font-semibold text-white shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(0,0,0,0.3)]"
      >
        Get Started
      </Link>
    </div>
  );
}
