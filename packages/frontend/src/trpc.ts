import { createTRPCReact } from '@trpc/react-query';
import { httpLink } from '@trpc/client';
import { config } from './config';

import type { AppRouter } from '@plan2gather/backend';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClientOptions = () => ({
  links: [
    httpLink({
      url: config.clientEnv.url,
      headers() {
        return {};
      },
    }),
  ],
});
