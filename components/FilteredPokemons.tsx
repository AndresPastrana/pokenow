import { usePokemon } from "@/app/contexts/PokemonContext";
import Link from "next/link";
import React from "react";
import PokemonCard from "./PokemonCard";
import { LoadingCards } from "./ui/loading";
import ErrorMessage from "./ErrorMessage";
import { env_data } from "@/lib/env";

const FilteredPokemons = () => {
  const { filteredPokemon, loading, error } = usePokemon();

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading && !error) {
    return <LoadingCards items_cant={env_data.POKEMONS_BY_PAGE} />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-full max-w-7xl">
      {filteredPokemon.map((p) => (
        <Link href={`/pokemon/${p.name}`} key={p.id}>
          <PokemonCard pokemon={p} />
        </Link>
      ))}
    </div>
  );
};

export default FilteredPokemons;
