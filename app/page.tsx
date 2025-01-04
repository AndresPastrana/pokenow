"use client";
import { useState, useEffect } from "react";

import Link from "next/link";

import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";
import ErrorMessage from "@/components/ErrorMessage";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { PokemonDetails } from "./types";

export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonDetails[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredPokemon(pokemon);
    } else {
      const filtered = pokemon.filter((p) =>
        p?.types?.some((t) => t?.type?.name === selectedType)
      );
      setFilteredPokemon(filtered);
    }
  }, [selectedType, pokemon]);

  const fetchPokemon = async (page: number) => {
    try {
      const offset = (page - 1) * itemsPerPage;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
      );
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map((p: { url: string }) =>
          fetch(p.url).then((res) => res.json())
        )
      );
      setPokemon(pokemonDetails);
      setTotalPages(Math.ceil(data.count / itemsPerPage));
      setError(null);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setError("Failed to load Pokémon. Please try again later.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex flex-col sm:flex-row w-full max-w-4xl gap-4 mb-8">
        <div className="flex-grow">
          <SearchBar />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* <TypeFilter onFilterChange={handleFilterChange} /> */}
          <Link href="/favorites">
            <Button variant="outline" className="w-full sm:w-auto">
              Go to Favorites
            </Button>
          </Link>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-full max-w-7xl">
        {filteredPokemon.map((p) => (
          <Link href={`/pokemon/${p.name}`} key={p.id}>
            <PokemonCard pokemon={p} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
