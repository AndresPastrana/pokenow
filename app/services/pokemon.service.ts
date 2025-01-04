import { env_data } from "@/lib/env";
import { ApiResponse, PokemonDetails } from "../types";

export class PokemonService {
  //TODO: Validate the load env with a zod schema
  private static baseUrl: string = env_data.NEXT_PUBLIC_POKE_API_URL;

  static async fetchPaginatedPokemon(
    page: number,
    itemsPerPage: number = env_data.POKEMONS_BY_PAGE
  ) {
    function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    await delay(500);

    try {
      const offset = (page - 1) * itemsPerPage;

      const response = await fetch(
        `${this.baseUrl}/pokemon?limit=${itemsPerPage}&offset=${offset}`
      );

      // Handle network or HTTP response errors
      if (!response.ok) {
        throw new Error(
          `Failed to fetch Pokémon data. Status: ${response.status}`
        );
      }

      const { count, results } = (await response.json()) as ApiResponse;

      // Handle no results error
      if (!results || results.length === 0) {
        throw new Error("Error");
      }

      //   Url of each pokemon to get its details
      const urls = results.map(({ url }) => url);

      //   Get an array with all the details of the pokemons
      const pokemonDetails = await this.loadPokemonsDetails(urls);
      return { pokemonDetails, total: count };
    } catch (error) {
      console.error("An error occurred while fetching Pokémon data:", error);
      throw new Error("Error");
    }
  }

  static async fetchPokemonDetailsByNameOrId(nameOrId: string) {
    try {
      //  Get a pokemon by name or id
      const resp = await fetch(`${this.baseUrl}/pokemon/${nameOrId}`);
      const pokemonDetails = (await resp.json()) as PokemonDetails;
      return pokemonDetails;
    } catch (error) {
      console.log(error);
    }
  }

  static async loadPokemonsDetails(urls: string[]) {
    try {
      const responses = urls.map((url) =>
        fetch(url).then((res) => res.json() as unknown as PokemonDetails)
      );
      const details = await Promise.all(responses);

      return details;
    } catch (error) {
      console.log(error);
      throw new Error("error");
    }
  }
}
