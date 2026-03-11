import { APPLICATION_DATA_INFO_CATEGORIES } from '@/constants';
import { DataCategoryCard } from '../common';

export function ApplicationDataInfo() {
  return (
    <section className="w-full">
      <h2 className="text-primary mb-6 text-center text-2xl font-semibold">What You Can Track</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {APPLICATION_DATA_INFO_CATEGORIES.map((category) => (
          <DataCategoryCard
            key={category.title}
            icon={category.icon}
            title={category.title}
            fields={category.fields}
          />
        ))}
      </div>
    </section>
  );
}
