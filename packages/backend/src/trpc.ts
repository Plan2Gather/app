import { initTRPC } from '@trpc/server';
import { Env } from '@backend/env';

type Context = {
  env: Env;
  user?: {
    username: string;
  };
};

export const t = initTRPC.context<Context>().create({});
