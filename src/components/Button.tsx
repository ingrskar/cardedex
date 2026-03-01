import styled from '@emotion/styled';

const BaseButton = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  margin-bottom: auto;
  transition: all 0.2s ease;
`;

export const PrimaryButton = styled(BaseButton)<{ animate?: boolean }>`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  border: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}cc;
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    color: white;
    border: 1px solid white;
  }
`;
