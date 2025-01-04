"use client";

import { parseSearchParams, stringifySearchParams } from "@/lib/url-state";
import { searchParamsToObject } from "@/lib/utils";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export const useUpdateCurrentSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateSearchParams = (
    newParams: ReadonlyURLSearchParams | URLSearchParams
  ) => {
    // Parse the currentParams param as an object
    const currentParamsAsObject = searchParamsToObject(searchParams);

    const newParamsAsObjects = searchParamsToObject(newParams);

    // Merge the currentParams and new
    const mergedParams = { ...currentParamsAsObject, ...newParamsAsObjects };

    // Remove keys from mergedParams that are not in newParamsAsObjects
    Object.keys(currentParamsAsObject).forEach((key) => {
      if (!newParamsAsObjects.hasOwnProperty(key)) {
        delete mergedParams[key];
      }
    });

    // Parse the newParams param as something expected
    const parsed = parseSearchParams(mergedParams);

    // Build the new url state string
    const newUrl = stringifySearchParams(parsed);

    router.replace(`${pathname}?${newUrl}`);
  };

  return { updateSearchParams };
};
