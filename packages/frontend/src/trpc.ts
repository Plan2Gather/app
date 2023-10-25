import { createTRPCReact } from '@trpc/react-query';
import { httpLink } from '@trpc/client';
import type { AppRouter } from '@backend/index';
import { config } from './config';

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
