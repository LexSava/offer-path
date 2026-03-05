import { ChevronDown } from 'lucide-react';
import { IDropdownProps } from '@/types';
import { cn } from '@/utils';

export function Dropdown({
  label,
  error,
  options,
  placeholder,
  registration,
  id,
  className,
  ...props
}: IDropdownProps) {
  const fieldId = id ?? registration?.name;

  return (
    <div className="relative flex w-full flex-col items-start gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        id={fieldId}
        {...registration}
        {...props}
        className={cn(
          'w-full appearance-none border bg-white py-2 pr-8 pl-3 text-sm transition-colors outline-none',
          error ? 'border-red-500 focus:border-red-500' : 'focus:border-primary border-gray-300',
          className,
        )}
      >
        {placeholder && !props.multiple ? <option value="">{placeholder}</option> : null}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute top-9.5 right-3 text-gray-500"
        aria-hidden="true"
      />

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
