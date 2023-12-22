import { z } from 'zod';
import { nanoid } from 'nanoid';
import { TRPCError } from '@trpc/server';
import userProcedure from './userid-middleware';

import t from '../trpc';
import {
  gatheringFormDataSchema,
  gatheringFormDetailsSchema,
  userAvailabilityBackendSchema,
  userAvailabilitySchema,
} from '../types/schema';

import type { GatheringBackendData, UserAvailability } from '../types/schema';

export default t.router({
  get: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => ctx.env.kvDao.getGathering(input.id)),
  getEditPermission: userProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const gathering = await ctx.env.kvDao.getBackendGathering(input.id);

      return gathering.creationUserId === ctx.userId;
    }),
  put: userProcedure
    .input(gatheringFormDataSchema)
    .mutation(async ({ ctx, input }) => {
      const gatheringId = nanoid();

      const gathering: GatheringBackendData = {
        id: gatheringId,
        ...input,
        allowedPeriods: input.allowedPeriods,
        availability: {},
        creationDate: new Date().toISOString(),
        creationUserId: ctx.userId,
      };

      await ctx.env.kvDao.putGathering(gathering);

      return gatheringId;
    }),
  putDetails: userProcedure
    .input(z.object({ id: z.string(), details: gatheringFormDetailsSchema }))
    .mutation(async ({ ctx, input }) => {
      const gathering = await ctx.env.kvDao.getBackendGathering(input.id);

      if (gathering.creationUserId !== ctx.userId) {
        throw new TRPCError({
          message: 'You are not allowed to update this gathering.',
          code: 'FORBIDDEN',
        });
      }

      await ctx.env.kvDao.putDetails(input.id, input.details);

      return 'ok';
    }),
  putAvailability: userProcedure
    .input(z.object({ id: z.string(), availability: userAvailabilitySchema }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      await ctx.env.kvDao.putAvailability(
        input.id,
        userAvailabilityBackendSchema.parse({
          [userId]: {
            name: input.availability.name,
            availability: input.availability.availability,
          },
        })
      );

      return 'ok';
    }),
  getAvailability: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const gathering = await ctx.env.kvDao.getBackendGathering(input.id);

      // We need to parse the user availability to the frontend schema.
      // This strips the userId from the availability.
      return Object.values(gathering.availability);
    }),
  getOwnAvailability: userProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const gathering = await ctx.env.kvDao.getBackendGathering(input.id);

      // Find the user's availability for the gathering.
      const availability = gathering.availability[ctx.userId] ?? 'none';

      return availability as UserAvailability | 'none';
    }),
  getOwnedGatherings: userProcedure.query(async ({ ctx }) =>
    ctx.env.kvDao.getOwnedGatherings(ctx.userId)
  ),
  getParticipatingGatherings: userProcedure.query(async ({ ctx }) =>
    ctx.env.kvDao.getParticipatingGatherings(ctx.userId)
  ),
  leaveGathering: userProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.env.kvDao.removeAvailability(input.id, ctx.userId);

      return 'ok';
    }),
  remove: userProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const gathering = await ctx.env.kvDao.getBackendGathering(input.id);

      if (gathering.creationUserId !== ctx.userId) {
        throw new TRPCError({
          message: 'You are not allowed to remove this gathering.',
          code: 'FORBIDDEN',
        });
      }

      await ctx.env.kvDao.removeGathering(input.id);

      return 'ok';
    }),
});
