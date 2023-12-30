import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { Env, getCloudflareEnv } from './env';
import gatheringRouter from './routers/gathering';
import t from './trpc';

export const appRouter = t.router({
  gatherings: gatheringRouter,
});
export type AppRouter = typeof appRouter;

function setCORSHeaders(origin: string | null, env: Env) {
  const defaultHeaders = {
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  };

  if (origin != null) {
    const allowedOrigins = ['https://plan2gather.net', 'https://plan2gather.pages.dev'];

    if (env.stage === 'dev') {
      allowedOrigins.push('http://localhost:4200', 'http://localhost:4400');
    }

    if (env.stage === 'beta') {
      allowedOrigins.push('https://beta.plan2gather.net');
      allowedOrigins.push('https://beta.plan2gather.pages.dev');
    }

    if (
      allowedOrigins.includes(origin) ||
      (env.stage === 'dev' && origin.endsWith('.plan2gather.pages.dev'))
    ) {
      return {
        ...defaultHeaders,
        'Access-Control-Allow-Origin': origin,
      };
    }
  }

  // If the origin is not allowed, we return the default headers without the
  // `Access-Control-Allow-Origin` header, which will cause the browser to
  // block the request.
  return {
    ...defaultHeaders,
  };
}

export default {
  async fetch(request: Request, rawEnv: Record<string, unknown>) {
    // In actually deployed instances (including `wrangler dev`) Cloudflare includes the CF-Ray header
    // this does not get populated in Miniflare during actual local instances.
    const isDeployed = request.headers.get('CF-Ray') != null;

    const cloudflareEnv = getCloudflareEnv({
      IS_DEPLOYED: isDeployed,
      ...rawEnv,
    });
    const plan2GatherEnv = new Env(cloudflareEnv);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: setCORSHeaders(request.headers.get('origin'), plan2GatherEnv),
      });
    }

    return await fetchRequestHandler({
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
          ...setCORSHeaders(request.headers.get('origin'), plan2GatherEnv),
        },
      }),
    });
  },
};
