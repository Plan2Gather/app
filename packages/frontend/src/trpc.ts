import { httpLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

import { config } from './config';
import useUserStore from './hooks/user.store';

import type { AppRouter } from '@backend';
import type { CreateTRPCClientOptions } from '@trpc/client';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClientOptions: CreateTRPCClientOptions<AppRouter> = {
  links: [
    httpLink({
      url: config.clientEnv.url,
      headers: {
        'X-User-Identifier': useUserStore.getState().getUserId(),
      },
    }),
  ],
};
