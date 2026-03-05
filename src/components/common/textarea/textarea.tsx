import { ChangeEvent, useMemo, useState } from 'react';
import { ITextareaProps } from '@/types';
import { cn } from '@/utils';

export function Textarea({
  label,
  error,
  registration,
  id,
  className,
  onChange,
  value,
  defaultValue,
  maxCharacters,
  ...props
}: ITextareaProps) {
  const initialLength = useMemo(() => {
    if (typeof value === 'string') return value.length;
    if (typeof defaultValue === 'string') return defaultValue.length;
    return 0;
  }, [defaultValue, value]);

  const [currentLength, setCurrentLength] = useState(initialLength);
  const fieldId = id ?? registration?.name;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(event.target.value.length);
    registration?.onChange(event);
    onChange?.(event);
  };

  return (
    <div className="flex w-full flex-col items-start gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <textarea
        id={fieldId}
        {...registration}
        {...props}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        maxLength={maxCharacters}
        className={cn(
          'w-full border px-3 py-2 text-sm transition-colors outline-none',
          error ? 'border-red-500 focus:border-red-500' : 'focus:border-primary border-gray-300',
          className,
        )}
      />

      <div className="flex w-full items-end justify-between">
        {error ? <p className="text-xs text-red-600">{error}</p> : <span />}

        {typeof maxCharacters === 'number' ? (
          <p className="text-xs text-gray-500">
            {currentLength} / {maxCharacters}
          </p>
        ) : null}
      </div>
    </div>
  );
}
