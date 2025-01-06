import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Dumbbell, Heart, Ruler, Weight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFavorites } from "@/app/contexts/FavoritesContext";
import {
  PokemonDetails as PokemonDetailsType,
  SpeciesData,
  Type,
} from "@/app/types";
import { DataFetcher } from "./patterns";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";

const typeColors: { [key: string]: string } = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-600",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
};

const PokemonSpecies: React.FC<{ species: SpeciesData }> = ({ species }) => {
  return (
    <CardDescription className="text-lg text-blue-600">
      {species?.genera?.find((g) => g.language?.name === "en")?.genus ||
        "Pokémon"}
    </CardDescription>
  );
};

const PokemonTypes: React.FC<{ types: Type[] }> = ({ types }) => {
  return (
    <div className="flex justify-center mt-4 space-x-2">
      {types.map(({ type }) => (
        <Badge
          key={type.name}
          className={`${
            typeColors[type.name]
          } text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md transition-transform duration-300 hover:scale-105`}
        >
          {" "}
          {type.name}
        </Badge>
      ))}
    </div>
  );
};
const PokemonTabs: React.FC<{ pokemon: PokemonDetailsType }> = ({
  pokemon: {
    stats,
    weight,
    height,
    abilities,
    base_experience,
    species,
    moves,
  },
}) => {
  // const tabs_menu = ["about", "stats", "moves", ]
  const [activeTab, setActiveTab] = useState("about");
  return (
    <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4 bg-blue-100 p-1 rounded-lg">
        {["about", "stats", "moves", "evolution"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={`capitalize py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-white shadow-md text-blue-600"
                : "text-blue-600 hover:bg-blue-200"
            }`}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="h-[400px] overflow-y-auto mt-4 pr-4">
        <TabsContent value="about" key="about">
          <Card className="mb-4 bg-white/80 backdrop-blur-sm">
            <CardHeader className="p-2 sm:p-3 lg:p-5">
              <CardTitle className="text-blue-800">About</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-3  lg:p-5 pt-0">
              <dl className="flex flex-wrap gap-y-2 gap-x-2">
                <div className="flex items-center ">
                  <Ruler className="w-5 h-5 mr-2 text-blue-500" />
                  <dt className="font-semibold mr-2 text-blue-700">Height:</dt>
                  <dd>{height / 10} m</dd>
                </div>
                <div className="flex items-center">
                  <Weight className="w-5 h-5 mr-2 text-green-500" />
                  <dt className="font-semibold mr-2 text-blue-700">Weight:</dt>
                  <dd>{weight / 10} kg</dd>
                </div>
                <div className="items-center flex flex-wrap">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  <dt className="flex flex-wrap font-semibold mr-2 text-blue-700">
                    Abilities:
                  </dt>
                  <dd>
                    {abilities.map((ability) => (
                      <span
                        key={ability.ability.name}
                        className="capitalize mr-2"
                      >
                        {ability.ability.name}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex items-center">
                  <Dumbbell className="w-5 h-5 mr-2 text-red-500" />
                  <dt className="font-semibold mr-2 text-blue-700">
                    Base Experience:
                  </dt>
                  <dd>{base_experience}</dd>
                </div>
              </dl>
              {species && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2 text-blue-800">
                    Pokédex Entry:
                  </h3>
                  {/* <p className="text-blue-700">
                    {
                      species.flavor_text_entries.find(
                        (entry) => entry.language.name === "en"
                      )?.flavor_text
                    }
                  </p> */}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats" key="stats">
          <Card className="mb-4 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-800">Base Stats</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.map((stat) => (
                <div key={stat.stat.name} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold capitalize text-blue-700">
                      {stat.stat.name}:
                    </span>
                    <span className="text-blue-600">{stat.base_stat}</span>
                  </div>
                  <Progress
                    value={stat.base_stat}
                    max={255}
                    className="h-2 bg-blue-200 [&::-webkit-progress-value]:bg-blue-600 [&::-moz-progress-bar]:bg-blue-600"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="moves" key="moves">
          <Card className="mb-4 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-800">Moves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {moves &&
                  moves.slice(0, 20).map((move) => (
                    <Badge
                      key={move.move?.name}
                      variant="secondary"
                      className="capitalize bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-300"
                    >
                      {move.move?.name}
                    </Badge>
                  ))}
              </div>
              {moves && moves.length > 20 && (
                <p className="mt-4 text-sm text-blue-600">
                  And {moves.length - 20} more...
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="evolution" key="evolution">
          <Card className="mb-4 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-800">Evolution Chain</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">
                Evolution chain information is not available in the current API
                response.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

// Parent Component
export default function PokemonDetailsSection({
  pokemon,
}: {
  pokemon: PokemonDetailsType;
}) {
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();
  const handleFavoriteClick = () => {
    if (isFavorite(pokemon.name)) {
      removeFavorite(pokemon.name);
    } else {
      addFavorite(pokemon.name);
    }
  };
  const [, setIsHovered] = useState(false);

  const { species } = pokemon;
  const species_url = useMemo(() => {
    if (typeof species === "string") {
      return species;
    }

    if (species && species.url) {
      return species.url;
    }
    return "Unexpected value";
  }, [species]);

  return (
    <Card className="animate-ease-in w-full max-w-4xl mx-auto overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg p-2 md:py-7 md:px-5">
      <section className="flex flex-col gap-3">
        <section className="flex justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-red-400 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 font-semibold"
            onClick={handleFavoriteClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Heart
              className={`mr-2 h-4 w-4 ${
                isFavorite(pokemon.name) ? "fill-current" : ""
              } transition-all duration-300`}
            />
            <span className="hidden sm:block">
              {isFavorite(pokemon.name)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </span>
          </Button>
        </section>
        <section className="mx-auto">
          <div className="w-fit  flex flex-col items-start">
            <CardTitle className="text-4xl font-bold capitalize mb-2 text-blue-800">
              {pokemon.name}
            </CardTitle>

            {/* Species Here */}
            <DataFetcher<SpeciesData> url={species_url}>
              {({ data, loading, error }) => {
                if (loading) {
                  return <p>Loading</p>;
                }
                if (data) {
                  return <PokemonSpecies species={data} />;
                }

                return <p>Error {error}</p>;
              }}
            </DataFetcher>

            {/*Pokemon Types here */}
            <PokemonTypes types={pokemon.types} />
          </div>
        </section>
      </section>
      <div className="flex flex-col md:flex-row  items-center mt-3">
        {/* Image section */}
        <section className="w-4/12 flex flex-col items-center justify-center  h-full overflow-hidden p-1">
          {pokemon.sprites?.other?.["official-artwork"]?.front_default ? (
            <Image
              width={235}
              height={235}
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              objectFit="contain"
              className="transition-transform duration-300 hover:scale-110 animate-float z-10 object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No image
            </div>
          )}
        </section>
        {/* Tabs section */}
        <section className="w-8/12 h-full">
          <div className="text-center mt-4">
            <PokemonTabs pokemon={pokemon} />
          </div>
        </section>
      </div>
    </Card>
  );
}
