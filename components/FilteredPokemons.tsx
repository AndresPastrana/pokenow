import React from "react";
import Link from "next/link";
import { usePokemon } from "@/app/contexts/PokemonContext";
import useFilteredPokemons from "@/app/hooks/useFilteredPokemons";
import { env_data } from "@/lib/env";
import PokemonCard from "./PokemonCard";
import { LoadingCards } from "./ui/loading";
import ErrorMessage from "./ErrorMessage";

const FilteredPokemons = () => {
  const { loading, error } = usePokemon();
  const { filteredPokemon } = useFilteredPokemons();

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (loading && !error) {
    return <LoadingCards items_cant={env_data.POKEMONS_BY_PAGE} />;
  }
  return (
    <section
      data-testid="pokemons_section"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-full max-w-7xl"
    >
      {filteredPokemon.map((p, index) => (
        <Link
          className="mx-auto sm:mx-0"
          data-testid={`pokemon_card_${index}`}
          href={`/pokemon/${p.name}`}
          key={p.id}
        >
          <PokemonCard pokemon={p} />
        </Link>
      ))}
    </section>
  );
};

export default FilteredPokemons;
