/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (pokemon: unknown) => void;
  onError: (message: string) => void;
  onTyping: (query: string) => void;
}

export default function SearchBar({
  onSearch,
  onError,
  onTyping,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.length > 1) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        onTyping(query);
      }, 300);
    } else if (query.length === 0) {
      onTyping("");
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, onTyping]);

  const handleSearch = () => {
    if (!query) return;
    onTyping(query);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search Pokémon by name or ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-pokemon-blue focus:border-transparent"
        />
      </div>
      <Button
        onClick={handleSearch}
        disabled={isLoading}
        className="w-full mt-2 bg-pokemon-blue hover:bg-pokemon-red text-white transition-colors duration-300"
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
}
