import { Search } from 'lucide-react';
import type { IApplicationSearchInputProps } from '@/types';
import { Input } from '../input/input';

export function ApplicationSearchInput({ value, onChange }: IApplicationSearchInputProps) {
  return (
    <div className="relative w-full">
      <Input
        label="Search applications"
        type="search"
        value={value}
        placeholder="Search applications..."
        onChange={(event) => onChange(event.currentTarget.value)}
        className="pr-10"
      />

      <Search
        size={16}
        className="pointer-events-none absolute top-9.5 right-3 text-gray-500"
        aria-hidden="true"
      />
    </div>
  );
}