import { type PersistedClient, type Persister } from '@tanstack/react-query-persist-client';
import { get, set, del } from 'idb-keyval';

// eslint-disable-next-line max-len
// FROM https://tanstack.com/query/v4/docs/plugins/persistQueryClient?from=reactQueryV3&original=https://react-query-v3.tanstack.com/plugins/persistQueryClient

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export default function createIDBPersister(idbValidKey: IDBValidKey = 'reactQuery') {
  return {
    persistClient: async (client: PersistedClient) => {
      await set(idbValidKey, client);
    },
    restoreClient: async () => await get<PersistedClient>(idbValidKey),
    removeClient: async () => {
      await del(idbValidKey);
    },
  } satisfies Persister;
}
