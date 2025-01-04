import { ApiResponse, PokemonDetails } from "../types";

export class PokemonService {
  //TODO: Validate the load env with a zod schema
  private static baseUrl: string = process.env
    .NEXT_PUBLIC_POKE_API_URL as string;

  static async fetchPaginatedPokemon(page: number, itemsPerPage: number) {
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
