import React, { createContext, useState, useEffect, useContext } from "react";
import { PokemonDetails } from "../types";
import { PokemonService } from "../services/pokemon.service";
import { useSearchParams } from "next/navigation";
import { searchParamsToObject } from "@/lib/utils";
import {
  parseSearchParams,
  SearchParams,
  stringifySearchParams,
} from "@/lib/url-state";

// Define the shape of the context
interface PokemonContextType {
  pokemon: PokemonDetails[];
  filteredPokemon: PokemonDetails[];
  setPokemon: React.Dispatch<React.SetStateAction<PokemonDetails[]>>;
  setFilteredPokemon: React.Dispatch<React.SetStateAction<PokemonDetails[]>>;
  fetchPokemon: (page: number) => void;
  error: string | null;
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
  const [selectedType, setSelectedType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const string_params = stringifySearchParams(
    parseSearchParams(searchParamsToObject(searchParams))
  );

  const itemsPerPage = 12;

  // Fetch Pokémon data
  const fetchPokemon = async (page: number) => {
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
    }
  };

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [currentPage]);

  // Filter Pokémon based on selected type
  useEffect(() => {
    // TODO: Mov this filter out of the client
    const filterPokemon = () => {
      setFilteredPokemon(pokemon);

      // Build the filter object based in the url string
      const filter_object = string_params.split("&").reduce((acc, current) => {
        const [search_key, search_value] = current.split("=");
        return { ...acc, [search_key]: search_value };
      }, {} as SearchParams);

      let filtered = pokemon;

      // Filter by base experience
      if (filter_object.base_experience) {
        filtered = filtered.filter(
          (p) => p.base_experience >= Number(filter_object.base_experience)
        );
      }

      // Filter by height
      if (filter_object.height) {
        filtered = filtered.filter(
          (p) => p.height >= Number(filter_object.height) * 10
        );
      }

      // Filter by weight
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
