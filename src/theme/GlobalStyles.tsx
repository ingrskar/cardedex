import { Global, css, useTheme } from '@emotion/react';

export function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        h1 {
          font-family: ${theme.font.heading};
          margin-top: 0;
        }

        body {
          margin: 0;
          font-family: ${theme.font.body};
          background: ${theme.colors.bg};
          color: ${theme.colors.text};
        }

        input,
        button {
          font-family: inherit;
        }
      `}
    />
  );
}
