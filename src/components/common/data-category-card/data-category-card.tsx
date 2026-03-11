import type { IDataCategoryCardProps } from '@/types';

export function DataCategoryCard({ icon: Icon, title, fields }: IDataCategoryCardProps) {
  return (
    <article className="bg-surface border-primary/8 border-2 p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center bg-[rgba(236,84,60,0.1)]">
          <Icon size={20} className="text-accent" />
        </div>
        <h4 className="text-primary font-semibold">{title}</h4>
      </div>

      <ul className="space-y-2">
        {fields.map((field) => (
          <li key={field} className="text-secondary flex items-center gap-2 text-sm">
            <div className="bg-accent h-1.5 w-1.5" />
            {field}
          </li>
        ))}
      </ul>
    </article>
  );
}
