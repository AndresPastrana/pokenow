import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { buttonVariants } from "./ui/button";
import { searchSubstring } from "@/lib/const";
import useFilteredPokemons from "@/app/hooks/useFilteredPokemons";

export const Suggestions = () => {
  const { filteredPokemon } = useFilteredPokemons();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const pokemon_details_url = (nameOrId: string) => {
    const origin = window.location.origin;
    const pathname = "pokemon";
    const url = `${origin}/${pathname}/${nameOrId}`;

    return url;
  };
  return (
    <div className="grow max-h-[268px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 ">
      <div className="flex flex-col p-3">
        {search && search.length >= 1 ? (
          filteredPokemon.filter((d) => searchSubstring(d.name, search))
            .length > 0 ? (
            filteredPokemon
              .filter((d) => searchSubstring(d.name, search))
              .map((p) => (
                <Link
                  href={pokemon_details_url(p.name)}
                  key={p.name}
                  className={`${buttonVariants({
                    variant: "ghost",
                  })} text-left py-2 px-4 text-sm text-gray-700 hover:bg-pokemon-blue hover:text-blue-600 focus:ring-2 focus:ring-pokemon-blue rounded-lg transition-all duration-200 flex`}
                >
                  <span>{p.name}</span>
                </Link>
              ))
          ) : (
            <p className="text-gray-500 text-sm">{"Nothing to show"}</p>
          )
        ) : (
          <p className="text-gray-500 text-sm">
            Start typing to see suggestions...
          </p>
        )}
      </div>
    </div>
  );
};
