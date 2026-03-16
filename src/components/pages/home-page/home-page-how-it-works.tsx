'use client';

import { HOME_PAGE_INFO_SECTIONS } from '@/constants';
import { InfoSection } from '../../common';

export function HomePageHowItWorks() {
  return (
    <section className="mb-16 w-full">
      <h2 className="text-primary mb-8 text-center text-2xl font-semibold">How It Works</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {HOME_PAGE_INFO_SECTIONS.map((infoSection) => (
          <InfoSection
            key={infoSection.number}
            number={infoSection.number}
            title={infoSection.title}
            description={infoSection.description}
          />
        ))}
      </div>
    </section>
  );
}
