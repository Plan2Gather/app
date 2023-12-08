import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import createIDBPersister from '../utils/idbPersister';
import { trpc, trpcClientOptions } from '../trpc';

import Homepage from './pages/homepage/homepage';
import Layout from './components/layout/layout';
import Privacy from './pages/privacy/privacy';
import NotFound from './pages/not-found/not-found';
import Creation from './pages/gathering-creation/gathering-creation';
import Team from './pages/team/team';
import Contact from './pages/contact/contact';
import GatheringView from './pages/gathering-view/gathering-view';
import MyMeetings from './pages/my-meetings-page/my-meetings-page';

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
  const trpcClient = useMemo(() => trpc.createClient(trpcClientOptions), []);

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
      path: '/gathering/:id',
      element: <GatheringView />,
    },
    {
      path: '/team',
      element: <Team />,
    },
    {
      path: '/contact',
      element: <Contact />,
    },
    {
      path: '/privacy',
      element: <Privacy />,
    },
    {
      path: '/my-meetings',
      element: <MyMeetings />,
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
