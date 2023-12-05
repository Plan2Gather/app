import { z } from 'zod';
import { nanoid } from 'nanoid';
import { TRPCError } from '@trpc/server';

import t from '../trpc';
import {
  gatheringFormDataSchema,
  gatheringFormDetailsSchema,
  userAvailabilitySchema,
} from '../types/schema';

import type { GatheringBackendData } from '../types/schema';

export default t.router({
  get: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => ctx.env.kvDao.getGathering(input.id)),
  getEditPermission: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const gathering = await ctx.env.kvDao.getBackendGathering(input.id);

      if (!ctx.userId) {
        throw new TRPCError({
          message: 'UserId is required to find permissions.',
          code: 'BAD_REQUEST',
        });
      }

      return gathering.creationUserId === ctx.userId;
    }),
  put: t.procedure
    .input(gatheringFormDataSchema)
    .mutation(async ({ ctx, input }) => {
      const gatheringId = nanoid();

      if (!ctx.userId) {
        throw new TRPCError({
          message: 'UserId is required to create a gathering.',
          code: 'BAD_REQUEST',
        });
      }

      const gathering: GatheringBackendData = {
        id: gatheringId,
        ...input,
        availability: {},
        creationDate: new Date().toISOString(),
        creationUserId: ctx.userId,
      };

      await ctx.env.kvDao.putGathering(gathering);

      return gatheringId;
    }),
  putDetails: t.procedure
    .input(z.object({ id: z.string(), details: gatheringFormDetailsSchema }))
    .mutation(async ({ ctx, input }) => {
      // Check if the user is allowed to update the gathering.
      if (!ctx.userId) {
        throw new TRPCError({
          message: 'UserId is required to update a gathering.',
          code: 'BAD_REQUEST',
        });
      }

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
  putAvailability: t.procedure
    .input(z.object({ id: z.string(), availability: userAvailabilitySchema }))
    .mutation(async ({ ctx, input }) => {
      // Check if the user is allowed to update the gathering.
      if (!ctx.userId) {
        throw new TRPCError({
          message: 'UserId is required to update a gathering.',
          code: 'BAD_REQUEST',
        });
      }

      await ctx.env.kvDao.putAvailability(input.id, input.availability);

      return 'ok';
    }),
  remove: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check if the user is allowed to remove the gathering.
      if (!ctx.userId) {
        throw new TRPCError({
          message: 'UserId is required to remove a gathering.',
          code: 'BAD_REQUEST',
        });
      }

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
