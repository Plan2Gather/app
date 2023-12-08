import { TRPCError } from '@trpc/server';
import t from '../trpc';

const isUser = t.middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.userId) {
    throw new TRPCError({
      message: 'UserId is required',
      code: 'UNAUTHORIZED',
    });
  }
  return opts.next({
    ctx: {
      userId: ctx.userId,
    },
  });
});
const userProcedure = t.procedure.use(isUser);

export default userProcedure;
