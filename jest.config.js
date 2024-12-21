/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'], // Match your test files
  collectCoverage: true, // Enable coverage reports
  collectCoverageFrom: [
    'src/**/*.ts', // Include your source files
    '!src/**/*.d.ts', // Exclude type declaration files
    '!src/app.ts', // Exclude entry points if needed
    '!src/presentation/server.ts', // Exclude entry points if needed
    '!src/**/index.ts', // Exclude index files
    '!src/config/*.ts', // Exclude config files
  ],
  coverageDirectory: 'coverage', // Directory for coverage output
  coverageReporters: ['text', 'lcov'], // Coverage output formats
};
