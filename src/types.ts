export type Pokemon = {
  url: string;
  name: string;
};

export interface PokemonInfo {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  held_items: {
    item: {
      name: string;
      url: string;
    };
    version_details: {
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  sprites: {
    front_default: string | null;
    back_default: string | null;
    front_shiny?: string | null;
    back_shiny?: string | null;
    other?: {
      dream_world?: {
        front_default: string;
        front_female?: string | null;
      };
      'official-artwork'?: {
        front_default: string;
        front_shiny?: string;
      };
    };
  };
}
