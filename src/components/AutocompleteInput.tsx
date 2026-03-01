import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import type { Pokemon } from '../types';
import Input from './Input';

// TODO: close dropdown when clicking outside
type Props = {
  items: Pokemon[];
  onSelect: (item: Pokemon | null) => void;
};

export function AutocompleteInput({ items, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const results = items.filter((item) =>
    item.name.toLowerCase().startsWith(query.toLowerCase()),
  );

  const displayAutoComplete =
    query.length > 0 &&
    (results.length === 0 ||
      query.toLowerCase() !== results[0].name.toLowerCase());

  function selectItem(item: Pokemon | null) {
    setQuery(item?.name || '');
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

    if (e.key === 'Enter' && query.length > 0) {
      e.preventDefault();
      selectItem(results[activeIndex]);
    }
  }

  useEffect(() => {
    const el = optionRefs.current[activeIndex];

    if (el) {
      el.focus();
      el.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  return (
    <Wrapper>
      <Input
        name="pokmon-search-input"
        role="combobox"
        aria-expanded={displayAutoComplete || false}
        aria-controls="autocomplete-list"
        aria-autocomplete="list"
        aria-activedescendant={results[activeIndex]?.name}
        autoComplete="off"
        value={query}
        placeholder="Search…"
        onChange={(value: string) => {
          setQuery(value);
          setActiveIndex(0);

          if (value === '') {
            onSelect(null);
            return;
          }

          const exactMatch = results.find(
            (item) => item.name.toLowerCase() === value.toLowerCase(),
          );

          onSelect(exactMatch || null);
        }}
        onKeyDown={handleKeyDown}
        clearable
      />

      {displayAutoComplete && (
        <Dropdown>
          {query.length > 0 && results.length === 0 && (
            <Option active={false}>No matches found</Option>
          )}
          {results.map((item, index) => (
            <Option
              key={item.url}
              role="option"
              aria-selected={index === activeIndex}
              active={index === activeIndex}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              onClick={() => selectItem(item)}
              onMouseMove={() => setActiveIndex(index)}
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
  max-width: ${({ theme }) => theme.size.md};
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
  text-align: left;

  background: ${({ active, theme }) =>
    active ? theme.colors.surfaceHover : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;
