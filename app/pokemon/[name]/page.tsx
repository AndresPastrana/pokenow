"use server";
import { notFound } from "next/navigation";
import PokemonDetails from "@/components/PokemonDetails";
import { PokemonService } from "@/app/services/pokemon.service";
// import ErrorMessage from "@/components/ErrorMessage";

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await PokemonService.fetchPokemonDetailsByNameOrId(
    params.name.toLowerCase()
  );

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PokemonDetails pokemon={pokemon} />
    </div>
  );
}
