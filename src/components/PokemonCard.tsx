import { IconPokeball, IconSwitchHorizontal } from '@tabler/icons-react';
import { keyframes } from '@emotion/react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import JSConfetti from 'js-confetti';
import styled from '@emotion/styled';
import useSWR from 'swr';

import { CollectionContext } from '../context/CollectionContext';
import { ErrorMessage } from './ErrorMessge';
import { PrimaryButton, SecondaryButton } from './Button';
import type { Pokemon, PokemonInfo } from '../types';

const fallbackSrc = 'src/assets/default.png';

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const { data, error } = useSWR<PokemonInfo>(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
  );
  const { collection, addToCollection, removeFromCollection } =
    useContext(CollectionContext);
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');
  const confettiRef = useRef<JSConfetti | null>(null);
  const isInCollection = collection.some((p) => p.name === pokemon.name);

  useEffect(() => {
    confettiRef.current = new JSConfetti();
  }, []);

  const handleCatch = () => {
    addToCollection(pokemon);

    confettiRef.current?.addConfetti({
      emojis: ['⚡️', '🔥', '💧', '🌿', '✨'],
      emojiSize: 40,
      confettiNumber: 40,
    });
  };

  const statMap = useMemo(() => {
    if (!data) return {};
    return Object.fromEntries(
      data.stats.map((s) => [s.stat.name, s.base_stat]),
    );
  }, [data]);

  const getStat = (name: string) => statMap[name] ?? 0;

  const toggleCardSide = () => {
    setCardSide((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  return (
    <>
      {!data && !error && (
        <CardWrapper>
          <SkeletonCard>
            <SkeletonImage />
            <SkeletonLine />
            <SkeletonLine />
          </SkeletonCard>
        </CardWrapper>
      )}
      {error && (
        <ErrorMessage role="alert">
          Failed to load Pokémon details. Please try again later.
        </ErrorMessage>
      )}
      {data && (
        <CardWrapper>
          <Card
            onClick={toggleCardSide}
            aria-label={`View ${pokemon.name} ${cardSide === 'front' ? 'back' : 'front'} side`}
            side={cardSide}
          >
            {cardSide === 'front' ? (
              <>
                <CardImg
                  src={data.sprites.front_default || fallbackSrc}
                  alt={pokemon.name}
                />
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
                <Stats>
                  <Stat>
                    <label>HP: {getStat('hp')}</label>
                    <StatBar value={getStat('hp')}>
                      <div />
                    </StatBar>
                  </Stat>
                  <Stat>
                    <label>ATK: {getStat('attack')}</label>
                    <StatBar value={getStat('attack')}>
                      <div />
                    </StatBar>
                  </Stat>
                  <Stat>
                    <label>DEF: {getStat('defense')}</label>
                    <StatBar value={getStat('defense')}>
                      <div />
                    </StatBar>
                  </Stat>
                  <Stat>
                    <label>SP ATK: {getStat('special-attack')}</label>
                    <StatBar value={getStat('special-attack')}>
                      <div />
                    </StatBar>
                  </Stat>
                  <Stat>
                    <label>SP DEF: {getStat('special-defense')}</label>
                    <StatBar value={getStat('special-defense')}>
                      <div />
                    </StatBar>
                  </Stat>
                  <Stat>
                    <label>SPEED: {getStat('speed')}</label>
                    <StatBar value={getStat('speed')}>
                      <div />
                    </StatBar>
                  </Stat>
                </Stats>
              </CardInfo>
            )}
          </Card>

          <ButtonContainer>
            {isInCollection ? (
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
              onClick={toggleCardSide}
              aria-label={`Flip card to view ${cardSide === 'front' ? 'back' : 'front'} side`}
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
  margin-top: auto;
  margin-bottom: auto;

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

const Stats = styled.div`
  display: grid;
  gap: 12px;
`;

const Stat = styled.div`
  display: grid;
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

const shimmer = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const SkeletonBase = styled.div`
  background: ${({ theme }) => theme.colors.surfaceHover};
  border-radius: ${({ theme }) => theme.radius.sm};
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

const SkeletonCard = styled.div`
  display: grid;
  gap: 16px;
  height: 350px;
  padding: 20px;
  width: ${({ theme }) => theme.size.sm};
  align-content: start;
  background: ${({ theme }) =>
    'linear-gradient(145deg, ' + theme.colors.surface + ', #1b1f3b)'};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const SkeletonImage = styled(SkeletonBase)`
  width: 170px;
  height: 170px;
  justify-self: center;
`;

const SkeletonLine = styled(SkeletonBase)`
  height: 20px;
`;
