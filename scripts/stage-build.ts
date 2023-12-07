import { execSync } from 'child_process';

let mode = process.env.NX_BUILD_MODE; // Environment variable

// Valid modes are 'dev', 'beta', and 'production'
if (!mode || !['dev', 'beta', 'production'].includes(mode)) {
  throw new Error(`Invalid mode: ${mode}`);
}

if (mode === 'beta') {
  // Check if the branch is 'beta'. If not, change to dev
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  if (branch !== 'beta') {
    console.log(`Not on beta branch, using dev mode for branch ${branch}`);
    mode = 'dev';
  }
}

console.log(`Building frontend in ${mode} mode`);

// Run the NX build command with the mode
execSync(`nx run frontend:build:${mode}`, { stdio: 'inherit' });
