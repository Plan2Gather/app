import { initTRPC } from '@trpc/server';
import { Env } from './env';

type Context = {
  env: Env;
};

export const t = initTRPC.context<Context>().create({});
