"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useSyncLocalStorage } from "../hooks/useLocalStorage";

type FavoritesContextType = {
  favorites: string[];
  addFavorite: (pokemonName: string) => void;
  removeFavorite: (pokemonName: string) => void;
  isFavorite: (pokemonName: string) => boolean;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

/**
 * Custom hook to access the favorites context.
 *
 * @returns The FavoritesContextType with methods and state.
 * @throws Error if used outside of the FavoritesProvider.
 */
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

/**
 * A provider component to manage the favorites context.
 *
 * @param children - React children elements.
 */
export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    value: favorites,
    setValue: setFavorites,
    clearValue: clearFavorites,
  } = useSyncLocalStorage<string[]>("pokemonFavorites", []);

  const addFavorite = (pokemonName: string) => {
    if (!favorites.includes(pokemonName)) {
      setFavorites([...favorites, pokemonName]);
    }
  };

  const removeFavorite = (pokemonName: string) => {
    setFavorites(favorites.filter((name) => name !== pokemonName));
  };

  const isFavorite = (pokemonName: string) => favorites.includes(pokemonName);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
