export interface APIEnv {
  url: string;
}

interface AppConfiguration {
  clientEnv: APIEnv;
  base: string;
}

export const DEV_ENV: APIEnv = {
  url: 'https://api-dev.plan2gather.net',
};
export const BETA_ENV: APIEnv = {
  url: 'https://api-beta.plan2gather.net',
};
export const PROD_ENV: APIEnv = {
  url: 'https://api-prod.plan2gather.net',
};
export const LOCAL_ENV: APIEnv = {
  url: 'http://localhost:3001',
};

const localConfig: AppConfiguration = {
  clientEnv: LOCAL_ENV,
  base: '/',
};

const devConfig: AppConfiguration = {
  clientEnv: DEV_ENV,
  base: '/',
};

const prodConfig: AppConfiguration = {
  clientEnv: PROD_ENV,
  base: '/',
};

const betaConfig: AppConfiguration = {
  clientEnv: BETA_ENV,
  base: '/',
};

const modeToConfig: Record<string, AppConfiguration> = {
  master: prodConfig,
  beta: betaConfig,
  dev: devConfig,
  fallback: devConfig,
};

const deploymentMode = import.meta.env.MODE ?? 'fallback';

const config =
  deploymentMode === 'local-dev'
    ? localConfig
    : modeToConfig[deploymentMode] ?? modeToConfig.fallback;

export { config };
