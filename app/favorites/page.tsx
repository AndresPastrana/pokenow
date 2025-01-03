"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useFavorites } from "@/app/contexts/FavoritesContext";
import PokemonCard from "@/components/PokemonCard";
import { Button } from "@/components/ui/button";
import { PokemonDetails } from "../types";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [favoritePokemon, setFavoritePokemon] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const pokemonDetails = await Promise.all(
        favorites.map((name) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
            res.json()
          )
        )
      );
      setFavoritePokemon(pokemonDetails);
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Your Favorite Pokémon</h2>
      <Link href="/">
        <Button variant="outline" className="mb-4">
          Back to Home
        </Button>
      </Link>
      {favoritePokemon.length === 0 ? (
        <p>You haven&apos;t added any Pokémon to your favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {favoritePokemon.map((p) => (
            <Link href={`/pokemon/${p.name}`} key={p.id}>
              <PokemonCard pokemon={p} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
