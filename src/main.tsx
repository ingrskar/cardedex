import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SWRProvider } from './swrConfig';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SWRProvider>
      <App />
    </SWRProvider>
  </StrictMode>,
);
