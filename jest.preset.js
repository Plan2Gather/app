const nxPreset = require('@nx/jest/preset').default;

module.exports = { coverageReporters: ['json', 'lcov', 'html'], ...nxPreset };
