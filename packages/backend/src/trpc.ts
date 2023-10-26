import { initTRPC } from '@trpc/server';
import { Env } from '@backend/env';

type Context = {
  env: Env;
};

export const t = initTRPC.context<Context>().create({});
