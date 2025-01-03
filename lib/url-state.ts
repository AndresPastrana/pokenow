export interface SearchParams {
  search?: string;
  base_experience?: number;
  height?: number;
}

/**
 * Parses the given search parameters and returns an object with the parsed values.
 *
 * @param params - An object containing search parameters as key-value pairs. The values can be strings, arrays of strings, or undefined.
 * @returns An object containing the parsed search parameters.
 *
 * @example
 * ```typescript
 * const params = {
 *   search: "pikachu",
 *   height: "40",
 *
 * };
 * const result = parseSearchParams(params);
 * // result will be:
 * // {
 * //   search: "pikachu",
 * //   height: 40,
 * //   base_experience: undefined
 * // }
 * ```
 */
export function parseSearchParams(
  params: Record<string, string | string[] | undefined>
): SearchParams {
  return {
    search: typeof params.search === "string" ? params.search : undefined,
    height:
      typeof params.height === "number" ? parseInt(params.height) : undefined,
    base_experience:
      typeof params.base_experience === "number"
        ? parseInt(params.base_experience)
        : undefined,
  };
}

/**
 * Converts an object of search parameters into a URL query string.
 * Only appends parameters with values that are not `undefined`.
 *
 * @param params - An object representing the search parameters.
 * @returns A URL query string.
 */
export function stringifySearchParams(params: SearchParams): string {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      urlParams.append(key, value);
    }
  });
  return urlParams.toString();
}
