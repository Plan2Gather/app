// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import { useMemo, useState } from 'react';
import { trpc, trpcClientOptions } from '@frontend/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createIDBPersister } from '@frontend/utils/idbPersister';

export function App() {
  const [queryClient] = useState(() => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { staleTime: Infinity, cacheTime: 600000 } },
    });
    persistQueryClient({
      queryClient,
      persister: createIDBPersister(),
    });
    return queryClient;
  });
  const trpcClient = useMemo(() => trpc.createClient(trpcClientOptions()), []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NxWelcome title="plan2gather" />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
