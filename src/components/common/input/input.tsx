import { IInputProps } from '@/types';
import { cn } from '@/utils';

export function Input({ label, error, registration, id, className, ...props }: IInputProps) {
  const fieldId = id ?? registration?.name;

  return (
    <div className="flex w-full flex-col items-start gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        id={fieldId}
        {...registration}
        {...props}
        className={cn(
          'w-full rounded border px-3 py-2 text-sm transition-colors outline-none',
          error ? 'border-red-500 focus:border-red-500' : 'focus:border-primary border-gray-300',
          className,
        )}
      />

      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
