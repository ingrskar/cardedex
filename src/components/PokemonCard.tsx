import { useContext, useRef, useState } from 'react';
import { IconPokeball, IconSwitchHorizontal } from '@tabler/icons-react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import JSConfetti from 'js-confetti';

import { ErrorMessage } from './ErrorMessge';
import type { Pokemon, PokemonInfo } from '../types';
import { CollectionContext } from '../context/CollectionContext';
import { PrimaryButton, SecondaryButton } from './Button';

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const { data, error } = useSWR<PokemonInfo>(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
  );
  const { collection, addToCollection, removeFromCollection } =
    useContext(CollectionContext)!;
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  const { front_default, back_default } = data?.sprites || {};
  const imgSrc =
    (cardSide === 'front'
      ? front_default || back_default
      : back_default || front_default) || 'src/assets/default.png';

  const confettiRef = useRef<JSConfetti | null>(null);

  const handleCatch = () => {
    addToCollection(pokemon);

    confettiRef.current?.addConfetti({
      emojis: ['⚡️', '🔥', '💧', '🌿', '✨'],
      emojiSize: 40,
      confettiNumber: 40,
    });
  };

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
            onClick={() => setCardSide(cardSide === 'front' ? 'back' : 'front')}
            aria-label={`View ${pokemon.name} ${cardSide === 'front' ? 'back' : 'front'} side`}
            side={cardSide}
          >
            <CardImg src={imgSrc} alt={pokemon.name} />
            {cardSide === 'front' ? (
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

          <ButtonContainer>
            {collection.some((p) => p.name === pokemon.name) ? (
              <SecondaryButton onClick={() => removeFromCollection(pokemon)}>
                <IconPokeball size={16} />
                Release
              </SecondaryButton>
            ) : (
              <PrimaryButton onClick={handleCatch}>
                <IconPokeball size={16} />
                Catch
              </PrimaryButton>
            )}

            <SecondaryButton
              onClick={() =>
                setCardSide(cardSide === 'front' ? 'back' : 'front')
              }
            >
              <IconSwitchHorizontal size={16} />
              Flip
            </SecondaryButton>
          </ButtonContainer>
        </CardWrapper>
      )}
    </>
  );
}

const CardWrapper = styled.div`
  perspective: 1000px;
  max-width: fit-content;

  display: grid;
  gap: 24px;
  grid-template-rows: 1fr auto;
`;

const Card = styled.div<{ side: 'front' | 'back' }>`
  display: grid;
  gap: 16px;
  height: 350px;
  padding: 20px;
  width: ${({ theme }) => theme.size.sm};

  cursor: pointer;
  background: ${({ theme }) =>
    'linear-gradient(145deg, ' + theme.colors.surface + ', #1b1f3b)'};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.md};

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
  margin: 0 auto;
  max-height: 170px;
  max-width: 170px;
  padding: 8px;

  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const CardInfo = styled.div<{ flipped?: boolean }>`
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  text-align: center;
  max-height: fit-content;

  transform: ${({ flipped }) => (flipped ? 'scaleX(-1)' : 'scaleX(1)')};

  h2 {
    font-family: ${({ theme }) => theme.font.heading};
    font-size: 18px;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
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

const ButtonContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
`;
