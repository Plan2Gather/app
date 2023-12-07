import { execSync } from 'child_process';

const mode = process.env.NX_BUILD_MODE; // Environment variable

// Valid modes are 'dev', 'beta', and 'production'
if (!mode || !['dev', 'beta', 'production'].includes(mode)) {
  throw new Error(`Invalid mode: ${mode}`);
}

// Run the NX build command with the mode
execSync(`nx run frontend:build:${mode}`, { stdio: 'inherit' });
