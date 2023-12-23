import { z } from 'zod';

import KVDAO from './dao/kv-dao';
import KvWrapper from './dao/kv-wrapper';

import type { KVNamespace } from '@cloudflare/workers-types';

export class Env {
  kvDao: KVDAO;

  stage: 'dev' | 'beta' | 'prod';

  constructor(env: CloudflareEnv) {
    this.kvDao = new KVDAO(new KvWrapper(env.PLAN2GATHER_GATHERINGS));
    this.stage = env.STAGE;
  }
}

export type CloudflareEnv = z.infer<typeof cloudflareEnvParser>;

// Can not really verify that the env is actually of type `KVNamespace`
// The least we can do is see if it is a non null object
const kvNamespaceParser = z.custom<KVNamespace>((n) => n && n !== null && typeof n === 'object');
const cloudflareEnvParser = z.object({
  PLAN2GATHER_GATHERINGS: kvNamespaceParser,
  IS_DEPLOYED: z.boolean(),
  STAGE: z.enum(['dev', 'beta', 'prod']),
});

export function getCloudflareEnv(rawEnv: Record<string, unknown>): CloudflareEnv {
  return cloudflareEnvParser.parse(rawEnv);
}
