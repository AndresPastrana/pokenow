import React, { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type DataFetcherTypes<T> = {
  url: string;
  children: (args: FetchState<T>) => React.ReactElement;
};

export function DataFetcher<T>({ children, url }: DataFetcherTypes<T>) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  }, [url]);

  return children({ data, loading, error });
}
