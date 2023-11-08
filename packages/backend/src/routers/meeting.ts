import { z } from 'zod';
import { nanoid } from 'nanoid'
import t from '../trpc';
import { meetingDataSchema, meetingFormDataSchema } from '../types/schema';
import type { MeetingData } from '../types/schema';

export default t.router({
  get: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => ctx.env.kvDao.getMeeting(input.id)),
  put: t.procedure
    .input(meetingFormDataSchema)
    .mutation(async ({ ctx, input }) => {
      const meetingId = nanoid();
      const meeting: MeetingData = {
        id: meetingId,
        ...input,
        availability: {},
        creationDate: new Date().toISOString(),
      };

      await ctx.env.kvDao.putMeeting(meeting);

      return meetingId;
    }),
  update: t.procedure
    .input(meetingDataSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.env.kvDao.updateMeeting(input);

      return 'ok';
    }),
  remove: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.env.kvDao.removeMeeting(input.id);

      return 'ok';
    }),
});
