import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';

import { AutocompleteInput } from './components/AutocompleteInput';
import { GlobalStyles } from './theme/GlobalStyles';
import PokemonCard from './components/PokemonCard';
import type { Pokemon } from './types';
import { ErrorMessage } from './components/ErrorMessge';

export default function App() {
  const { data, error } = useSWR<{ results: Pokemon[] }>(
    'https://pokeapi.co/api/v2/pokemon?limit=100000',
  );

  const [selected, setSelected] = useState<Pokemon | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Wrapper>
        {error && (
          <ErrorMessage role="alert">
            Failed to load Pokémon data. Please try again later.
          </ErrorMessage>
        )}
        <h1>Gotta catch 'em all!</h1>
        <AutocompleteInput
          items={data?.results || []}
          onSelect={(item: Pokemon | null) => setSelected(item)}
        />
        {selected && <PokemonCard pokemon={selected} />}
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 40px;
  display: grid;
  gap: 24px;
`;
