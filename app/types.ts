// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  cries?: Cries;
  forms?: Species[];
  game_indices?: GameIndex[];
  height: number;
  held_items?: HeldItem[];
  id?: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: Move[];
  name: string;
  order?: number;
  past_abilities?: unknown[];
  past_types?: unknown[];
  species?: Species | string;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Ability {
  ability: Species;
  is_hidden?: boolean;
  slot?: number;
}

export interface Species {
  name: string;
  url: string;
}

interface Cries {
  latest?: string;
  legacy?: string;
}

interface GameIndex {
  game_index?: number;
  version?: Species;
}

interface HeldItem {
  item?: Species;
  version_details?: VersionDetail[];
}

interface VersionDetail {
  rarity?: number;
  version?: Species;
}

interface Move {
  move?: Species;
  version_group_details?: VersionGroupDetail[];
}

interface VersionGroupDetail {
  level_learned_at?: number;
  move_learn_method?: Species;
  version_group?: Species;
}

interface GenerationV {
  "black-white"?: Sprites;
}

interface GenerationIv {
  "diamond-pearl"?: Sprites;
  "heartgold-soulsilver"?: Sprites;
  platinum?: Sprites;
}

interface Versions {
  "generation-i"?: GenerationI;
  "generation-ii"?: GenerationIi;
  "generation-iii"?: GenerationIii;
  "generation-iv"?: GenerationIv;
  "generation-v"?: GenerationV;
  "generation-vi"?: { [key: string]: Home };
  "generation-vii"?: GenerationVii;
  "generation-viii"?: GenerationViii;
}

interface Other {
  dream_world?: DreamWorld;
  home?: Home;
  "official-artwork"?: OfficialArtwork;
  showdown?: Sprites;
}

interface Sprites {
  back_default?: string;
  back_female?: null;
  back_shiny?: string;
  back_shiny_female?: null;
  front_default?: string;
  front_female?: null;
  front_shiny?: string;
  front_shiny_female?: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

interface GenerationI {
  "red-blue"?: RedBlue;
  yellow?: RedBlue;
}

interface RedBlue {
  back_default?: string;
  back_gray?: string;
  back_transparent?: string;
  front_default?: string;
  front_gray?: string;
  front_transparent?: string;
}

interface GenerationIi {
  crystal?: Crystal;
  gold?: Gold;
  silver?: Gold;
}

interface Crystal {
  back_default?: string;
  back_shiny?: string;
  back_shiny_transparent?: string;
  back_transparent?: string;
  front_default?: string;
  front_shiny?: string;
  front_shiny_transparent?: string;
  front_transparent?: string;
}

interface Gold {
  back_default?: string;
  back_shiny?: string;
  front_default?: string;
  front_shiny?: string;
  front_transparent?: string;
}

interface GenerationIii {
  emerald?: OfficialArtwork;
  "firered-leafgreen"?: Gold;
  "ruby-sapphire"?: Gold;
}

interface OfficialArtwork {
  front_default?: string;
  front_shiny?: string;
}

interface Home {
  front_default?: string;
  front_female?: null;
  front_shiny?: string;
  front_shiny_female?: null;
}

interface GenerationVii {
  icons?: DreamWorld;
  "ultra-sun-ultra-moon"?: Home;
}

interface DreamWorld {
  front_default?: string;
  front_female?: null;
}

interface GenerationViii {
  icons?: DreamWorld;
}

export interface Stat {
  base_stat?: number;
  effort?: number;
  stat: Species;
}

export interface Type {
  slot?: number;
  type: Species;
}

// Api response

export interface ApiResponse {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface Color {
  name?: string;
  url?: string;
}

interface EvolutionChain {
  url?: string;
}
interface FlavorTextEntry {
  flavor_text?: string;
  language?: Color;
  version?: Color;
}
interface Genus {
  genus?: string;
  language?: Color;
}

interface Name {
  language?: Color;
  name?: string;
}

interface PalParkEncounter {
  area?: Color;
  base_score?: number;
  rate?: number;
}

interface PokedexNumber {
  entry_number?: number;
  pokedex?: Color;
}

interface Variety {
  is_default?: boolean;
  pokemon?: Color;
}

export interface SpeciesData {
  base_happiness?: number;
  capture_rate?: number;
  color?: Color;
  egg_groups?: Color[];
  evolution_chain?: EvolutionChain;
  evolves_from_species?: Color;
  flavor_text_entries?: FlavorTextEntry[];
  form_descriptions?: unknown[];
  forms_switchable?: boolean;
  gender_rate?: number;
  genera?: Genus[];
  generation?: Color;
  growth_rate?: Color;
  habitat?: Color;
  has_gender_differences?: boolean;
  hatch_counter?: number;
  id?: number;
  is_baby?: boolean;
  is_legendary?: boolean;
  is_mythical?: boolean;
  name?: string;
  names?: Name[];
  order?: number;
  pal_park_encounters?: PalParkEncounter[];
  pokedex_numbers?: PokedexNumber[];
  shape?: Color;
  varieties?: Variety[];
}
