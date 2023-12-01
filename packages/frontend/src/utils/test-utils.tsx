import { useMemo, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { trpc, trpcClientOptions } from '../trpc';

// eslint-disable-next-line import/prefer-default-export
export function TRPCWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const trpcClient = useMemo(() => trpc.createClient(trpcClientOptions()), []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
