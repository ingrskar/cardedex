import { IconPokeball } from '@tabler/icons-react';
import { useState } from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';

import type { Pokemon, PokemonInfo } from '../types';
import { ErrorMessage } from './ErrorMessge';

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const { data, error } = useSWR<PokemonInfo>(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
  );
  const [side, setSide] = useState<'front' | 'back'>('front');

  const { front_default, back_default } = data?.sprites || {};
  const imgSrc =
    (side === 'front'
      ? front_default || back_default
      : back_default || front_default) || 'src/assets/default.png';
  return (
    <>
      {error && (
        <ErrorMessage role="alert">
          Failed to load Pokémon details. Please try again later.
        </ErrorMessage>
      )}
      {data && (
        <CardWrapper>
          <Card
            onClick={() => setSide(side === 'front' ? 'back' : 'front')}
            aria-label={`View ${pokemon.name} ${side === 'front' ? 'back' : 'front'} side`}
            side={side}
          >
            <CardImg src={imgSrc} alt={pokemon.name} />
            {side === 'front' ? (
              <>
                <CardInfo>
                  <h2>{pokemon.name.toUpperCase()}</h2>
                </CardInfo>

                <CardInfo>
                  <p>
                    Type:{' '}
                    {data.types
                      .map((type) => type.type.name.toUpperCase())
                      .join(', ')}
                  </p>
                </CardInfo>
              </>
            ) : (
              <CardInfo flipped>
                <Stat>
                  <label>HP</label>
                  <StatBar value={data.stats[0].base_stat}>
                    <div />
                  </StatBar>
                </Stat>
                <Stat>
                  <label>ATK</label>
                  <StatBar value={data.stats[1].base_stat}>
                    <div />
                  </StatBar>
                </Stat>
                <Stat>
                  <label>DEF</label>
                  <StatBar value={data.stats[2].base_stat}>
                    <div />
                  </StatBar>
                </Stat>
                <Stat>
                  <label>SP ATK</label>
                  <StatBar value={data.stats[3].base_stat}>
                    <div />
                  </StatBar>
                </Stat>
                <Stat>
                  <label>SP DEF</label>
                  <StatBar value={data.stats[4].base_stat}>
                    <div />
                  </StatBar>
                </Stat>
                <Stat>
                  <label>SPEED</label>
                  <StatBar value={data.stats[5].base_stat}>
                    <div />
                  </StatBar>
                </Stat>
              </CardInfo>
            )}
          </Card>
          <CatchButton>
            <IconPokeball size={16} />
            Catch
          </CatchButton>
        </CardWrapper>
      )}
    </>
  );
}

const CardWrapper = styled.div`
  perspective: 1000px;

  display: grid;
  gap: 16px;
  max-width: fit-content;
`;

const Card = styled.div<{ side: 'front' | 'back' }>`
  width: 100%;
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) =>
    'linear-gradient(145deg, ' + theme.colors.surface + ', #1b1f3b)'};
  color: ${({ theme }) => theme.colors.text};
  width: ${({ theme }) => theme.size.small};
  height: 350px;
  cursor: pointer;
  display: grid;
  gap: 16px;

  transform-style: preserve-3d;
  transition: transform 0.2s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform: ${({ side }) =>
    side === 'back' ? 'rotateY(180deg)' : 'rotateY(0deg)'};

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 255, 255, 0.15);
    transform: scale(1.01)
      rotateY(${({ side }) => (side === 'back' ? '180deg' : '0deg')});
  }
`;

const CardImg = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  margin: 0 auto;
  max-height: 170px;
  max-width: 170px;
  padding: 8px;
`;

const CardInfo = styled.div<{ flipped?: boolean }>`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  text-align: center;
  max-height: fit-content;

  h2 {
    font-family: ${({ theme }) => theme.font.heading};
    font-size: 18px;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 14px;
  }

  transform: ${({ flipped }) => (flipped ? 'scaleX(-1)' : 'scaleX(1)')};
`;

const Stat = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 8px;

  label {
    text-align: left;
    font-size: 12px;
  }
`;

const StatBar = styled.div<{ value: number }>`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};

  div {
    height: 100%;
    width: ${({ value }) => (Math.min(value, 150) / 150) * 100}%;
    background: linear-gradient(90deg, #0ff, #ffd500);
    border-radius: ${({ theme }) => theme.radius.sm};
    transition: width 1s ease;
  }
`;

const CatchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: bold;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}cc;
  }
`;
