import { useCallback, useEffect, useRef, useState } from 'react';

export interface IUseDebounceControls {
  cancel: () => void;
  flush: () => void;
}

export function useDebounce<T>(value: T, delay = 300): [T, IUseDebounceControls] {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestValueRef = useRef(value);
  const debouncedValueRef = useRef(value);

  const cancel = useCallback(() => {
    if (timeoutRef.current === null) {
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const flush = useCallback(() => {
    cancel();

    if (Object.is(latestValueRef.current, debouncedValueRef.current)) {
      return;
    }

    debouncedValueRef.current = latestValueRef.current;
    setDebouncedValue(latestValueRef.current);
  }, [cancel]);

  useEffect(() => {
    latestValueRef.current = value;

    if (Object.is(value, debouncedValueRef.current)) {
      cancel();

      return;
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;

      if (Object.is(latestValueRef.current, debouncedValueRef.current)) {
        return;
      }

      debouncedValueRef.current = latestValueRef.current;
      setDebouncedValue(latestValueRef.current);
    }, delay);

    return cancel;
  }, [cancel, delay, value]);

  return [debouncedValue, { cancel, flush }];
}
