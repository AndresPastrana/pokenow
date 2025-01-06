import { useState, useEffect } from "react";

/**
 * A custom hook to manage state synchronized with localStorage.
 *
 * @template T The type of the value to be stored.
 * @param key - The key in localStorage to sync with.
 * @param initialValue - The initial value if no data exists in localStorage.
 * @returns An object containing the state, setter, and a function to clear localStorage.
 */
export function useSyncLocalStorage<T>(key: string, initialValue: T) {
  // State to store the current value, initialized from localStorage
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : initialValue;
      } catch (error) {
        console.error(`Error loading localStorage key "${key}":`, error);
        return initialValue;
      }
    }
    return initialValue; // Default for SSR or server-side environments
  });

  /**
   * Updates the state and synchronizes it with localStorage.
   *
   * @param newValue - The new value to store, or a function to compute it.
   */
  const setLocalStorageValue = (newValue: T | ((val: T) => T)) => {
    if (typeof window !== "undefined") {
      try {
        const valueToStore =
          newValue instanceof Function ? newValue(value) : newValue;
        setValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  };

  // Sync with localStorage when changes occur in other tabs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key && event.newValue) {
          try {
            setValue(JSON.parse(event.newValue) as T);
          } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error);
          }
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [key]);

  /**
   * Clears the value from localStorage and resets the state to the initial value.
   */
  const clearValue = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(key);
        setValue(initialValue);
      } catch (error) {
        console.error(`Error clearing localStorage key "${key}":`, error);
      }
    }
  };

  return {
    value,
    setValue: setLocalStorageValue,
    clearValue,
  };
}
