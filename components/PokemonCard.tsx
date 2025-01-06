"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronUp, Dumbbell, Heart, Ruler, Weight, Zap } from "lucide-react";

import { useFavorites } from "@/app/contexts/FavoritesContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ability, PokemonDetails, Type } from "@/app/types";

interface PokemonCardProps {
  pokemon: PokemonDetails;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);
  const [showProps, setShowProps] = useState(false);

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
    <Card
      className={`pokemon-card w-full max-w-xs overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 hover:-translate-y-2 relative ${
        isHovered ? "card-hovered" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowProps(false);
      }}
    >
      <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 relative overflow-hidden transition-all duration-300 hover:from-blue-200 hover:to-purple-200">
        <div className="absolute top-0 left-0 w-full h-full bg-pokemon-pattern opacity-5"></div>
        <CardTitle className="text-xl font-bold capitalize relative z-10 text-gray-800">
          {pokemon.name}
        </CardTitle>
        <div className="flex flex-wrap justify-start mt-1">
          {pokemon.types.map((type: Type) => (
            <span
              key={type.type.name}
              className="pokemon-type inline-block px-2 py-0.5 rounded-full bg-white text-gray-800 text-xs font-bold mr-1 mb-1 transition-transform duration-300 hover:scale-110 shadow-sm border border-gray-200"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-center mb-4 relative">
          <div className="absolute w-24 h-24 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
          <div className="w-[150px] h-[150px] flex items-center justify-center">
            {pokemon.sprites.front_default ? (
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={150}
                height={150}
                className="transition-transform duration-300 hover:scale-110 animate-float z-10 object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 rounded-full">
                No image
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="stat-item">
            <div className="flex items-center mb-0.5">
              <Zap className="w-4 h-4 mr-1 text-yellow-500" />
              <span className="font-semibold text-gray-700">Abilities</span>
            </div>
            <div className="pl-5">
              {pokemon.abilities.slice(0, 2).map((ability: Ability) => (
                <span
                  key={ability.ability.name}
                  className="block capitalize text-gray-600"
                >
                  {ability.ability.name}
                </span>
              ))}
              {pokemon.abilities.length > 2 && (
                <span className="text-gray-500">...</span>
              )}
            </div>
          </div>
          <div className="stat-item">
            <div className="flex items-center mb-0.5">
              <Ruler className="w-4 h-4 mr-1 text-blue-500" />
              <span className="font-semibold text-gray-700">Height</span>
            </div>
            <div className="pl-5 text-gray-600">{pokemon.height / 10} m</div>``
          </div>
          <div className="stat-item">
            <div className="flex items-center mb-0.5">
              <Weight className="w-4 h-4 mr-1 text-green-500" />
              <span className="font-semibold text-gray-700">Weight</span>
            </div>
            <div className="pl-5 text-gray-600">{pokemon.weight / 10} kg</div>
          </div>
          <div className="stat-item">
            <div className="flex items-center mb-0.5">
              <Dumbbell className="w-4 h-4 mr-1 text-red-500" />
              <span className="font-semibold text-gray-700">Base XP</span>
            </div>
            <div className="pl-5 text-gray-600">{pokemon.base_experience}</div>
          </div>
        </div>
        <div className="mt-4 relative">
          <Button
            data-testid={`btn_is_favorite_${isFavorite(pokemon.name)}_${
              pokemon.name
            }`}
            variant="outline"
            size="sm"
            className="favorite-button w-full border-2 border-blue-400 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 font-semibold py-1 text-xs"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`mr-1 h-4 w-4 ${
                isFavorite(pokemon.name) ? "fill-current" : ""
              } transition-all duration-300`}
            />
            {isFavorite(pokemon.name)
              ? "Remove from Favorites"
              : "Add to Favorites"}
          </Button>
        </div>
      </CardContent>
      {isHovered && (
        <div
          className={`props-tab absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-t-lg cursor-pointer transition-all duration-300 ${
            showProps ? "top-0" : ""
          }`}
          onClick={() => setShowProps(!showProps)}
        >
          <ChevronUp
            className={`w-5 h-5 transition-transform duration-300 ${
              showProps ? "rotate-180" : ""
            }`}
          />
        </div>
      )}
      {showProps && (
        <div className="props-content absolute top-full left-0 w-full bg-white border-t-2 border-blue-300 p-3 transition-all duration-300 transform translate-y-0 shadow-lg">
          <h3 className="font-bold mb-1 text-blue-600 text-sm">
            Pokémon Properties:
          </h3>
          <pre className="text-xs overflow-auto max-h-32 bg-gray-50 p-2 rounded">
            {JSON.stringify(pokemon, null, 2)}
          </pre>
        </div>
      )}
    </Card>
  );
}
