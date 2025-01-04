"use client";
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useUpdateCurrentSearchParams } from "@/app/hooks/useUpdateCurrentSearchParams";
import Filter from "./Filters";
// import { Suggestions } from "./Suggestions";

export default function SearchBar() {
  const searchParams = useSearchParams();

  const { updateSearchParams } = useUpdateCurrentSearchParams();

  const update_url = (e: ChangeEvent<HTMLInputElement>) => {
    // Create a mutable copy of the searchParams
    const params = new URLSearchParams(searchParams);
    const search_term = e.target.value;

    if (search_term.length >= 1) {
      params.set("search", encodeURIComponent(search_term));
    } else {
      // Remove from the url
      params.delete("search");
    }
    updateSearchParams(params);
  };

  // Update the URL with the search term every time the input changes, but debounce the updates to avoid excessive URL updates
  // const debouncedUpdateUrl = useDebounceCallback(update_url, 400);

  return (
    <div className="w-full">
      <div className="relative mb-4">
        <Input
          defaultValue={searchParams.get("search") || ""}
          type="text"
          placeholder="Search Pokémon by name or ID"
          onChange={update_url}
          className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-pokemon-blue focus:border-transparent"
        />
      </div>
      <Filter />
    </div>
  );
}
