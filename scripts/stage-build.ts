import { execSync } from 'child_process';

// let branch = process.env.CF_PAGES_BRANCH; // Environment variable
let branch = 'main'; // For testing locally

console.log(`Building for branch: ${branch}`);

let mode = 'dev';
switch (branch) {
  case 'main':
    mode = 'production';
    break;
  case 'beta':
    mode = 'beta';
    break;
  default:
    mode = 'dev';
}

console.log(`Building with mode: ${mode}`);

// Run the NX build command with the mode
execSync(`nx run frontend:build:${mode}`, { stdio: 'inherit' });
