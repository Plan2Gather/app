import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { Env, getCloudflareEnv } from './env';
import t from './trpc';
import gatheringRouter from './routers/gathering';

export const appRouter = t.router({
  gatherings: gatheringRouter,
});
export type AppRouter = typeof appRouter;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
};

export default {
  async fetch(request: Request, rawEnv: Record<string, unknown>) {
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
    const plan2GatherEnv = new Env(cloudflareEnv);

    return fetchRequestHandler({
      endpoint: '',
      req: request,
      router: appRouter,
      batching: {
        enabled: false,
      },
      createContext: async ({ req }) => ({
        env: plan2GatherEnv,
        userId: req.headers.get('X-User-Identifier'),
      }),
      responseMeta: () => ({
        headers: {
          'Access-Control-Max-Age': '1728000',
          'Content-Encoding': 'gzip',
          Vary: 'Accept-Encoding',
          ...CORS_HEADERS,
        },
      }),
    });
  },
};
