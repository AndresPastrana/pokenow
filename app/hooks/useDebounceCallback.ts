import { useCallback, useEffect, useRef } from "react";

// Type for the callback function
type DebounceCallback = (...args: unknown[]) => void;

export function useDebounceCallback<T extends DebounceCallback>(
  callback: T,
  delay: number
) {
  const callbackRef = useRef<T>(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update the callback reference whenever it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Clear the existing timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  return debouncedCallback;
}
