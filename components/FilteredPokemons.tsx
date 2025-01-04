import { usePokemon } from "@/app/contexts/PokemonContext";
import Link from "next/link";
import React from "react";
import PokemonCard from "./PokemonCard";

const FilteredPokemons = () => {
  const { filteredPokemon } = usePokemon();
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
