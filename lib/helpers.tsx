import {
  Heart,
  Bolt,
  Shield,
  Flame,
  ChevronsUp,
  RefreshCw,
} from "lucide-react";

// Helper function to determine type colors
export const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-purple-500",
    fairy: "bg-pink-500",
    dragon: "bg-indigo-500",
    normal: "bg-gray-400",

    ice: "bg-blue-300",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    bug: "bg-green-400",
    rock: "bg-yellow-700",
    ghost: "bg-purple-600",
    dark: "bg-gray-700",
    steel: "bg-gray-400",
  };
  return colors[type] || "bg-gray-400";
};

// Helper function to map stats to icons using Lucid React
export const getStatIcon = (statName: string) => {
  switch (statName) {
    case "hp":
      return <Heart className="text-red-500" />;
    case "attack":
      return <Bolt className="text-yellow-500" />;
    case "defense":
      return <Shield className="text-green-500" />;
    case "special-attack":
      return <Flame className="text-orange-500" />;
    case "special-defense":
      return <Shield className="text-blue-500" />;
    case "speed":
      return <ChevronsUp className="text-indigo-500" />;
    default:
      return <RefreshCw className="text-gray-500" />;
  }
};
