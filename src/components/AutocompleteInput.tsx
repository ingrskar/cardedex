import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import type { Pokemon } from '../types';

type Props = {
  items: Pokemon[];
  onSelect: (item: Pokemon | null) => void;
};

export function AutocompleteInput({ items, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const results = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const displayAutoComplete =
    query &&
    results.length > 0 &&
    query.toLowerCase() !== results[0].name.toLowerCase();

  function selectItem(item: Pokemon) {
    setQuery(item.name);
    onSelect(item);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    }

    if ((e.key === 'Enter' || e.key === 'Tab') && query.length > 0) {
      e.preventDefault();
      selectItem(results[activeIndex]);
    }

    if (e.key === 'Escape') {
      setQuery('');
    }
  }

  useEffect(() => {
    const current = optionRefs.current[activeIndex];
    current?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  return (
    <Wrapper>
      <Input
        value={query}
        placeholder="Search…"
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
        }}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-expanded={displayAutoComplete || false}
        aria-controls="autocomplete-list"
        aria-autocomplete="list"
        aria-activedescendant={results[activeIndex]?.name}
      />

      {displayAutoComplete && (
        <Dropdown>
          {results.map((item, index) => (
            <Option
              key={item.url}
              role="option"
              aria-selected={index === activeIndex}
              active={index === activeIndex}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              onMouseDown={() => selectItem(item)}
            >
              {item.name}
            </Option>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  margin-top: 6px;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
  padding: 4px;
  z-index: 10;
`;

const Option = styled.div<{ active: boolean }>`
  padding: 8px 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  font-size: 14px;
  background: ${({ active, theme }) =>
    active ? theme.colors.surfaceHover : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;
