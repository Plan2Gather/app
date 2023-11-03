import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import createIDBPersister from '../utils/idbPersister';
import { trpc, trpcClientOptions } from '../trpc';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import Homepage from './pages/homepage/homepage';
import Layout from './components/layout/layout';

export default function App() {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: { queries: { staleTime: Infinity, cacheTime: 600000 } },
    });
    persistQueryClient({
      queryClient: client,
      persister: createIDBPersister(),
    });
    return client;
  });
  const trpcClient = useMemo(() => trpc.createClient(trpcClientOptions()), []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage />,
    },
  ]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
