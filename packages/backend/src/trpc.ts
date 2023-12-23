import { initTRPC } from '@trpc/server';

import { type Env } from './env';

interface Context {
  env: Env;
  userId: string | null;
}

export default initTRPC.context<Context>().create({});
