import {
  LOCAL_ENV,
  DEV_ENV,
  PROD_ENV,
  BETA_ENV,
} from '@plan2gather/backend/config';

export interface APIEnv {
  url: string;
}

interface AppConfiguration {
  clientEnv: APIEnv;
  base: string;
}

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
  prod: prodConfig,
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
