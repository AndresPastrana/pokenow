"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

import { useFavorites } from "@/app/contexts/FavoritesContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PokemonCardProps {
  pokemon: any;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(pokemon.name)) {
      removeFavorite(pokemon.name);
    } else {
      addFavorite(pokemon.name);
    }
  };

  return (
    <Card className="pokemon-card w-full max-w-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg bg-white">
      <CardHeader className="bg-gradient-to-r from-pokemon-red to-pokemon-blue text-white p-3">
        <CardTitle className="text-lg sm:text-xl capitalize">
          {pokemon.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-center mb-2">
          {pokemon.sprites.front_default ? (
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={120}
              height={120}
              className="transition-transform duration-300 hover:scale-110 animate-float"
            />
          ) : (
            <div className="w-[120px] h-[120px] flex items-center justify-center bg-gray-200 text-gray-500">
              No image
            </div>
          )}
        </div>
        <div className="text-sm">
          <div className="mb-1">
            <span className="font-semibold">Type(s): </span>
            {pokemon.types.map((type: any, index: number) => (
              <span
                key={type.type.name}
                className="pokemon-type inline-block px-2 py-1 rounded-full bg-pokemon-yellow text-pokemon-blue text-xs font-semibold mr-2 mb-2"
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Height: </span>
            {pokemon.height / 10} m
          </div>
          <div>
            <span className="font-semibold">Weight: </span>
            {pokemon.weight / 10} kg
          </div>
        </div>
        <div className="mt-4 relative">
          <Button
            variant="outline"
            size="sm"
            className="favorite-button w-full mt-4 border-pokemon-red text-pokemon-red hover:bg-pokemon-red hover:text-white"
            onClick={handleFavoriteClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Heart
              className={`mr-2 h-4 w-4 ${
                isFavorite(pokemon.name) ? "fill-pokemon-red" : ""
              }`}
            />
            {isFavorite(pokemon.name)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </Button>
          {isHovered && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
              {isFavorite(pokemon.name)
                ? "Remove from favorites"
                : "Add to favorites"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
