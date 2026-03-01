import { createContext } from 'react';
import type { Pokemon } from '../types';

export interface ICollectionContext {
  collection: Pokemon[];
  setCollection: (collection: Pokemon[]) => void;
  addToCollection: (pokemon: Pokemon) => void;
  removeFromCollection: (pokemon: Pokemon) => void;
}

export const CollectionContext = createContext<ICollectionContext>({
  collection: [],
  setCollection: () => {},
  addToCollection: () => {},
  removeFromCollection: () => {},
});
