// env.ts (the module that validates environment variables)

import { z } from "zod";

/**
 * The default number of Pokémon displayed per page when no specific value is provided.
 */
const fallback_pokemons_per_page = 10;
const api_url_fallback = "https://pokeapi.co/api/v2/";
/**
 * Schema for validating environment variables using Zod.
 * - `NEXT_PUBLIC_POKE_API_URL`: Ensures it's a valid URL.
 * - `POKEMONS_BY_PAGE`: Ensures it's a positive number.
 */
const envSchema = z.object({
  NEXT_PUBLIC_POKE_API_URL: z.string().url(),
  POKEMONS_BY_PAGE: z.number().min(1),
});

/**
 * Object containing environment variables read from `process.env`.
 * - `NEXT_PUBLIC_POKE_API_URL`: URL for the Pokémon API.
 * - `POKEMONS_BY_PAGE`: Number of Pokémon displayed per page.
 */
const envVars = {
  NEXT_PUBLIC_POKE_API_URL:
    process.env.NEXT_PUBLIC_POKE_API_URL || api_url_fallback,
  POKEMONS_BY_PAGE: Number(process.env.NEXT_PUBLIC_POKEMONS_BY_PAGE),
};

if (isNaN(envVars.POKEMONS_BY_PAGE)) {
  envVars.POKEMONS_BY_PAGE = fallback_pokemons_per_page;
}

const parsedEnv = envSchema.safeParse(envVars);

/**
 * If validation passes, the validated data is frozen and exported.
 * If validation fails, an error is thrown with formatted details.
 */
if (parsedEnv.error) {
  const errorDetails = parsedEnv.error.format();
  throw new Error(
    `Environment variables validation failed: ${JSON.stringify(
      errorDetails,
      null,
      2
    )}`
  );
}

console.log(parsedEnv.data);

/**
 * Exported validated environment variables, frozen to prevent modification.
 */
export const env_data = Object.freeze({ ...parsedEnv.data });
