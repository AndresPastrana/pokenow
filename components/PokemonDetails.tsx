import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PokemonDetails as PokemonDetailsType, Stat } from "@/app/types";
import { getTypeColor } from "@/lib/helpers";
// Parent Component
export default function PokemonDetails({
  pokemon,
}: {
  pokemon: PokemonDetailsType;
}) {
  return (
    <Card className="w-full max-w-xl mx-auto rounded-xl shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <CardHeader className="bg-transparent p-0">
        <CardTitle
          data-testid={`${pokemon.name}`}
          className="text-4xl capitalize text-white text-center font-extrabold drop-shadow-lg"
        >
          {pokemon.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <PokemonSprite
          spriteUrl={pokemon.sprites?.front_default}
          name={pokemon.name}
        />
        <div className="flex-1 text-white">
          <PokemonDetailsSection title="Details">
            <PokemonType types={pokemon.types} />
            <PokemonAbilities abilities={pokemon.abilities} />
            <PokemonHeightWeight
              height={pokemon.height}
              weight={pokemon.weight}
            />
            <PokemonBaseExperience baseExperience={pokemon.base_experience} />
          </PokemonDetailsSection>
          <PokemonStats stats={pokemon.stats} />
        </div>
      </CardContent>
      <div className="mt-8 text-center">
        <Link href="/">
          <Button
            variant="outline"
            className="py-2 px-6 font-bold text-xl border-2 border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Back to List
          </Button>
        </Link>
      </div>
    </Card>
  );
}

// Child Component - Pokemon Sprite
const PokemonSprite = ({
  spriteUrl,
  name,
}: {
  spriteUrl?: string;
  name: string;
}) => (
  <div className="w-64 h-64 relative shadow-xl rounded-xl overflow-hidden bg-gray-100 border-4 border-white transform hover:scale-110 transition-all duration-300">
    {spriteUrl ? (
      <Image
        src={spriteUrl}
        alt={name}
        layout="fill"
        objectFit="contain"
        className="transition-transform duration-300 transform hover:scale-110"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
        No image
      </div>
    )}
  </div>
);

// Child Component - Pokemon Type
const PokemonType = ({ types }: { types: { type: { name: string } }[] }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-100 mb-3">Type(s)</h3>
    <div className="flex flex-wrap gap-3">
      {types.map(({ type }) => (
        <span
          key={type.name}
          className={`${getTypeColor(
            type.name
          )} text-white py-2 px-4 rounded-full font-semibold capitalize`}
        >
          {type.name}
        </span>
      ))}
    </div>
  </div>
);

// Child Component - Pokemon Abilities
const PokemonAbilities = ({
  abilities,
}: {
  abilities: { ability: { name: string } }[];
}) => (
  <div className="mt-6">
    <h3 className="text-xl font-semibold text-gray-100 mb-3">Abilities</h3>
    <div className="flex flex-wrap gap-3">
      {abilities.map(({ ability }) => (
        <span
          key={ability.name}
          className="bg-gray-700 py-1 px-4 rounded-full text-gray-200 font-semibold capitalize"
        >
          {ability.name}
        </span>
      ))}
    </div>
  </div>
);

// Child Component - Pokemon Height and Weight
const PokemonHeightWeight = ({
  height,
  weight,
}: {
  height: number;
  weight: number;
}) => (
  <div className="grid grid-cols-2 gap-4 mt-6">
    <div>
      <dt className="font-semibold text-gray-100">Height:</dt>
      <dd className="text-gray-200">{height / 10} m</dd>
    </div>
    <div>
      <dt className="font-semibold text-gray-100">Weight:</dt>
      <dd className="text-gray-200">{weight / 10} kg</dd>
    </div>
  </div>
);

// Child Component - Pokemon Base Experience
const PokemonBaseExperience = ({
  baseExperience,
}: {
  baseExperience: number;
}) => (
  <div className="mt-6">
    <dt className="font-semibold text-gray-100">Base Experience:</dt>
    <dd className="text-gray-200">{baseExperience}</dd>
  </div>
);

// Child Component - Pokemon Stats
const PokemonStats = ({ stats }: { stats: Stat[] }) => (
  <div className="mt-8">
    <h3 className="text-xl font-semibold text-gray-100 mb-4">Stats</h3>
    <dl className="grid grid-cols-2 gap-6">
      {stats.map((stat) => (
        <div key={stat.stat.name}>
          <dt className="font-semibold text-gray-100 capitalize">
            {stat.stat.name}:
          </dt>
          <dd className="text-gray-200">{stat.base_stat}</dd>
        </div>
      ))}
    </dl>
  </div>
);

// Child Component - Pokemon Details Section
const PokemonDetailsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-gray-100 mb-4">{title}</h2>
    {children}
  </div>
);
