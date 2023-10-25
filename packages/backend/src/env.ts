import { KVDAO } from '@backend/dao/kv-dao';
import { z } from 'zod';
import { KvWrapper } from './dao/kv-wrapper';

export function getCloudflareEnv(
  rawEnv: Record<string, unknown>
): CloudflareEnv {
  return cloudflareEnvParser.parse(rawEnv);
}

export class Env {
  kvDao: KVDAO;

  constructor(env: CloudflareEnv) {
    this.kvDao = new KVDAO(new KvWrapper(env.PLAN2GATHER_MEETINGS));
  }
}

export type CloudflareEnv = z.infer<typeof cloudflareEnvParser>;

// Can not really verify that the env is actually of type `KVNamespace`
// The least we can do is see if it is a non null object
const kvNamespaceParser = z.custom<KVNamespace>(
  (n) => n && n !== null && typeof n === 'object'
);
const cloudflareEnvParser = z.object({
  PLAN2GATHER_MEETINGS: kvNamespaceParser,
  IS_DEPLOYED: z.boolean(),
});
