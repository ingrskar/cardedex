import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { CollectionContext } from './CollectionContext';
import type { Pokemon } from '../types';

interface Props {
  children?: ReactNode | ReactNode[];
}

export const CollectionProvider = ({ children }: Props) => {
  const [collection, setCollection] = useState<Pokemon[]>(() => {
    const saved = sessionStorage.getItem('myPokemonCollection');
    return saved ? JSON.parse(saved) : [];
  });

  const addToCollection = useCallback((pokemon: Pokemon) => {
    setCollection((prev) => {
      const updated = [...prev, pokemon];
      sessionStorage.setItem('myPokemonCollection', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromCollection = useCallback((pokemon: Pokemon) => {
    setCollection((prev) => {
      const updated = prev.filter((p) => p.name !== pokemon.name);
      sessionStorage.setItem('myPokemonCollection', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      collection,
      addToCollection,
      removeFromCollection,
    }),
    [collection, addToCollection, removeFromCollection],
  );

  return (
    <CollectionContext.Provider value={contextValue}>
      {children}
    </CollectionContext.Provider>
  );
};
