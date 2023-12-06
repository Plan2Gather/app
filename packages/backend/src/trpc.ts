import { initTRPC } from '@trpc/server';
import { Env } from './env';

type Context = {
  env: Env;
  userId: string | null;
};

export default initTRPC.context<Context>().create({});
