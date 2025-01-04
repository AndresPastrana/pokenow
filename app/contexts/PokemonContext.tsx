import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { PokemonDetails } from "../types";
import { PokemonService } from "../services/pokemon.service";
import { useSearchParams } from "next/navigation";
import { searchParamsToObject } from "@/lib/utils";
import {
  parseSearchParams,
  SearchParams,
  stringifySearchParams,
} from "@/lib/url-state";
import { env_data } from "@/lib/env";

// Define the shape of the context
interface PokemonContextType {
  pokemon: PokemonDetails[];
  filteredPokemon: PokemonDetails[];
  setPokemon: React.Dispatch<React.SetStateAction<PokemonDetails[]>>;
  setFilteredPokemon: React.Dispatch<React.SetStateAction<PokemonDetails[]>>;
  fetchPokemon: (page: number) => void;
  error: string | null;
  loading: boolean;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

interface PokemonProviderProps {
  children: React.ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const [pokemon, setPokemon] = useState<PokemonDetails[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const [selectedType, setSelectedType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const string_params = stringifySearchParams(
    parseSearchParams(searchParamsToObject(searchParams))
  );

  const itemsPerPage = env_data.POKEMONS_BY_PAGE;

  // Fetch Pokémon data
  const fetchPokemon = useCallback(
    async (page: number) => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        const resp = await PokemonService.fetchPaginatedPokemon(
          page,
          itemsPerPage
        );
        setPokemon(resp.pokemonDetails);
        setTotalPages(Math.ceil(resp.total / itemsPerPage));
        setError(null);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setError("Failed to load Pokémon. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the fetch completes (success or failure)
      }
    },
    [itemsPerPage]
  );

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [fetchPokemon, currentPage]);

  // Filter Pokémon based on selected type
  useEffect(() => {
    const filterPokemon = () => {
      setFilteredPokemon(pokemon);

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
  }, [selectedType, pokemon, string_params]);

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        filteredPokemon,
        setPokemon,
        setFilteredPokemon,
        fetchPokemon,
        error,
        loading, // Provide the loading state to the context
        setError,
        selectedType,
        setSelectedType,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};
