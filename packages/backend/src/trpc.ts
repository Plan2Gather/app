import { initTRPC } from '@trpc/server';
import { Env } from './env';

type Context = {
  env: Env;
};

export default initTRPC.context<Context>().create({});
