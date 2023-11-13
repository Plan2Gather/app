import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import createIDBPersister from '../utils/idbPersister';
import { trpc, trpcClientOptions } from '../trpc';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import Homepage from './pages/homepage/homepage';
import Layout from './components/layout/layout';
import Privacy from './pages/privacy/privacy';
import NotFound from './pages/not-found/not-found';
import Creation from './pages/gathering-creation/gathering-creation';

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
      element: <Creation />,
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
      element: <NotFound />,
    },
    {
      path: '/privacy',
      element: <Privacy />,
    },
  ]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="en">
          <Layout>
            <RouterProvider router={router} />
          </Layout>
        </LocalizationProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
