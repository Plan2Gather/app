import { ALL_MEETING_KEY, BulkKey, BulkKeyMap } from '../utils/const';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { KvWrapper } from './kv-wrapper';

import type { KVNamespaceListOptions } from '@cloudflare/workers-types';
import { MeetingData, meetingDataSchema } from '../types/schema';

const KV_REQUESTS_PER_TRIGGER = 1000;
const EXPIRATION_TTL = 60 * 60 * 24 * 7; // 7 days

export class KVDAO {
  constructor(private meetingsNamespace: KvWrapper) {}

  getBulkNamespace(bulkKey: BulkKey): {
    namespace: KvWrapper;
    parser: z.ZodTypeAny;
  } {
    const namespaceMap: Record<
      BulkKey,
      { namespace: KvWrapper; parser: z.ZodTypeAny }
    > = {
      meetings: {
        namespace: this.meetingsNamespace,
        parser: meetingDataSchema,
      },
    };

    return namespaceMap[bulkKey];
  }

  async getBulkKeys(bulkKey: BulkKey): Promise<string[]> {
    const { namespace } = this.getBulkNamespace(bulkKey);
    const keys: string[] = [];
    let cursor: string | undefined;
    do {
      const options: KVNamespaceListOptions = cursor ? { cursor } : {};

      // eslint-disable-next-line no-await-in-loop
      const result = await namespace.list(options);

      // Push all key names into the keys array
      keys.push(...result.keys.map((key) => key.name));

      // Update cursor based on list_complete value
      cursor = result.list_complete === false ? result.cursor : undefined;
    } while (cursor);

    return keys;
  }

  async getBulkValues<T extends BulkKey>(
    bulkKey: T,
    keys: string[]
  ): Promise<BulkKeyMap[T]> {
    if (keys.length > KV_REQUESTS_PER_TRIGGER) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Can not process more than ${KV_REQUESTS_PER_TRIGGER} keys per request`,
      });
    }
    const { namespace } = this.getBulkNamespace(bulkKey);
    // Use get unsafe for performance reasons. Since we are fetching a large number of records
    // the time can be greater than 50ms resulting in occasional 503's
    return Promise.all(keys.map((key) => namespace.getUnsafe(key))) as never;
  }

  async getAllMeetings() {
    const meetingList = await this.meetingsNamespace.safeGet(
      z.array(meetingDataSchema),
      ALL_MEETING_KEY
    );
    if (!meetingList.success) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not find any meetings.',
      });
    }

    return meetingList.data;
  }

  private async putAllMeetings(meetingList: MeetingData[]) {
    await this.meetingsNamespace.put(
      z.array(meetingDataSchema),
      ALL_MEETING_KEY,
      meetingList
    );
  }

  getMeeting(id: string) {
    return this.meetingsNamespace.get(meetingDataSchema, id);
  }

  async putMeeting(meeting: MeetingData) {
    await this.meetingsNamespace.put(meetingDataSchema, meeting.id, meeting, {
      expirationTtl: EXPIRATION_TTL,
    });

    return meeting;
  }

  async updateMeeting(meeting: MeetingData) {
    const existingMeeting = await this.getMeeting(meeting.id);
    if (!existingMeeting) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Could not find meeting to update.',
      });
    }

    await this.putMeeting(meeting);
  }

  async removeMeeting(id: string) {
    await this.meetingsNamespace.delete(id);
  }
}
