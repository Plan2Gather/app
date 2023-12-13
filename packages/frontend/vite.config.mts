import { sentryVitePlugin } from '@sentry/vite-plugin';
/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig(({ mode }) => ({
  root: __dirname,
  build: {
    outDir: '../../dist/packages/frontend',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,
    rollupOptions: {
      onLog(level, log, handler) {
        if (
          log.cause &&
          (log.cause as any).message ===
            `Can't resolve original location of error.`
        ) {
          return;
        }
        handler(level, log);
      },
    },
  },
  cacheDir: '../../node_modules/.vite/plan2gather',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    mode === 'prod'
      ? sentryVitePlugin({
          org: 'plan2gather',
          project: 'javascript-react',
          telemetry: false,
          authToken: process.env.SENTRY_AUTH_TOKEN,
        })
      : undefined,
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/frontend',
      provider: 'v8',
    },
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['src/utils/theme-test-helper.spec.tsx'],
  },
}));
