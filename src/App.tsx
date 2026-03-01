import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { SWRProvider } from './swrConfig';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

import { CollectionProvider } from './context/CollectionProvider';
import { GlobalStyles } from './theme/GlobalStyles';
import CollectionPage from './pages/CollectionPage';
import SearchPage from './pages/SearchPage';

export default function App() {
  return (
    <SWRProvider>
      <BrowserRouter>
        <CollectionProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />

            <Header>
              <Nav>
                <Link to="/">
                  <Logo
                    src="/src/assets/icon.svg?react"
                    alt="Cardédex Logo"
                    aria-label="Back to search page"
                  />
                </Link>
                <LinkWrapper to="/collection">Collection</LinkWrapper>
              </Nav>
            </Header>

            <Main>
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/collection" element={<CollectionPage />} />
              </Routes>
            </Main>
          </ThemeProvider>
        </CollectionProvider>
      </BrowserRouter>
    </SWRProvider>
  );
}
const HEADER_HEIGHT = '72px';

const Header = styled.header`
  height: ${HEADER_HEIGHT};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
`;

const Nav = styled.nav`
  max-width: 1286px;
  height: 100%;
  margin: 0 auto;
  padding: 0 40px;

  display: flex;
  align-items: center;
  gap: 24px;
`;

const Logo = styled.img`
  height: 34px;
`;

const LinkWrapper = styled(Link)`
  color: white;
  text-decoration: none;
  letter-spacing: 0.03em;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Main = styled.main`
  padding-top: ${HEADER_HEIGHT};

  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 48px;

  max-width: 1286px;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
`;
