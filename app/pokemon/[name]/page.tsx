import { notFound } from "next/navigation";
import PokemonDetails from "@/components/PokemonDetails";
// import ErrorMessage from "@/components/ErrorMessage";

async function getPokemon(name: string) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
      throw new Error("Failed to fetch pokemon");
    }
    return res.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return null;
  }
}

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await getPokemon(params.name);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PokemonDetails pokemon={pokemon} />
    </div>
  );
}
