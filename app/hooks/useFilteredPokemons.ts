import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePokemon } from "../contexts/PokemonContext";
import {
  parseSearchParams,
  SearchParams,
  stringifySearchParams,
} from "@/lib/url-state";
import { searchParamsToObject } from "@/lib/utils";
import { PokemonDetails } from "../types";

const useFilteredPokemons = () => {
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetails[]>([]);

  const context = usePokemon();
  if (!context) {
    throw new Error(
      "useFilteredPokemons must be used within a PokemonProvider"
    );
  }
  const { pokemon } = context;
  const searchParams = useSearchParams();
  const string_params = stringifySearchParams(
    parseSearchParams(searchParamsToObject(searchParams))
  );

  useEffect(() => {
    const filterPokemon = () => {
      console.log("FILTERING");

      // Just filter if exits some filter active in the context
      //   If there is no filter active return all elements

      const filter_object = string_params.split("&").reduce((acc, current) => {
        const [search_key, search_value] = current.split("=");
        return { ...acc, [search_key]: search_value };
      }, {} as SearchParams);

      let filtered = pokemon;

      if (filter_object.base_experience) {
        filtered = filtered.filter(
          (p) => p.base_experience >= Number(filter_object.base_experience)
        );
      }

      if (filter_object.height) {
        filtered = filtered.filter(
          (p) => p.height >= Number(filter_object.height) * 10
        );
      }

      if (filter_object.weight) {
        filtered = filtered.filter(
          (p) => p.weight >= Number(filter_object.weight) * 10
        );
      }

      setFilteredPokemon(filtered);
    };

    filterPokemon();
  }, [pokemon, string_params]);

  return { filteredPokemon, setFilteredPokemon };
};

export default useFilteredPokemons;
