import { usePokemon } from "@/app/contexts/PokemonContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { buttonVariants } from "./ui/button";
import { searchSubstring } from "@/lib/const";

export const Suggestions = () => {
  const { filteredPokemon } = usePokemon();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");
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
                  href={"#"}
                  key={p.name}
                  className={`${buttonVariants({
                    variant: "outline",
                  })} py-2 px-4 text-sm text-gray-700 hover:bg-pokemon-blue hover:text-white focus:ring-2 focus:ring-pokemon-blue rounded-lg transition-all duration-200`}
                >
                  {p.name}
                </Link>
              ))
          ) : (
            <p className="text-gray-500 text-sm">{"No found recomms"}</p>
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
