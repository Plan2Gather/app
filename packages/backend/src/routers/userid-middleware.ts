import { TRPCError } from '@trpc/server';

import t from 'packages/backend/src/trpc';

const isUser = t.middleware(async (opts) => {
  const { ctx } = opts;
  if (ctx.userId == null) {
    throw new TRPCError({
      message: 'UserId is required',
      code: 'UNAUTHORIZED',
    });
  }
  return await opts.next({
    ctx: {
      userId: ctx.userId,
    },
  });
});
const userProcedure = t.procedure.use(isUser);

export default userProcedure;
