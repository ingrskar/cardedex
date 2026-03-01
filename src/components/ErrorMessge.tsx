import styled from '@emotion/styled';

export const ErrorMessage = styled.p`
  color: white;
  background: #e53e3e;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 12px 14px;
  max-width: ${({ theme }) => theme.size.medium};
`;
