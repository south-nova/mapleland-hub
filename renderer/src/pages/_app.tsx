import React from 'react';
import type { AppProps } from 'next/app';
import { Layout } from '@/pages/layout';

import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/ToolTip';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
