"use client";
import { notFound, useParams } from "next/navigation";
import { PokemonService } from "@/app/services/pokemon.service";
import { PokemonDetails as PokemonDetailsType } from "@/app/types";
import { useFetch } from "@/app/hooks/useFetch";
import PokemonDetails from "@/components/PokemonDetails";
import PokemonSkeleton from "@/components/ui/loading";

export default function PokemonPage() {
  const { name } = useParams<{ name: string }>();

  if (!name) {
    notFound();
  }

  // Use the custom useFetch hook
  const {
    data: pokemon,
    error,
    loading,
  } = useFetch<PokemonDetailsType, string>(
    PokemonService.fetchPokemonDetailsByNameOrId,
    name.toLowerCase()
  );

  if (loading) {
    return <PokemonSkeleton />;
  }

  if (error) {
    console.error(error);
    return <div>Something went wrong while fetching the Pokémon data.</div>;
  }

  if (!pokemon) {
    return <div>Pokemon not found</div>;
  }

  return (
    <section
      data-testid="pokemon_details_container"
      className="container mx-auto  md:px-4 md:py-8"
    >
      <PokemonDetails pokemon={pokemon} />
    </section>
  );
}
