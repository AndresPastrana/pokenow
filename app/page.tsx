"use client";
import Link from "next/link";

import SearchBar from "@/components/SearchBar";

import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { PokemonProvider } from "./contexts/PokemonContext";
import FilteredPokemons from "@/components/FilteredPokemons";

export default function Home() {
  // Create a client

  return (
    <PokemonProvider>
      <div className="flex flex-col items-center space-y-8">
        <div className="flex flex-col sm:flex-row w-full max-w-4xl gap-4 mb-8">
          <div className="flex-grow">
            <SearchBar />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Uncomment this when implementing TypeFilter */}
            {/* <TypeFilter onFilterChange={setSelectedType} /> */}
            <Link href="/favorites">
              <Button variant="outline" className="w-full sm:w-auto">
                Go to Favorites
              </Button>
            </Link>
          </div>
        </div>
        {/* {error && <ErrorMessage message={error} />} */}
        <FilteredPokemons />
        <Pagination />
      </div>
    </PokemonProvider>
  );
}
