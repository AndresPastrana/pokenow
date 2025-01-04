"use client";
import { useState, useEffect, useCallback } from "react";

type UseFetchResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export function useFetch<T, P>(
  fetcher: (params: P) => Promise<T>,
  params: P
): UseFetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Memoize the fetcher function with parameters
  const memoizedFetcher = useCallback(() => fetcher(params), [fetcher, params]);

  useEffect(() => {
    console.log("Refetching data...");

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before the new fetch
        const result = await memoizedFetcher();
        setData(result);
      } catch {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memoizedFetcher]); // Only triggers if memoizedFetcher changes

  return { data, error, loading };
}
