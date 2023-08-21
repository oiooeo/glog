import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OverlayProvider } from './components/common/overlay/Overlay.context';
import Router from './shared/Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <Router />
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default App;
