import { Env, getCloudflareEnv } from '@backend/env';
import { t } from './trpc';
import { Toucan } from 'toucan-js';
import { Context } from 'toucan-js/dist/types';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const appRouter = t.router({});
export type AppRouter = typeof appRouter;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
};

export default {
  async fetch(
    request: Request,
    rawEnv: Record<string, unknown>,
    cloudflareCtx: Context
  ) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }
    // In actually deployed instances (including `wrangler dev`) Cloudflare includes the CF-Ray header
    // this does not get populated in Miniflare during actual local instances.
    const isDeployed = request.headers.get('CF-Ray') != null;

    const cloudflareEnv = getCloudflareEnv({
      IS_DEPLOYED: isDeployed,
      ...rawEnv,
    });
    const polyratingsEnv = new Env(cloudflareEnv);

    if (!cloudflareEnv.IS_DEPLOYED) {
      // await ensureLocalDb(cloudflareEnv, polyratingsEnv);
    }

    const sentry = new Toucan({
      dsn: 'https://a7c07e573f624b40b98f061b54877d9d@o1195960.ingest.sentry.io/6319110',
      context: cloudflareCtx,
      requestDataOptions: {
        allowedHeaders: ['user-agent'],
        allowedSearchParams: /(.*)/,
      },
    });

    return fetchRequestHandler({
      endpoint: '',
      req: request,
      router: appRouter,
      batching: {
        enabled: false,
      },
      createContext: async ({ req }) => {
        return { env: polyratingsEnv };
      },
      responseMeta: () => ({
        headers: {
          'Access-Control-Max-Age': '1728000',
          'Content-Encoding': 'gzip',
          Vary: 'Accept-Encoding',
          ...CORS_HEADERS,
        },
      }),
      onError: (errorState) => {
        if (errorState.error.code === 'INTERNAL_SERVER_ERROR') {
          sentry.captureException(errorState.error);
        }
      },
    });
  },
};
