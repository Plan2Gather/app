import { z } from 'zod';

import t from '../trpc';
import { gatheringDataSchema, gatheringFormDataSchema } from '../types/schema';

import type { GatheringData } from '../types/schema';

export default t.router({
  get: t.procedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ input, ctx }) => ctx.env.kvDao.getGathering(input.id)),
  put: t.procedure
    .input(gatheringFormDataSchema)
    .mutation(async ({ ctx, input }) => {
      const gatheringId = crypto.randomUUID();
      const gathering: GatheringData = {
        id: gatheringId,
        ...input,
        availability: {},
        creationDate: new Date().toISOString(),
      };

      await ctx.env.kvDao.putGathering(gathering);

      return gatheringId;
    }),
  update: t.procedure
    .input(gatheringDataSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.env.kvDao.updateGathering(input);

      return 'ok';
    }),
  remove: t.procedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.env.kvDao.removeGathering(input.id);

      return 'ok';
    }),
});
