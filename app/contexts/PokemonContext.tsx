import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { env_data } from "@/lib/env";

import { PokemonDetails } from "../types";
import { PokemonService } from "../services/pokemon.service";

interface PokemonContextType {
  pokemon: PokemonDetails[];
  setPokemon: React.Dispatch<React.SetStateAction<PokemonDetails[]>>;
  fetchPokemon: (page: number) => void;
  error: string | null;
  loading: boolean;
  setError: React.Dispatch<React.SetStateAction<string | null>>;

  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

interface PokemonProviderProps {
  children: React.ReactNode;
}

// TODO: Integrate this with the useFetch function
// Remove the pagination here out to a custom hook
export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
}) => {
  const [pokemon, setPokemon] = useState<PokemonDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = env_data.POKEMONS_BY_PAGE;

  //Memoized Fetch Pokémon data
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

  // Just Refetch the pokemons when the currentPage change
  useEffect(() => {
    fetchPokemon(currentPage);
  }, [fetchPokemon, currentPage]);

  return (
    <PokemonContext.Provider
      value={{
        pokemon,

        setPokemon,
        fetchPokemon,

        error,
        loading,

        setError,

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
