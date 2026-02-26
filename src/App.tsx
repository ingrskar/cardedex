import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import useSWR from 'swr';

import { AutocompleteInput } from './components/AutocompleteInput';
import { GlobalStyles } from './theme/GlobalStyles';
import type { Pokemon } from './types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function App() {
  const { data, error } = useSWR<{ results: Pokemon[] }>(
    'https://pokeapi.co/api/v2/pokemon?limit=100000',
    fetcher,
  );

  const [selected, setSelected] = useState<Pokemon | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div style={{ padding: 40 }}>
        {/* TODO: display error if there is no data for auto complete */}
        <AutocompleteInput
          items={data?.results || []}
          onSelect={(item: Pokemon | null) => console.log('Selected:', item)}
        />
      </div>
    </ThemeProvider>
  );
}
