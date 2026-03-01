import { useState } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';

import { AutocompleteInput } from '../components/AutocompleteInput';
import { ErrorMessage } from '../components/ErrorMessge';
import PokemonCard from '../components/PokemonCard';
import type { Pokemon } from '../types';

export default function SearchPage() {
  const { data, error } = useSWR<{ results: Pokemon[] }>(
    'https://pokeapi.co/api/v2/pokemon?limit=10000',
  );

  const [selected, setSelected] = useState<Pokemon | null>(null);

  return (
    <>
      {error && (
        <ErrorMessage role="alert">
          Failed to load Pokémon data. Please try again later.
        </ErrorMessage>
      )}

      <Hero>
        <h1>Gotta catch 'em all!</h1>
        <AutocompleteInput
          items={data?.results || []}
          onSelect={(item: Pokemon | null) => setSelected(item)}
        />
      </Hero>

      <ResultArea>{selected && <PokemonCard pokemon={selected} />}</ResultArea>
    </>
  );
}

const Hero = styled.section`
  margin-top: 40px;

  display: grid;
  gap: 24px;
  justify-items: center;
  text-align: center;
`;

const ResultArea = styled.section`
  display: grid;
  place-items: center;
  padding-bottom: 64px;
`;
