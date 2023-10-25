import { BulkKey, BulkKeyMap } from '@backend/utils/const';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { KvWrapper } from './kv-wrapper';

const KV_REQUESTS_PER_TRIGGER = 1000;

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
        parser: z.string(),
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
}
