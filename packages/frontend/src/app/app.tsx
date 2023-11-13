import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import createIDBPersister from '../utils/idbPersister';
import { trpc, trpcClientOptions } from '../trpc';

import Homepage from './pages/homepage/homepage';
import Layout from './components/layout/layout';
import Privacy from './pages/privacy/privacy';
import NotFound from './pages/not-found/not-found';
import Guide from './pages/guide/guide';

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
    { path: '*', element: <NotFound /> },
    {
      path: '/',
      element: <Homepage />,
    },
    {
      path: '/create',
      element: <NotFound />,
    },
    {
      path: '/team',
      element: <NotFound />,
    },
    {
      path: '/contact',
      element: <NotFound />,
    },
    {
      path: '/guide',
      element: <Guide />,
    },
    {
      path: '/privacy',
      element: <Privacy />,
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
