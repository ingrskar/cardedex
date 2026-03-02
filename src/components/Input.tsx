import { IconX } from '@tabler/icons-react';
import React, { forwardRef } from 'react';
import styled from '@emotion/styled';

type Props = {
  value: string;
  onChange: (value: string) => void;
  clearable?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, clearable = false, ...props }, ref) => {
    const showClear = clearable && value.length > 0;

    return (
      <InputContainer>
        <StyledInput
          {...props}
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {showClear && (
          <ClearButton type="button" onClick={() => onChange('')}>
            <IconX size={16} />
          </ClearButton>
        )}
      </InputContainer>
    );
  },
);

export default Input;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
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
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
