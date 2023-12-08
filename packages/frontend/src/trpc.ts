import { createTRPCReact } from '@trpc/react-query';
import { CreateTRPCClientOptions, httpLink } from '@trpc/client';
import type { AppRouter } from '@plan2gather/backend';
import { config } from './config';
import useUserStore from './hooks/user.store';

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
