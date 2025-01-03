"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

type FavoritesContextType = {
  favorites: string[];
  addFavorite: (pokemonName: string) => void;
  removeFavorite: (pokemonName: string) => void;
  isFavorite: (pokemonName: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("pokemonFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (pokemonName: string) => {
    const updatedFavorites = [...favorites, pokemonName];
    setFavorites(updatedFavorites);
    localStorage.setItem("pokemonFavorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (pokemonName: string) => {
    const updatedFavorites = favorites.filter((name) => name !== pokemonName);
    setFavorites(updatedFavorites);
    localStorage.setItem("pokemonFavorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (pokemonName: string) => favorites.includes(pokemonName);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
