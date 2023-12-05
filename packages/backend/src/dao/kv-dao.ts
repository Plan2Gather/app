import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import type { KVNamespaceListOptions } from '@cloudflare/workers-types';
import KvWrapper from './kv-wrapper';

import { ALL_GATHERING_KEY, BulkKey, BulkKeyMap } from '../utils/const';
import { GatheringData, gatheringDataSchema } from '../types/schema';

const KV_REQUESTS_PER_TRIGGER = 1000;
const EXPIRATION_TTL = 60 * 60 * 24 * 7; // 7 days

export default class KVDAO {
    constructor(private gatheringsNamespace: KvWrapper) {}

    getBulkNamespace(bulkKey: BulkKey): {
        namespace: KvWrapper;
        parser: z.ZodTypeAny;
    } {
        const namespaceMap: Record<
            BulkKey,
            { namespace: KvWrapper; parser: z.ZodTypeAny }
        > = {
            gatherings: {
                namespace: this.gatheringsNamespace,
                parser: gatheringDataSchema,
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
        return Promise.all(
            keys.map((key) => namespace.getUnsafe(key))
        ) as never;
    }

    async getAllGatherings() {
        const gatheringList = await this.gatheringsNamespace.safeGet(
            z.array(gatheringDataSchema),
            ALL_GATHERING_KEY
        );
        if (!gatheringList.success) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Could not find any gatherings.',
            });
        }

        return gatheringList.data;
    }

    private async putAllGatherings(gatheringList: GatheringData[]) {
        await this.gatheringsNamespace.put(
            z.array(gatheringDataSchema),
            ALL_GATHERING_KEY,
            gatheringList
        );
    }

    getGathering(id: string) {
        return this.gatheringsNamespace.get(gatheringDataSchema, id);
    }

    async putGathering(gathering: GatheringData) {
        await this.gatheringsNamespace.put(
            gatheringDataSchema,
            gathering.id,
            gathering,
            {
                expirationTtl: EXPIRATION_TTL,
            }
        );

        return gathering;
    }

    async updateGathering(gathering: GatheringData) {
        const existingGathering = await this.getGathering(gathering.id);
        if (!existingGathering) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Could not find gathering to update.',
            });
        }

        await this.putGathering(gathering);
    }

    async removeGathering(id: string) {
        await this.gatheringsNamespace.delete(id);
    }
}
