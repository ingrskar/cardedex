import styled from '@emotion/styled';
import { useContext } from 'react';

import { CollectionContext } from '../context/CollectionContext';
import PokemonCard from '../components/PokemonCard';
import type { Pokemon } from '../types';

// TODO: add filtering/sorting options

export default function CollectionPage() {
  const { collection } = useContext(CollectionContext);

  return (
    <CollectionWrapper>
      <h1>Collection Page</h1>
      {collection.length === 0 && (
        <>
          <p>You haven't caught any Pokémon yet!</p>
          <p>Go back to the search page to find and catch them.</p>
        </>
      )}
      {collection.length > 0 && (
        <>
          <p>
            You have caught {collection.length} Pokémon
            {collection.length === 1 ? '' : 's'}!
          </p>
          <CollectionGrid>
            {collection.map((pokemon: Pokemon) => (
              <PokemonCard key={pokemon.url} pokemon={pokemon} />
            ))}
          </CollectionGrid>
        </>
      )}
    </CollectionWrapper>
  );
}

const CollectionWrapper = styled.div`
  display: grid;
  gap: 24px;
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, auto));
  gap: 16px;
  width: 100%;
`;
